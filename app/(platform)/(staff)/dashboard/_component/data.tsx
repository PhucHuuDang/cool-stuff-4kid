import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export const DashboardData = () => {
  // Dữ liệu giả cho các bảng
  const feedbackData = [
    { user: "User A", rate: "Rated", comment: "Leave a comment" },
    { user: "User B", rate: "Unrated", comment: "No comment" },
    { user: "User C", rate: "Rated", comment: "Leave a comment" },
  ];

  const ordersData = [
    { userName: "User A", productName: "Product X", totalAmount: "$50" },
    { userName: "User B", productName: "Product Y", totalAmount: "$120" },
    { userName: "User C", productName: "Product Z", totalAmount: "$80" },
  ];

  const voucherData = [
    { code: "VOUCHER10", discount: "10%", quantity: 5 },
    { code: "VOUCHER20", discount: "20%", quantity: 3 },
    { code: "VOUCHER15", discount: "15%", quantity: 7 },
  ];

  return (
    <div>
      <div className="mb-4 grid grid-cols-4 gap-4">
        <div className="rounded-lg bg-white p-4 shadow-md">
          <div className="text-2xl font-bold">54</div>
          <div className="text-gray-500">Feedback</div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-md">
          <div className="text-2xl font-bold">79</div>
          <div className="text-gray-500">Products</div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-md">
          <div className="text-2xl font-bold">124</div>
          <div className="text-gray-500">Orders</div>
        </div>
        <div className="rounded-lg bg-pink-600 p-4 text-white shadow-md">
          <div className="text-2xl font-bold">$239k</div>
          <div className="text-gray-200">Income</div>
        </div>
      </div>
      <div className="">
        <div>
          <div>
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {ordersData.map((item, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-6 py-4 font-semibold">
                          {item.userName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.productName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.totalAmount}
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
          <div>
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
                    {feedbackData.map((item, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-6 py-4 font-semibold">
                          {item.user}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.rate}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.comment}
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
          <div>
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
                        Discount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {voucherData.map((item, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-6 py-4 font-semibold">
                          {item.code}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.discount}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.quantity}
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
