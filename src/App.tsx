import React, { FC } from 'react';
import { useStore } from 'effector-react';

import { $currentInvertedPairRates, $currentPairRates, $rates } from './store/rates';
import { ConverterForm } from './components/ConverterForm/ConverterForm';
import { AppHeader } from './components/AppHeader/AppHeader';
import { Container } from './components/Container/Container';
import { RatesList } from './components/RatesList/RatesList';

import styles from './App.module.scss';

export const App: FC = () => {
    const { currentFromId, currentToId } = useStore($rates);
    const currentPairRates = useStore($currentPairRates);
    const currentInvertedPairRates = useStore($currentInvertedPairRates);

    return (
        <main className="App">
            <AppHeader />

            <Container>
                <ConverterForm />
            </Container>

            <Container>
                <div className={styles.ratesListGrid}>
                    <RatesList
                        currencyFromId={currentFromId}
                        currencyToId={currentToId}
                        conversionRate={currentPairRates}
                    />

                    <RatesList
                        currencyFromId={currentToId}
                        currencyToId={currentFromId}
                        conversionRate={currentInvertedPairRates}
                    />
                </div>
            </Container>
        </main>
    );
};
