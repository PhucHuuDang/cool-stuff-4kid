import { create } from "zustand";

interface UseConfirmDialogProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useConfirmDialog = create<UseConfirmDialogProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
