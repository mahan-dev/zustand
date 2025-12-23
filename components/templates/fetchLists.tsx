"use client";
import { useQuery } from "@tanstack/react-query";
import { useActionState } from "react";

import { addHandler } from "@/helper/addHandler";
import { dataFetcher } from "@/helper/dataFetcher";
import { ItemDetails } from "@/types/helper/type";

const FetchLists = () => {
  const [state, formAction, isPending] = useActionState(addHandler, null);

  console.log(state);

  const { data, error } = useQuery({
    queryKey: ["fetchLists"],
    queryFn: async () => dataFetcher(),
  });
  const fetchedData: ItemDetails[] = data;

  return (
    <>
      <form action={formAction}>
        <div className="w-2xs flex flex-col gap-1.5 m-2">
          <input name="title" className="bg-white text-black" type="text" />
          <input name="body" className="bg-white text-black" type="text" />
          <button>click</button>
        </div>
      </form>
      <h1>added list</h1>
      <p>state == </p>{" "}
      {state && (
        <>
          {`${state.data?.title}`} - ${state.data?.body}
        </>
      )}
      <h1>Lists</h1>
      {data &&
        fetchedData.slice(0, 4).map((item, index) => (
          <ul key={index}>
            <li>item = ---- {item.body}</li>
          </ul>
        ))}
    </>
  );
};

export default FetchLists;
