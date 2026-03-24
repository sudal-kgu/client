import api from './axios';
import type { Response, TrashDetail } from './types';

const TrashesAPI = {
    getTrash: async (serial: string) => {
        const result = await api.get<Response<TrashDetail>>(`/api/v1/trashes/${serial}`);
        return result.data.data;
    },
};

export default TrashesAPI;
