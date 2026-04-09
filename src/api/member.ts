import api from './axios';
import type { Me, Response } from './types';

const MemberAPI = {
    me: async () => {
        const result = await api.get<Response<Me>>('/v1/members/me');
        return result.data.data;
    },
};

export default MemberAPI;
