/// <reference types="react-scripts" />
declare namespace Tag {
    const OpaqueTagSymbol: unique symbol;

    class OpaqueTag<S extends symbol> {
        private [OpaqueTagSymbol]: S;
    }

    export type OpaqueType<T, S extends symbol> = T & OpaqueTag<S>;
}

type Opaque<T, S extends symbol> = Tag.OpaqueType<T, S>;

declare const CurrencyCodeTag: symbol;
type CurrencyCode = Opaque<string, typeof CurrencyCodeTag>;
