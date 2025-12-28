"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { dataFetcher } from "@/helper/dataFetcher";
import { useBear, useBearStore } from "@/store/Store";

import Card from "../modules/Card";

const Home = () => {
  const { data } = useQuery({
    queryKey: ["dataFetcher"],
    queryFn: async () => await dataFetcher(),
  });

  const BearCounter = () => {
    const bearCounter = useBear((state) => state.quantity);

    // return <h1>{bearCounter} bear around here ... </h1>;
  };

  const bears = useBearStore((state) => state.bears);
  const addABear = useBearStore((state) => state.addABear);

  const Controls = () => {
    const increasePopulation = useBear((state) => state.increment);
    const decreasePopulation = useBear((state) => state.decrement);

    return (
      <div className="flex  gap-3">
        {/* <button onClick={increasePopulation}>oneUp</button> */}
        <button onClick={decreasePopulation}>onDown</button>
      </div>
    );
  };

  return (
    <div>
      {/* <BearCounter /> */}
      <Controls />
      {!!data?.length && <Card data={data} />}

      <h1>{bears} bears</h1>
      <button onClick={addABear}>Add bear</button>
    </div>
  );
};

export default Home;
