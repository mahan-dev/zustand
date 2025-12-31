import axios from "axios";

import { BASE_URL } from "@/api/api";
import { ProductStoreState } from "@/components/store/Store";

interface dataDetail {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
  quantity: number;
}

interface dataResponse {
  data: dataDetail[];
}
const dataFetcher = async () => {
  try {
    const res: dataResponse = await axios(`${BASE_URL}products`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const fetchProducts = async (
  set: (state: Partial<ProductStoreState>) => void
) => {
  set({ loading: true, error: null });
  try {
    const { data } = await axios(`${BASE_URL}products`);
    set({ product: data });
  } catch (error) {
    set({ error: "something wen't wrong" });
  } finally {
    set({ loading: false });
  }
};

export { dataFetcher, fetchProducts };
export type { dataResponse, dataDetail };
