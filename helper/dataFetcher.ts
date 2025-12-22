import { BASE_URL } from "@/api/api";
export const dataFetcher = async () => {
  const res = await fetch(`${BASE_URL}posts`);

  return res.json();
};
