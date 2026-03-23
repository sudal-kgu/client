import 'styled-components';

interface Theme {
    colors: {
        primary700: string;
        primary600: string;
        primary500: string;
        primary400: string;
        white: string;
    };
}

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}
