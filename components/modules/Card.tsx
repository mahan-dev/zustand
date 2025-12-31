"use client";
import { dataResponse } from "@/helper/dataFetcher";
import useZustandActions from "@/hooks/useZustandActions";
import Product from "@/modules/Product";
import { useAsyncBearStore } from "@/store/Store";
import { Button } from "@/ui/button";

const Card = ({ data }: dataResponse) => {
  const { price } = useZustandActions();

  const increment = useAsyncBearStore((state) => state.add);
  const number = useAsyncBearStore((state) => state.stateNumber);
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
