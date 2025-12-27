"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";

import { dataDetail } from "@/helper/dataFetcher";
import { Action, BearStorage, State } from "@/interface/store/store";
import { FormState, ItemDetails } from "@/types/helper/type";

export const useBear = create<State & Action>()(
  persist(
    (set, get) => ({
      products: [],
      increment: (card: dataDetail, id: number) =>
        set((state) => {
          // const product = state?.products.find((p) => p.id === id);
          console.log("🌮 ~ Store.tsx:16 -> state: ", state);
          console.log("🎃 ~ Store.tsx:14 -> id: ", id);
          console.log("🚞 ~ Store.tsx:14 -> item: ", { ...card });

          console.log(card);
          const isQuantity = state.products.find((item) => item.id === card.id);

          if (isQuantity)
            return {
              ...state,
              products: [
                ...state.products,
                {
                  ...card,
                  quantity: isQuantity.quantity ? isQuantity.quantity++ : 1,
                },
              ],
            };
          else console.log("false");
          console.log(state.products.map((item) => item));

          return {
            ...state,
            products: [...state.products, { ...card, quantity: 1 }],
          };

          // return {
          //   ...state,
          //   products: state.products.map((productItem) =>
          //     productItem.id === card.id
          //       ? {
          //           ...productItem,
          //           quantity: productItem.quantity
          //             ? productItem.quantity + 1
          //             : 0,
          //         }
          //       : productItem
          //   ),
          // };
        }),
      quantity: (id: number) => {
        // console.log(id);
        const getQuantity = get().products.find((p) => p.id === id);
        // console.log(getQuantity);
        return getQuantity?.quantity ?? 0;
      },
    }),
    {
      name: "product-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useBearStore = create<BearStorage>()(
  persist(
    (set, get) => ({
      bears: 0,
      addABear: () => set({ bears: get().bears + 1 }),
    }),
    {
      name: "Product - Storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface BearStorageAsync {
  data: ItemDetails | null;
  error: string | null;
  setData: (newData: FormState) => void;
}

export const usePersistedBearStore = create<BearStorageAsync>()(
  persist(
    (set) => ({
      data: null,
      error: null,
      setData: (newData) => set({ data: newData?.data, error: newData?.error }),
    }),
    {
      name: "persisted-bear-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
