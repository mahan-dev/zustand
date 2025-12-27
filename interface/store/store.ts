import { dataDetail } from "@/helper/dataFetcher";
import { ItemDetails } from "@/types/helper/type";

interface State {
  products: ProductStore[];
}
export interface ProductStore extends ItemDetails {
  quantity: number;
  id: number;
}
interface Action {
  increment: (product: dataDetail, id: number) => void;
  decrement?: () => void;
  removeAll?: () => void;
  quantity: (item: number) => number;
  updateBears?: (newBears: number) => void;
}

interface BearStorage {
  bears: number;
  addABear: () => void;
}

export type { State, Action, BearStorage };
