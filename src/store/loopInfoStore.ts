import { create } from "zustand";

interface isInLoopState {
  isInLoop: boolean;
  setIsInLoop: (value: boolean) => void;
  currentLoopField: string;
  setCurrentLoopField: (value: string) => void;
}

export const useIsInLoopStore = create<isInLoopState>((set) => ({
  isInLoop: false,
  setIsInLoop: (value) => set(() => ({ isInLoop: value })),
  currentLoopField: "",
  setCurrentLoopField: (value) => set(() => ({ currentLoopField: value })),
}));
