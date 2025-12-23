"use client";
import { useQuery } from "@tanstack/react-query";
import { useActionState } from "react";

import { addHandler } from "@/helper/addHandler";
import { dataFetcher } from "@/helper/dataFetcher";

const FetchLists = () => {
      const [state, formAction, isPending] = useActionState(addHandler, null);

  const { data, error } = useQuery({
    queryKey: ["fetchLists"],
    queryFn: async () => dataFetcher(),
  });
  // console.log(data);

  return (
    <form action={formAction}>
      <div className="w-2xs flex flex-col gap-1.5 m-2">
        <input name="title" className="bg-white text-black" type="text" />
        <input name="body" className="bg-white text-black" type="text" />
        <button>click</button>
      </div>
    </form>
  );
};

export default FetchLists;
