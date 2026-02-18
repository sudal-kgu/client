import { Outlet, useNavigate } from 'react-router-dom';

import cameraImg from '../assets/bottle.jpg';
import { AnalyzingIndicator } from '../components/camera/AnalyzingIndicator';
import { CameraControls } from '../components/camera/CameraControls';
import { CameraHeader } from '../components/camera/CameraHeader';
import { TrashBasketBar } from '../components/camera/TrashBasketBar';

const CameraPage = () => {
    const navigate = useNavigate();
    return (
        <div className="relative h-[100dvh] w-full overflow-hidden bg-[#102216]">
            <img
                src={cameraImg}
                alt="Camera Preview"
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col p-4">
                <CameraHeader />

                <div className="flex flex-1 items-end justify-center pb-[16px]">
                    <AnalyzingIndicator />
                </div>

                <div className="flex flex-col items-center gap-[32px] px-[8px] pb-[32px]">
                    <TrashBasketBar count={3} onClick={() => navigate('select')} />
                    <CameraControls />
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default CameraPage;
