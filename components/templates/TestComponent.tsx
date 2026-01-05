"use client";

import { useIncrement, useIncrementCombine } from "@/store/Store";
import { Button } from "@/ui/button";

export default function MyComponent() {
  const { a, b, incrementByOne } = useIncrement();

  const {
    a: aCombine,
    b: bCombine,
    incrementByOne: incrementCombine,
  } = useIncrementCombine();

  console.log("render"); // 🔴 now prints only if a or b actually changes

  return (
    <div>
      <p>a: {a}</p>
      <p>b: {b}</p>
      <button onClick={incrementByOne}>Increment A</button>
      <hr />
      <h1>Combine part</h1>
      <Button onClick={incrementCombine}>Increment</Button>
      a: {aCombine}
      b: {bCombine}
    </div>
  );
}
