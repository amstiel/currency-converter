import { createDomain } from 'effector';
import { ApiTypes } from '../api/types';
import { apiGetCurrenciesList } from '../api/methods';
import { Currency } from '../types/currency';

const currenciesDomain = createDomain();

// --- Types ---
type CurrenciesState = {
    currencies: Currency[];
};

// --- Effects ----
export const fetchCurrenciesFx = currenciesDomain
    .createEffect<ApiTypes.GetCurrenciesRequest, ApiTypes.GetCurrenciesResponse>()
    .use(apiGetCurrenciesList);

// --- Store ---
const initialCurrenciesState: CurrenciesState = {
    currencies: [],
};

export const $currencies = currenciesDomain
    .createStore(initialCurrenciesState)
    .on(fetchCurrenciesFx.doneData, (state, response) => ({
        ...state,
        currencies: Object.values(response.results).sort((a, b) =>
            // eslint-disable-next-line no-nested-ternary
            a.id > b.id ? 1 : a.id < b.id ? -1 : 0
        ),
    }));
