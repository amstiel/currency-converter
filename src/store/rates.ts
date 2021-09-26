import { createDomain } from 'effector';
import { ApiTypes } from '../api/types';
import { apiConvertCurrencies } from '../api/methods';

const ratesDomain = createDomain();

export const fetchCurrencyPairRatesFx = ratesDomain
    .createEffect<ApiTypes.ConvertCurrenciesRequest, ApiTypes.ConvertCurrenciesResponse>()
    .use(apiConvertCurrencies);

type RatesState = {
    rates: Record<string, number>;
};

const initialRatesState: RatesState = {
    rates: {},
};

export const $rates = ratesDomain
    .createStore(initialRatesState)
    .on(fetchCurrencyPairRatesFx.doneData, (state, response) => {
        const rateEntries = Object.entries(response);
        const newRates = { ...state.rates };

        rateEntries.forEach((entry) => {
            const [pairKey, conversionRate] = entry;

            if (newRates[pairKey] === undefined) {
                newRates[pairKey] = conversionRate;
            }
        });

        return {
            ...state,
            rates: newRates,
        };
    });
