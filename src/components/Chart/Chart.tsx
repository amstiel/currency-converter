import React, { FC } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { useStore } from 'effector-react';
import { Paper } from '../Paper/Paper';
import { $currentPairRates, $rates, fetchCurrencyPairRatesFx } from '../../store/rates';
import { prettifyApiDate } from '../../utils/date';
import { Loader } from '../Loader/Loader';

import styles from './Chart.module.scss';

export const Chart: FC = () => {
    const { currentFromId, currentToId } = useStore($rates);
    const rates = useStore($currentPairRates) ?? [];
    const isFetching = useStore(fetchCurrencyPairRatesFx.pending);

    const isLoading = isFetching || currentToId === null || currentFromId === null;

    const mappedRates = Object.entries(rates).map((conversionRateTuple) => ({
        date: prettifyApiDate(conversionRateTuple[0] as ApiDate),
        rate: conversionRateTuple[1],
    }));

    return (
        <Paper
            title={
                isLoading ? 'Загрузка графика...' : `График курса ${currentFromId} к ${currentToId}`
            }
        >
            <div className={styles.chartContainer}>
                {isLoading ? (
                    <div className={styles.loaderWrapper}>
                        <Loader />
                    </div>
                ) : (
                    <ResponsiveContainer>
                        <LineChart
                            data={mappedRates}
                            margin={{
                                top: 4,
                                right: 24,
                                left: 24,
                                bottom: 4,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis
                                hide
                                allowDecimals={false}
                                domain={['dataMin - 0.25', 'dataMax + 0.25']}
                            />
                            <Tooltip />
                            <Legend />
                            <Line
                                name={`Курс за 1 ${currentFromId}`}
                                type="monotone"
                                dataKey="rate"
                                stroke="#185adb"
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </Paper>
    );
};
