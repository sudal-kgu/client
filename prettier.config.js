export default {
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 100,
    tabWidth: 4,
    arrowParens: 'always',
    plugins: ['@trivago/prettier-plugin-sort-imports'],
    importOrder: ['^react$', '<THIRD_PARTY_MODULES>', '^@/(.*)$', '^[./]'],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    endOfLine: 'lf',
};
