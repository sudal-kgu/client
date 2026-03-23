import { useState } from 'react';

import AnalysisAPI from '../api/analysis';
import { type AnalysisItem, ResultSchema } from '../api/types';
import ParseUtils from '../utils/parse-utils';
import type { Analysis } from './types';

const event = {
    ANALYSIS_RESULT: 'analysis-result',
    ERROR: 'error',
} as const;

const useAnalysis = () => {
    const [analysis, setAnalysis] = useState<Analysis>({});
    const [basket, setBasket] = useState<AnalysisItem[]>([]);

    const subscribe = async (blob: Blob | null) => {
        if (!blob) throw new Error();
        if (Object.keys(analysis).length >= 3) return;
        const formData = new FormData();
        formData.append('image', blob, `${crypto.randomUUID()}.jpg`);
        const result = await AnalysisAPI.request(formData);
        const requestId = result.data.request_id;
        const eventSource = new EventSource(AnalysisAPI.getSubscribePath(requestId));
        const clear = () => {
            eventSource.close();
            setAnalysis(({ [requestId]: _, ...rest }) => rest);
        };

        eventSource.addEventListener(event.ANALYSIS_RESULT, (ev) => {
            const result = ParseUtils.safeParse(ResultSchema, ev.data);
            setBasket((prev) => [...prev, ...result.trashItems]);
            clear();
        });
        eventSource.addEventListener(event.ERROR, () => clear());
        eventSource.onerror = () => clear();

        setAnalysis((prev) => ({ ...prev, [requestId]: eventSource }));
    };

    return { basket, analysis, subscribe };
};

export default useAnalysis;
