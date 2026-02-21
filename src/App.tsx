import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="min-h-screen bg-[#0e1412] text-white">
                <div className="mx-auto w-full max-w-5xl px-4 py-4">
                    <Outlet />
                </div>
            </div>
        </QueryClientProvider>
    );
}
