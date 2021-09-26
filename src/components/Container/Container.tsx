import React, { FC } from 'react';
import styles from './Container.module.scss';

export const Container: FC = ({ children }) => (
    <section className={styles.root}>{children}</section>
);
