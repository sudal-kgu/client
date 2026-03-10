import { IconWarning } from '../icons/IconWarning';

type ErrorToastProps = {
    message: string;
};

export const ErrorToast = ({ message }: ErrorToastProps) => {
    return (
        <div className="flex items-center gap-1 rounded-[16px] border border-white/10 bg-black/40 px-4 py-2">
            <IconWarning className="h-[18px] w-[21px]" />
            <span className="text-[13px] leading-[19.5px] tracking-[-0.32px] text-white">
                {message}
            </span>
        </div>
    );
};
