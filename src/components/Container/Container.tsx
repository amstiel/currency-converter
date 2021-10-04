import React, { FC } from 'react';
import clsx from 'clsx';

import styles from './Container.module.scss';

type Props = {
    className?: string;
};

export const Container: FC<Props> = ({ children, className }) => (
    <section className={clsx(styles.root, className)}>{children}</section>
);
