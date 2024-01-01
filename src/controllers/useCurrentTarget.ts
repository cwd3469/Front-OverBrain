import { Target } from '@/types/main';
import { create } from 'zustand';

export type CreateTargetType = {
  title: string;
  contents?: string;
  startAt: Date;
  endAt: Date;
};

type State = {
  target: Target[];
};

type Action = {
  createTarget: (target: CreateTargetType) => void;
  deleteTarget: (id: string) => void;
};

const newID = () => {
  return Math.random().toString(36).substr(2, 16);
};

const useCurrentTarget = create<State & Action>()((set) => ({
  target: [],
  createTarget: (params: CreateTargetType) =>
    set((state) => {
      let oldTargetList = state.target;
      const { title, contents, startAt, endAt } = params;
      if (!contents || !title || !endAt || !startAt) return state;
      const createdAt = new Date();
      const id = newID();
      const newTarget: Target = { id, title, contents, createdAt, startAt, endAt };
      const newTargetList = [...oldTargetList, newTarget];
      const newState = { ...state, target: newTargetList };
      return newState;
    }),
  deleteTarget: (id: string) => {
    set((state) => {
      const filter = state.target.filter((el, idx) => el.id !== id);
      return { ...state, target: filter };
    });
  },
}));

export default useCurrentTarget;
