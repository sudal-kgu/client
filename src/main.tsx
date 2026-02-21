import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import './index.css';
import TrashDetail from './pages/TrashDetail.tsx';
import TrashResult from './pages/TrashResult.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <TrashResult /> },
            { path: 'result', element: <TrashResult /> },
            { path: 'detail/:id', element: <TrashDetail /> },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
