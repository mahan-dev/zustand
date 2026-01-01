"use client";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

const useStore = createWithEqualityFn(
  (set) => ({
    a: 1,
    b: 2,
    incrementA: () => set((state) => ({ a: state.a + 1 })),
  }),
  shallow // equality function
);

export default function MyComponent() {
  const { a, b, incrementA } = useStore((state) => ({
    a: state.a,
    b: state.b,
    incrementA: state.incrementA,
  }));

  console.log("render"); // 🔴 now prints only if a or b actually changes

  return (
    <div>
      <p>a: {a}</p>
      <p>b: {b}</p>
      <button onClick={incrementA}>Increment A</button>
    </div>
  );
}
