import { createBrowserRouter } from 'react-router-dom';

import TrashCapture from './pages/TrashCapture';

export const router = createBrowserRouter([
    {
        path: '/capture',
        element: <TrashCapture />,
    },
]);
