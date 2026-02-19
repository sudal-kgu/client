import { useState } from 'react';
import { useCallback, useEffect, useRef } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import { AnalyzingIndicator } from '../components/camera/AnalyzingIndicator';
import { CameraControls } from '../components/camera/CameraControls';
import { CameraHeader } from '../components/camera/CameraHeader';
import { TrashBasketBar } from '../components/camera/TrashBasketBar';

const CameraPage = () => {
    const navigate = useNavigate();
    const [detectedCount, setDetectedCount] = useState<number>(3);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const stopCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current?.getTracks().forEach((t) => t.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    }, []);

    const startCamera = useCallback(async () => {
        stopCamera();

        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
            audio: false,
        });

        if (!videoRef.current) {
            stream.getTracks().forEach((t) => t.stop());
            return;
        }

        streamRef.current = stream;
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
    }, [stopCamera]);

    useEffect(() => {
        startCamera();
        return () => stopCamera();
    }, [startCamera, stopCamera]);

    return (
        <div className="relative h-[100dvh] w-full overflow-hidden bg-[#102216]">
            <video
                ref={videoRef}
                className="absolute inset-0 z-0 h-full w-full object-cover"
                autoPlay
                muted
                playsInline
            />
            <div className="relative z-10 flex h-full flex-col p-4">
                <CameraHeader />

                <div className="flex flex-1 items-end justify-center pb-[16px]">
                    <AnalyzingIndicator />
                </div>

                <div className="flex flex-col items-center gap-[32px] px-[8px] pb-[32px]">
                    <TrashBasketBar count={detectedCount} onClick={() => navigate('select')} />
                    <CameraControls />
                </div>
            </div>
            <Outlet context={{ detectedCount, setDetectedCount }} />
        </div>
    );
};

export default CameraPage;
