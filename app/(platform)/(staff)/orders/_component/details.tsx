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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

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
}

interface OrderDetail {
  orderDetailId: number;
  quantity: number;
  productId: number;
  product: Product;
}

interface Order {
  orderId: number;
  orderDate: string;
  status: number;
  totalPrice: number;
  id: string;
  userName: string;
  orderDetails: OrderDetail[];
  fullName: string;
  staffId: string;
}

export const Details: React.FC = () => {
  const [data, setData] = useState<Order[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<StatusType>("All");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updateOrderId, setUpdateOrderId] = useState<number | null>(null);
  const [updateNewStatus, setUpdateNewStatus] = useState<number | null>(null);
  const { toast } = useToast();

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

  const handleViewClick = (productId: number) => {
    setSelectedProductId(productId);
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

  const handleStatusUpdate = (orderId: number, currentStatus: number) => {
    if (currentStatus < 1 || currentStatus >= 4) {
      return;
    }

    const newStatus = currentStatus + 1;
    setUpdateOrderId(orderId);
    setUpdateNewStatus(newStatus);
    setIsUpdateDialogOpen(true);
  };

  const confirmStatusUpdate = async () => {
    if (updateOrderId === null || updateNewStatus === null) return;

    console.log("Attempting to update order status...");
    try {
      const response = await axios.put(
        "https://milkapplicationapi.azurewebsites.net/api/Order/UpdateOrder",
        null,
        {
          params: {
            orderId: updateOrderId,
            status: updateNewStatus,
            staffId: "29876198-d271-4a9e-b1cb-8266cb503a39",
          },
        },
      );

      console.log("Update response:", response);

      if (response.status === 200) {
        setData((prevData) =>
          prevData.map((order) =>
            order.orderId === updateOrderId
              ? { ...order, status: updateNewStatus }
              : order,
          ),
        );
        console.log("Attempting to show toast...");
        toast({
          title: "Cập nhật thành công",
          description: `Bạn đã cập nhật trạng thái ${statusMap[updateNewStatus]} thành công cho đơn hàng ${updateOrderId}`,
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast({
        title: "Cập nhật thất bại",
        description: "Có lỗi xảy ra khi cập nhật trạng thái đơn hàng.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsUpdateDialogOpen(false);
      setUpdateOrderId(null);
      setUpdateNewStatus(null);
    }
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
        </div>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="flex items-center">
                Total Price{" "}
                <button
                  className="ml-2 flex items-center rounded-md border border-gray-300 p-2 shadow-sm"
                  onClick={() =>
                    handleSortOrderChange(sortOrder === "asc" ? "desc" : "asc")
                  }
                >
                  {sortOrder === "asc" ? (
                    <ArrowUpNarrowWide className="h-4 w-4 text-gray-600" />
                  ) : (
                    <ArrowDownWideNarrow className="h-4 w-4 text-gray-600" />
                  )}
                </button>
              </TableHead>
              <TableHead>View</TableHead>
              <TableHead>Update Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{formatOrderDate(order.orderDate)}</TableCell>
                <TableCell>{order.userName}</TableCell>
                <TableCell className={statusColors[statusMap[order.status]]}>
                  {statusMap[order.status]}
                </TableCell>
                <TableCell>{formatPrice(order.totalPrice)}</TableCell>
                <TableCell>
                  <button
                    className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                    onClick={() =>
                      handleViewClick(order.orderDetails[0].product.productId)
                    }
                  >
                    View
                  </button>
                </TableCell>
                <TableCell>
                  {order.status >= 1 && order.status < 4 ? (
                    <button
                      onClick={() =>
                        handleStatusUpdate(order.orderId, order.status)
                      }
                      className="rounded bg-green-500 px-2 py-1 text-white hover:bg-green-600"
                    >
                      Update to {statusMap[order.status + 1]}
                    </button>
                  ) : (
                    <span className="text-gray-500">
                      {order.status === 0 ? "Chờ thanh toán" : "Đã hoàn thành"}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {selectedProductId && (
        <ProductDetailsDialog
          productId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
        />
      )}
      <AlertDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận cập nhật trạng thái</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc muốn cập nhật trạng thái đơn hàng thành{" "}
              {updateNewStatus !== null ? statusMap[updateNewStatus] : ""}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={confirmStatusUpdate}>
              Xác nhận
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Details;
