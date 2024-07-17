"use client";

import { FormSubmit } from "@/components/form/form-submit";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";

interface ConfirmDialogProps {
  handleSubmitOrder: () => void;
}

export const ConfirmDialog = ({ handleSubmitOrder }: ConfirmDialogProps) => {
  const confirmDialog = useConfirmDialog();

  return (
    <AlertDialog
      open={confirmDialog.isOpen}
      onOpenChange={confirmDialog.onClose}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc chắn muốn tiến hành thanh toán đơn hàng của mình không?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Hãy xác nhận để tiến hành thanh toán đơn hàng của bạn
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction className="bg-sky-500 text-slate-200 duration-200 hover:bg-sky-600">
            <FormSubmit
              variant="book"
              className="w-full"
              onClick={handleSubmitOrder}
            >
              Xác nhận
            </FormSubmit>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
