"use client";

import { create, createStore } from "zustand";
import { combine, persist, redux } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

import { dataDetail, fetchProducts } from "@/helper/dataFetcher";
import { priceHandler, totalItems } from "@/helper/storeHelper";
import { Action, BearStorage, State } from "@/interface/store/store";
import {
  AsyncAction,
  BearFamilyMealsStore,
  BearStorageAsync,
  ImmerStore,
  IncrementStore,
  ProductStoreState,
} from "@/store/interface/interface";

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

// ! increment Shallow

const useIncrement = createWithEqualityFn<IncrementStore>(
  (set) => ({
    a: 1,
    b: 2,
    incrementByOne: () => {
      set((state) => ({
        a: state.a + 1,
        b: state.b + 1,
      }));
    },
  }),
  shallow
);

const useIncrementCombine = create(
  combine({ storage: "bugatti", bears: 2 }, (set) => ({
    incrementByOne: () =>
      set((state) => ({
        storage: "Ferrari",
        bears: state.bears + 1,
      })),
  }))
);

const useBearFamilyMealsStore = create<BearFamilyMealsStore>()(() => ({
  papaBear: "large porridge-pot",
  mamaBear: "middle-size porridge pot",
  babyBear: "A little, small, wee pot",
}));

const useStoreImmer = create<ImmerStore>()(
  immer((set) => ({
    todos: [],
    addTodos: (text) =>
      set((state) => {
        state.todos.push({ id: Date.now(), text });
      }),
  }))
);

type PersonStoreState = {
  firstName: string;
  lastName: string;
  email: string;
};

type PersonStoreAction =
  | { type: "person/setFirstName"; payload: string }
  | { type: "person/setLastName"; payload: string }
  | { type: "person/setEmail"; payload: string };

type PersonStore = PersonStoreState & {
  dispatch: (action: PersonStoreAction) => PersonStoreAction;
};

const personStoreInitialState: PersonStoreState = {
  firstName: "ashley",
  lastName: "havkings",
  email: "ashley@gmail.com",
};

const personStoreReducer = (
  state: PersonStoreState,
  action: PersonStoreAction
) => {
  const { payload, type } = action;

  switch (type) {
    case "person/setFirstName":
      return { ...state, firstName: payload };
    case "person/setLastName":
      return { ...state, lastName: payload };
    case "person/setEmail":
      return { ...state, email: payload };
    default: {
      return state;
    }
  }
};

const reduxStore = createStore<PersonStore>()(
  redux(personStoreReducer, personStoreInitialState)
);

export type { ProductStoreState };

export {
  useBear,
  useBearStore,
  usePersistedBearStore,
  useAsyncBearStore,
  useProductStore,
  useBearFamilyMealsStore,
  useIncrement,
  useIncrementCombine,
  useStoreImmer,
  reduxStore
};
