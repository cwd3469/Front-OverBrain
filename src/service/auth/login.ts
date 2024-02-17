import { instance } from '../instance.ts';
import axios from 'axios';
import { ReFreshTokenInterface } from '@/interface/auth.ts';

/**로그인 4단계 중 1단계-휴대폰번호를 요청한다. */
export const postSignInAskPhoneNumber = (dto: LoginInfoRequestDto): Promise<LoginInfoResponseDto> => {
  return instance({
    method: 'post',
    url: '/auth/api/v1/hospital/accounts/sign-in/ask-phone-number',
    data: dto,
  });
};

/**로그인 4단계 중 2단계-휴대폰번호로 인증을 요청한다.
 * 본인 인증 3단계 중 2단계-휴대폰번호로 인증을 요청한다.
 */
export const postSendVerificationCode = (query: string, url: string): Promise<string> => {
  return instance({
    method: 'post',
    url: `${url}?${query}`,
  });
};

/**로그인 4단계 중 3단계-인증번호를 확인한다.
 * 본인 인증 3단계 중 3단계-인증번호를 확인한다.
 */
export const postConfirmVerificationCode = (
  dto: VerificationCodeRequestDto,
  url: string,
): Promise<VerificationCodeResponseDto> => {
  return instance({
    method: 'post',
    url: `${url}`,
    data: dto,
  });
};

/**로그인 4단계 중 4단계-권한을 부여한다. */
export const postSignInGrantRole = (dto: GrantRoleRequestDto): Promise<GrantRoleResponseDto> => {
  return instance({
    method: 'post',
    url: '/auth/api/v1/hospital/accounts/sign-in/grant-role',
    data: dto,
  });
};
/** recaptcha token 인증 요청  */
export const postReCaptcha = (dto: string): Promise<boolean> => {
  return instance({
    method: 'post',
    url: '/auth/api/v1/hospital/accounts/verify-reCaptcha',
    data: { token: dto },
  });
};

/** 토큰 재발급 요청  */
export const postRefreshToken = (): Promise<ReFreshTokenInterface> => {
  return axios({
    method: 'patch',
    url: import.meta.env.VITE_BASE_API_PATH + '/auth/api/v1/hospital/accounts/token-refresh',
    withCredentials: true,
    timeout: 1000,
  });
};

export type LoginInfoRequestDto = {
  userId: string;
  password: string;
};

export type LoginInfoResponseDto = {
  verificationKey: string;
  phoneNumber: string;
};

export type VerificationCodeRequestDto = {
  verificationCode: string;
  verificationKey: string;
};

export type ResponseHospitalInfo = {
  authGroupId: string;
  hospitalId: string;
  logoImageUrl: string | null;
  name: string;
  noActionLogout: string;
};

export type VerificationCodeResponseDto = {
  verificationKey: string;
  hospitals: ResponseHospitalInfo[];
};

export type GrantRoleRequestDto = {
  verificationKey: string;
  hospitalId: string;
  authGroupId: string;
  noActionLogoutTime: string;
};

export type GrantRoleResponseDto = {
  accountId: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
};
