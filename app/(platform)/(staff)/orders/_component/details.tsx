"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import PaginationButton from "./pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Filter from "./filter";

type StatusType =
  | "Canceled"
  | "Processing"
  | "Delivering"
  | "Refunded"
  | "Delivered";

const statusColors: Record<StatusType, string> = {
  Canceled: "text-red-500",
  Processing: "text-green-500",
  Delivering: "text-orange-500",
  Refunded: "text-red-500",
  Delivered: "text-blue-500",
};

interface Order {
  orderId: number;
  orderDate: string;
  status: number;
  totalPrice: number;
  id: string;
}

export const Details: React.FC = () => {
  const [data, setData] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const itemsPerPage = 7;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://milkapplication20240705013352.azurewebsites.net/api/Order/GetAllOrder",
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = filterStatus
    ? data.filter((item) => item.status.toString() === filterStatus)
    : data;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(
    indexOfFirstItem,
    indexOfFirstItem + itemsPerPage,
  );

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const statusMap: Record<number, StatusType> = {
    0: "Processing",
    1: "Delivering",
    2: "Delivered",
    3: "Canceled",
    4: "Refunded",
  };

  return (
    <div>
      <Filter onFilterChange={handleFilterChange} />
      <Table>
        <TableHeader>
          <TableRow className="bg-[#FCFBF4] hover:bg-[#FCFBF4]">
            <TableHead className="text-base font-bold text-black">ID</TableHead>
            <TableHead className="text-base font-bold text-black">
              Prices
            </TableHead>
            <TableHead className="text-base font-bold text-black">
              Status
            </TableHead>
            <TableHead className="text-base font-bold text-black">
              Order Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.orderId}</TableCell>
              <TableCell className="w-[180px]">{item.totalPrice}</TableCell>
              <TableCell
                className={`w-[180px] font-bold ${statusColors[statusMap[item.status]]}`}
              >
                {statusMap[item.status]}
              </TableCell>
              <TableCell>
                {new Date(item.orderDate).toLocaleDateString()}
              </TableCell>
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
