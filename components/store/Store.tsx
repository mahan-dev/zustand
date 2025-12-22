"use client";
import { create } from "zustand";

interface BearState {
  bears: number;
  increment: () => void;
  decrement: () => void;
  removeAll: () => void;
  updateBears: (newBears: number) => void;
}

export const useBear = create<BearState>((set) => ({
  bears: 0,
  increment: () => set(({ bears }) => ({ bears: bears + 1 })),
  decrement: () => set(({ bears }) => ({ bears: bears > 0 ? bears - 1 : 0 })),
  removeAll: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));
