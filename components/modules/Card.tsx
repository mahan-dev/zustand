import Image from "next/image";
import React from "react";

import { dataResponse } from "@/helper/dataFetcher";

const Card = ({ data }: dataResponse) => {
  console.log(data);
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {data.map((item) => {
        const { id, title, price, description, image } = item;
        return (
          <div
            className="flex flex-col gap-1 items-center border-2 rounded-2xl px-4 py-2"
            key={id}
          >
            <p>{title.split(" ", 1)}</p>
            <div className="w-32 h-32 relative">
              <Image fill src={image} alt="imagePic" />
            </div>
              <span>price {price}</span>
            {/* <p>{description}</p> */}
          </div>
        );
      })}
    </div>
  );
};

export default Card;
