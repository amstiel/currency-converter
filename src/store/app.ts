import { createDomain } from 'effector';

const appDomain = createDomain();

type AppState = {
    visibleSections: {
        converter: boolean;
        rates: boolean;
        chart: boolean;
    };
};

const appInitialState: AppState = {
    visibleSections: {
        converter: true,
        rates: true,
        chart: true,
    },
};

export const $app = appDomain.createStore(appInitialState);
