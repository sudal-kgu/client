import { useCallback, useEffect, useRef, useState } from 'react';

import { useMatch, useNavigate } from 'react-router-dom';

import { AnalyzingIndicator } from '../components/camera/AnalyzingIndicator';
import {
    CameraAccessOverlay,
    type CameraErrorCode,
    type CameraErrorState,
} from '../components/camera/CameraAccessOverlay';
import { CameraControls } from '../components/camera/CameraControls';
import { CameraHeader } from '../components/camera/CameraHeader';
import { TrashBasketBar } from '../components/camera/TrashBasketBar';
import TrashSelectModal from '../components/modals/TrashSelectModal';
import { useImageUpload } from '../hooks/useImageUpload';
import { captureFrame } from '../utils/camera/captureFrame';

const mapCameraError = (err: unknown): CameraErrorState => {
    const name =
        err instanceof DOMException ? err.name : err instanceof Error ? err.name : undefined;

    const make = (code: CameraErrorCode, title: string, description: string): CameraErrorState => ({
        code,
        title,
        description,
    });

    if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
        return make(
            'PERMISSION_DENIED',
            '카메라 권한이 필요해요',
            '카메라 접근이 차단되어 있어요. 카메라 권한을\n허용으로 바꾼 뒤 다시 시도해 주세요.',
        );
    }

    if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
        return make(
            'NO_DEVICE',
            '카메라를 찾을 수 없어요',
            '이 기기에서 사용할 수 있는 카메라가 없어요.\n기기 연결 상태를 확인해 주세요.',
        );
    }

    if (name === 'SecurityError') {
        return make(
            'SECURITY',
            '보안 문제로 카메라에\n접근할 수 없어요',
            '접속 경로를 확인해 주세요.',
        );
    }

    if (name === 'NotSupportedError') {
        return make(
            'NOT_SUPPORTED',
            '이 브라우저에서는\n카메라를 지원하지 않아요',
            '다른 브라우저에서 다시 시도해주세요.',
        );
    }

    if (name === 'NotReadableError' || name === 'TrackStartError') {
        return make(
            'DEVICE_IN_USE',
            '카메라를 사용할 수 없어요',
            '다른 앱에서 카메라를 사용 중입니다.\n카메라를 사용하는 앱을 종료한 뒤\n다시 시도해 주세요.',
        );
    }

    return make(
        'UNKNOWN',
        '카메라 실행 중 오류가 발생했어요',
        '카메라에 접근하는 과정에서 문제가 생겼어요.\n잠시 후 다시 시도해 주세요.',
    );
};

type FacingMode = 'user' | 'environment';

