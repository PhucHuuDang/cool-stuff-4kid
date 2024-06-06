"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { data } from "./data";
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

const ITEMS_PER_PAGE = 8;

export const Details = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState([
    "In Stock",
    "Out of Stock",
  ]);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleStatusChange = (status) => {
    setStatusFilter((prev) =>
      prev.includes(status)
        ? prev.filter((item) => item !== status)
        : [...prev, status]
    );
  };

  const filteredData = data.filter((item) =>
    statusFilter.includes(item.Status)
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const getStatusColor = (status) => {
    return status === "In Stock" ? "text-green-500" : "text-red-500";
  };

  return (
    <div>
      <div className="p-3 flex justify-between">
        <div className="relative w-[500px]">
          <Input className="pl-10" placeholder="ProductName" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <div className="">
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
          <TableRow className="">
            <TableHead className="font-bold">
              ID
            </TableHead>
            <TableHead className="w-[500px] font-bold text-base">
              Product Name
            </TableHead>
            <TableHead className="font-bold text-base flex items-center">
              Status
              <DropdownMenu>
                <DropdownMenuTrigger className="ml-2 bg-gray-200 p-1 rounded">
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
            <TableHead className="font-bold text-base w-[140px]">Quantity</TableHead>
            <TableHead className="font-bold text-base">Price</TableHead>
            <TableHead className="text-right font-bold text-base">
              Import Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedData.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-bold">{item.ID}</TableCell>
              <TableCell className="font-medium w-[500px]">
                {item["Product Name"]}
              </TableCell>
              <TableCell className={`w-[200px] ${getStatusColor(item.Status)}`}>
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
