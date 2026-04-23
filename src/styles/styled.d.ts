import 'styled-components';

interface Theme {
    colors: {
        primary800: string;
        primary700: string;
        primary500: string;
        primary400: string;
        primary400_op_70: string;
        primary300: string;
        primary200: string;
        primary200_op_70: string;
        primary100: string;
        black: string;
        black_op_70: string;
        background: string;
        white: string;
        badge: string;
        error_op_10: string;
    };
    shadows: {
        default: string;
    };
}

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}
