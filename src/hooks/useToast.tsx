import uuid from 'react-uuid';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type ToastInfoType = { isOpen: boolean; type: 'error' | 'success' | 'info'; contents: string };

interface ToastItem {
  id: string;
  message: string;
  duration?: number;
}

type Store = {
  toasts: ToastItem[];
  openToast: (message: string, duration?: number) => void;
  removeToast: (id: string) => void;
};

const store: StateCreator<Store> = (set) => ({
  toasts: [],
  openToast: (message, duration) =>
    set((state) => {
      const id = uuid();
      const toasts = [...state.toasts, { id, message, duration }];
      const next: Store = { ...state, toasts };
      return next;
    }),
  removeToast: (id) =>
    set((state) => {
      const toasts = state.toasts.filter((el) => el.id !== id);
      const next: Store = { ...state, toasts };
      return next;
    }),
});

const toastStore = import.meta.env.MODE === 'development' ? create<Store>()(devtools(store)) : create<Store>(store);

const useToast = toastStore;
export default useToast;
