import React, { FC } from 'react';
import styles from './Skeleton.module.scss';

type Props = {
    width?: number | string;
};

export const Skeleton: FC<Props> = ({ width }) => <div className={styles.root} style={{ width }} />;
