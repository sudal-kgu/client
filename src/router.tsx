import { Outlet, createBrowserRouter } from 'react-router-dom';

import Basket from './components/camera/Basket';
import MeProvider from './components/provider/MeProvider';
import Checklist from './pages/Checklist';
import Game from './pages/Game';
import KakaoRedirect from './pages/KakaoRedirect';
import Login from './pages/Login';
import PointShop from './pages/PointShop';
import TrashAnalysisResult from './pages/TrashAnalysisResult';
import TrashCamera from './pages/TrashCamera';
import TrashDetail from './pages/TrashDetail';

export const router = createBrowserRouter([
    {
        element: <Outlet />,
        children: [
            {
                path: '/',
                element: <Game />,
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
                path: '/checklist/:analysisId/:trashId',
                element: <Checklist />,
            },
            {
                path: '/game',
                element: <Game />,
            },
            {
                path: '/point-shop',
                element: <PointShop />,
            },
        ],
    },
]);
