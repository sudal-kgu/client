import api from './axios';
import type { Island, Region, Response } from './types';

const MemberAPI = {
    me: async () => {
        const result = await api.get<Response<Island>>('/v1/islands');
        return result.data.data;
    },
    createMe: async (nickname: string, region: Region) => {
        const result = await api.post<Response<Island>>(`/v1/islands`, { nickname, region });
        return result.data.data;
    },
};

export default MemberAPI;
