import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useStore } from 'effector-react';

import {
    $currentPairTodayRate,
    $rates,
    setCurrentCurrencyPair,
    setCurrentFromId,
    setCurrentToId,
} from '../../store/rates';
import { $currencies, fetchCurrenciesFx } from '../../store/currencies';
import { formatFloat } from '../../utils/strings';
import { Paper } from '../Paper/Paper';
import { setErrorCaption } from '../../store/error';
import { StyledSelect } from '../StyledSelect/StyledSelect';

import { ReactComponent as SwitchLogo } from '../../assets/icons/switch.svg';
import styles from './ConverterForm.module.scss';

export const ConverterForm: FC = () => {
    const { currencies } = useStore($currencies);
    const { currentFromId, currentToId } = useStore($rates);
    const currentPairRates = useStore($currentPairTodayRate);

    const [inputValue, setInputValue] = useState<number>(1);

    const switchCurrencies = (): void => {
        if (currentFromId === null || currentToId === null) return;

        setCurrentCurrencyPair({
            from: currentToId,
            to: currentFromId,
        });
    };

    useEffect(() => {
        fetchCurrenciesFx().catch(() => {
            setErrorCaption('Ошибка при загрузке списка валют');
        });
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const newVal = Number(e.currentTarget.value);
        setInputValue(newVal < 0 ? Math.abs(newVal) : newVal);
    };

    return (
        <Paper>
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

                    <StyledSelect
                        id="converter-form-currency-from"
                        value={currentFromId}
                        onChange={setCurrentFromId}
                        label="Конвертировать из"
                        currencies={currencies}
                    />

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

                    <StyledSelect
                        id="converter-form-currency-to"
                        value={currentToId}
                        onChange={setCurrentToId}
                        label="Конвертировать в"
                        currencies={currencies}
                    />
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
        </Paper>
    );
};
