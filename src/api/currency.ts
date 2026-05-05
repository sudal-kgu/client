import api from './axios';
import type { Currency, Response } from './types';

const CurrencyAPI = {
    get: async () => {
        const result = await api.get<Response<Currency>>('/v1/resources');
        return result.data.data;
    },
};

export default CurrencyAPI;
