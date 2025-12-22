interface State {
  bears: number;
}
interface Action {
  increment: () => void;
  decrement: () => void;
  removeAll: () => void;
  updateBears: (newBears: number) => void;
}

interface BearStorage {
  bears: number;
  addABear: () => void;
}

export type { State, Action, BearStorage };
