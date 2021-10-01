export type Currency = {
    id: string;
    currencyName: string;
    currencySymbol?: string;
};

export type ConversionRate = Record<ApiDate, number>;
