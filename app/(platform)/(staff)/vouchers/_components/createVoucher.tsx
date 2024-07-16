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
    dateFrom: new Date().toISOString().slice(0, 10),
    dateTo: new Date().toISOString().slice(0, 10),
  });

  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState({
    code: null as string | null,
    discountPercent: null as string | null,
    quantity: null as string | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    let parsedValue: string | number = value;
    if (name !== "code" && name !== "dateFrom" && name !== "dateTo") {
      parsedValue = parseInt(value, 10);
      if (isNaN(parsedValue)) {
        parsedValue = 0;
      }
    }

    if (name === "code") {
      if (value.length > 6 || !/^[a-zA-Z0-9]*$/.test(value)) {
        setWarning((prev) => ({
          ...prev,
          code: "Code must be 4-6 alphanumeric characters without special characters.",
        }));
      } else {
        setWarning((prev) => ({
          ...prev,
          code: null,
        }));
      }
    } else if (name === "discountPercent" && typeof parsedValue === "number") {
      if (parsedValue >= 50) {
        setWarning((prev) => ({
          ...prev,
          discountPercent: "Discount percent is 50 or more. Please confirm.",
        }));
      } else {
        setWarning((prev) => ({
          ...prev,
          discountPercent: null,
        }));
      }

      if (parsedValue > 80) {
        parsedValue = 80; // Ensure the value doesn't exceed 80
      }
    } else if (name === "quantity" && typeof parsedValue === "number") {
      if (parsedValue < 1) {
        setWarning((prev) => ({
          ...prev,
          quantity: "Quantity must be at least 1.",
        }));
      } else {
        setWarning((prev) => ({
          ...prev,
          quantity: null,
        }));
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
        "https://milkapplicationapi.azurewebsites.net/api/Vouchers/CreateVouchers",
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
        dateFrom: new Date().toISOString().slice(0, 10),
        dateTo: new Date().toISOString().slice(0, 10),
      });
      setError(null);
      setWarning({
        code: null,
        discountPercent: null,
        quantity: null,
      });

      message.success("Voucher created successfully!");
    } catch (error) {
      console.error("Error creating voucher:", error);
      setError("Error creating voucher");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="transform rounded-md bg-blue-500 px-4 py-2 text-white transition duration-200 ease-in-out hover:scale-105 hover:bg-blue-600">
        Create Voucher
      </DialogTrigger>
      <DialogContent className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Create a New Voucher
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Fill out the form below to create a new voucher.
          </DialogDescription>
        </DialogHeader>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <span>{error}</span>
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label
              htmlFor="code"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Code
            </Label>
            <input
              type="text"
              name="code"
              id="code"
              value={newVoucher.code}
              onChange={handleChange}
              placeholder="Code"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={4}
              maxLength={6}
              pattern="[a-zA-Z0-9]{4,6}"
              title="Code không được để trống, phải có 4 - 6 kí tự và không có kí tự đặc biệt."
            />
            {warning.code && (
              <div className="mt-1 text-sm text-yellow-500">{warning.code}</div>
            )}
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <Label
                htmlFor="discountPercent"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Discount Percent
              </Label>
              <input
                type="number"
                name="discountPercent"
                id="discountPercent"
                value={newVoucher.discountPercent}
                onChange={handleChange}
                placeholder="Discount Percent"
                className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min={1}
                max={80}
              />
              {warning.discountPercent && (
                <div className="mt-1 text-sm text-yellow-500">
                  {warning.discountPercent}
                </div>
              )}
            </div>
            <div className="w-1/2">
              <Label
                htmlFor="quantity"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Quantity
              </Label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                value={newVoucher.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min={1}
              />
              {warning.quantity && (
                <div className="mt-1 text-sm text-yellow-500">
                  {warning.quantity}
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="mt-6 flex justify-end space-x-4">
            <button
              type="submit"
              className="transform rounded-md bg-blue-500 px-4 py-2 text-white transition duration-200 ease-in-out hover:scale-105 hover:bg-blue-600"
            >
              Create Voucher
            </button>
            <DialogClose className="transform rounded-md bg-gray-500 px-4 py-2 text-white transition duration-200 ease-in-out hover:scale-105 hover:bg-gray-600">
              Cancel
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
