"use client";
import Image from "next/image";

import { dataResponse } from "@/helper/dataFetcher";

import { useBear } from "../store/Store";
import { Button } from "../ui/button";

const Card = ({ data }: dataResponse) => {
  const quantity = useBear((state) => state.quantity(1));
  const QuantityHandler = (id: number): number => {
    const result: number = +useBear((state) => state.quantity(id));
    return result;
  };
  const increase = useBear((state) => state.increment);
  const decrease = useBear((state) => state.decrement);

  const clickHandler = () => {};

  const incrementHandler = () => {};
  const decrementHandler = () => {
    console.log("hello");
  };

  return (
    <div className="max-w-300 m-auto my-10 flex flex-wrap justify-center gap-4">
      {data.map((item) => {
        const { id, title, price, image } = item;

        return (
          <div
            className="flex flex-col gap-1 items-center border-2 rounded-[0.7rem] px-4 py-2"
            key={id}
          >
            <p>{title.split(" ", 1)}</p>
            <div className="w-32 h-32 relative">
              <Image
                fill
                sizes="90vw"
                loading="eager"
                src={image}
                alt="imagePic"
              />
            </div>
            <span>price {price}</span>

            <div className="flex text-[1rem]">
              <Button className="text-[1rem]" onClick={() => console.log("hi")}>
                Decrement
              </Button>
              {QuantityHandler(id)}
              <Button
                className="text-[1rem]"
                onClick={() => increase(item, id)}
              >
                Increment
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
