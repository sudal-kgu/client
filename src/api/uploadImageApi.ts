import type { UploadImageResponse } from '../types/analysis.ts';
import api from './axios.ts';

export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const { data } = await api.post<UploadImageResponse>('/api/v1/analysis/request', formData);

    return data.data;
};
