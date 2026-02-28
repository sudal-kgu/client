import { IconCameraSwitch } from '../icons/IconCameraSwitch';

type CameraControlProps = {
    onSwitchCamera?: () => void;
};

export const CameraControls = ({ onSwitchCamera }: CameraControlProps) => {
    return (
        <div className="flex w-full justify-center">
            <div className="relative h-[64px] w-[64px]">
                <button
                    type="button"
                    aria-label="사진 촬영"
                    className="h-[64px] w-[64px] rounded-full bg-white"
                ></button>

                {onSwitchCamera && (
                    <button
                        onClick={onSwitchCamera}
                        type="button"
                        aria-label="카메라 전환"
                        className="absolute left-full top-0 ml-[32px] flex h-[64px] w-[64px] items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-[24px]"
                    >
                        <IconCameraSwitch />
                    </button>
                )}
            </div>
        </div>
    );
};
