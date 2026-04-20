import api from './axios';
import type { Island, Response } from './types';

const MemberAPI = {
    me: async () => {
        const result = await api.get<Response<Island>>('/v1/islands');
        return result.data.data;
    },
    createMe: async (nickname: string) => {
        const reslut = await api.post<Response<Island>>(`/v1/islands`, { nickname });
        return reslut.data.data;
    },
};

export default MemberAPI;
