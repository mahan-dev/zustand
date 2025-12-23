"use client";
import { error } from "console";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";

import { Action, BearStorage, State } from "@/interface/store/store";
import { FormState, FormStatus, ItemDetails } from "@/types/helper/type";

export const useBear = create<State & Action>((set) => ({
  bears: 0,
  increment: () => set(({ bears }) => ({ bears: bears + 1 })),
  decrement: () => set(({ bears }) => ({ bears: bears > 0 ? bears - 1 : 0 })),
  removeAll: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));

export const useBearStore = create<BearStorage>()(
  persist(
    (set, get) => ({
      bears: 0,
      addABear: () => set({ bears: get().bears + 1 }),
    }),
    {
      name: "bear-storage",
      //   storage: createJSONStorage(() => localStorage),
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
