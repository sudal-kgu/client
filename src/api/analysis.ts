import api from './axios';
import type { AnalysisRequest, Response } from './types';

const AnalysisAPI = {
    request: async (formdata: FormData) => {
        const result = await api.post<Response<AnalysisRequest>>(
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
    getSubscribePath: (requestId: string) => {
        return `${api.getUri()}/api/v1/analysis/subscribe/${requestId}`;
    },
};

export default AnalysisAPI;
