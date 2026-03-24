import { useEffect, useRef, useState } from 'react';

const FacingMode = {
    USER: 'user',
    ENVIRONMENT: 'environment',
} as const;

const useCamera = (captureCallback: (blob: Blob | null) => Promise<void>) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [rejected, setRejected] = useState(false);
    const [loading, setLoading] = useState(false);

    const onCapture = () => {
        const canvas = canvasRef.current;
        if (!canvas || rejected || loading) return;
        setLoading(true);
        setTimeout(() => setLoading(false), 300);
        canvas.toBlob(captureCallback, 'image/jpeg', 0.95);
    };

    useEffect(() => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
        
        let animationFrameId: number;
        let videoStream: MediaStream | null = null;
        const videoRef = document.createElement('video');
        videoRef.setAttribute('playsinline', 'true'); 

        const onFullfiled = (stream: MediaStream) => {
            videoStream = stream;
            const canvas = canvasRef.current;
            if (canvas === null) return;
            const ctx = canvas.getContext('2d', { alpha: false });
            if (ctx === null) return;
            
            videoRef.srcObject = stream;
            videoRef.play();

            const draw = () => {
                if (videoRef.readyState >= videoRef.HAVE_METADATA) {
                    const displayW = canvas.clientWidth;
                    const displayH = canvas.clientHeight;
                    
                    if (displayW === 0 || displayH === 0) {
                        animationFrameId = requestAnimationFrame(draw);
                        return;
                    }

                    const dpr = window.devicePixelRatio || 1;
                    const canvasW = displayW * dpr;
                    const canvasH = displayH * dpr;

                    if (canvas.width !== canvasW || canvas.height !== canvasH) {
                        canvas.width = canvasW;
                        canvas.height = canvasH;
                    }

                    const vW = videoRef.videoWidth;
                    const vH = videoRef.videoHeight;
                    
                    const vRatio = vW / vH;
                    const cRatio = canvasW / canvasH;

                    let sX, sY, sW, sH;

                    if (vRatio > cRatio) {
                        sH = vH;
                        sW = vH * cRatio;
                        sX = (vW - sW) / 2;
                        sY = 0;
                    } 
                    else {
                        sW = vW;
                        sH = vW / cRatio;
                        sX = 0;
                        sY = (vH - sH) / 2;
                    }

                    ctx.drawImage(
                        videoRef, 
                        sX, sY, sW, sH,
                        0, 0, canvasW, canvasH
                    );
                }
                animationFrameId = requestAnimationFrame(draw);
            };
            draw();
        };

        const onRejected = (reason: any) => {
            console.error('Camera access rejected:', reason);
            setRejected(true);
        };

        navigator.mediaDevices
            .getUserMedia({
                video: { 
                    facingMode: FacingMode.ENVIRONMENT,
                    width: { ideal: 1920 },
                    height: { ideal: 1080 },
                },
            })
            .then(onFullfiled, onRejected);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            if (videoStream) {
                videoStream.getTracks().forEach(track => track.stop());
            }
            videoRef.pause();
            videoRef.srcObject = null;
        };
    }, []);

    return { canvasRef, rejected, onCapture };
};

export default useCamera;