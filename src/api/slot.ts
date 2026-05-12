import api from './axios';
import type { CurrencyType, IActivateSlotResponse, ISlotsResponse, Response } from './types';
import type { Currency } from './types';

const SlotAPI = {
    getSlots: async () => {
        const result = await api.get<Response<ISlotsResponse>>('/v1/slots');
        return result.data.data;
    },
    getActivateCost: async () => {
        const result =
            await api.get<Response<Pick<Currency, CurrencyType.SHELL>>>('/v1/slots/activate');
        return result.data.data;
    },
    activateSlot: async (slotNumber: number) => {
        const result = await api.post<Response<IActivateSlotResponse>>(
            `/v1/slots/${slotNumber}/activate`,
        );
        return result.data.data;
    },
};

export default SlotAPI;
