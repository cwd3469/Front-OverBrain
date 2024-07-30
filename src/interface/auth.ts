export interface UserInfoInterface {
  id: string;
  userId: string;
  phoneNumber: string;
}

export interface UserInfoInterface {
  id: string;
  userId: string;
  phoneNumber: string;
  state?: string;
  name: string;
}

export interface ReFreshTokenInterface {
  accessToken: 'string';
}

export interface UserInfoDataInterface {
  serviceType: string;
  accountId: string;
  role: string[];
  hospitalId: string;
  name: string;
  department: string;
  userId: string;
  sub: string;
  exp: number;
}
