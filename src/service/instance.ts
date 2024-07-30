import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import useAuth from '@/hooks/useAuth';
import { postRefreshToken } from './auth/login';
import { APIBaseResponseDto } from '@/interface';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_PATH,
  timeout: 1000,
  withCredentials: true,
});

let authToken: string;
/**
 * API 요청시 인터셉터 기능
 * */
const handleRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
};

/** API 요청 시 에러 인터셉터 기능  */
const handleErrorRequest = (error: AxiosError<AxiosRequestConfig>) => {
  switch (true) {
    case Boolean(error.config):
      console.log('에러: 요청 실패', error);
      break;
    case Boolean(error.request):
      console.log('에러: 응답 없음', error);
      break;
    default:
      console.log('에러:', error);
      break;
  }
  return Promise.reject(error);
};

/** API 응답 인터셉터 기능  */
const handleResponse = (response: AxiosResponse<APIBaseResponseDto>) => {
  const res = response.data.data;
  return res;
};

/** API 응답 에러 인터셉터 기능 */
const handleErrorResponse = async (error: AxiosError | Error) => {
  if (axios.isAxiosError(error)) {
    const { config, response } = error;
    const { status } = response as AxiosResponse;
    const signoutUser = useAuth.getState().signoutUser;
    const signInUser = useAuth.getState().signinUser;
    // accessToken가 사용기간 만료 됬을때
    if (response?.data?.status === -3) {
      try {
        const refreshData = await postRefreshToken();

        if (config) {
          config.headers.Authorization = `Bearer ${refreshData.accessToken}`;
          signInUser(refreshData.accessToken);
          return instance.request(config);
        }
      } catch (error) {
        signoutUser();
      }
    } else if (status === 401) {
      signoutUser();
    }

    return Promise.reject(error);
  }
};

const setupInterceptors = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(handleRequest, handleErrorRequest);
  axiosInstance.interceptors.response.use(handleResponse, handleErrorResponse);

  return axiosInstance;
};

setupInterceptors(instance);

const setAuthToken = (token: string) => {
  authToken = token;
};

const clearAuthToken = () => {
  authToken = '';
};

export { instance, setAuthToken, clearAuthToken };
