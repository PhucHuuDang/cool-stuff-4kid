"use client"
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import dynamic from 'next/dynamic';
import ProductCategoryPieChart from '@/components/pie-chart';

const AreaChart = dynamic(() => import('@/components/area-chart').then((mod) => mod.AreaChart), {
  ssr: false
});

const calculatePercentChange = (current: number, previous: number) => {
  return ((current - previous) / previous) * 100;
};

interface StaffMember {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  status: number;
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

interface User {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  password: string | null;
  status: number;
  addresses: any[];
}

interface Notification {
  id: number;
  message: string;
  time: string;
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch('https://milkapplicationapi.azurewebsites.net/api/Users/GetAllUsers');
  const data = await response.json();
  return data.data;
}

const DashboardClient: React.FC = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [revenueChange, setRevenueChange] = useState(0);
  const [categoryData, setCategoryData] = useState<{ name: string; value: number }[]>([]);
  const [productCount, setProductCount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [totalStaff, setTotalStaff] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const createNotifications = (products: Product[], users: User[]) => {
    const userMap = new Map(users.map(user => [user.id, user.fullName]));
    return products.slice(-3).reverse().map((product, index) => ({
      id: index + 1,
      message: `${userMap.get(product.id) || 'Unknown User'} đã thêm mới sản phẩm '${product.productName}'`,
      time: "Vừa xong"
    }));
  };

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const response = await fetch('https://milkapplicationapi.azurewebsites.net/api/Payment/totalAmountsForLast12Months');
        const data: { [key: string]: number } = await response.json();
        const total = Object.values(data).reduce((sum, value) => sum + value, 0);
        setTotalRevenue(total);

        const months = Object.keys(data).sort();
        const lastMonth = data[months[months.length - 1]];
        const secondLastMonth = data[months[months.length - 2]];
        const change = calculatePercentChange(lastMonth, secondLastMonth);
        setRevenueChange(change);
      } catch (error) {
        console.error('Error fetching total revenue:', error);
      }
    };

    const fetchCategoryData = async () => {
      try {
        const categoriesResponse = await fetch('https://milkapplicationapi.azurewebsites.net/api/Category/GetAllCategorys');
        const categories = await categoriesResponse.json();

        const productsResponse = await fetch('https://milkapplicationapi.azurewebsites.net/api/Product/GetAllProducts');
        const products = await productsResponse.json();

        const users = await fetchUsers();

        setProductCount(products.length);
        setTotalQuantity(products.reduce((sum: number, product: any) => sum + (product.quantity || 0), 0));

        const categoryCounts = categories.reduce((acc: { [key: string]: number }, category: any) => {
          acc[category.categoryId] = 0;
          return acc;
        }, {});

        products.forEach((product: any) => {
          if (categoryCounts.hasOwnProperty(product.categoryId)) {
            categoryCounts[product.categoryId]++;
          }
        });

        const chartData = categories.map((category: any) => ({
          name: category.categoryName,
          value: categoryCounts[category.categoryId]
        }));

        setCategoryData(chartData);

        const newNotifications = createNotifications(products, users);
        setNotifications(newNotifications);
      } catch (error) {
        console.error('Error fetching category and product data:', error);
      }
    };

    const fetchStaffMembers = async () => {
      try {
        const response = await fetch('https://milkapplicationapi.azurewebsites.net/api/Users/GetAllStaff');
        const data = await response.json();

        if (data.isSucceed) {
          const allStaff = data.data.map((user: any) => ({
            id: user.id,
            fullName: user.fullName,
            userName: user.userName,
            email: user.email,
            status: user.status
          }));

          setTotalStaff(allStaff.length);
          setStaffMembers(allStaff.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching staff members:', error);
      }
    };

    fetchTotalRevenue();
    fetchCategoryData();
    fetchStaffMembers();
  }, []);

  const stats = [
    { 
      title: "Revenue", 
      current: totalRevenue, 
      change: revenueChange, 
      bgColor: "bg-green-600", 
      textColor: "text-white" 
    },
    { 
      title: "Staff", 
      current: totalStaff, 
      previous: totalStaff - 2,
      bgColor: "bg-purple-200" 
    },
    { 
      title: "Products", 
      current: productCount, 
      previous: productCount - 4,
      bgColor: "bg-yellow-200" 
    },
    { 
      title: "Total Quantity", 
      current: totalQuantity, 
      previous: totalQuantity - 100,
      bgColor: "bg-blue-200" 
    },
  ];

  const statsWithChanges = stats.map(stat => ({
    ...stat,
    change: stat.change !== undefined ? stat.change : calculatePercentChange(stat.current, stat.previous!),
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-grow">
        <div className="flex flex-grow flex-col bg-gray-100">
          <main className="flex-grow p-6">
            <div className="mb-4 grid grid-cols-4 gap-4">
              {statsWithChanges.map((stat, index) => (
                <div key={index} className={`rounded-lg ${stat.bgColor} p-4 shadow-md ${stat.textColor || ''}`}>
                  <div className="text-2xl font-bold">
                    {stat.title === "Revenue" ? `VND ${(stat.current / 1000).toFixed(2)}` : stat.current}
                  </div>
                  <div className={stat.textColor ? "text-gray-200" : "text-gray-500"}>{stat.title}</div>
                  <div className={`text-sm font-semibold ${stat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change >= 0 ? '▲' : '▼'} {Math.abs(stat.change).toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Biểu đồ doanh thu</h2>
                  <div className={`text-sm font-semibold ${revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {revenueChange >= 0 ? '▲' : '▼'} {Math.abs(revenueChange).toFixed(2)}%
                  </div>
                </div>
                <div style={{ height: '300px' }}>
                  <AreaChart />
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="text-xl font-bold mb-4">Sản phẩm theo danh mục</h2>
                <ProductCategoryPieChart data={categoryData} />
              </div>
            </div>

            <div className="mb-4 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-bold">Hoạt động mới nhất</h2>
              <ul>
                {notifications.map((notification) => (
                  <li key={notification.id} className="mb-2 pb-2 border-b last:border-b-0">
                    <p>{notification.message}</p>
                    <small className="text-gray-500">{notification.time}</small>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Orders</h2>
                  <button className="rounded-lg bg-pink-600 px-4 py-2 text-white">
                    See all
                  </button>
                </div>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left">Customers Name</th>
                      <th className="text-left">Store</th>
                      <th className="text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Vũ Minh Quân</td>
                      <td>Quận FE</td>
                      <td>
                        <span className="text-green-600">Active</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Lê Ngọc Phú</td>
                      <td>Quận FE</td>
                      <td>
                        <span className="text-orange-600">In Progress</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Lê Bá Trung</td>
                      <td>Quận BE</td>
                      <td>
                        <span className="text-red-600">Inactive</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Đặng Hữu Phúc</td>
                      <td>Quận Full-Stack</td>
                      <td>
                        <span className="text-green-600">Active</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Nguyễn Hoàng Nam</td>
                      <td>Quận BE</td>
                      <td>
                        <span className="text-green-600">Active</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Staff</h2>
                  <button className="rounded-lg bg-pink-600 px-4 py-2 text-white">
                    See all
                  </button>
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
                          <span className={staff.status === 1 ? "text-green-600" : "text-red-600"}>
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