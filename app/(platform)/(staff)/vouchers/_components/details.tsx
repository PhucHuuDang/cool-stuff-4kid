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
  MoreVerticalIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button, Dropdown, Menu } from "antd";

interface Voucher {
  voucherId: number;
  code: string;
  discountPercent: number;
  quantity: number;
  vouchersStatus: number;
  dateFrom: string;
  dateTo: string;
}

export const VoucherManagement = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [editingVoucher, setEditingVoucher] = useState<Voucher | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortByDiscount, setSortByDiscount] = useState<"asc" | "desc">("asc");
  const [sortByQuantity, setSortByQuantity] = useState<"asc" | "desc">("asc");
  const [filterStatus, setFilterStatus] = useState<number | null>(null);

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Voucher[]>(
        "https://milkapplicationapi.azurewebsites.net/api/Vouchers/GetAllVouchers",
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
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axios.delete(
          `https://milkapplicationapi.azurewebsites.net//api/Vouchers/DeleteVouchers/${id}`,
        );
        setVouchers((prevVouchers) =>
          prevVouchers.filter((voucher) => voucher.voucherId !== id),
        );
      } catch (error) {
        console.error("Error deleting voucher:", error);
      }
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
  const sortVouchersByQuantity = () => {
    const sortedVouchers = [...vouchers];
    if (sortByQuantity === "asc") {
      sortedVouchers.sort((a, b) => a.quantity - b.quantity);
      setSortByQuantity("desc");
    } else {
      sortedVouchers.sort((a, b) => b.quantity - a.quantity);
      setSortByQuantity("asc");
    }
    setVouchers(sortedVouchers);
  };

  const handleFilterStatus = (status: string) => {
    if (status === "all") {
      setFilterStatus(null);
    } else {
      setFilterStatus(parseInt(status));
    }
  };

  const filteredVouchers = vouchers.filter((voucher) => {
    const code = voucher.code || "";
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
            <TableHead className="text-black">ID</TableHead>
            <TableHead className="w-[200px] text-black">Code</TableHead>
            <TableHead className="w-[140px] items-center space-x-1 text-black">
              Discount Percent
              <button
                onClick={sortVouchersByDiscount}
                className="items-center text-blue-500 hover:text-blue-700"
              >
                {sortByDiscount === "asc" ? (
                  <ChevronUpIcon className="ml-1 h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="ml-1 h-4 w-4" />
                )}
              </button>
            </TableHead>
            <TableHead className="pace-x-1 w-[120px] text-black">
              Quantity
              <button
                onClick={sortVouchersByQuantity}
                className="items-center text-blue-500 hover:text-blue-700"
              >
                {sortByQuantity === "asc" ? (
                  <ChevronUpIcon className="ml-1 h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="ml-1 h-4 w-4" />
                )}
              </button>
            </TableHead>
            <TableHead className="relative w-[50px] text-black">
              <div className="flex items-center">
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
            <TableHead className="text-black">Date Start</TableHead>
            <TableHead className="text-black">Date End</TableHead>
            <TableHead className="text-black">Actions</TableHead>
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
                {new Date(voucher.dateFrom).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(voucher.dateTo).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Dropdown
                  overlay={() => (
                    <Menu>
                      <Menu.Item key="edit">
                        <Button
                          type="text"
                          onClick={() => handleEdit(voucher)}
                          className="text-blue-500"
                        >
                          <PencilIcon />
                          Edit
                        </Button>
                      </Menu.Item>
                      <Menu.Item key="delete">
                        <Button
                          className="text-red-500"
                          type="text"
                          onClick={() => handleDelete(voucher.voucherId)}
                        >
                          <TrashIcon />
                          Delete
                        </Button>
                      </Menu.Item>
                    </Menu>
                  )}
                  placement="bottomLeft"
                  trigger={["click"]}
                >
                  <Button type="text" icon={<MoreVerticalIcon />} />
                </Dropdown>
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

export default VoucherManagement;
