import { ConversionRate, Currency } from '../types/currency';

export namespace ApiTypes {
    // [GET] /api/v7/currencies
    export type GetCurrenciesRequest = void;
    export type GetCurrenciesResponse = {
        results: Record<CurrencyCode, Currency>;
    };

    // [GET] /api/v7/convert
    export type ConvertCurrenciesRequest = {
        q: string;
        compact: string;
        date?: string;
        endDate?: string;
    };
    export type ConvertCurrenciesResponse = Record<CurrencyPairKey, ConversionRate>;
}
