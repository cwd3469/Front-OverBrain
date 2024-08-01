import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type ToastInfoType = { isOpen: boolean; type: 'error' | 'success' | 'info'; contents: string };

type Store = {
  toastInfo?: ToastInfoType;
  openToast: (params: ToastInfoType) => void;
};

const store: StateCreator<Store> = (set) => ({
  openToast: (params) =>
    set((state) => {
      const next: Store = { ...state, toastInfo: params };
      return next;
    }),
});

const toastStore = import.meta.env.MODE === 'development' ? create<Store>()(devtools(store)) : create<Store>(store);

const useToast = toastStore;
export default useToast;
