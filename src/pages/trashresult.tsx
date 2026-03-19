import { useEffect, useRef, useState } from 'react';

import Joyride, { STATUS } from 'react-joyride';
import type { CallBackProps } from 'react-joyride';
import { useNavigate } from 'react-router-dom';

import { getAnalysisResult } from '../api/result';
import btnsvg from '../assets/Vector.svg';
import ExitModal from '../components/ExitModal';
import { tagClass } from '../mock/tagclass';
import { JOYRIDE_LOCALE, TOUR_STEPS } from './TrashResult.constants';

type TrashItem = {
    id: string;
    name: string;
    type: string;
    img: string;
};

interface ApiState {
    items: TrashItem[];
    page: number;
    hasNext: boolean;
    isLoading: boolean;
    error: string | null;
}

export default function TrashResult() {
    const navigate = useNavigate();
    const serial = 'TEST1234';
    const limit = 10;

    const [apiState, setApiState] = useState<ApiState>({
        items: [],
        page: 1,
        hasNext: true,
        isLoading: false,
        error: null,
    });
    const [runTour, setRunTour] = useState(false);

    const bottomRef = useRef<HTMLDivElement | null>(null);
    const exitModalRef = useRef<HTMLDivElement | null>(null);

    const openExitModal = () => {
        const wrap = exitModalRef.current;
        if (!wrap) return;
        const hiddenTrigger = wrap.querySelector('button') as HTMLButtonElement | null;
        hiddenTrigger?.click();
    };

    useEffect(() => {
        const fetchData = async () => {
            setApiState((prev) => ({ ...prev, isLoading: true }));

            try {
                const data = await getAnalysisResult(serial, apiState.page, limit);
                const newItems = data.content.map((item) => ({
                    id: item.uuid,
                    name: item.category,
                    type: item.subcategory,
                    img: item.image,
                }));

                setApiState((prev) => ({
                    ...prev,
                    items: [...prev.items, ...newItems].filter(
                        (item, index, arr) => arr.findIndex((v) => v.id === item.id) === index,
                    ),
                    hasNext: data.currentPage < data.totalPage,
                    isLoading: false,
                }));
            } catch (err) {
                console.error('Data fetching error:', err);
                setApiState((prev) => ({
                    ...prev,
                    isLoading: false,
                    error: '분류 결과를 불러오지 못했습니다.',
                }));
            }
        };
        fetchData();
    }, [apiState.page, apiState.hasNext, apiState.isLoading]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && apiState.hasNext && !apiState.isLoading) {
                    setApiState((prev) => ({ ...prev, page: prev.page + 1 }));
                }
            },
            { threshold: 0, rootMargin: '200px' },
        );

        if (bottomRef.current) observer.observe(bottomRef.current);
        return () => observer.disconnect();
    }, [apiState.hasNext, apiState.isLoading]);

    useEffect(() => {
        if (apiState.items.length > 0) {
            setRunTour(true);
        }
    }, [apiState.items.length]);

    const handleJoyrideCallback = (data: CallBackProps) => {
        const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
        if (finishedStatuses.includes(data.status)) {
            setRunTour(false);
        }
    };

    return (
        <div>
            <Joyride
                steps={TOUR_STEPS}
                run={runTour}
                continuous
                showProgress
                showSkipButton
                callback={handleJoyrideCallback}
                styles={{
                    options: {
                        zIndex: 10000,
                    },
                }}
                locale={JOYRIDE_LOCALE}
            />
            <div ref={exitModalRef} className="exit-modal-wrap">
                <ExitModal />
            </div>
            <div className="tour-title mb-5 flex items-center gap-3">
                <button
                    type="button"
                    onClick={openExitModal}
                    className="h-[34px] w-[34px] place-items-center rounded-[10px] border border-white/10 bg-white/[0.06] text-[18px] text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
                >
                    <img src={btnsvg} alt="뒤로가기" />
                </button>
                <div className="text-[14px] text-white/95">쓰레기 분류 결과</div>
            </div>

            {apiState.error && apiState.items.length === 0 && (
                <div className="mb-4 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-[13px] text-red-200">
                    {apiState.error}
                </div>
            )}

            <div className="grid grid-cols-2 gap-3">
                {apiState.items.map((item, index) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => navigate(`/detail/${item.id}`)}
                        className={`rounded-[16px] bg-[#1b2420] p-4 text-left transition-all duration-200 hover:bg-[#1f2a25] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 active:scale-[0.98] ${
                            index === 0 ? 'tour-card tour-detail-button' : ''
                        }`}
                    >
                        <div className="h-[120px] overflow-hidden rounded-[14px] bg-white/5">
                            <img
                                src={item.img}
                                alt={item.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="mt-3">
                            <span
                                className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium ${
                                    tagClass(item.type) ??
                                    'border-white/10 bg-white/10 text-white/80'
                                }`}
                            >
                                {item.type}
                            </span>
                        </div>
                        <div className="mt-2 text-[14px] font-medium text-white/90">
                            {item.name}
                        </div>
                    </button>
                ))}
            </div>

            {apiState.isLoading && (
                <div className="py-4 text-center text-[13px] text-white/60">불러오는 중...</div>
            )}

            {!apiState.isLoading && apiState.items.length === 0 && !apiState.error && (
                <div className="rounded-[16px] bg-white/5 p-4 text-center text-[13px] text-white/60">
                    표시할 분류 결과가 없습니다.
                </div>
            )}

            <div ref={bottomRef} className="tour-bottom h-10" />
        </div>
    );
}
