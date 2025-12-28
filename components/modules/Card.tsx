import { dataResponse } from "@/helper/dataFetcher";
import Product from "@/modules/Product";

const Card = ({ data }: dataResponse) => {
  return (
    <div className="max-w-300 m-auto my-10 flex flex-wrap justify-center gap-4">
      {data.map((item) => {
        return <Product key={item.id} data={item} />;
      })}
    </div>
  );
};

export default Card;
