import { UserInfoDataInterface } from '@/interface/auth';
import { clearAuthToken, setAuthToken } from '@/service/instance';
import { jwtDecode } from 'jwt-decode';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Store = {
  isLogin: boolean;
  userInfo: UserInfoDataInterface;
  signinUser: (info: string) => void;
  signoutUser: () => void;
};

const defaultValue: UserInfoDataInterface = {
  serviceType: '',
  accountId: '',
  role: [],
  hospitalId: '',
  name: '',
  department: '',
  userId: '',
  sub: '',
  exp: 0,
};

const store: StateCreator<Store> = (set) => ({
  isLogin: false,
  userInfo: defaultValue,
  signinUser: (token) =>
    set((state) => {
      setAuthToken(token);
      const decodeToken: UserInfoDataInterface = jwtDecode(token);
      const newState = { ...state, userInfo: decodeToken, isLogin: true };
      return newState;
    }),
  signoutUser: () =>
    set((state) => {
      clearAuthToken();
      const newState = { ...state, userInfo: defaultValue, isLogin: false };
      return newState;
    }),
});

const use = import.meta.env.MODE === 'development' ? create<Store>()(devtools(store)) : create<Store>(store);

const useAuth = use;
export default useAuth;
