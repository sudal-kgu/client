import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import TrashResult from './pages/trashresult';

const ITEMS = [
    {
        id: 1,
        name: 'Clear PET Bottle',
        type: 'PLASTIC',
        img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20170310_116%2Fdameun2015_1489110502755e4vcC_JPEG%2F13454740554212189_-723787167.jpg&type=sc960_832',
    },
    {
        id: 2,
        name: 'Aluminum Can',
        type: 'METAL',
        img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20220318_255%2F1647565816861fUECG_JPEG%2F48701662564627048_1656266575.jpg&type=a340',
    },
    {
        id: 3,
        name: 'Cardboard Box',
        type: 'PAPER',
        img: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_8916534%2F89165343334.jpg&type=f372_372',
    },
];

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 60 * 1000,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" element={<TrashResult items={ITEMS} />} />
            </Routes>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
