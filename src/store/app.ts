import { createDomain } from 'effector';
import { persist } from 'effector-storage/local';

const appDomain = createDomain();

// this hook will persist every store, created in domain,
// in `localStorage`, using stores' names as keys
appDomain.onCreateStore((store) => persist({ store }));

export const clearSession = appDomain.createEvent();
export const setChartVisibility = appDomain.createEvent<boolean>();
export const setRatesVisibility = appDomain.createEvent<boolean>();

type AppState = {
    isConverterVisible: boolean;
    isRatesVisible: boolean;
    isChartVisible: boolean;
};

const appInitialState: AppState = {
    isConverterVisible: true,
    isRatesVisible: true,
    isChartVisible: true,
};

export const $app = appDomain
    .createStore<AppState>(appInitialState, { name: 'app' })
    .on(setChartVisibility, (state, isChartVisible) => ({
        ...state,
        isChartVisible,
    }))
    .on(setRatesVisibility, (state, isRatesVisible) => ({
        ...state,
        isRatesVisible,
    }))
    .reset(clearSession);
