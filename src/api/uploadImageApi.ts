import type { UploadImageResponse } from '../types/analysis.ts';
import api from './axios.ts';

export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const { data: responseBody } = await api.post<UploadImageResponse>(
        '/api/v1/analysis/request',
        formData,
    );

    const { request_id } = responseBody.data;

    return request_id;
};
