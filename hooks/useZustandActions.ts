"use client";

import { useBear } from "@/components/store/Store";

const useZustandActions = () => {
  const increase = useBear((state) => state.increment);
  const decrease = useBear((state) => state.decrement);
  const remove = useBear((state) => state.remove);
  const add = useBear((state) => state.add);
  const price = useBear((state) => state.price);
  return {
    increase,
    decrease,
    remove,
    add,
    price,
  };
};

export default useZustandActions;
