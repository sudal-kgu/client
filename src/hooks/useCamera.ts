import { useEffect, useRef, useState } from 'react';

const FacingMode = {
    USER: 'user',
    ENVIRONMENT: 'environment',
} as const;

const useCamera = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [rejected, setRejected] = useState(false);

    const onCapture = () => {
        const canvas = canvasRef.current;
        if (!canvas || rejected) return;
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

                    const sW = videoRef.videoWidth;
                    const sH = videoRef.videoWidth * (canvas.height / canvas.width);

                    const sx = 0;
                    const sy = (videoRef.videoHeight - sH) / 2;

                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(videoRef, sx, sy, sW, sH, 0, 0, canvas.width, canvas.height);
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
