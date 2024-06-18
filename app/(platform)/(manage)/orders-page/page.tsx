import React from "react";
import { Header } from "@/components/Header";
import { SideBar } from "@/components/Sidebar";

interface Order {
  order: string;
  customer: string;
  status: string;
  quantity: number;
  location: string;
  date: string;
  total: string;
}

const ordersData: Order[] = [
  {
    order: "#46647",
    customer: "Fox 1",
    status: "Not started",
    quantity: 45,
    location: "Thanh Hóa",
    date: "12 Feb 2024",
    total: "$56.99",
  },
  {
    order: "#46647",
    customer: "Fox 1",
    status: "Fulfilled",
    quantity: 56,
    location: "Nghệ An",
    date: "13 Feb 2024",
    total: "$167.99",
  },
  {
    order: "#46647",
    customer: "Fox 1",
    status: "Ready for ship",
    quantity: 123,
    location: "Hà Tỉnh",
    date: "14 Feb 2024",
    total: "$747.99",
  },
  {
    order: "#46647",
    customer: "Fox 1",
    status: "Not Started",
    quantity: 35,
    location: "Hò Chí Minh",
    date: "15 Feb 2024",
    total: "$34.76",
  },
  {
    order: "#46647",
    customer: "Fox 1",
    status: "Shipped",
    quantity: 38,
    location: "Hà Nội",
    date: "16 Feb 2024",
    total: "$345.45",
  },
  {
    order: "#46647",
    customer: "Fox 1",
    status: "Pending",
    quantity: 10,
    location: "Hải Phòng",
    date: "17 Feb 2024",
    total: "$34.00",
  },
  {
    order: "#46647",
    customer: "Fox 1",
    status: "Ready for ship",
    quantity: 36,
    location: "Quảng Ninh",
    date: "18 Feb 2024",
    total: "$134.00",
  },
  {
    order: "#46647",
    customer: "Fox 1",
    status: "Fulfilled",
    quantity: 18,
    location: "Ninh Thuận",
    date: "19 Feb 2024",
    total: "$234.76",
  },
  {
    order: "#46647",
    customer: "Fox 1",
    status: "Pending",
    quantity: 18,
    location: "Bến Tre",
    date: "23 Feb 2024",
    total: "$234.76",
  },
  {
    order: "#46647",
    customer: "Fox 1",
    status: "Not Started",
    quantity: 18,
    location: "Củ Chi",
    date: "23 Feb 2024",
    total: "$234.76",
  },
];

const getStatusClass = (status: string): string => {
  switch (status) {
    case "Not started":
      return "text-gray-500";
    case "Fulfilled":
      return "text-green-500";
    case "Ready for ship":
      return "text-blue-500";
    case "Shipped":
      return "text-green-500";
    case "Pending":
      return "text-yellow-500";
    default:
      return "";
  }
};

const OrdersPage: React.FC = () => {
  return (
    <div >
      <div className="flex flex-grow">
        <main className="flex-grow overflow-y-auto bg-gray-100 p-6">
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    ORDER
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    CUSTOMER
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    STATUS
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    QUANTITY
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    LOCATION
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    DATE
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    TOTAL
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {ordersData.map((order, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-4 text-center">
                      {order.order}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-center">
                      {order.customer}
                    </td>
                    <td
                      className={`whitespace-nowrap px-4 py-4 text-center ${getStatusClass(order.status)}`}
                    >
                      {order.status}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-center">
                      {order.quantity}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-center">
                      {order.location}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-center">
                      {order.date}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-center">
                      {order.total}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-center">
                      ...
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button className="rounded bg-gray-200 px-4 py-2">Previous</button>
            <button className="rounded bg-gray-200 px-4 py-2">Next</button>
          </div>
        </main>
        {/* <div className="fixed bottom-0 left-64 right-0 bg-white shadow-md z-10">
          <Footer />
        </div> */}
      </div>
    </div>
  );
};

export default OrdersPage;
