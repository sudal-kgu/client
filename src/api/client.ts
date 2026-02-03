import axios, { AxiosError } from 'axios';

// @ts-ignore
const baseURL = import.meta.env.VITE_API_URL as string;

const apiClient = axios.create({
  baseURL: baseURL || 'http://example.com',
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 401: console.warn('인증 만료'); break;
        case 403: console.warn('권한 없음'); break;
        case 500: console.warn('서버 오류'); break;
        default: console.warn('에러 발생');
      }
    } else {
      console.warn('네트워크 확인 필요');
    }
    return Promise.reject(error);
  }
);

export default apiClient;