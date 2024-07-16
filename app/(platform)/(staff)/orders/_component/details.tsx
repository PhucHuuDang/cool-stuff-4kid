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
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react"; // Importing icons from Lucide

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
  username: string; // Add username field
}

export const Details: React.FC = () => {
  const [data, setData] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("asc"); // Add state for sort order
  const [searchQuery, setSearchQuery] = useState<string>(""); // Add state for search query
  const itemsPerPage = 7;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://milkapplicationapi.azurewebsites.net/api/Order/GetAllOrder",
        );
        setData(
          response.data.map((order: any) => ({
            orderId: order.orderId,
            orderDate: order.orderDate,
            status: order.status,
            totalPrice: order.totalPrice,
            id: order.id,
            username: order.userName, // Đã sửa lại từ `username` thành `userName` để khớp với API
          })),
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    const matchesStatus = filterStatus
      ? item.status.toString() === filterStatus
      : true;
    const matchesSearchQuery = searchQuery
      ? item.username.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesStatus && matchesSearchQuery;
  });

  const sortedData = filteredData.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.totalPrice - b.totalPrice;
    } else {
      return b.totalPrice - a.totalPrice;
    }
  });

  // Tính toán trang hiện tại và dữ liệu hiển thị
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(
    indexOfFirstItem,
    indexOfFirstItem + itemsPerPage,
  );

  // Tổng số trang
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Xử lý khi chuyển trang
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Xử lý khi thay đổi bộ lọc
  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  // Xử lý khi thay đổi thứ tự sắp xếp
  const handleSortOrderChange = (order: string) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  // Xử lý khi thay đổi trường tìm kiếm
  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  // Mapp hóa trạng thái số với chuỗi trạng thái
  const statusMap: Record<number, StatusType> = {
    0: "Processing",
    1: "Delivering",
    2: "Delivered",
    3: "Canceled",
    4: "Refunded",
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by username"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            className="w-full rounded-sm border p-2"
          />
        </div>
        <Filter onFilterChange={handleFilterChange} />
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-[#FCFBF4] hover:bg-[#FCFBF4]">
            <TableHead className="text-base font-bold text-black">ID</TableHead>
            <TableHead className="text-base font-bold text-black">
              User Name
            </TableHead>
            <TableHead className="text-base font-bold text-black">
              <div className="flex items-center">
                Prices
                <div className="ml-2 flex space-x-2">
                  <button
                    title="Down"
                    onClick={() => handleSortOrderChange("desc")}
                    className="flex items-center rounded border border-gray-300 p-1"
                  >
                    <ArrowDownWideNarrow />
                  </button>
                  <button
                    title="Up"
                    onClick={() => handleSortOrderChange("asc")}
                    className="flex items-center rounded border border-gray-300 p-1"
                  >
                    <ArrowUpNarrowWide />
                  </button>
                </div>
              </div>
            </TableHead>
            <TableHead className="text-base font-bold text-black">
              Voucher
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
              <TableCell>{item.username}</TableCell>
              <TableCell className="w-[180px]">{item.totalPrice}</TableCell>
              <TableCell className="w-[180px]">Voucher</TableCell>
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
      {totalPages > 1 && (
        <PaginationButton
          data={filteredData}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};