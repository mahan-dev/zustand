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
          const exists = state.products.find((item) => item.id === card.id);

          if (exists) {
            return {
              products: state.products.map((p) =>
                p.id === card.id ? { ...p, quantity: p.quantity + 1 } : p
              ),
            };
          }
          return {
            products: [...state.products, { ...card, quantity: 1 }],
          };
        }),
      quantity: (id: number) => {
        // console.log(id);
        const getQuantity = get().products.find((p) => p.id === id);
        if (!getQuantity?.quantity) return 0;
        else if (getQuantity.quantity) return getQuantity.quantity;

        return getQuantity.quantity || 0;
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
