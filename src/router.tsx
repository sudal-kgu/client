import { createBrowserRouter } from 'react-router-dom';

import TrashDetail from './pages/TrashDetail.tsx';
import TrashResult from './pages/TrashResult.tsx';

export const router = createBrowserRouter([
    { path: '/', element: <TrashResult /> },
    { path: '/result', element: <TrashResult /> },
    { path: '/detail/:id', element: <TrashDetail /> },
]);
