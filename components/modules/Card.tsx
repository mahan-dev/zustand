"use client";
import { useEffect } from "react";

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
