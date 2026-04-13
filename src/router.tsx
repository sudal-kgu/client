import { Outlet, createBrowserRouter } from 'react-router-dom';

import Basket from './components/camera/Basket';
import MeProvider from './components/provider/MeProvider';
import KakaoRedirect from './pages/KakaoRedirect';
import Login from './pages/Login';
import TrashAnalysisResult from './pages/TrashAnalysisResult';
import TrashCamera from './pages/TrashCamera';
import TrashDetail from './pages/TrashDetail';
import Checklist from './pages/Checklist';

export const router = createBrowserRouter([
    {
        element: (
            <MeProvider>
                <Outlet />
            </MeProvider>
        ),
        children: [
            {
                path: '/',
                element: <></>,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/kakao/redirect',
                element: <KakaoRedirect />,
            },
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
            {
                path: '/analysis/:analysisId/trashes/:trashId',
                element: <TrashDetail />,
            },
            {
                path: '/checklist/:trashId',
                element: <Checklist />,
            },
        ],
    },
]);
