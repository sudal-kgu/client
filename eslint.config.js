import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default [
    { ignores: ['dist'] },
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        languageOptions: {
            parser: tseslint.parser,
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2020,
            },
        },
        rules: {
            'no-undef': 'error',
            'no-const-assign': 'error',
            'no-duplicate-case': 'error',
            'no-unused-vars': 'off',
            'no-debugger': 'warn',

            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-non-null-assertion': 'off',

            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

            'no-console': 'off',
        },
    },
    prettier,
];
