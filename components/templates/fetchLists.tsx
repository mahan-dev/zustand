"use client";
import { useQuery } from "@tanstack/react-query";


import { dataFetcher } from "@/helper/dataFetcher";

const FetchLists = () => {
  const { data, error } = useQuery({
    queryKey: ["fetchLists"],
    queryFn: async () => dataFetcher(),
  });

  console.log(error)
  console.log(data);

  return <div>

  </div>;
};

export default FetchLists;
