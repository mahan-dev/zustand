"use client";

import { useBear } from "@/components/store/Store";

const ZustandActions = () => {
  const increase = useBear((state) => state.increment);
  const decrease = useBear((state) => state.decrement);
  const remove = useBear((state) => state.remove);
  const add = useBear((state) => state.add);
  return {
    increase,
    decrease,
    remove,
    add,
  };
};

export default ZustandActions;
