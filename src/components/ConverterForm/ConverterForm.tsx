import React, { FC, FormEvent, useEffect, useState } from 'react';
import { useStore } from 'effector-react';

import {
    $currentPairRates,
    $rates,
    setCurrentCurrencyPair,
    setCurrentFromId,
    setCurrentToId,
} from '../../store/rates';
import { $currencies, fetchCurrenciesFx } from '../../store/currencies';

import switchLogo from '../../assets/icons/switch.svg';

export const ConverterForm: FC = () => {
    const { currencies } = useStore($currencies);
    const { currentFromId, currentToId } = useStore($rates);
    const currentPairRates = useStore($currentPairRates);

    const [inputValue, setInputValue] = useState<number>(1);

    const switchCurrencies = (): void => {
        if (currentFromId === null || currentToId === null) return;

        setCurrentCurrencyPair({
            from: currentToId,
            to: currentFromId,
        });
    };

    useEffect(() => {
        fetchCurrenciesFx();
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(Number(e.currentTarget.value));
                }}
            />

            <select
                name="currency-from"
                id="currency-from"
                value={currentFromId ?? ''}
                onChange={(e) => {
                    setCurrentFromId(e.currentTarget.value);
                }}
            >
                {currencies.map((currency) => (
                    <option key={currency.id} value={currency.id}>
                        {currency.id}-{currency.currencyName}
                    </option>
                ))}
            </select>

            <button type="button" title="Поменять валюты местами" onClick={switchCurrencies}>
                <img src={switchLogo} alt="Поменять валюты местами" />
            </button>

            <select
                name="currency-from"
                id="currency-from"
                value={currentToId ?? ''}
                onChange={(e) => {
                    setCurrentToId(e.currentTarget.value);
                }}
            >
                {currencies.map((currency) => (
                    <option key={currency.id} value={currency.id}>
                        {currency.id}-{currency.currencyName}
                    </option>
                ))}
            </select>
            {currentPairRates !== null && <p>{Number(inputValue) * currentPairRates}</p>}
        </form>
    );
};
