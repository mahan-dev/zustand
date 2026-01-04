"use client";

import { useIncrement } from "@/store/Store";

export default function MyComponent() {
  const { a, b, incrementByOne } = useIncrement();

  console.log("render"); // 🔴 now prints only if a or b actually changes

  return (
    <div>
      <p>a: {a}</p>
      <p>b: {b}</p>
      <button onClick={incrementByOne}>Increment A</button>
    </div>
  );
}
