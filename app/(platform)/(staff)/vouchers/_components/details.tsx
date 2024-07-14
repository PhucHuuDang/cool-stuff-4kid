"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateVoucherForm } from "./createVoucher";
import { UpdateVoucherForm } from "./updateVoucher";
import {
  PencilIcon,
  TrashIcon,
  SearchIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Voucher {
  voucherId: number;
  code: string;
  discountPercent: number;
  quantity: number;
  vouchersStatus: number;
  date: string;
}

export const VoucherManagement = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [editingVoucher, setEditingVoucher] = useState<Voucher | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortByDiscount, setSortByDiscount] = useState<"asc" | "desc">("asc");
  const [filterStatus, setFilterStatus] = useState<number | null>(null); // State cho việc lọc theo trạng thái

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Voucher[]>(
        "https://milkapplication20240705013352.azurewebsites.net/api/Vouchers/GetAllVouchers",
      );
      setVouchers(response.data);
    } catch (error) {
      setError("Error fetching vouchers");
      console.error("Error fetching vouchers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (voucher: Voucher) => {
    setEditingVoucher(voucher);
    setIsDialogOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingVoucher(null);
    setIsDialogOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `https://milkapplication20240705013352.azurewebsites.net/api/Vouchers/DeleteVouchers/${id}`,
      );
      setVouchers((prevVouchers) =>
        prevVouchers.filter((voucher) => voucher.voucherId !== id),
      );
    } catch (error) {
      console.error("Error deleting voucher:", error);
      // Handle error state if necessary
    }
  };

  const getStatus = (status: number) => {
    return status === 1 ? (
      <span className="text-green-500">Active</span>
    ) : (
      <span className="text-red-500">Inactive</span>
    );
  };

  const sortVouchersByDiscount = () => {
    const sortedVouchers = [...vouchers];
    if (sortByDiscount === "asc") {
      sortedVouchers.sort((a, b) => a.discountPercent - b.discountPercent);
      setSortByDiscount("desc");
    } else {
      sortedVouchers.sort((a, b) => b.discountPercent - a.discountPercent);
      setSortByDiscount("asc");
    }
    setVouchers(sortedVouchers);
  };

  const handleFilterStatus = (status: string) => {
    if (status === "all") {
      setFilterStatus(null); // Chọn "All" thì filterStatus là null
    } else {
      setFilterStatus(parseInt(status)); // Chọn Active hoặc Inactive
    }
  };

  const filteredVouchers = vouchers.filter((voucher) => {
    const code = voucher.code || ""; // Handle case where voucher.code might be undefined
    return (
      code.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === null || voucher.vouchersStatus === filterStatus)
    );
  });

  return (
    <div className="">
      <div className="mb-4 flex justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by code"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-60 rounded-lg py-2 pl-8 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          {loading && <p className="ml-4">Loading...</p>}
          {error && <p className="ml-4 text-red-500">{error}</p>}
        </div>
        <CreateVoucherForm
          setVouchers={setVouchers}
          fetchVouchers={fetchVouchers}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-[#FCFBF4] hover:bg-[#FCFBF4]">
            <TableHead>ID</TableHead>
            <TableHead>Code</TableHead>
            <TableHead className="flex items-center space-x-1">
              Discount Percent
              <button
                onClick={sortVouchersByDiscount}
                className="flex items-center text-blue-500 hover:text-blue-700"
              >
                {sortByDiscount === "asc" ? (
                  <ChevronUpIcon className="ml-1 h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="ml-1 h-4 w-4" />
                )}
              </button>
            </TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="relative">
              <div className="flex items-center pr-4">
                <span className="mr-2">Status:</span>
                <select
                  title="a"
                  value={
                    filterStatus === null ? "all" : filterStatus.toString()
                  }
                  onChange={(e) => handleFilterStatus(e.target.value)}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
            </TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredVouchers.map((voucher) => (
            <TableRow key={voucher.voucherId}>
              <TableCell>{voucher.voucherId}</TableCell>
              <TableCell>{voucher.code}</TableCell>
              <TableCell>{voucher.discountPercent}%</TableCell>
              <TableCell>{voucher.quantity}</TableCell>
              <TableCell>{getStatus(voucher.vouchersStatus)}</TableCell>
              <TableCell>
                {new Date(voucher.date).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <button title="a">...</button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <button
                      title="edit"
                      onClick={() => handleEdit(voucher)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      title="delete"
                      onClick={() => handleDelete(voucher.voucherId)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingVoucher && (
        <UpdateVoucherForm
          voucher={editingVoucher}
          setVouchers={setVouchers}
          onCancel={handleCancelEdit}
          isOpen={isDialogOpen}
        />
      )}
    </div>
  );
};
