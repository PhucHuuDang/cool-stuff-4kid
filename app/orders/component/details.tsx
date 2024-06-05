"use client";

import React, { useState } from "react";
import PaginationButton from "./pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { data } from "./data";
import { Label } from "@/components/ui/label";

const statusColors = {
  Canceled: "text-red-500",
  Processing: "text-green-500",
  Delivering: "text-orange-500",
  Refunded: "text-red-500",
  Delivered: "text-blue-500",
};

const Filter = ({ onFilterChange }) => {
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setSelectedStatus(value);
    onFilterChange(value);
  };

  return (
    <div className="mb-4">
      <Label htmlFor="status-filter" className="mr-2">
        Filter by Status:
      </Label>
      <select
        id="status-filter"
        value={selectedStatus}
        onChange={handleFilterChange}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="">All</option>
        <option value="Delivered">Delivered</option>
        <option value="Processing">Processing</option>
        <option value="Delivering">Delivering</option>
        <option value="Refunded">Refunded</option>
        <option value="Canceled">Canceled</option>
      </select>
    </div>
  );
};

export const Details = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("");
  const itemsPerPage = 8;

  const filteredData = filterStatus
    ? data.filter((item) => item.Status === filterStatus)
    : data;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  return (
    <div>
      <Filter onFilterChange={handleFilterChange} />
      <Table>
        <TableHeader>
          <TableRow className="">
            <TableHead className="w-[200px] font-bold text-base">Customers</TableHead>
            <TableHead className="font-bold text-base">Product Name</TableHead>
            <TableHead className="font-bold text-base">Quantity</TableHead>
            <TableHead className="font-bold text-base">Prices</TableHead>
            <TableHead className="font-bold text-base">Status</TableHead>
            <TableHead className="font-bold text-base">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-bold">{item.Customers}</TableCell>
              <TableCell>{item["Product Name"]}</TableCell>
              <TableCell>{item.Quantity}</TableCell>
              <TableCell>{item.Prices}</TableCell>
              <TableCell className={statusColors[item.Status]}>{item.Status}</TableCell>
              <TableCell>{item.Date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationButton
        data={filteredData}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};
