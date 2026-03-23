import { createBrowserRouter } from 'react-router-dom';

import Basket from './components/camera/Basket';
import TrashAnalysisResult from './pages/TrashAnalysisResult';
import TrashCamera from './pages/TrashCamera';

export const router = createBrowserRouter([
    {
        path: '/camera',
        element: <TrashCamera />,
        children: [
            {
                path: 'basket',
                element: <Basket />,
            },
        ],
    },
    {
        path: '/analysis/:id',
        element: <TrashAnalysisResult />,
    },
]);
