import React, { FC } from 'react';
import { useStore } from 'effector-react';

import { $app, setChartVisibility, setRatesVisibility } from '../../store/app';
import { Container } from '../Container/Container';

import { ReactComponent as ConvertLogo } from '../../assets/icons/money-exchange.svg';
import { ReactComponent as RatesLogo } from '../../assets/icons/table-rows.svg';
import { ReactComponent as ChartLogo } from '../../assets/icons/show-chart.svg';
import styles from './AppHeader.module.scss';

export const AppHeader: FC = () => {
    const { isChartVisible, isRatesVisible, isConverterVisible } = useStore($app);

    return (
        <div className={styles.root}>
            <header className={styles.header}>
                <Container className={styles.content}>
                    <h1 className={styles.title}>Конверт</h1>

                    <div className={styles.buttonGroup}>
                        {/* --- Show/hide converter form --- */}
                        <div className={styles.checkboxButton}>
                            <input
                                type="checkbox"
                                id="converter-visibility-checkbox"
                                checked={isConverterVisible}
                            />
                            <label htmlFor="converter-visibility-checkbox">
                                <ConvertLogo />
                            </label>
                        </div>

                        {/* --- Show/hide rates table --- */}
                        <div className={styles.checkboxButton}>
                            <input
                                type="checkbox"
                                id="tables-visibility-checkbox"
                                checked={isRatesVisible}
                                onChange={(e) => {
                                    setRatesVisibility(e.currentTarget.checked);
                                }}
                            />
                            <label htmlFor="tables-visibility-checkbox">
                                <RatesLogo />
                            </label>
                        </div>

                        {/* --- Show/hide chart --- */}
                        <div className={styles.checkboxButton}>
                            <input
                                type="checkbox"
                                id="chart-visibility-checkbox"
                                checked={isChartVisible}
                                onChange={(e) => {
                                    setChartVisibility(e.currentTarget.checked);
                                }}
                            />
                            <label htmlFor="chart-visibility-checkbox">
                                <ChartLogo />
                            </label>
                        </div>
                    </div>
                </Container>
            </header>
        </div>
    );
};
