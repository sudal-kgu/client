import api from './axios';
import type { AnalaysisRequest, AnalaysisResultPage, Response } from './types';

const AnalysisAPI = {
    request: async (formdata: FormData) => {
        const result = await api.post<Response<AnalaysisRequest>>(
            '/api/v1/analysis/request',
            formdata,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
        return result.data;
    },
    getResult: async (id: string, page: number, size: number) => {
        const result = await api.get<Response<AnalaysisResultPage>>(
            `/api/v1/analysis/result/${id}?page=${page}&size=${size}`,
        );
        return result.data.data;
    },
    getSubscribePath: (requestId: string) => {
        return `${api.getUri()}/api/v1/analysis/subscribe/${requestId}`;
    },
};

export default AnalysisAPI;
