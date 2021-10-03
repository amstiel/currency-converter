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
import { $currentPairRates, $rates } from '../../store/rates';
import { prettifyApiDate } from '../../utils/date';

export const Chart: FC = () => {
    const { currentFromId, currentToId } = useStore($rates);
    const rates = useStore($currentPairRates) ?? [];

    const mappedRates = Object.entries(rates).map((conversionRateTuple) => ({
        date: prettifyApiDate(conversionRateTuple[0] as ApiDate),
        rate: conversionRateTuple[1],
    }));

    return (
        <Paper title={`График курса ${currentFromId} к ${currentToId}`}>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <LineChart
                        data={mappedRates}
                        margin={{
                            top: 5,
                            right: 25,
                            left: -30,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis
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
            </div>
        </Paper>
    );
};
