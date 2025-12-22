"use client";
import React from "react";

import { useBear } from "@/store/Store";

const Home = () => {
  const BearCounter = () => {
    const bearCounter = useBear((state) => state.bears);

    return <h1>{bearCounter} bear around here ... </h1>;
  };

  const Controls = () => {
    const increasePopulation = useBear((state) => state.increment);
    const decreasePopulation = useBear((state) => state.decrement);
    return (
      <div className="flex  gap-3">
        <button onClick={increasePopulation}>oneUp</button>
        <button onClick={decreasePopulation}>onDown</button>
      </div>
    );
  };

  return (
    <div>
      <BearCounter />
      <Controls />
    </div>
  );
};

export default Home;
