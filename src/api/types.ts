import { Currency } from '../types/currency';

export namespace ApiTypes {
    // [GET] /api/v7/currencies
    export type GetCurrenciesRequest = void;
    export type GetCurrenciesResponse = {
        results: Record<CurrencyCode, Currency>;
    };
}
