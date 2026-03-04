import { useNavigate, useParams } from 'react-router-dom';

import btnsvg from '../assets/Vector.svg';
import { DETAIL_MOCK } from '../mock/detailMock';

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
                        className="grid h-[34px] w-[34px] place-items-center rounded-[10px] border border-white/10 bg-white/[0.06] text-[18px] text-white"
                    >
                        <img src={btnsvg} />
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
                    className="grid h-[34px] w-[34px] place-items-center rounded-[10px] border border-white/10 bg-white/[0.06] text-white"
                >
                    <img src={btnsvg} />
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
