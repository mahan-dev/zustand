import axios from "axios";

import { BASE_URL } from "@/api/api";
interface dataDetail {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
}

interface dataResponse {
  data: dataDetail[];
}
export const dataFetcher = async () => {
  const res: dataResponse = await axios(`${BASE_URL}products`);

  console.log(res.data);

  return res.data;
};

export type { dataResponse };
