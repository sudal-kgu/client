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
        canvas.toBlob(captureCallback);
    };

    useEffect(() => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
        const videoRef = document.createElement('video');
        const onFullfiled = (stream: MediaStream) => {
            const canvas = canvasRef.current;
            if (canvas === null) return;
            const ctx = canvas.getContext('2d');
            if (ctx === null) return;
            videoRef.srcObject = stream;
            videoRef.play();

            const draw = () => {
                if (videoRef.readyState >= videoRef.HAVE_METADATA) {
                    canvas.width = canvas.offsetWidth;
                    canvas.height = canvas.offsetHeight;

                    const vW = videoRef.videoWidth;
                    const vH = videoRef.videoHeight;
                    const cW = canvas.width;
                    const cH = canvas.height;

                    const scale = Math.min(cW / vW, cH / vH);

                    const dW = vW * scale;
                    const dH = vH * scale;

                    const dx = (cW - dW) / 2;
                    const dy = (cH - dH) / 2;

                    ctx.clearRect(0, 0, cW, cH);
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(0, 0, cW, cH);
                    ctx.drawImage(videoRef, 0, 0, vW, vH, dx, dy, dW, dH);
                }
                requestAnimationFrame(draw);
            };
            draw();
        };
        const onRejected = (reason: string) => {
            const canvas = canvasRef.current;
            if (canvas === null) return;
            const ctx = canvas.getContext('2d');
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            if (ctx === null) return;
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            console.log(reason);
            setRejected(true);
        };

        navigator.mediaDevices
            .getUserMedia({
                video: { facingMode: FacingMode.ENVIRONMENT, width: 720, height: 1280 },
            })
            .then(onFullfiled, onRejected);
    }, []);

    return { canvasRef, rejected, onCapture };
};

export default useCamera;
