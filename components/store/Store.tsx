"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";

import { BASE_URL } from "@/api/api";
import { dataDetail, fetchProducts } from "@/helper/dataFetcher";
import { priceHandler, totalItems } from "@/helper/storeHelper";
import { Action, BearStorage, State } from "@/interface/store/store";
import { FormState, ItemDetails } from "@/types/helper/type";
interface BearStorageAsync {
  data: ItemDetails | null;
  error: string | null;
  setData: (newData: FormState) => void;
}

interface AsyncAction {
  add: () => void;
  stateNumber: number;
}

interface ProductStoreState {
  product: dataDetail[];
  loading: boolean;
  error: null | string;
  fetchProducts: () => Promise<void>;
}

const useBear = create<State & Action>()(
  persist(
    (set) => ({
      products: [],
      total: 0,
      price: 0,

      add: (card: dataDetail) =>
        set((state) => {
          const isExists = state.products.findIndex(
            (item) => item.id === card.id
          );

          const products: State["products"] = [...state.products];

          if (isExists === -1) {
            products.push({ ...card, quantity: 1 });
          }

          return {
            products,
            total: totalItems(products),
            price: priceHandler(products),
          };
        }),

      increment: (card: dataDetail) =>
        set((state) => {
          const index = state.products.findIndex((item) => item.id === card.id);

          const updateIndex: State["products"] = [...state.products];
          if (index !== -1) {
            updateIndex[index] = {
              ...updateIndex[index],
              quantity: updateIndex[index].quantity + 1,
            };
            return {
              products: updateIndex,
              total: totalItems(updateIndex),
              price: priceHandler(updateIndex),
            };
          }

          return {
            products: [...state.products, { ...card, quantity: 1 }],
            total: totalItems(updateIndex),
            price: priceHandler(updateIndex),
          };
        }),

      decrement: (card: dataDetail) =>
        set((state) => {
          const index = state.products.findIndex((item) => item.id === card.id);

          const updateIndex: State["products"] = [...state.products];
          if (index !== -1) {
            updateIndex[index] = {
              ...updateIndex[index],
              quantity: Math.max(0, updateIndex[index].quantity - 1),
            };
            return {
              products: updateIndex,
              total: totalItems(updateIndex),
              price: priceHandler(updateIndex),
            };
          }

          return {
            products: [...state.products, { ...card, quantity: 1 }],
            total: totalItems(updateIndex),
            price: priceHandler(updateIndex),
          };
        }),

      remove: (card: dataDetail) =>
        set((state) => {
          const filteredProducts = state.products.filter(
            (item) => item.id !== card.id
          );

          return {
            products: filteredProducts,
            total: totalItems(filteredProducts),
            price: priceHandler(filteredProducts),
          };
        }),
    }),
    {
      name: "product-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

const useBearStore = create<BearStorage>()(
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

const usePersistedBearStore = create<BearStorageAsync>()(
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

const useAsyncBearStore = create<AsyncAction>()(
  persist(
    (set, get) => ({
      stateNumber: 0,
      add: async () => {
        console.log("clicked");

        await new Promise((resolver) => setTimeout(resolver, 1000));

        set({ stateNumber: get().stateNumber + 1 });
      },
    }),
    {
      name: "Async | Actions",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

const useProductStore = create<ProductStoreState>()((set) => ({
  product: [],
  loading: false,
  error: null,
  fetchProducts: async () => await fetchProducts(set),
}));

export type { ProductStoreState };

export {
  useBear,
  useBearStore,
  usePersistedBearStore,
  useAsyncBearStore,
  useProductStore,
};
