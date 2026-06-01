import api from './axios';
import type { IExchangeGemResponse, IGemItem, Item, Response, ShopPurchaseResponse } from './types';

const ShopAPI = {
    getItems: async () => {
        const result = await api.get<Response<Item[]>>(`/v1/shops/items`);
        return result.data.data;
    },
    purchase: async (itemId: number) => {
        const result = await api.post<Response<ShopPurchaseResponse>>(
            `/v1/shops/items/${itemId}/purchases`,
        );
        return result.data.data;
    },
    getGemItems: async () => {
        const result = await api.get<Response<IGemItem[]>>(`/v1/shops/gem-items`);
        return result.data.data;
    },
    exchangeGemItem: async (gemItemId: number) => {
        const result = await api.post<Response<IExchangeGemResponse>>(
            `/v1/shops/gem-items/${gemItemId}/exchange`,
        );
        return result.data.data;
    },
};

export default ShopAPI;
