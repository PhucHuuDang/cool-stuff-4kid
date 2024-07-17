"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { routes } from "@/routes/routes";
import dynamic from "next/dynamic";
import ProductCategoryPieChart from "@/components/pie-chart";
import {
  Order,
  Notification,
  UserDashBoard,
  Product,
  StaffMember,
} from "@/interface";

const AreaChart = dynamic(
  () => import("@/components/area-chart").then((mod) => mod.AreaChart),
  {
    ssr: false,
  },
);

const calculatePercentChange = (current: number, previous: number) => {
  return ((current - previous) / previous) * 100;
};

const getStatusColor = (status: number) => {
  switch (status) {
    case 0:
      return "bg-yellow-100 text-yellow-800";
    case 1:
      return "bg-blue-100 text-blue-800";
    case 2:
      return "bg-purple-100 text-purple-800";
    case 3:
      return "bg-indigo-100 text-indigo-800";
    case 4:
      return "bg-green-100 text-green-800";
    case 5:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: number) => {
  switch (status) {
    case 0:
      return "Chưa thanh toán";
    case 1:
      return "Đã thanh toán";
    case 2:
      return "Đang xử lý";
    case 3:
      return "Đang vận chuyển";
    case 4:
      return "Hoàn thành";
    case 5:
      return "Hủy đơn";
    default:
      return "Không rõ";
  }
};

async function fetchUsers(): Promise<UserDashBoard[]> {
  const response = await fetch(
    "https://milkapplicationapi.azurewebsites.net/api/Users/GetAllUsers",
  );
  const data = await response.json();
  return data.data;
}

const DashboardClient: React.FC = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [revenueChange, setRevenueChange] = useState(0);
  const [categoryData, setCategoryData] = useState<
    { name: string; value: number }[]
  >([]);
  const [productCount, setProductCount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [totalStaff, setTotalStaff] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const createNotifications = (products: Product[], users: UserDashBoard[]) => {
    const userMap = new Map(users.map((user) => [user.id, user.fullName]));
    return products
      .slice(-3)
      .reverse()
      .map((product, index) => ({
        id: index + 1,
        message: `${userMap.get(product.id) || "Unknown User"} đã thêm mới sản phẩm '${product.productName}'`,
        time: "Vừa xong",
      }));
  };

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const response = await fetch(
          "https://milkapplicationapi.azurewebsites.net/api/Payment/totalAmountsForLast12Months",
        );
        const data: { [key: string]: number } = await response.json();
        const total = Object.values(data).reduce(
          (sum, value) => sum + value,
          0,
        );
        setTotalRevenue(total);

        const months = Object.keys(data).sort();
        const lastMonth = data[months[months.length - 1]];
        const secondLastMonth = data[months[months.length - 2]];
        const change = calculatePercentChange(lastMonth, secondLastMonth);
        setRevenueChange(change);
      } catch (error) {
        console.error("Error fetching total revenue:", error);
      }
    };

    const fetchCategoryData = async () => {
      try {
        const categoriesResponse = await fetch(
          "https://milkapplicationapi.azurewebsites.net/api/Category/GetAllCategorys",
        );
        const categories = await categoriesResponse.json();

        const productsResponse = await fetch(
          "https://milkapplicationapi.azurewebsites.net/api/Product/GetAllProducts",
        );
        const products = await productsResponse.json();

        const users = await fetchUsers();

        setProductCount(products.length);
        setTotalQuantity(
          products.reduce(
            (sum: number, product: any) => sum + (product.quantity || 0),
            0,
          ),
        );

        const categoryCounts = categories.reduce(
          (acc: { [key: string]: number }, category: any) => {
            acc[category.categoryId] = 0;
            return acc;
          },
          {},
        );

        products.forEach((product: any) => {
          if (categoryCounts.hasOwnProperty(product.categoryId)) {
            categoryCounts[product.categoryId]++;
          }
        });

        const chartData = categories.map((category: any) => ({
          name: category.categoryName,
          value: categoryCounts[category.categoryId],
        }));

        setCategoryData(chartData);

        const newNotifications = createNotifications(products, users);
        setNotifications(newNotifications);
      } catch (error) {
        console.error("Error fetching category and product data:", error);
      }
    };

    const fetchStaffMembers = async () => {
      try {
        const response = await fetch(
          "https://milkapplicationapi.azurewebsites.net/api/Users/GetAllStaff",
        );
        const data = await response.json();

        if (data.isSucceed) {
          const allStaff = data.data.map((user: any) => ({
            id: user.id,
            fullName: user.fullName,
            userName: user.userName,
            email: user.email,
            status: user.status,
          }));

          setTotalStaff(allStaff.length);
          setStaffMembers(allStaff.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching staff members:", error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://milkapplicationapi.azurewebsites.net/api/Order/GetAllOrder",
        );
        const data = await response.json();
        setOrders(
          data.sort(
            (a: Order, b: Order) =>
              new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime(),
          ),
        );
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchTotalRevenue();
    fetchCategoryData();
    fetchStaffMembers();
    fetchOrders();
  }, []);

  const stats = [
    {
      title: "Revenue",
      current: totalRevenue,
      change: revenueChange,
      bgColor: "bg-green-600",
      textColor: "text-white",
    },
    {
      title: "Staff",
      current: totalStaff,
      previous: totalStaff - 2,
      bgColor: "bg-purple-200",
    },
    {
      title: "Products",
      current: productCount,
      previous: productCount - 4,
      bgColor: "bg-yellow-200",
    },
    {
      title: "Total Quantity",
      current: totalQuantity,
      previous: totalQuantity - 100,
      bgColor: "bg-blue-200",
    },
  ];

  const statsWithChanges = stats.map((stat) => ({
    ...stat,
    change:
      stat.change !== undefined
        ? stat.change
        : calculatePercentChange(stat.current, stat.previous!),
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-grow">
        <div className="flex flex-grow flex-col bg-gray-100">
          <main className="flex-grow p-6">
            <div className="mb-4 grid grid-cols-4 gap-4">
              {statsWithChanges.map((stat, index) => (
                <div
                  key={index}
                  className={`rounded-lg ${stat.bgColor} p-4 shadow-md ${stat.textColor || ""}`}
                >
                  <div className="text-2xl font-bold">
                    {stat.title === "Revenue"
                      ? `VND ${(stat.current / 1000).toFixed(2)}`
                      : stat.current}
                  </div>
                  <div
                    className={
                      stat.textColor ? "text-gray-200" : "text-gray-500"
                    }
                  >
                    {stat.title}
                  </div>
                  <div
                    className={`text-sm font-semibold ${stat.change >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {stat.change >= 0 ? "▲" : "▼"}{" "}
                    {Math.abs(stat.change).toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Biểu đồ doanh thu</h2>
                  <div
                    className={`text-sm font-semibold ${revenueChange >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {revenueChange >= 0 ? "▲" : "▼"}{" "}
                    {Math.abs(revenueChange).toFixed(2)}%
                  </div>
                </div>
                <div style={{ height: "300px" }}>
                  <AreaChart />
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-xl font-bold">
                  Sản phẩm theo danh mục
                </h2>
                <ProductCategoryPieChart data={categoryData} />
              </div>
            </div>

            <div className="mb-4 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-bold">Hoạt động mới nhất</h2>
              <ul>
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="mb-2 border-b pb-2 last:border-b-0"
                  >
                    <p>{notification.message}</p>
                    <small className="text-gray-500">{notification.time}</small>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Recent Orders</h2>
                  <Link href={routes.orders}>
                    <button className="flex items-center rounded-lg bg-pink-600 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-pink-700">
                      See all
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2 h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left">Customer Name</th>
                      <th className="text-left">Order Date</th>
                      <th className="text-left">Total Price</th>
                      <th className="text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((order) => (
                      <tr
                        key={order.orderId}
                        className="cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td>{order.fullName}</td>
                        <td>
                          {new Date(order.orderDate).toLocaleDateString()}
                        </td>
                        <td>{order.totalPrice.toLocaleString()} VND</td>
                        <td>
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(order.status)}`}
                          >
                            {getStatusText(order.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {orders.length > 5 && (
                  <div className="mt-4 text-center">
                    <p className="text-gray-600">
                      Showing 5 of {orders.length} orders
                    </p>
                    <p className="mt-2 cursor-pointer text-pink-600 hover:text-pink-700">
                      Click "See all" to view complete order history
                    </p>
                  </div>
                )}
              </div>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Staff</h2>
                  <Link href={routes.staffManagement}>
                    <button className="rounded-lg bg-pink-600 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-pink-700">
                      See all
                    </button>
                  </Link>
                </div>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left">Full Name</th>
                      <th className="text-left">Username</th>
                      <th className="text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffMembers.map((staff) => (
                      <tr key={staff.id}>
                        <td>{staff.fullName}</td>
                        <td>{staff.userName}</td>
                        <td>
                          <span
                            className={
                              staff.status === 1
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {staff.status === 1 ? "Active" : "Inactive"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;
