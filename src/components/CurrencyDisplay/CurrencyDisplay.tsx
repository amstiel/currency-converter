import React, { FC } from 'react';
import { useStore } from 'effector-react';
import { Skeleton } from '../Skeleton/Skeleton';
import { formatFloat } from '../../utils/strings';
import { $rates, fetchCurrencyPairRatesFx } from '../../store/rates';

import styles from './CurrencyDisplay.module.scss';

type Props = {
    value: number;
    currentPairRates: number;
};

export const CurrencyDisplay: FC<Props> = (props) => {
    const { value, currentPairRates } = props;
    const { currentFromId, currentToId } = useStore($rates);
    const isFetching = useStore(fetchCurrencyPairRatesFx.pending);

    return (
        <div className={styles.root}>
            <div className={styles.amount}>
                {isFetching ? (
                    <Skeleton width={100} />
                ) : (
                    <span>
                        {value}&nbsp;<strong>{currentFromId}</strong> =
                    </span>
                )}
            </div>

            <div className={styles.convertedAmount}>
                {isFetching ? (
                    <Skeleton width={150} />
                ) : (
                    <span>
                        {formatFloat(Number(value) * currentPairRates)}
                        &nbsp;<strong>{currentToId}</strong>
                    </span>
                )}
            </div>

            <div className={styles.perOneDisplay}>
                {isFetching ? (
                    <Skeleton width={120} />
                ) : (
                    <span>
                        1&nbsp;<strong>{currentFromId}</strong> = {formatFloat(currentPairRates)}
                        &nbsp;
                        <strong>{currentToId}</strong>
                    </span>
                )}
            </div>
        </div>
    );
};
