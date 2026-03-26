import api from './axios';
import type { Confirm, Response, TrashDetail } from './types';

const TrashesAPI = {
    getTrash: async (serial: string) => {
        const result = await api.get<Response<TrashDetail>>(`/api/v1/trashes/${serial}`);
        return result.data.data;
    },
    confirm: async (trashUuids: string[]) => {
        const result = await api.post<Response<Confirm>>(`/api/v1/trashes/confirm`, { trashUuids });
        return result.data.data;
    },
};

export default TrashesAPI;
