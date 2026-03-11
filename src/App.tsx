import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Modal from 'react-modal';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';

Modal.setAppElement('#root');

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 60 * 1000,
        },
    },
});

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="min-h-screen bg-[#0e1412] text-white">
                <div className="mx-auto w-full max-w-[420px] px-6 py-6">
                    <RouterProvider router={router} />
                </div>
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
