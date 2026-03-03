import { Navigate, createBrowserRouter } from 'react-router-dom';

import CameraPage from './pages/CameraPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/camera" replace />,
    },
    {
        path: '/camera',
        element: <CameraPage />,
        children: [{ path: 'select', element: null }],
    },
]);
