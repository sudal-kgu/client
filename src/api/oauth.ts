import api from './axios';

const OAuthAPI = {
    kakao: async (code: string) => {
        const result = await api.post('/v1/oauth/kakao', { code });
        return result;
    },
};

export default OAuthAPI;
