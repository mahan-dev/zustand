import { ProductStore, State } from "@/interface/store/store";

type ProductCalculator = (state: ProductStore[]) => number;
type QuantityCalculator = (state: State, id: number) => number;

const quantityCounter: QuantityCalculator = (state, id) => {
  const product = state.products.findIndex((item) => item.id === id);
  if (product === -1) return 0;
  else {
    return state.products[product].quantity;
  }
};

const totalItems: ProductCalculator = (state) => {
  return state.reduce((acc, cur) => acc + cur.quantity, 0);
};

const priceHandler: ProductCalculator = (state) => {
  return +state
    .reduce((acc, cur) => acc + cur.quantity * cur.price, 0)
    .toFixed(2);
};

export { quantityCounter, totalItems, priceHandler };
