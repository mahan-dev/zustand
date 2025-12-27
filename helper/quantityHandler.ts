import { State } from "@/interface/store/store";

export const quantityCounter = (state: State, id: number) => {
  //   const product = state.products.find((item) => item.id === id);
  //   return product ? product.quantity : 0;

  const product = state.products.findIndex((item) => item.id === id);
  if (product === -1) return 0;
  else {
    return state.products[product].quantity;
  }
};
