import { createBrowserRouter } from 'react-router-dom';

import Basket from './components/camera/Basket';
import RootLayout from './components/layout/RootLayout';
import Checklist from './pages/Checklist';
import Game from './pages/Game';
import KakaoRedirect from './pages/KakaoRedirect';
import Login from './pages/Login';
import PointShop from './pages/PointShop';
import Quiz from './pages/Quiz';
import QuizResult from './pages/QuizResult';
import TrashAnalysisResult from './pages/TrashAnalysisResult';
import TrashCamera from './pages/TrashCamera';
import TrashDetail from './pages/TrashDetail';

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
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
                path: '/analysis/:analysisId/trashes/:trashId/checklist',
                element: <Checklist />,
            },
            {
                path: '/analysis/:analysisId/trashes/:trashId/quiz',
                element: <Quiz />,
            },
            {
                path: '/analysis/:analysisId/trashes/:trashId/quiz/result',
                element: <QuizResult />,
            },
            {
                path: '/point-shop',
                element: <PointShop />,
            },
        ],
    },
]);
