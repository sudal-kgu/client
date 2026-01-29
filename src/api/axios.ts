import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,

  (error: AxiosError) => {
    // 서버에서 응답이 온 경우
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 400:
          console.warn('잘못된 요청');
          break;
        case 401:
          console.warn('인증 만료 / 로그인 필요');
          break;
        case 403:
          console.warn('권한 없음');
          break;
        case 500:
          console.warn('서버 에러');
          break;
        default:
          console.warn('알 수 없는 에러');
      }
    }

    // 요청은 갔는데 응답이 없는 경우
    else if (error.request) {
      console.warn('네트워크 에러');
    }

    // 요청 자체가 실패
    else {
      console.warn(error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
