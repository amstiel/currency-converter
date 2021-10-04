import React, { FC } from 'react';
import { useStore } from 'effector-react';

import { Paper } from '../Paper/Paper';
import { formatFloat } from '../../utils/strings';
import { Skeleton } from '../Skeleton/Skeleton';
import { fetchCurrencyPairRatesFx } from '../../store/rates';

import styles from './RatesList.module.scss';

const multipliers = [1, 5, 10, 25, 50, 100, 500, 1000, 5000];

type Props = {
    currencyFromId: string | null;
    currencyToId: string | null;
    conversionRate: number;
};

export const RatesList: FC<Props> = (props) => {
    const { currencyFromId, currencyToId, conversionRate } = props;
    const isFetching = useStore(fetchCurrencyPairRatesFx.pending);

    const isLoading = isFetching || currencyToId === null || currencyFromId === null;

    return (
        <Paper
            title={
                isLoading ? 'Загрузка курсов...' : `Конверсия ${currencyFromId} в ${currencyToId}`
            }
        >
            <table className={styles.table}>
                <tbody>
                    {multipliers.map((multiplier) => (
                        <tr key={multiplier}>
                            <td className={styles.currencyFromCell}>
                                {isLoading ? (
                                    <Skeleton width={70} />
                                ) : (
                                    <>
                                        <span>{multiplier} </span>
                                        <strong>{currencyFromId}</strong>
                                    </>
                                )}
                            </td>

                            <td className={styles.currencyToCell}>
                                {isLoading ? (
                                    <Skeleton width={70} />
                                ) : (
                                    <>
                                        <span>{formatFloat(multiplier * conversionRate)} </span>
                                        <strong>{currencyToId}</strong>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Paper>
    );
};
