import { create } from "zustand";

interface UseDrawerCartProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useDrawerCart = create<UseDrawerCartProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
