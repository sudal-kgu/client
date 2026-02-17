import { Navigate, createBrowserRouter } from 'react-router-dom';

import CameraPage from './pages/CameraPage';
import TrashSelectModalRoute from './pages/TrashSelectModalRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/camera" replace />,
    },
    {
        path: '/camera',
        element: <CameraPage />,
        children: [{ path: 'select', element: <TrashSelectModalRoute /> }],
    },
]);
