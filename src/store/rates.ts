import { createDomain } from 'effector';
import { subDays } from 'date-fns';
import { ApiTypes } from '../api/types';
import { apiConvertCurrencies } from '../api/methods';
import { $currencies } from './currencies';
import { formatDateToApiDate } from '../utils/date';
import { ConversionRate } from '../types/currency';

const ratesDomain = createDomain();
const today = new Date();

const getCurrencyPairPayload = (
    currencyFrom: string,
    currencyTo: string
): ApiTypes.ConvertCurrenciesRequest => ({
    q: `${currencyFrom}_${currencyTo},${currencyTo}_${currencyFrom}`,
    compact: 'ultra',
    endDate: formatDateToApiDate(today),
    date: formatDateToApiDate(subDays(today, 8)),
});

const getCurrencyPairKey = (currencyFrom: string, currencyTo: string): string =>
    `${currencyFrom}_${currencyTo}`;

export const setCurrentFromId = ratesDomain.createEvent<string>();
export const setCurrentToId = ratesDomain.createEvent<string>();
export const setCurrentCurrencyPair = ratesDomain.createEvent<{
    from: string;
    to: string;
}>();

export const fetchCurrencyPairRatesFx = ratesDomain
    .createEffect<ApiTypes.ConvertCurrenciesRequest, ApiTypes.ConvertCurrenciesResponse>()
    .use(apiConvertCurrencies);

type RatesState = {
    currentFromId: string | null;
    currentToId: string | null;
    currentCurrencyPairKey: string | null;
    rates: Record<CurrencyPairKey, ConversionRate>;
};

const initialRatesState: RatesState = {
    currentFromId: null,
    currentToId: null,
    currentCurrencyPairKey: null,
    rates: {},
};

export const $rates = ratesDomain
    .createStore(initialRatesState)
    .on(setCurrentCurrencyPair, (state, { from, to }) => {
        const newCurrencyPairKey = getCurrencyPairKey(from, to) as CurrencyPairKey;

        if (state.rates[newCurrencyPairKey] === undefined) {
            fetchCurrencyPairRatesFx(getCurrencyPairPayload(from, to));
        }

        return {
            ...state,
            currentFromId: from,
            currentToId: to,
            currentCurrencyPairKey: newCurrencyPairKey,
        };
    })
    .on(setCurrentFromId, (state, newCurrentFromId) => {
        if (state.currentToId !== null) {
            setCurrentCurrencyPair({
                from: newCurrentFromId,
                to: state.currentToId,
            });
        }

        return {
            ...state,
            currentFromId: newCurrentFromId,
        };
    })
    .on(setCurrentToId, (state, newCurrentToId) => {
        if (state.currentFromId !== null) {
            setCurrentCurrencyPair({
                from: state.currentFromId,
                to: newCurrentToId,
            });
        }

        return {
            ...state,
            currentToId: newCurrentToId,
        };
    })
    .on(fetchCurrencyPairRatesFx.doneData, (state, response) => {
        const rateEntries = Object.entries(response);
        const newRates = { ...state.rates };

        rateEntries.forEach((entry) => {
            const [pairKey, conversionRate] = entry;

            if (newRates[pairKey as CurrencyPairKey] === undefined) {
                newRates[pairKey as CurrencyPairKey] = conversionRate;
            }
        });

        return {
            ...state,
            rates: newRates,
        };
    });

$rates.watch($currencies.updates, (state, { currencies }) => {
    setCurrentCurrencyPair({
        from: currencies[0].id,
        to: currencies[1].id,
    });
});

export const $currentPairTodayRate = $rates.map((state) => {
    const rates = state.rates[`${state.currentFromId}_${state.currentToId}` as CurrencyPairKey];
    return rates === undefined ? null : rates[formatDateToApiDate(today)];
});

export const $currentInvertedPairTodayRate = $rates.map((state) => {
    const rates = state.rates[`${state.currentToId}_${state.currentFromId}` as CurrencyPairKey];
    return rates === undefined ? null : rates[formatDateToApiDate(today)];
});

export const $currentPairRates = $rates.map(
    (state) => state.rates[`${state.currentFromId}_${state.currentToId}` as CurrencyPairKey]
);
