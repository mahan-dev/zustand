"use client";
import { useIncrementCombine } from "@/store/Store";
import { Button } from "@/ui/button";

const Combine = () => {
  const {
    storage: aCombine,
    bears,
    incrementByOne: incrementCombine,
  } = useIncrementCombine();
  return (
    <div className="flex flex-col">
      <Button className="w-fit" onClick={incrementCombine}>
        Increment
      </Button>
      Storage: {aCombine}
      <br />
      Bears: {bears}
    </div>
  );
};

export default Combine;