const CameraPage = () => {
    const navigate = useNavigate();
    const [detectedCount] = useState<number>(3);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const [cameraError, setCameraError] = useState<CameraErrorState | null>(null);
    const mountedRef = useRef(true);
    const startSeqRef = useRef(0);

    const [facingMode, setFacingMode] = useState<FacingMode>('environment');

    const [showSwitchButton, setShowSwitchButton] = useState(false);

    const isSelectModalRoute = useMatch('/camera/select');

    const [isCapturing, setIsCapturing] = useState(false);

    const [capturePreviewUrl, setCapturePreviewUrl] = useState<string | null>(null);
    const previewUrlRef = useRef<string | null>(null);

    const { mutateAsync: uploadImageMutate, isPending: isUploading } = useImageUpload();

    const stopCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    }, []);

    const updateShowSwitchButton = useCallback(async (currentSeq: number) => {
        if (!navigator.mediaDevices?.enumerateDevices) {
            setShowSwitchButton(false);
            return;
        }

        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoInputs = devices.filter((divice) => divice.kind === 'videoinput');

            if (!mountedRef.current || currentSeq !== startSeqRef.current) return;
            setShowSwitchButton(videoInputs.length > 1);
        } catch {
            if (!mountedRef.current || currentSeq !== startSeqRef.current) return;
            setShowSwitchButton(false);
        }
    }, []);

    const startCamera = useCallback(async () => {
        const seq = ++startSeqRef.current;
        setCameraError(null);
        stopCamera();
        try {
            if (!window.isSecureContext) {
                throw new DOMException('보안 문제로 카메라에 접근 불가', 'SecurityError');
            }
            if (!navigator.mediaDevices?.getUserMedia) {
                throw new DOMException('해당 브라우저에서 카메라 미지원', 'NotSupportedError');
            }

            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: { ideal: facingMode } },
                audio: false,
            });

            if (!mountedRef.current || seq !== startSeqRef.current) {
                stream.getTracks().forEach((t) => t.stop());
                return;
            }

            if (!videoRef.current) {
                stream.getTracks().forEach((t) => t.stop());
                return;
            }

            streamRef.current = stream;
            videoRef.current.srcObject = stream;
            await videoRef.current.play();

            await updateShowSwitchButton(seq);
        } catch (err) {
            if (!mountedRef.current || seq !== startSeqRef.current) return;
            stopCamera();
            setShowSwitchButton(false);
            setCameraError(mapCameraError(err));
        }
    }, [stopCamera, facingMode, updateShowSwitchButton]);

    const handleSwitchCamera = () => {
        setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
    };

    const handleCapture = useCallback(async () => {
        if (!videoRef.current || cameraError || isCapturing) return;

        try {
            setIsCapturing(true);

            const { file } = await captureFrame(videoRef.current, {
                mirror: facingMode === 'user',
                maxWidth: 1280,
                maxHeight: 1280,
            });

            stopCamera();

            const nextPreviewUrl = URL.createObjectURL(file);

            if (previewUrlRef.current) {
                URL.revokeObjectURL(previewUrlRef.current);
            }

            previewUrlRef.current = nextPreviewUrl;
            setCapturePreviewUrl(nextPreviewUrl);

            const requestId = await uploadImageMutate(file);
            console.log('서버 requestId 수신: ', requestId);
        } catch (error) {
            console.error('캡처 또는 업로드 실패', error);
        } finally {
            setIsCapturing(false);
        }
    }, [cameraError, facingMode, isCapturing, stopCamera, uploadImageMutate]);

    useEffect(() => {
        mountedRef.current = true;
        startCamera();

        return () => {
            mountedRef.current = false;
            stopCamera();
        };
    }, [startCamera, stopCamera]);

    useEffect(() => {
        return () => {
            if (previewUrlRef.current) {
                URL.revokeObjectURL(previewUrlRef.current);
                previewUrlRef.current = null;
            }
        };
    }, []);

    const showRetry =
        !!cameraError &&
        (cameraError.code === 'PERMISSION_DENIED' ||
            cameraError.code === 'DEVICE_IN_USE' ||
            cameraError.code === 'UNKNOWN');

    return (
        <div className="relative h-[100dvh] w-full overflow-hidden bg-[#102216]">
            <video
                ref={videoRef}
                className="absolute inset-0 z-0 h-full w-full object-cover"
                style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
                autoPlay
                muted
                playsInline
            />

            {capturePreviewUrl && (
                <div className="absolute inset-0 z-10">
                    <img
                        src={capturePreviewUrl}
                        alt="캡쳐 미리보기"
                        className="h-full w-full object-cover"
                    />
                </div>
            )}

            <div className="relative z-20 flex h-full flex-col p-4">
                <CameraHeader />

                <div className="flex flex-1 items-end justify-center pb-[16px]">
                    {isUploading && <AnalyzingIndicator />}
                </div>

                <div className="flex flex-col items-center gap-[32px] px-[8px] pb-[32px]">
                    <TrashBasketBar count={detectedCount} onClick={() => navigate('select')} />
                    <CameraControls
                        onCapture={handleCapture}
                        disabled={!!cameraError || isCapturing}
                        onSwitchCamera={showSwitchButton ? handleSwitchCamera : undefined}
                    />
                </div>
            </div>

            {cameraError && (
                <CameraAccessOverlay
                    error={cameraError}
                    onRetry={showRetry ? startCamera : undefined}
                    onBack={() => navigate(-1)}
                />
            )}

            <TrashSelectModal
                isOpen={!!isSelectModalRoute}
                onClose={() => navigate('/camera', { replace: true })}
                detectedCount={detectedCount}
            />
        </div>
    );
};

export default CameraPage;
