import 'styled-components';

interface Theme {
    colors: {
        primary800: string;
        primary700: string;
        primary600: string;
        primary500: string;
        primary400: string;
        gray400: string;
        gray200: string;
        white: string;
        badge: string;
        backdrop: string;
    };
}

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}
