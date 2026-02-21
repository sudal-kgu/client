import { useNavigate } from 'react-router-dom';

type TrashItem = {
    id: number;
    name: string;
    type: string;
    img: string;
};

const MOCK_ITEMS: TrashItem[] = [
    {
        id: 1,
        name: 'Clear PET Bottle',
        type: 'PLASTIC',
        img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20170310_116%2Fdameun2015_1489110502755e4vcC_JPEG%2F13454740554212189_-723787167.jpg&type=sc960_832',
    },
    {
        id: 2,
        name: 'Aluminum Can',
        type: 'METAL',
        img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20220318_255%2F1647565816861fUECG_JPEG%2F48701662564627048_1656266575.jpg&type=a340',
    },
    {
        id: 3,
        name: 'Cardboard Box',
        type: 'PAPER',
        img: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_8916534%2F89165343334.jpg&type=f372_372',
    },
];

function tagClass(type: string) {
    const t = type.toUpperCase();
    if (t === 'PLASTIC') return 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20';
    if (t === 'METAL') return 'text-sky-300 bg-sky-400/10 border-sky-400/20';
    if (t === 'PAPER') return 'text-amber-300 bg-amber-400/10 border-amber-400/20';
    return 'text-white/70 bg-white/5 border-white/10';
}

export default function TrashResult() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="mb-4 flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    aria-label="back"
                    className="h-[34px] w-[34px] place-items-center rounded-[10px] border border-white/10 bg-white/[0.06] text-[18px] text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
                >
                    ←
                </button>
                <div className="text-[14px] text-white/95">쓰레기 분류 결과</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {MOCK_ITEMS.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                            navigate(`/detail/${item.id}`);
                        }}
                        className="rounded-[16px] bg-[#1b2420] p-4 text-left transition-all duration-200 hover:bg-[#1f2a25] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 active:scale-[0.98] disabled:cursor-default disabled:opacity-90"
                    >
                        <div className="aspect-[16/10] overflow-hidden rounded-[14px] bg-white/5">
                            <img
                                src={item.img}
                                alt={item.name}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="mt-3">
                            <span className="inline-flex items-center rounded-full border bg-white/10 px-3 py-1 text-[11px] font-medium text-white/70">
                                {item.type}
                            </span>
                        </div>
                        <div className="mt-2 text-[14px] font-medium text-white/90">
                            {item.name}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
