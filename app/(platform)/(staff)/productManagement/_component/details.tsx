"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "./pagination";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Pencil, PencilLineIcon, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { data } from "./data";

const ITEMS_PER_PAGE = 7;

interface Item {
  ID: number;
  "Product Name": string;
  Status: string;
  Quantity: number;
  Price: string;
  "Import Date": string;
}

export const Details: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<string[]>([
    "In Stock",
    "Out of Stock",
  ]);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter((prev: string[]) =>
      prev.includes(status)
        ? prev.filter((item: string) => item !== status)
        : [...prev, status]
    );
  };

  const filteredData = data.filter((item: Item) =>
    statusFilter.includes(item.Status)
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const getStatusColor = (status: string) => {
    return status === "In Stock" ? "text-green-500" : "text-red-500";
  };

  return (
    <div>
      <div className="p-3 flex justify-between">
        <div className="relative w-[500px]">
          <Input className="pl-10" placeholder="Product Name" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <div>
          <Button className="mr-3 bg-blue-400">
            <PencilLineIcon />
            Update
          </Button>
          <Button className="bg-blue-400">
            <Pencil />
            Edit
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-pink-500">
            <TableHead className="font-bold text-white">ID</TableHead>
            <TableHead className="w-[500px] font-bold text-base text-white">
              Product Name
            </TableHead>
            <TableHead className="font-bold text-base flex items-center text-white">
              Status
              <DropdownMenu>
                <DropdownMenuTrigger className="ml-2 bg-gray-200 p-1 rounded text-white">
                  Filter
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter.includes("In Stock")}
                    onCheckedChange={() => handleStatusChange("In Stock")}
                  >
                    In Stock
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter.includes("Out of Stock")}
                    onCheckedChange={() => handleStatusChange("Out of Stock")}
                  >
                    Out of Stock
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableHead>
            <TableHead className="font-bold text-base w-[140px] text-white">Quantity</TableHead>
            <TableHead className="font-bold text-base text-white">Price</TableHead>
            <TableHead className="text-right font-bold text-base text-white">
              Import Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedData.map((item: Item, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-bold">{item.ID}</TableCell>
              <TableCell className="font-medium w-[500px]">
                {item["Product Name"]}
              </TableCell>
              <TableCell className={`w-[200px] font-bold ${getStatusColor(item.Status)}`}>
                {item.Status}
              </TableCell>
              <TableCell className="pl-10 w-[140px]">{item.Quantity}</TableCell>
              <TableCell className="w-[180px]">{item.Price}</TableCell>
              <TableCell className="text-right w-[180px]">
                {item["Import Date"]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
