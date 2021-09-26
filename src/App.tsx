import React, { FC } from 'react';
import { ConverterForm } from './components/ConverterForm/ConverterForm';
import { AppHeader } from './components/AppHeader/AppHeader';
import { Container } from './components/Container/Container';

export const App: FC = () => (
    <main className="App">
        <AppHeader />

        <Container>
            <ConverterForm />
        </Container>
    </main>
);
