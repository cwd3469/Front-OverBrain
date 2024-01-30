import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_PATH,
  timeout: 1000,
});

const logOnDev = (message: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(message);
  }
};

/** API 에러 메시지 format fnc */
const onError = (status: number, message: string) => {
  const error = { status, message };
  throw error;
};

/** API 요청시 인터셉터 기능  */
const onRequest = (config: AxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  if (!config.data && !config.params) return Promise.reject(new Error('요청 데이터가 없습니다'));

  /**추후 사용자 인증 프로세스에 따라 변경할 예정  */
  const token = localStorage.getItem('token');
  const { method, url, headers = {} } = config;

  headers.Authorization = token ? `Bearer ${token}` : '';

  logOnDev(`[API] ${method?.toUpperCase()} ${url} | Request`);

  return Promise.resolve({ ...config, headers } as InternalAxiosRequestConfig);
};

/** API 요청 시 에러 인터셉터 기능  */
const onErrorRequest = (error: AxiosError<AxiosRequestConfig>) => {
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
const onResponse = (response: AxiosResponse): AxiosResponse => {
  const { method, url } = response.config;
  const { status } = response;

  logOnDev(`[API] ${method?.toUpperCase()} ${url} | Request ${status}`);

  return response;
};

/** API 응답 에러 인터셉터 기능 */
const onErrorResponse = (error: AxiosError | Error) => {
  if (axios.isAxiosError(error)) {
    const { message } = error;
    const { method, url } = error.config as AxiosRequestConfig;
    const { status, statusText } = error.response as AxiosResponse;

    logOnDev(`[API] ${method?.toUpperCase()} ${url} | Error ${status} ${statusText} | ${message}`);

    switch (status) {
      case 400:
        onError(status, '잘못된 요청입니다.');
        break;
      case 401: {
        onError(status, '인증 실패입니다.');
        break;
      }
      case 403: {
        onError(status, '권한이 없습니다.');
        break;
      }
      case 404: {
        onError(status, '찾을 수 없는 페이지입니다.');
        break;
      }
      case 500: {
        onError(status, '서버 오류입니다.');
        break;
      }
      default: {
        onError(status, `에러가 발생했습니다. ${error.message}`);
      }
    }
  } else if (error instanceof Error && error.name === 'TimeoutError') {
    logOnDev(`[API] | TimeError ${error.toString()}`);
    onError(0, '요청 시간이 초과되었습니다.');
  } else {
    logOnDev(`[API] | Error ${error.toString()}`);
    onError(0, `에러가 발생했습니다. ${error.toString()}`);
  }

  return Promise.reject(error);
};

const setupInterceptors = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onErrorRequest);
  axiosInstance.interceptors.response.use(onResponse, onErrorResponse);

  return axiosInstance;
};

setupInterceptors(instance);

export default instance;
