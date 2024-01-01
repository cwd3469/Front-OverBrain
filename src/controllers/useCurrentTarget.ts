import { Target } from '@/types/main';
import { create } from 'zustand';

type Store = {
  count: number;
  inc: () => void;
};

type State = {
  target: Target[];
};
type Action = {
  actionTargetPost: (target: Target) => void;
};

const useCurrentTarget = create<State & Action>()((set) => ({
  target: [],
  actionTargetPost: (target: Target) =>
    set((state) => {
      let oldTarget = state.target;
      const newTarget = [...oldTarget, target];
      const newState = { ...state, target: newTarget };
      return newState;
    }),
}));

export default useCurrentTarget;
