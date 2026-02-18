import { IconCameraExchange } from '../icons/IconCameraExchange';

export const CameraControls = () => {
    return (
        <div className="relative flex items-center justify-center gap-[32px]">
            <button type="button" className="invisible h-[64px] w-[64px]" aria-hidden="true" />
            <button
                type="button"
                aria-label="사진 촬영"
                className="h-[64px] w-[64px] rounded-full bg-white"
            ></button>
            <button
                type="button"
                aria-label="카메라 전환"
                className="flex h-[64px] w-[64px] items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-[24px]"
            >
                <IconCameraExchange />
            </button>
        </div>
    );
};
