import React, { FC } from 'react';
import { Paper } from '../Paper/Paper';
import { formatFloat } from '../../utils/strings';

const multipliers = [1, 5, 10, 25, 50, 100, 500, 1000, 5000];

type Props = {
    currencyFromId: string | null;
    currencyToId: string | null;
    conversionRate: number;
};

export const RatesList: FC<Props> = (props) => {
    const { currencyFromId, currencyToId, conversionRate } = props;
    return (
        <Paper>
            <h3>
                Конверсия {currencyFromId} в {currencyToId}
            </h3>
            <ul>
                {multipliers.map((multiplier) => (
                    <li>
                        <span>{multiplier}</span> -{' '}
                        <span>{formatFloat(multiplier * conversionRate)}</span>
                    </li>
                ))}
            </ul>
        </Paper>
    );
};
