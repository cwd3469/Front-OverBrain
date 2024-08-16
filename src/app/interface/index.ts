// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type APIBaseResponseDto<T = any> = {
  status: number;
  data: T;
  message: string;
  timestamp: string;
  trace: string;
  path: string;
};
