import React, { FC } from 'react';
import { Container } from '../Container/Container';

import styles from './AppHeader.module.scss';

export const AppHeader: FC = () => (
    <div className={styles.root}>
        <header>
            <Container>Converter App</Container>
        </header>
    </div>
);
