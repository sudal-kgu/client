import { IconWarning } from '../icons/IconWarning';

export type CameraErrorCode =
    | 'PERMISSION_DENIED'
    | 'NOT_SUPPORTED'
    | 'NO_DEVICE'
    | 'SECURITY'
    | 'DEVICE_IN_USE'
    | 'UNKNOWN';

export type CameraErrorState = {
    code: CameraErrorCode;
    title: string;
    description: string;
};

type CameraErrorProps = {
    error: CameraErrorState;
    onRetry?: () => void;
    onBack?: () => void;
};

export const CameraAccessOverlay = (props: CameraErrorProps) => {
    const { error, onRetry, onBack } = props;
    return (
        <div
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-[36px]"
            role="dialog"
            aria-modal="true"
            aria-label="카메라 접근 안내"
        >
            <div className="flex h-[340px] w-[320px] flex-col items-center gap-[16px] rounded-[16px] border border-white/10 bg-[#1A2A21] p-[24px] text-white">
                <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#F97316]/10">
                    <IconWarning />
                </div>
                <div className="whitespace-pre-line text-center text-[18px] leading-[24px] text-white">
                    {error.title}
                </div>
                <p className="whitespace-pre-line text-center text-[14px] leading-[20px] text-[#9CA3AF]">
                    {error.description}
                </p>
                <div className="mx-auto mt-[8px] flex w-full flex-1 flex-col justify-center gap-[12px]">
                    {onRetry && (
                        <button
                            type="button"
                            onClick={onRetry}
                            className="rounded-[12px] bg-[#13EC5B] py-[14px] text-[14px] leading-[20px] text-black"
                        >
                            다시 시도
                        </button>
                    )}

                    {onBack && (
                        <button
                            type="button"
                            onClick={onBack}
                            className="rounded-[12px] border border-white/10 bg-white/5 py-[14px] text-[14px] leading-[20px] text-white"
                        >
                            나가기
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
