"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";
import ProductDetailsDialog from "./ProductDetailsDialog";
import { format } from "date-fns";

type StatusType =
  | "All"
  | "UnPaid"
  | "Paid"
  | "Processing"
  | "Delivering"
  | "Delivered";

const statusColors: Record<StatusType, string> = {
  All: "text-gray-600",
  UnPaid: "text-red-500",
  Paid: "text-green-500",
  Processing: "text-green-300",
  Delivering: "text-orange-500",
  Delivered: "text-blue-500",
};

const statusMap: Record<number, StatusType> = {
  0: "UnPaid",
  1: "Paid",
  2: "Processing",
  3: "Delivering",
  4: "Delivered",
};

interface Product {
  productId: number;
  productName: string;
  price: number;
  discountPrice: number;
  discountPercent: number;
  productDescription: string;
  image: string;
  imagesCarousel: string[];
  quantity: number;
  status: number;
  categoryId: number;
  originId: number;
  locationId: number;
}

interface OrderDetail {
  orderDetailId: number;
  quantity: number;
  productId: number;
  product: Product;
}

interface Voucher {
  voucherId: number;
  code: string;
  discountPercent: number;
  quantity: number;
  dateFrom: string;
  dateTo: string;
  vouchersStatus: number;
}

interface Order {
  orderId: number;
  orderDate: string;
  status: number;
  totalPrice: number;
  id: string;
  userName: string;
  voucherId: number | null;
  orderDetails: OrderDetail[];
  fullName: string;
  email: string;
  voucher: Voucher | null;
}

export const Details: React.FC = () => {
  const [data, setData] = useState<Order[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const [filterStatus, setFilterStatus] = useState<StatusType>("All");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "https://milkapplicationapi.azurewebsites.net/api/Order/GetAllOrder",
        );

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    if (filterStatus === "All") {
      return true;
    } else {
      return statusMap[item.status] === filterStatus;
    }
  });

  const sortedData = filteredData.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.totalPrice - b.totalPrice;
    } else {
      return b.totalPrice - a.totalPrice;
    }
  });

  const handleSortOrderChange = (order: string) => {
    setSortOrder(order);
  };

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterStatusChange = (status: StatusType) => {
    setFilterStatus(status);
  };

  const handleViewClick = (orderId: number) => {
    setSelectedProductId(orderId);
    console.log("Selected productId:", orderId); // Thêm console.log để kiểm tra giá trị của productId
  };

  const handleCloseDialog = () => {
    setSelectedProductId(null);
  };

  const formatOrderDate = (date: string) => {
    const dateObject = new Date(date);
    const formattedTime = format(dateObject, "HH:mm");
    const formattedDate = format(dateObject, "dd-MM-yyyy");
    return (
      <>
        <span className="text-blue-500">{formattedTime}</span> {formattedDate}
      </>
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const truncateProductName = (name: string) => {
    return name.length > 30 ? name.slice(0, 30) + "..." : name;
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search by username"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          className="w-1/2 rounded-sm border p-2"
        />
        <div className="relative">
          <select
            title="a"
            value={filterStatus}
            onChange={(e) =>
              handleFilterStatusChange(e.target.value as StatusType)
            }
            className="rounded-md border-gray-300 px-3 py-1 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="All" className={`text-gray-600`}>
              All
            </option>
            <option value="UnPaid" className={`text-red-500`}>
              UnPaid
            </option>
            <option value="Paid" className={`text-green-500`}>
              Paid
            </option>
            <option value="Processing" className={`text-green-300`}>
              Processing
            </option>
            <option value="Delivering" className={`text-orange-500`}>
              Delivering
            </option>
            <option value="Delivered" className={`text-blue-500`}>
              Delivered
            </option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow className="bg-[#FCFBF4] hover:bg-[#FCFBF4]">
                <TableHead className="text-black">ID</TableHead>
                <TableHead className="text-black">Username</TableHead>
                <TableHead className="text-black">Product Name</TableHead>
                <TableHead className="text-black">Voucher Code</TableHead>
                <TableHead
                  onClick={() =>
                    handleSortOrderChange(sortOrder === "asc" ? "desc" : "asc")
                  }
                  className="cursor-pointer text-black"
                >
                  Total Price
                  {sortOrder === "asc" ? (
                    <ArrowDownWideNarrow className="ml-2 inline" />
                  ) : (
                    <ArrowUpNarrowWide className="ml-2 inline" />
                  )}
                </TableHead>
                <TableHead className="text-black">Status</TableHead>
                <TableHead className="text-black">Order Date</TableHead>
                <TableHead className="text-black">View</TableHead>
                <TableHead className="text-black">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((item, index) => (
                <TableRow
                  key={item.orderId}
                  className="cursor-pointer text-black hover:bg-[#F3F2F2]"
                  onClick={() => handleViewClick(item.orderId)}
                >
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{item.userName}</TableCell>
                  <TableCell>
                    {truncateProductName(
                      item.orderDetails[0].product.productName,
                    )}
                  </TableCell>
                  <TableCell>{item.voucher?.code ?? "-"}</TableCell>
                  <TableCell className="">
                    {formatPrice(item.totalPrice)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-medium ${
                        statusColors[statusMap[item.status]]
                      }`}
                    >
                      {statusMap[item.status]}
                    </span>
                  </TableCell>
                  <TableCell>{formatOrderDate(item.orderDate)}</TableCell>
                  <TableCell>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewClick(item.orderDetails[0].product.productId);
                      }}
                      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                    >
                      View
                    </button>
                  </TableCell>
                  <TableCell>Update</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {selectedProductId && (
            <ProductDetailsDialog
              productId={selectedProductId}
              onClose={handleCloseDialog}
            />
          )}
        </>
      )}
    </div>
  );
};
