import api from './axios';

export type AnalysisResultItem = {
    uuid: string;
    image: string;
    category: string;
    subcategory: string;
};

export type AnalysisResultResponse = {
    totalPage: number;
    currentPage: number;
    content: AnalysisResultItem[];
};

export const getAnalysisResult = async (serial: string, page: number, size: number) => {
    const response = await api.get(`/api/v1/analysis/result/${serial}`, {
        params: {
            page,
            size,
        },
    });

    return response.data.data as AnalysisResultResponse;
};
