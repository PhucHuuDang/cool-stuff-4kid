import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Voucher {
  voucherId: number;
  code: string;
  discountPercent: number;
  quantity: number;
  vouchersStatus: number;
  date: string;
}

interface UpdateVoucherFormProps {
  voucher: Voucher;
  setVouchers: React.Dispatch<React.SetStateAction<Voucher[]>>;
  onCancel: () => void;
  isOpen: boolean;
}

export const UpdateVoucherForm: React.FC<UpdateVoucherFormProps> = ({
  voucher,
  setVouchers,
  onCancel,
  isOpen,
}) => {
  const [updatedVoucher, setUpdatedVoucher] = useState<Voucher>({ ...voucher });
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // Validate code input to allow only alphanumeric characters
    const parsedValue =
      name === "code"
        ? value.replace(/[^\w]/g, "").slice(0, 6) // Remove special characters and limit length to 6 characters
        : name === "vouchersStatus" ||
            name === "quantity" ||
            name === "discountPercent"
          ? parseInt(value, 10)
          : value;

    setUpdatedVoucher((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (updatedVoucher.code.length < 4 || updatedVoucher.code.length > 6) {
      setError("Code must be between 4 and 6 characters");
      return;
    }

    if (updatedVoucher.discountPercent < 1) {
      setError("Discount percent must be at least 1");
      return;
    }

    try {
      await axios.put(
        `https://milkapplication20240705013352.azurewebsites.net/api/Vouchers/UpdateVouchers/${updatedVoucher.voucherId}`,
        updatedVoucher,
      );

      setVouchers((prevVouchers) =>
        prevVouchers.map((v) =>
          v.voucherId === updatedVoucher.voucherId ? updatedVoucher : v,
        ),
      );

      onCancel();
    } catch (error) {
      console.error("Error updating voucher:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Voucher</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Code</Label>
              <input
                type="text"
                name="code"
                value={updatedVoucher.code}
                onChange={handleChange}
                placeholder="Code"
                className="rounded-md border border-gray-300 p-2"
                required
              />
            </div>

            <div>
              <Label>Discount Percent</Label>
              <input
                type="number"
                name="discountPercent"
                value={updatedVoucher.discountPercent}
                onChange={handleChange}
                placeholder="Discount Percent"
                className="rounded-md border border-gray-300 p-2"
                min="1" // Set min value to 1
                required
              />
            </div>

            <div>
              <Label>Quantity</Label>
              <input
                type="number"
                name="quantity"
                value={updatedVoucher.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="rounded-md border border-gray-300 p-2"
                required
              />
            </div>

            <div>
              <Label>Status</Label>
              <select
                title="a"
                name="vouchersStatus"
                value={updatedVoucher.vouchersStatus}
                onChange={handleChange}
                className="rounded-md border border-gray-300 p-2"
                required
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>
          </div>
          {error && <p className="mt-2 text-red-500">{error}</p>}
          <DialogFooter className="mt-4">
            <button
              type="submit"
              className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Update Voucher
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
            >
              Cancel
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
