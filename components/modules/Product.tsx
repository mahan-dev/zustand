import Image from "next/image";

import { dataDetail } from "@/helper/dataFetcher";
import { quantityCounter } from "@/helper/quantityHandler";
import { Button } from "@/ui/button";

import { useBear } from "../store/Store";

interface ProductDetails {
  data: dataDetail;
}
const Product = ({ data }: ProductDetails) => {

  const { image, id, title, price } = data;
  const increase = useBear((state) => state.increment);
//   const quantity = useBear((state) => state.quantity);
 const isQuantity = useBear((state) => quantityCounter(state, id));
  return (
    <div
      className="flex flex-col gap-1 items-center border-2 rounded-[0.7rem] px-4 py-2"
      key={id}
    >
      <p>{title.split(" ", 1)}</p>
      <div className="w-32 h-32 relative">
        <Image fill sizes="90vw" loading="eager" src={image} alt="imagePic" />
      </div>
      <span>price {price}</span>

      <div className="flex text-[1rem]">
        <Button className="text-[1rem]" onClick={() => console.log("hi")}>
          Decrement
        </Button>
        {isQuantity}
        <Button className="text-[1rem]" onClick={() => increase(data, id)}>
          Increment
        </Button>
      </div>
    </div>
  );
};

export default Product;
