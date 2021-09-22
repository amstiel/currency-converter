module.exports = {
    extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react',
    ],
    plugins: ['react', '@typescript-eslint', 'jest', 'prettier'],
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    rules: {
        'linebreak-style': 'off',
        // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',
        // prettier/prettier by default looks into .prettierrc and "merge" rules with eslint
        // however tabWidth is not working in this case, PhpStorm show errors, so we need to set it explicitly here
        // bug of PhpStorm, probably
        'prettier/prettier': [
            'error',
            {
                tabWidth: 4,
            },
        ],
        // we want Protocol namespace
        '@typescript-eslint/no-namespace': 'off',
        // we want to throw new ApiError
        '@typescript-eslint/no-throw-literal': 'off',
        'react/prop-types': 'off',
        'react/jsx-props-no-spreading': 'off',
    },
};
