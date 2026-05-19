import api from './axios';
import type { IRanking, Island, PageResponse, Region, Response } from './types';

const MemberAPI = {
    me: async () => {
        const result = await api.get<Response<Island>>('/v1/islands');
        return result.data.data;
    },
    createMe: async (nickname: string, region: Region) => {
        const result = await api.post<Response<Island>>(`/v1/islands`, { nickname, region });
        return result.data.data;
    },
    ranking: async (params: { region?: Region; page: number; size: number }) => {
        const searchParams = new URLSearchParams({
            page: String(params.page),
            size: String(params.size),
        });
        if (params.region) searchParams.set('region', params.region);
        const result = await api.get<Response<{ me?: IRanking; rankings: PageResponse<IRanking> }>>(
            `/v1/rankings?${searchParams}`,
        );
        return result.data.data;
    },
};

export default MemberAPI;
