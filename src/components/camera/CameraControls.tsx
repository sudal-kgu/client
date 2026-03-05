import { IconCameraSwitch } from '../icons/IconCameraSwitch';

type CameraControlsProps = {
    onCapture: () => void;
    disabled?: boolean;
    onSwitchCamera?: () => void;
};

export const CameraControls = ({
    onCapture,
    onSwitchCamera,
    disabled = false,
}: CameraControlsProps) => {
    return (
        <div className="flex w-full justify-center">
            <div className="relative h-[64px] w-[64px]">
                <button
                    type="button"
                    onClick={onCapture}
                    disabled={disabled}
                    aria-label="사진 촬영"
                    className="h-[64px] w-[64px] rounded-full bg-white transition-transform duration-150 active:scale-[0.98] disabled:opacity-50"
                ></button>

                {onSwitchCamera && (
                    <button
                        onClick={onSwitchCamera}
                        disabled={disabled}
                        type="button"
                        aria-label="카메라 전환"
                        className="absolute left-full top-0 ml-[32px] flex h-[64px] w-[64px] items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-[24px] disabled:opacity-50"
                    >
                        <IconCameraSwitch />
                    </button>
                )}
            </div>
        </div>
    );
};
