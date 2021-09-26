import React, { FC } from 'react';

import styles from './AppHeader.module.scss';

export const AppHeader: FC = () => (
    <div className={styles.root}>
        <header>Converter App</header>
    </div>
);
