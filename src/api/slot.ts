import api from './axios';
import type { IActivatedSlot, IInactivatedSlot, ISlot, Response } from './types';

const SlotAPI = {
    getSlots: async () => {
        const result = await api.get<Response<(IActivatedSlot | IInactivatedSlot)[]>>('/v1/slots');
        return result.data.data;
    },
    getSlot: async () => {},
    activateSlot: async (slotNumber: number) => {
        const result = await api.post<Response<ISlot>>(`/v1/slots/activate/${slotNumber}`);
        return result.data.data;
    },
};

export default SlotAPI;
