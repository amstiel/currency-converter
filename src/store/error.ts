import { createDomain } from 'effector';

const errorDomain = createDomain();

export const setErrorCaption = errorDomain.createEvent<string>();
export const setErrorVisibility = errorDomain.createEvent<boolean>();

type ErrorState = {
    isVisible: boolean;
    caption: string | null;
};

const errorInitialState: ErrorState = {
    isVisible: false,
    caption: null,
};

export const $error = errorDomain
    .createStore(errorInitialState)
    .on(setErrorCaption, (state, caption) => ({
        ...state,
        isVisible: true,
        caption,
    }))
    .on(setErrorVisibility, (state, isVisible) => ({
        ...state,
        isVisible,
    }));
