"use client";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";

import { dataResponse } from "@/helper/dataFetcher";
import Product from "@/modules/Product";
import { useAsyncBearStore, useBear, useProductStore } from "@/store/Store";
import { Button } from "@/ui/button";

const Card = ({ data }: dataResponse) => {
  const { price } = useBear();

  const increment = useAsyncBearStore((state) => state.add);
  const number = useAsyncBearStore((state) => state.stateNumber);
  const { product, error, loading, fetchProducts } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ? Shallow comparing

  const leftObject = {
    firstName: "john",
    lastName: "cena",
    age: 42,
  };
  const rightObject = {
    firstName: "john",
    lastName: "cena",
    age: 42,
  };

  const res = Object.is(leftObject, rightObject);
  console.log("🍦 ~ Card.tsx:33 -> res: ", res);
  const res_2 = shallow(leftObject, rightObject);
  console.log("🌺 ~ Card.tsx:35 ->  res_2: ", res_2);

  if (loading) return <h2>loading...</h2>;

  if (error) return <h2>something went wrong</h2>;
  if (product) {
    console.log(product);
  }

  return (
    <>
      <h1>TotalPrice:{`${price}$`}</h1>
      <div className="max-w-300 m-auto my-10 flex flex-wrap justify-center gap-4">
        {data.map((item) => {
          return <Product key={item.id} data={item} />;
        })}
      </div>

      <div className="flex justify-center">
        <h1>Async adding</h1>
        <Button onClick={() => increment()}>Add</Button>
        show:{number}
      </div>
    </>
  );
};

export default Card;
