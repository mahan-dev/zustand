"use client";

import {
  useIncrement,
  useIncrementCombine,
  useStoreImmer,
} from "@/store/Store";
import { Button } from "@/ui/button";

export default function MyComponent() {
  const { a, b, incrementByOne } = useIncrement();

  const {
    storage: aCombine,
    bears,
    incrementByOne: incrementCombine,
  } = useIncrementCombine();

  const { addTodos, todos } = useStoreImmer();

  return (
    <div>
      <p>a: {a}</p>
      <p>b: {b}</p>
      <button onClick={incrementByOne}>Increment A</button>
      <hr />
      <h1>Combine part</h1>
      <div className="flex flex-col">
        <Button className="w-fit" onClick={incrementCombine}>
          Increment
        </Button>
        Storage: {aCombine}
        <br />
        Bears: {bears}
      </div>

      <button onClick={() => addTodos("Add")}>AddTodo</button>

      {!!todos.length &&
        todos.map((item, index) => (
          <ul key={index}>
            <li>{item.id}</li>
            <li>{item.text}</li>
          </ul>
        ))}
    </div>
  );
}
