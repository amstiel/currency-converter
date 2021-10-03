import React, { FC } from 'react';
import { useStore } from 'effector-react';

import { $app, setChartVisibility, setRatesVisibility } from '../../store/app';
import { Container } from '../Container/Container';

import styles from './AppHeader.module.scss';

export const AppHeader: FC = () => {
    const { isChartVisible, isRatesVisible, isConverterVisible } = useStore($app);

    return (
        <div className={styles.root}>
            <header>
                <Container>Converter App</Container>
                <div>
                    <div>
                        <input
                            type="checkbox"
                            id="converter-visibility-checkbox"
                            checked={isConverterVisible}
                        />
                        <label htmlFor="converter-visibility-checkbox">Конвертер</label>
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            id="tables-visibility-checkbox"
                            checked={isRatesVisible}
                            onChange={(e) => {
                                setRatesVisibility(e.currentTarget.checked);
                            }}
                        />
                        <label htmlFor="tables-visibility-checkbox">Курс</label>
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            id="chart-visibility-checkbox"
                            checked={isChartVisible}
                            onChange={(e) => {
                                setChartVisibility(e.currentTarget.checked);
                            }}
                        />
                        <label htmlFor="chart-visibility-checkbox">График</label>
                    </div>
                </div>
            </header>
        </div>
    );
};
