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
import { message } from "antd";

interface Voucher {
  voucherId: number;
  code: string;
  discountPercent: number;
  quantity: number;
  vouchersStatus: number;
  dateFrom: string;
  dateTo: string;
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

  const [warning, setWarning] = useState({
    code: "",
    discountPercent: "",
    quantity: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // Validate code input to allow only alphanumeric characters
    const parsedValue =
      name === "code"
        ? value.replace(/[^\w]/g, "").slice(0, 6) // Remove special characters and limit length to 6 characters
        : name === "vouchersStatus" || name === "quantity"
          ? parseInt(value, 10)
          : name === "discountPercent"
            ? parseInt(value, 10) // Parse discount percent as integer
            : value;

    // Set warnings based on field validation
    if (name === "code") {
      if (value.length < 4 || value.length > 6) {
        setWarning((prev) => ({
          ...prev,
          code: "Code must be between 4 and 6 characters",
        }));
      } else {
        setWarning((prev) => ({
          ...prev,
          code: "",
        }));
      }
    } else if (name === "discountPercent") {
      const discountValue = parseInt(value, 10);
      if (discountValue < 1) {
        setWarning((prev) => ({
          ...prev,
          discountPercent: "Discount percent must be at least 1",
        }));
      } else if (discountValue >= 50 && discountValue <= 80) {
        setWarning((prev) => ({
          ...prev,
          discountPercent: "Discount percent is 50 or more. Please confirm",
        }));
      } else if (discountValue > 80) {
        setWarning((prev) => ({
          ...prev,
          discountPercent: "Discount percent must not exceed 80",
        }));
      } else {
        setWarning((prev) => ({
          ...prev,
          discountPercent: "",
        }));
      }
    } else if (name === "quantity") {
      if (parseInt(value, 10) < 1) {
        setWarning((prev) => ({
          ...prev,
          quantity: "Quantity must be at least 1",
        }));
      } else {
        setWarning((prev) => ({
          ...prev,
          quantity: "",
        }));
      }
    }

    setUpdatedVoucher((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if there are any warnings before submitting
    if (warning.code || warning.discountPercent || warning.quantity) {
      setError("Please fix the fields with warnings before submitting.");
      return;
    }

    try {
      await axios.put(
        `https://milkapplicationapi.azurewebsites.net/api/Vouchers/UpdateVouchers/${updatedVoucher.voucherId}`,
        updatedVoucher,
      );

      setVouchers((prevVouchers) =>
        prevVouchers.map((v) =>
          v.voucherId === updatedVoucher.voucherId ? updatedVoucher : v,
        ),
      );

      onCancel();

      // Display success message
      message.success("Voucher updated successfully!");
    } catch (error) {
      console.error("Error updating voucher:", error);
      setError("Error updating voucher");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Voucher</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="">
            <div className="mb-3">
              <Label>Code</Label>
              <input
                type="text"
                name="code"
                value={updatedVoucher.code}
                onChange={handleChange}
                placeholder="Code"
                className="mt-2 w-full rounded-md border border-gray-300 p-2"
                required
              />
              {warning.code && (
                <p className="mt-1 text-yellow-500">{warning.code}</p>
              )}
            </div>
            <div className="flex">
              <div>
                <Label>Discount Percent</Label>
                <input
                  type="number"
                  name="discountPercent"
                  value={updatedVoucher.discountPercent}
                  onChange={handleChange}
                  placeholder="Discount Percent"
                  className="mt-2 rounded-md border border-gray-300 p-2"
                  min="1" // Set min value to 1
                  required
                />
                {warning.discountPercent && (
                  <p className="mt-1 text-yellow-500">
                    {warning.discountPercent}
                  </p>
                )}
              </div>

              <div>
                <Label>Quantity</Label>
                <input
                  type="number"
                  name="quantity"
                  value={updatedVoucher.quantity}
                  onChange={handleChange}
                  placeholder="Quantity"
                  className="mt-2 rounded-md border border-gray-300 p-2"
                  required
                />
                {warning.quantity && (
                  <p className="mt-1 text-yellow-500">{warning.quantity}</p>
                )}
              </div>
            </div>
            <div className="mt-3">
              <div>
                <Label>Status</Label>
              </div>
              <select
                title="a"
                name="vouchersStatus"
                value={updatedVoucher.vouchersStatus}
                onChange={handleChange}
                className="mt-2 rounded-md border border-gray-300 p-2"
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
