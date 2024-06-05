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
      <Table>
        <TableHeader>
          <TableRow className="">
            <TableHead className="w-[200px] font-bold text-base">
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
            <TableHead className="font-bold text-base">Quantity</TableHead>
            <TableHead className="font-bold text-base">Price</TableHead>
            <TableHead className="text-right font-bold text-base">
              Import Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedData.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {item["Product Name"]}
              </TableCell>
              <TableCell className={getStatusColor(item.Status)}>
                {item.Status}
              </TableCell>
              <TableCell>{item.Quantity}</TableCell>
              <TableCell>{item.Price}</TableCell>
              <TableCell className="text-right">
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
