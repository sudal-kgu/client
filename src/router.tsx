import { Navigate, createBrowserRouter } from 'react-router-dom';

import App from './App';
import TrashDetail from './pages/TrashDetail.tsx';
import TrashResult from './pages/TrashResult.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Navigate to="/result" replace /> },
            { path: 'result', element: <TrashResult /> },
            { path: 'detail/:id', element: <TrashDetail /> },
        ],
    },
]);
