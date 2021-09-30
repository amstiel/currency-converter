import React, { FC } from 'react';
import clsx from 'clsx';

import styles from './Paper.module.scss';

type Props = {
    className?: string;
};

export const Paper: FC<Props> = (props) => {
    const { children, className } = props;

    return <section className={clsx(styles.root, className)}>{children}</section>;
};
