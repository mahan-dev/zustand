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
      total: 0,
      add: (card: dataDetail) =>
        set((state) => {
          const isExists = state.products.findIndex(
            (item) => item.id === card.id
          );
          if (isExists === -1) {
            return {
              products: [...state.products, { ...card, quantity: 1 }],
            };
          }
          return { products: [...state.products, { ...card, quantity: 1 }] };
        }),
      increment: (card: dataDetail) =>
        set((state) => {
          const index = state.products.findIndex((item) => item.id === card.id);

          if (index !== -1) {
            const updateIndex = [...state.products];

            updateIndex[index] = {
              ...updateIndex[index],
              quantity: updateIndex[index].quantity + 1,
            };

            return {
              products: updateIndex,
            };
          }

          return {
            products: [...state.products, { ...card, quantity: 1 }],
          };
        }),

      decrement: (card: dataDetail) =>
        set((state) => {
          const index = state.products.findIndex((item) => item.id === card.id);

          if (index !== -1) {
            const updateIndex = [...state.products];
            updateIndex[index] = {
              ...updateIndex[index],
              quantity: Math.max(0, updateIndex[index].quantity - 1),
            };
            return {
              products: updateIndex,
            };
          }

          return {
            products: [...state.products, { ...card, quantity: 1 }],
          };
        }),

      remove: (card: dataDetail) =>
        set((state) => ({
          products: state.products.filter((item) => item.id !== card.id),
        })),

      // quantity: (id: number) => {
      //   const getQuantity = get().products.find((p) => p.id === id);
      //   if (!getQuantity?.quantity) return 0;
      //   else if (getQuantity.quantity) return getQuantity.quantity;

      //   return getQuantity.quantity || 0;
      // },
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
