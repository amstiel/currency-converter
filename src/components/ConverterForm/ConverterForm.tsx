import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useStore } from 'effector-react';

import {
    $currentPairRates,
    $rates,
    setCurrentCurrencyPair,
    setCurrentFromId,
    setCurrentToId,
} from '../../store/rates';
import { $currencies, fetchCurrenciesFx } from '../../store/currencies';

import styles from './ConverterForm.module.scss';
import { ReactComponent as SwitchLogo } from '../../assets/icons/switch.svg';
import { formatFloat } from '../../utils/strings';

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

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const newVal = Number(e.currentTarget.value);
        setInputValue(newVal < 0 ? Math.abs(newVal) : newVal);
    };

    return (
        <fieldset className={styles.root}>
            <div className={styles.controlsContainer}>
                <label className={styles.formControl} htmlFor="converter-form-amount">
                    <span className={styles.formLabel}>Сумма</span>
                    <input
                        id="converter-form-amount"
                        type="number"
                        className={styles.amountInput}
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                </label>

                <label className={styles.formControl} htmlFor="converter-form-currency-from">
                    <span className={styles.formLabel}>Конвертировать из</span>
                    <select
                        id="converter-form-currency-from"
                        value={currentFromId ?? ''}
                        className={styles.currencySelect}
                        onChange={(e) => {
                            setCurrentFromId(e.currentTarget.value);
                        }}
                    >
                        {currencies.length === 0 && (
                            <option disabled selected>
                                Загрузка...
                            </option>
                        )}
                        {currencies.map((currency) => (
                            <option key={currency.id} value={currency.id}>
                                {currency.id}-{currency.currencyName}
                            </option>
                        ))}
                    </select>
                </label>

                <div className={styles.buttonContainer}>
                    <button
                        className={styles.switchButton}
                        type="button"
                        title="Поменять валюты местами"
                        onClick={switchCurrencies}
                    >
                        <SwitchLogo />
                    </button>
                </div>

                <label className={styles.formControl} htmlFor="converter-form-currency-to">
                    <span className={styles.formLabel}>Конвертировать в</span>
                    <select
                        id="converter-form-currency-to"
                        value={currentToId ?? ''}
                        className={styles.currencySelect}
                        onChange={(e) => {
                            setCurrentToId(e.currentTarget.value);
                        }}
                    >
                        {currencies.length === 0 && (
                            <option disabled selected>
                                Загрузка...
                            </option>
                        )}
                        {currencies.map((currency) => (
                            <option key={currency.id} value={currency.id}>
                                {currency.id}-{currency.currencyName}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            {currentPairRates !== null && (
                <div>
                    <p>
                        {inputValue}&nbsp;{currentFromId} ={' '}
                        {formatFloat(Number(inputValue) * currentPairRates)}
                        &nbsp;{currentToId}
                    </p>
                    <p>
                        1&nbsp;{currentFromId} = {formatFloat(currentPairRates)}
                        &nbsp;{currentToId}
                    </p>
                </div>
            )}
        </fieldset>
    );
};
