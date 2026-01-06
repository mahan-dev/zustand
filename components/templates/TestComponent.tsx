"use client";

import { useStore } from "zustand";

import { reduxStore, useIncrement, useStoreImmer } from "@/store/Store";
import Combine from "@/templates/Combine";

export default function MyComponent() {
  const { a, b, incrementByOne } = useIncrement();

  const { addTodos, todos } = useStoreImmer();

  const firstName = useStore(reduxStore, (s) => s.firstName);
  const lastName = useStore(reduxStore, (s) => s.lastName);
  const email = useStore(reduxStore, (s) => s.email);

  return (
    <div>
      <p>a: {a}</p>
      <p>b: {b}</p>
      <button onClick={incrementByOne}>Increment A</button>
      <hr />
      <h1>Combine part</h1>
      <Combine />

      <button onClick={() => addTodos("Add")}>AddTodo</button>

      {!!todos.length &&
        todos.map((item, index) => (
          <ul key={index}>
            <li>{item.id}</li>
            <li>{item.text}</li>
          </ul>
        ))}

      <hr />
      <h1>middleware --- part</h1>

      {Object.entries({ firstName, lastName, email }).map(([key, value]) => (
        <ul key={key}>
          <li>
            {key} : {value}
          </li>
        </ul>
      ))}
    </div>
  );
}
