"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

interface Order {
  userName: string;
  orderId: number;
  orderDate: string;
  status: number;
  totalPrice: number;
  voucherId: number;
  id: string;
  paymentUrl: string | null;
  orderDetails: OrderDetail[];
  fullName: string | null;
  email: string | null;
  voucher: Voucher | null;
}

interface OrderDetail {
  orderDetailId: number;
  quantity: number;
  productId: number;
  product: Product;
}

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
  id: string;
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

interface Feedback {
  commentId: number;
  commentDetail: string;
  rating: number;
  date: string;
  productId: number;
  id: string;
  userName: string;
}

export const DashboardData = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  console.log("order", orders);
  console.log("feedback", feedbacks);
  console.log("voucher", vouchers);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<Order[]>(
          "https://milkapplicationapi.azurewebsites.net/api/Order/GetAllOrder",
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get<Feedback[]>(
          "https://milkapplicationapi.azurewebsites.net/api/Comment/GetAllComment",
        );
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    const fetchVouchers = async () => {
      try {
        const response = await axios.get<Voucher[]>(
          "https://milkapplicationapi.azurewebsites.net/api/Vouchers/GetAllVouchers",
        );
        setVouchers(response.data);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };

    fetchOrders();
    fetchFeedbacks();
    fetchVouchers();
  }, []);

  // Function to format number to currency format (VND)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div>
      <div className="mb-4 grid grid-cols-4 gap-4">
        <div className="rounded-lg bg-white p-4 shadow-md">
          <div className="text-2xl font-bold">{feedbacks.length}</div>
          <div className="text-gray-500">Feedback</div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-md">
          <div className="text-2xl font-bold">{orders.length}</div>
          <div className="text-gray-500">Orders</div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-md">
          <div className="text-2xl font-bold">{vouchers.length}</div>
          <div className="text-gray-500">Vouchers</div>
        </div>
        <div className="rounded-lg bg-pink-600 p-4 text-white shadow-md">
          <div className="text-2xl font-bold">$239k</div>
          <div className="text-gray-200">Income</div>
        </div>
      </div>
      <div className="">
        <div>
          <div className="mb-2 shadow-lg">
            <Card>
              <CardHeader>
                <CardTitle>Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        User Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Product Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Total Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {orders.slice(0, 3).map((order) => (
                      <tr key={order.id}>
                        <td className="whitespace-nowrap px-6 py-4 font-semibold">
                          {order.userName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {order.orderDetails[0].product.productName.length > 30
                            ? `${order.orderDetails[0].product.productName.substring(0, 30)}...`
                            : order.orderDetails[0].product.productName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {formatCurrency(order.totalPrice)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {format(new Date(order.orderDate), "dd/MM/yyyy")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
              <CardFooter className="justify-end">
                <Link href="/orders">
                  <Button>View All</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-[500px]">
            <Card>
              <CardHeader>
                <CardTitle>Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Comment
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {feedbacks.slice(0, 3).map((feedback) => (
                      <tr key={feedback.id}>
                        <td className="whitespace-nowrap px-6 py-4 font-semibold">
                          {/* Update with actual user field if available */}
                          {feedback.userName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {feedback.rating}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {feedback.commentDetail.length > 30
                            ? `${feedback.commentDetail.substring(0, 30)}...`
                            : feedback.commentDetail}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
              <CardFooter className="justify-end">
                <Link href="/feedback">
                  <Button>View All</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
          <div className="w-[500px]">
            <Card>
              <CardHeader>
                <CardTitle>Vouchers</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Discount Percent
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {vouchers.slice(0, 3).map((voucher) => (
                      <tr key={voucher.voucherId}>
                        <td className="whitespace-nowrap px-6 py-4 font-semibold">
                          {voucher.code}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {voucher.discountPercent}%
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {voucher.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
              <CardFooter className="justify-end">
                <Link href="/vouchers">
                  <Button>View All</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
