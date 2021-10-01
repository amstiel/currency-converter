import React, { FC } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useStore } from 'effector-react';
import { Paper } from '../Paper/Paper';
import { $currentPairRates } from '../../store/rates';
import { prettifyApiDate } from '../../utils/date';

export const Chart: FC = () => {
    const rates = useStore($currentPairRates) ?? [];
    const mappedRates = Object.entries(rates).map((conversionRateTuple) => ({
        date: prettifyApiDate(conversionRateTuple[0] as ApiDate),
        rate: conversionRateTuple[1],
    }));

    console.log(mappedRates);

    return (
        <Paper>
            <LineChart
                width={500}
                height={300}
                data={mappedRates}
                margin={{
                    top: 5,
                    right: 25,
                    left: 0,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} domain={['dataMin - 0.25', 'dataMax + 0.25']} />
                <Tooltip />
                <Legend />
                <Line
                    name="Курс за 1"
                    type="monotone"
                    dataKey="rate"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </Paper>
    );
};
