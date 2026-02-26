import { IconLoadingIndicator } from '../icons/IconLoadingIndicator';

export const AnalyzingIndicator = () => {
    return (
        <div className="flex items-center gap-2">
            <IconLoadingIndicator />
            <span className="text-[13px] font-medium leading-[19.5px] tracking-[-0.32px] text-white">
                쓰레기 분석 중...
            </span>
        </div>
    );
};
