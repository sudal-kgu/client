import { IconClose } from '../icons/IconClose';
import { IconFlash } from '../icons/IconFlash';

const iconBtn = 'flex h-[48px] w-[48px] items-center justify-center rounded-full bg-black/30';

export const CameraHeader = () => {
    return (
        <div className="flex items-center justify-between">
            <button type="button" aria-label="닫기" className={iconBtn}>
                <IconClose />
            </button>
            <button type="button" aria-label="플래시" className={iconBtn}>
                <IconFlash />
            </button>
        </div>
    );
};
