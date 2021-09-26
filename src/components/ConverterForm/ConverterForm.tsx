import React, { FC, useEffect } from 'react';
import { useStore } from 'effector-react';

import { $currencies, fetchCurrenciesFx } from '../../store/currencies';

export const ConverterForm: FC = () => {
    const { currencies } = useStore($currencies);

    useEffect(() => {
        fetchCurrenciesFx();
    }, []);
    return (
        <form>
            <input type="text" />
            <input type="text" />
            <select name="currency-from" id="currency-from">
                {currencies.map((currency) => (
                    <option key={currency.id} value={currency.id}>
                        {currency.id}-{currency.currencyName}
                    </option>
                ))}
            </select>
            <button type="submit">Конвертировать</button>
        </form>
    );
};
