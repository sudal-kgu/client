import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { router } from './router';
import theme from './styles/theme';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            staleTime: 60 * 1000,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
