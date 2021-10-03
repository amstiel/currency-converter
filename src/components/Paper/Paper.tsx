import React, { FC } from 'react';
import clsx from 'clsx';

import styles from './Paper.module.scss';

type Props = {
    title?: string;
    className?: string;
};

export const Paper: FC<Props> = (props) => {
    const { children, title, className } = props;
    const hasTitle = title !== undefined;

    return (
        <section className={clsx(styles.root, !hasTitle && styles.rootWithoutHeader, className)}>
            {hasTitle && (
                <header className={styles.header}>
                    <h3 className={styles.title}>{title}</h3>
                </header>
            )}
            <div className={styles.content}>{children}</div>
        </section>
    );
};
