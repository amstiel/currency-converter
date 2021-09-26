import { createDomain } from 'effector';
import { ApiTypes } from '../api/types';
import { apiGetCurrencies } from '../api/methods';
import { Currency } from '../types/currency';

const currenciesDomain = createDomain();

// --- Types ---
type CurrenciesState = {
    currencies: Currency[];
};

// --- Effects ----
export const fetchCurrenciesFx = currenciesDomain
    .createEffect<ApiTypes.GetCurrenciesRequest, ApiTypes.GetCurrenciesResponse>()
    .use(apiGetCurrencies);

// --- Store ---
const initialCurrenciesState: CurrenciesState = {
    currencies: [],
};

export const $currencies = currenciesDomain
    .createStore(initialCurrenciesState)
    .on(fetchCurrenciesFx.doneData, (state, response) => ({
        ...state,
        currencies: Object.values(response.results),
    }));
