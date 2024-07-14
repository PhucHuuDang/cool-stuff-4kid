import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

interface Voucher {
  voucherId: number;
  code: string;
  discountPercent: number;
  quantity: number;
  vouchersStatus: number;
  date: string;
}

interface CreateVoucherFormProps {
  setVouchers: React.Dispatch<React.SetStateAction<Voucher[]>>;
  fetchVouchers: () => void;
}

export const CreateVoucherForm: React.FC<CreateVoucherFormProps> = ({
  setVouchers,
  fetchVouchers,
}) => {
  const [newVoucher, setNewVoucher] = useState<Voucher>({
    voucherId: 0,
    code: "",
    discountPercent: 1,
    quantity: 1,
    vouchersStatus: 1,
    date: new Date().toISOString(),
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    let parsedValue: string | number = value;
    if (name !== "code") {
      parsedValue = parseInt(value, 10);
      if (isNaN(parsedValue)) {
        parsedValue = 0;
      }
    }

    setNewVoucher((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const codePattern = /^[a-zA-Z0-9]{4,6}$/;

    if (
      !newVoucher.code.trim() ||
      !codePattern.test(newVoucher.code) ||
      newVoucher.discountPercent <= 0 ||
      newVoucher.quantity < 1
    ) {
      setError(
        "All fields must be filled correctly. Code must be 4-6 alphanumeric characters without special characters.",
      );
      return;
    }

    try {
      const response = await axios.post(
        "https://milkapplication20240705013352.azurewebsites.net/api/Vouchers/CreateVouchers",
        { ...newVoucher, voucherId: 0 },
      );

      setVouchers((prev) => [...prev, response.data]);
      fetchVouchers();
      setNewVoucher({
        voucherId: 0,
        code: "",
        discountPercent: 1,
        quantity: 1,
        vouchersStatus: 1,
        date: new Date().toISOString(),
      });
      setError(null);
    } catch (error) {
      console.error("Error creating voucher:", error);
      setError("Error creating voucher");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        Create Voucher
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Voucher</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new voucher.
          </DialogDescription>
        </DialogHeader>
        {error && (
          <Alert variant="destructive">
            <span>{error}</span>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <Label>Code</Label>
            <input
              type="text"
              name="code"
              value={newVoucher.code}
              onChange={handleChange}
              placeholder="Code"
              className="rounded-md border border-gray-300 p-2"
              required
              minLength={4}
              maxLength={6}
              pattern="[a-zA-Z0-9]{4,6}"
              title="Code must be 4-6 alphanumeric characters without special characters."
            />
          </div>
          <div>
            <Label>Discount Percent</Label>
            <input
              type="number"
              name="discountPercent"
              value={newVoucher.discountPercent}
              onChange={handleChange}
              placeholder="Discount Percent"
              className="rounded-md border border-gray-300 p-2"
              required
              min={1}
            />
          </div>
          <div>
            <Label>Quantity</Label>
            <input
              type="number"
              name="quantity"
              value={newVoucher.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              className="rounded-md border border-gray-300 p-2"
              required
              min={1}
            />
          </div>
          <DialogFooter className="col-span-2 mt-4">
            <button
              type="submit"
              className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Create Voucher
            </button>
            <DialogClose className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
              Cancel
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
