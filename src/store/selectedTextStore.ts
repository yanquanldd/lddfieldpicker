import { create } from "zustand";

interface selectedTextState {
  text: string;
  setText: (value: string) => void;
}

export const useSelectedTextStore = create<selectedTextState>((set) => ({
  text: "",
  setText: (value) => set(() => ({ text: value })),
}));
