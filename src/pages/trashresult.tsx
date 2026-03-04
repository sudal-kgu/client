import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import btnsvg from '../assets/Vector.svg';
import { MOCK_ITEMS } from '../mock/resultMock';

function tagClass(type: string) {
    const t = type.toUpperCase();
    if (t === 'PLASTIC') return 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20';
    if (t === 'METAL') return 'text-sky-300 bg-sky-400/10 border-sky-400/20';
    if (t === 'PAPER') return 'text-amber-300 bg-amber-400/10 border-amber-400/20';
    return 'text-white/70 bg-white/5 border-white/10';
}

export default function TrashResult() {
    const navigate = useNavigate();

    const limit = 10;
    const [page, setPage] = useState(1);

    const [bottom, setBottom] = useState<HTMLDivElement | null>(null);
    const bottomObserver = useRef<IntersectionObserver | null>(null);
    const visibleItems = MOCK_ITEMS.slice(0, page * limit);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries[0].isIntersecting) return;
                if (page * limit >= MOCK_ITEMS.length) return;
                setPage((prev) => prev + 1);
            },
            { threshold: 0.25, rootMargin: '80px' },
        );
        bottomObserver.current = observer;
    }, [page]);

    useEffect(() => {
        const observer = bottomObserver.current;
        if (!observer) return;
        if (bottom) {
            observer.observe(bottom);
        }
        return () => {
            if (bottom) {
                observer.unobserve(bottom);
            }
        };
    }, [bottom]);

    return (
        <div>
            <div className="mb-4 flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="h-[34px] w-[34px] place-items-center rounded-[10px] border border-white/10 bg-white/[0.06] text-[18px] text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
                >
                    <img src={btnsvg} />
                </button>
                <div className="text-[14px] text-white/95">쓰레기 분류 결과</div>
            </div>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
                {visibleItems.map((item) => (
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
            <div ref={setBottom} className="h-10" />
        </div>
    );
}
