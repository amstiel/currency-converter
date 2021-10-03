import React, { FC } from 'react';
import { useStore } from 'effector-react';

import { $app } from './store/app';
import { $currentInvertedPairTodayRate, $currentPairTodayRate, $rates } from './store/rates';
import { ConverterForm } from './components/ConverterForm/ConverterForm';
import { AppHeader } from './components/AppHeader/AppHeader';
import { Container } from './components/Container/Container';
import { RatesList } from './components/RatesList/RatesList';
import { Chart } from './components/Chart/Chart';

import styles from './App.module.scss';

export const App: FC = () => {
    const { isRatesVisible, isChartVisible, isConverterVisible } = useStore($app);
    const { currentFromId, currentToId } = useStore($rates);
    const currentPairRates = useStore($currentPairTodayRate);
    const currentInvertedPairRates = useStore($currentInvertedPairTodayRate);

    return (
        <main className="App">
            <AppHeader />

            {isConverterVisible && (
                <Container>
                    <ConverterForm />
                </Container>
            )}

            {isRatesVisible && (
                <Container>
                    <div className={styles.ratesListGrid}>
                        <RatesList
                            currencyFromId={currentFromId}
                            currencyToId={currentToId}
                            conversionRate={currentPairRates ?? 0}
                        />

                        <RatesList
                            currencyFromId={currentToId}
                            currencyToId={currentFromId}
                            conversionRate={currentInvertedPairRates ?? 0}
                        />
                    </div>
                </Container>
            )}

            {isChartVisible && (
                <Container>
                    <Chart />
                </Container>
            )}
        </main>
    );
};
