import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UpdateStatusDialogProps {
  orderId: number;
  currentStatus: number;
  onUpdateStatus: (orderId: number, newStatus: number) => Promise<void>;
}

const statusOptions = [
  { value: 1, label: "Paid" },
  { value: 2, label: "Processing" },
  { value: 3, label: "Delivering" },
  { value: 4, label: "Delivered" },
];

// Define valid transitions with both number and string keys
const validTransitions: Record<number | string, number[]> = {
  1: [2], // From Paid to Processing
  2: [3], // From Processing to Delivering
  3: [4], // From Delivering to Delivered
};

const UpdateStatusDialog: React.FC<UpdateStatusDialogProps> = ({
  orderId,
  currentStatus,
  onUpdateStatus,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<number>(currentStatus);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  useEffect(() => {
    setSelectedStatus(currentStatus);
  }, [currentStatus]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = Number(e.target.value);
    setSelectedStatus(newStatus);
  };

  const handleUpdateClick = () => {
    if (validTransitions[currentStatus]?.includes(selectedStatus)) {
      setIsConfirmOpen(true);
    } else {
      toast.error("Invalid status update sequence.");
    }
  };

  const handleConfirmUpdate = () => {
    setIsConfirmOpen(false);
    onUpdateStatus(orderId, selectedStatus)
      .then(() => {
        toast.success("Order status updated successfully!");
      })
      .catch((error) => {
        toast.error(`Failed to update order status: ${error.message}`);
      });
  };

  return (
    <>
      <ToastContainer />
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Update</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Select a new status for the order and click "Update" when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <select
                title="st"
                id="status"
                value={selectedStatus}
                onChange={handleStatusChange}
                className="col-span-3 rounded-md border-gray-300 px-3 py-1 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {statusOptions
                  .filter((option) => option.value > currentStatus)
                  .map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleUpdateClick}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isConfirmOpen && (
        <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Update</DialogTitle>
              <DialogDescription>
                Are you sure you want to update the order status?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="button" onClick={() => setIsConfirmOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleConfirmUpdate}>
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default UpdateStatusDialog;
