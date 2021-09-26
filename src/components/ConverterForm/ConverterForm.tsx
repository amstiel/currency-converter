import React, { FC, FormEvent, useEffect, useState } from 'react';
import { useStore } from 'effector-react';

import { $currencies, fetchCurrenciesFx } from '../../store/currencies';
import { $rates, fetchCurrencyPairRatesFx } from '../../store/rates';

import switchLogo from '../../assets/icons/switch.svg';

export const ConverterForm: FC = () => {
    const { currencies } = useStore($currencies);
    const { rates } = useStore($rates);
    const [currencyFrom, setCurrencyFrom] = useState<string>('');
    const [currencyTo, setCurrencyTo] = useState<string>('');
    const [currentRatePair, setCurrentRatePair] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<number>(1);

    const switchCurrencies = (): void => {
        const prevCurrencyTo = currencyTo;
        setCurrencyFrom(prevCurrencyTo);
        setCurrencyTo(currencyFrom);
    };

    useEffect(() => {
        fetchCurrenciesFx();
    }, []);

    useEffect(() => {
        if (currencies.length > 0) {
            setCurrencyFrom(currencies[0].id);
            setCurrencyTo(currencies[1].id);
        }
    }, [currencies]);

    useEffect(() => {
        setCurrentRatePair(`${currencyFrom}_${currencyTo}`);
    }, [currencyFrom, currencyTo]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        fetchCurrencyPairRatesFx({
            q: `${currencyFrom}_${currencyTo},${currencyTo}_${currencyFrom}`,
            compact: 'ultra',
        });
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
                value={currencyFrom}
                onChange={(e) => {
                    setCurrencyFrom(e.currentTarget.value);
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
                value={currencyTo}
                onChange={(e) => {
                    setCurrencyTo(e.currentTarget.value);
                }}
            >
                {currencies.map((currency) => (
                    <option key={currency.id} value={currency.id}>
                        {currency.id}-{currency.currencyName}
                    </option>
                ))}
            </select>
            <button type="submit" disabled={rates[`${currencyFrom}_${currencyTo}`] !== undefined}>
                Конвертировать
            </button>
            {currentRatePair !== null && rates[currentRatePair] !== undefined && (
                <p>{Number(inputValue) * rates[`${currencyFrom}_${currencyTo}`]}</p>
            )}
        </form>
    );
};
