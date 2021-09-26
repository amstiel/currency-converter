import React, { FC, useEffect } from 'react';
import { apiGetCurrencies } from '../../api/methods';

export const ConverterForm: FC = () => {
    useEffect(() => {
        apiGetCurrencies().then((res) => {
            console.log(res.results);
        });
    }, []);
    return (
        <section>
            <input type="text" />
            <input type="text" />
        </section>
    );
};
