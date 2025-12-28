"use client";
import Image from "next/image";

import { dataDetail } from "@/helper/dataFetcher";
import { quantityCounter } from "@/helper/quantityHandler";
import { wordFormatter } from "@/helper/titleFormatter";
import { useBear } from "@/store/Store";
import { Button } from "@/ui/button";

interface ProductDetails {
  data: dataDetail;
}
const Product = ({ data }: ProductDetails) => {
  const { image, id, title, price } = data;
  const increase = useBear((state) => state.increment);
  const decrease = useBear((state) => state.decrement);

  const quantity = useBear((state) => quantityCounter(state, id));
  return (
    <div
      className=" w-57.5 flex flex-col gap-1 items-center border-2 rounded-[0.7rem] px-4 py-2"
      key={id}
    >
      <p className="text-[1rem]">{wordFormatter(title)}</p>
      <div className="w-32 h-32 relative">
        <Image fill sizes="90vw" loading="eager" src={image} alt="imagePic" />
      </div>
      <span>price {price}</span>

      <div className="w-full flex justify-between  text-[1rem]">
        <Button className="text-[1rem]" onClick={() => decrease(data)}>
          -
        </Button>
        {quantity}
        <Button className="text-[1rem]" onClick={() => increase(data)}>
          +
        </Button>
      </div>
    </div>
  );
};

export default Product;
