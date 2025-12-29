import { ProductStore, State } from "@/interface/store/store";

const quantityCounter = (state: State, id: number) => {
  const product = state.products.findIndex((item) => item.id === id);
  if (product === -1) return 0;
  else {
    return state.products[product].quantity;
  }
};

const totalItems = (state: ProductStore[]) => {
  return state.reduce((acc, cur) => acc + cur.quantity, 0);
};

const priceHandler = (state: ProductStore[]) => {
  const res = +state
    .reduce((acc, cur) => acc + cur.quantity * cur.price, 0)
    .toFixed(2);
  console.log(res);
  return res;
};

export { quantityCounter, totalItems, priceHandler };
