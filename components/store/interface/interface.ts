import { dataDetail } from "@/helper/dataFetcher";
import { FormState, ItemDetails } from "@/types/helper/type";

interface BearStorageAsync {
  data: ItemDetails | null;
  error: string | null;
  setData: (newData: FormState) => void;
}

interface AsyncAction {
  add: () => void;
  stateNumber: number;
}

interface ProductStoreState {
  product: dataDetail[];
  loading: boolean;
  error: null | string;
  fetchProducts: () => Promise<void>;
}

interface IncrementStore {
  a: number;
  b: number;
  incrementByOne: () => void;
}

interface Todo {
  id: number;
  text: string;
}
interface ImmerStore {
  todos: Todo[];
  addTodos: (text: string) => void;
}

type PersonStoreState = {
  firstName: string;
  lastName: string;
  email: string;
};

type PersonStore = PersonStoreState & {
  dispatch: (action: PersonStoreAction) => PersonStoreAction;
};
type PersonStoreAction =
  | { type: "person/setFirstName"; payload: string }
  | { type: "person/setLastName"; payload: string }
  | { type: "person/setEmail"; payload: string };

type BearFamilyMealsStore = {
  [key: string]: string;
};

export type {
  BearStorageAsync,
  AsyncAction,
  ProductStoreState,
  BearFamilyMealsStore,
  IncrementStore,
  ImmerStore,
  PersonStore,
  PersonStoreAction,
  PersonStoreState
};
