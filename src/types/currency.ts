export type Currency = Record<CurrencyCode, CurrencyDetails>;
export type CurrencyDetails = {
    id: string;
    currencyName: string;
    currencySymbol?: string;
};
