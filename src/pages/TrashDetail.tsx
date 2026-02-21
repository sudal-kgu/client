import { useNavigate, useParams } from 'react-router-dom';

type Step = {
    title: string;
    desc: string;
};

type DetailItem = {
    id: number;
    name: string;
    type: string;
    img: string;
    steps: Step[];
};

const DETAIL_MOCK: DetailItem[] = [
    {
        id: 1,
        name: 'Clear PET Bottle',
        type: 'PLASTIC',
        img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20170310_116%2Fdameun2015_1489110502755e4vcC_JPEG%2F13454740554212189_-723787167.jpg&type=sc960_832',
        steps: [
            { title: '내용물 비우기', desc: '음료/이물질을 비우고 가볍게 헹궈주세요.' },
            { title: '라벨 분리', desc: '가능하면 라벨/비닐을 떼어 분리해주세요.' },
            { title: '부피 줄이기', desc: '찌그러뜨려 부피를 줄여 배출해주세요.' },
        ],
    },
    {
        id: 2,
        name: 'Aluminum Can',
        type: 'METAL',
        img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20220318_255%2F1647565816861fUECG_JPEG%2F48701662564627048_1656266575.jpg&type=a340',
        steps: [
            { title: '비우고 헹구기', desc: '내용물을 비우고 간단히 헹궈주세요.' },
            { title: '물기 제거', desc: '물기를 털고 말린 뒤 배출해주세요.' },
            { title: '혼합 재질 분리', desc: '플라스틱 뚜껑/비닐 등은 분리해서 배출해주세요.' },
        ],
    },
    {
        id: 3,
        name: 'Cardboard Box',
        type: 'PAPER',
        img: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_8916534%2F89165343334.jpg&type=f372_372',
        steps: [
            { title: '테이프 제거', desc: '테이프/스티커는 최대한 제거해주세요.' },
            { title: '접어서 배출', desc: '상자를 접어 부피를 줄여 배출해주세요.' },
            { title: '건조 후 배출', desc: '젖으면 재활용이 어렵습니다. 건조하여 배출해주세요.' },
        ],
    },
];

export default function TrashDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const item = DETAIL_MOCK.find((x) => String(x.id) === String(id));
    if (!item) {
        return (
            <div>
                <div className="mb-3 flex h-[52px] items-center gap-2">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        aria-label="back"
                        className="grid h-[34px] w-[34px] place-items-center rounded-[10px] border border-white/10 bg-white/[0.06] text-[18px] text-white"
                    >
                        ←
                    </button>
                    <div className="text-[14px] text-white/95">분리수거 상세</div>
                </div>
                <div className="rounded-[16px] bg-white/5 p-4 text-white/70">
                    해당 품목을 찾을 수 없습니다. (id: {id})
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-3 flex h-[52px] items-center gap-2">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    aria-label="back"
                    className="grid h-[34px] w-[34px] place-items-center rounded-[10px] border border-white/10 bg-white/[0.06] text-white"
                >
                    ←
                </button>
                <div className="text-[14px] text-white/95">{item.name}</div>
            </div>

            <div className="relative overflow-hidden rounded-[24px] bg-[#101815]">
                <div className="aspect-[16/10]">
                    <img
                        src={item.img}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="absolute bottom-4 left-4 right-4 rounded-[18px] border border-white/10 bg-black/50 p-4 backdrop-blur-md">
                    <div className="text-[20px] font-semibold text-white">{item.name}</div>
                    <div className="mt-2 text-[13px] text-emerald-300">{item.type}</div>
                </div>
            </div>
            <div className="mt-6">
                <div className="mb-3 text-[15px] font-semibold text-white/95">쓰레기 처리 방법</div>
                <div className="flex flex-col gap-3">
                    {item.steps.map((s, idx) => (
                        <div
                            key={idx}
                            className="flex gap-3 rounded-[18px] border border-white/10 bg-[#1b2420] p-4"
                        >
                            <div className="grid h-10 w-10 place-items-center rounded-[12px] bg-emerald-400/10 text-emerald-300">
                                <div className="text-[10px] font-semibold">STEP</div>
                                <div className="-mt-1 text-[12px] font-bold">{idx + 1}</div>
                            </div>
                            <div className="min-w-0">
                                <div className="break-keep text-[14px] font-semibold text-white/90">
                                    {s.title}
                                </div>
                                <div className="mt-1 text-[13px] text-white/65">{s.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
