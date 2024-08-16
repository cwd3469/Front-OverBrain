import axios from 'axios';
import { ReFreshTokenInterface } from '@/interface/auth.ts';

/** 토큰 재발급 요청  */
export const postRefreshToken = (): Promise<ReFreshTokenInterface> => {
  return axios({
    method: 'patch',
    url: import.meta.env.VITE_BASE_API_PATH + '/auth/api/v1/hospital/accounts/token-refresh',
    withCredentials: true,
    timeout: 1000,
  });
};
