import { IconTrashBasket } from '../icons/IconTrashBasket';

type TrashBasketBarProps = {
    count: number;
    onClick: () => void;
};

export const TrashBasketBar = ({ count, onClick }: TrashBasketBarProps) => {
    return (
        <button
            onClick={onClick}
            className="mx-auto flex h-[64px] w-full items-center gap-[16px] rounded-[16px] border border-white/10 bg-black/40 px-[16px] backdrop-blur-[40px] transition-transform duration-150 active:scale-[0.98]"
        >
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[12px] bg-[#13EC5B]/20">
                <IconTrashBasket />
            </div>
            <span className="flex-1 text-left text-[14px] font-bold leading-[18px] tracking-[-0.35px] text-white">
                쓰레기 바구니
            </span>
            <span className="text-[20px] font-bold leading-[28px] text-[#13EC5B]">{count}</span>
        </button>
    );
};
