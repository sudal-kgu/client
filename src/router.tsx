import { Outlet, createBrowserRouter } from 'react-router-dom';

import Basket from './components/camera/Basket';
<<<<<<< HEAD
import MeProvider from './components/provider/MeProvider';
import KakaoRedirect from './pages/KakaoRedirect';
import Login from './pages/Login';
=======
import Quiz from './pages/Quiz';
>>>>>>> d02a5ee (feat: 분리배출 퀴즈 페이지 UI 구현)
import TrashAnalysisResult from './pages/TrashAnalysisResult';
import TrashCamera from './pages/TrashCamera';
import TrashDetail from './pages/TrashDetail';

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
        ],
    },
<<<<<<< HEAD
=======
    {
        path: '/analysis/:id',
        element: <TrashAnalysisResult />,
    },
    {
        path: '/analysis/:analysisId/trashes/:trashId',
        element: <TrashDetail />,
    },
    {
        path: '/quiz',
        element: <Quiz />,
    },
>>>>>>> d02a5ee (feat: 분리배출 퀴즈 페이지 UI 구현)
]);
