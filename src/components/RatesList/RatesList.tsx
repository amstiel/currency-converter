import React, { FC } from 'react';
import { Paper } from '../Paper/Paper';
import { formatFloat } from '../../utils/strings';

import styles from './RatesList.module.scss';

const multipliers = [1, 5, 10, 25, 50, 100, 500, 1000, 5000];

type Props = {
    currencyFromId: string | null;
    currencyToId: string | null;
    conversionRate: number;
};

export const RatesList: FC<Props> = (props) => {
    const { currencyFromId, currencyToId, conversionRate } = props;
    return (
        <Paper title={`Конверсия ${currencyFromId} в ${currencyToId}`}>
            <table className={styles.table}>
                <tbody>
                    {multipliers.map((multiplier) => (
                        <tr>
                            <td className={styles.currencyFromCell}>
                                <span>{multiplier} </span>
                                <strong>{currencyFromId}</strong>
                            </td>
                            <td className={styles.currencyToCell}>
                                <span>{formatFloat(multiplier * conversionRate)} </span>
                                <strong>{currencyToId}</strong>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Paper>
    );
};
