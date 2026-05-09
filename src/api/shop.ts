import api from './axios';
import type { Item, Response, ShopPurchaseResponse } from './types';

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
};

export default ShopAPI;
