import React, { FC } from 'react';
import { Currency } from '../../types/currency';

import styles from './StyledSelect.module.scss';

type Props = {
    id: string;
    currencies: Currency[];
    onChange: (newValue: string) => void;
    label: string;
    value: string | null;
};

export const StyledSelect: FC<Props> = (props) => {
    const { currencies, id, value, onChange, label } = props;

    return (
        <label className={styles.formControl} htmlFor={id}>
            <span className={styles.formLabel}>{label}</span>
            <select
                id={id}
                value={value ?? 'loading'}
                className={styles.currencySelect}
                onChange={(e) => {
                    onChange(e.currentTarget.value);
                }}
            >
                {currencies.length === 0 && (
                    <option disabled value="loading">
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
    );
};
