import React, { FC } from 'react';
import { useStore } from 'effector-react';

import { $app, setChartVisibility, setRatesVisibility } from '../../store/app';
import { $error, setErrorVisibility } from '../../store/error';
import { Container } from '../Container/Container';

import { ReactComponent as ConvertIcon } from '../../assets/icons/money-exchange.svg';
import { ReactComponent as RatesIcon } from '../../assets/icons/table-rows.svg';
import { ReactComponent as ChartIcon } from '../../assets/icons/show-chart.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import styles from './AppHeader.module.scss';

export const AppHeader: FC = () => {
    const { isChartVisible, isRatesVisible, isConverterVisible } = useStore($app);
    const { caption: errorCaption, isVisible: isErrorVisible } = useStore($error);

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
                                onChange={() => {}}
                            />
                            <label htmlFor="converter-visibility-checkbox">
                                <ConvertIcon />
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
                                <RatesIcon />
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
                                <ChartIcon />
                            </label>
                        </div>
                    </div>
                </Container>
            </header>

            {isErrorVisible && (
                <div className={styles.error}>
                    <div>
                        <p>{errorCaption}</p>
                        <p>
                            Проверьте статус Free API:{' '}
                            <a
                                href="https://www.currencyconverterapi.com/server-status"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                https://www.currencyconverterapi.com/server-status
                            </a>
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setErrorVisibility(false);
                        }}
                    >
                        <CloseIcon />
                    </button>
                </div>
            )}
        </div>
    );
};
