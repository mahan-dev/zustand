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

export type { BearStorageAsync, AsyncAction, ProductStoreState };
