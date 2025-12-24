"use client";
import { useQuery } from "@tanstack/react-query";
import { useActionState, useEffect, useOptimistic, useState } from "react";

import { addHandler } from "@/helper/addHandler";
import { dataFetcher } from "@/helper/dataFetcher";
import { ItemDetails } from "@/types/helper/type";

import { usePersistedBearStore } from "../store/Store";

const FetchLists = () => {
  const [state, formAction, isPending] = useActionState(addHandler, null);
  const [dataList, setDataList] = useState<ItemDetails[]>([]);

  const [optimisticState, setOptimistic] = useOptimistic<
    ItemDetails[],
    ItemDetails
  >(dataList, (currentState, optimisticValue: ItemDetails) => [
    optimisticValue,
    ...currentState,
  ]);

  const { setData } = usePersistedBearStore();

  const { data, error } = useQuery({
    queryKey: ["fetchLists"],
    queryFn: async () => dataFetcher(),
  });

  console.log(error);

  const actionHandler =  (formData: FormData) => {
    const form = Object.fromEntries(formData.entries());
    

    const optimisticItem: ItemDetails = {
      // id.
      title: form.title as string,
      body: form.body as string,
    };
    // if (data.length)
    setDataList((prev) => [optimisticItem, ...prev]);
    setOptimistic(optimisticItem);
    formAction(formData);
  };

  useEffect(() => {
    if (!state?.data) return;

    setData(state);
  }, [state]);

  return (
    <>
      <form action={actionHandler}>
        <div className="w-2xs flex flex-col gap-1.5 m-2">
          <input name="title" className="bg-white text-black" type="text" />
          <input name="body" className="bg-white text-black" type="text" />
          <button>click</button>
        </div>
      </form>
      <h1>added list</h1>
      <p>state == </p>
      <div>
        {isPending && <p>loading ...</p>}
        {state && (
          <>
            {state.data?.title} - {state.data?.body}
          </>
        )}
      </div>
      <h1>Lists</h1>
      {
        data && <h2 className="text-3xl text-blue-500">hello</h2>
        // finalData.slice(0, 4).map((item, index) => (
        //   <ul key={index} className="px-2">
        //     <li>
        //       {index} {item.body}
        //     </li>
        //   </ul>
        // ))
      }
      optimisticState
      {
        // !!optimisticState.length &&
        optimisticState.slice(0, 3).map((item, index) => (
          <ul key={index} className="px-2">
            <li>
              {item.title} {item.body}
            </li>
          </ul>
        ))
      }
    </>
  );
};

export default FetchLists;
