import { create } from "zustand";

interface UseLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useLoginModal = create<UseLoginModalProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
