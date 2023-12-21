import { create } from 'zustand';

type Store = {
  count: number;
  inc: () => void;
};

export type Target = {
  title: string;
  contents: string;
};
type State = {
  target: Target[];
};
type Action = {
  actionTargetPost: (target: Target) => void;
};

const usePurpose = create<State & Action>()((set) => ({
  target: [],
  actionTargetPost: (target: Target) =>
    set((state) => {
      let oldTarget = state.target;
      const newTarget = [...oldTarget, target];
      const newState = { ...state, target: newTarget };
      return newState;
    }),
}));

export default usePurpose;
