import { createBrowserRouter } from 'react-router-dom';

import Basket from './components/camera/Basket';
import TrashCapture from './pages/TrashCapture';

export const router = createBrowserRouter([
    {
        path: '/capture',
        element: <TrashCapture />,
        children: [
            {
                path: 'basket',
                element: <Basket />,
            },
        ],
    },
]);
