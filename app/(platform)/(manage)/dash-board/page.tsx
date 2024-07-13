"use client"
import Image from "next/image";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const calculatePercentChange = (current: number, previous: number) => {
  return ((current - previous) / previous) * 100;
};

const DashboardPage: React.FC = () => {
  // Data cho biểu đồ doanh thu
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Doanh thu',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  // Options cho biểu đồ
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          maxTicksLimit: 5,
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      }
    }
  };

  // Tính toán sự thay đổi doanh thu
  const latestRevenue = revenueData.datasets[0].data[revenueData.datasets[0].data.length - 1];
  const previousRevenue = revenueData.datasets[0].data[revenueData.datasets[0].data.length - 2];
  const revenueChange = calculatePercentChange(latestRevenue, previousRevenue);

  // Dữ liệu thống kê
  const stats = [
    { 
      title: "Staff", 
      current: 54, 
      previous: 50, 
      bgColor: "bg-purple-200" 
    },
    { 
      title: "Products", 
      current: 79, 
      previous: 75, 
      bgColor: "bg-yellow-200" 
    },
    { 
      title: "Orders", 
      current: 124, 
      previous: 110, 
      bgColor: "bg-blue-200" 
    },
    { 
      title: "Income", 
      current: 239000, 
      previous: 220000, 
      bgColor: "bg-pink-600", 
      textColor: "text-white" 
    },
  ];

  const statsWithChanges = stats.map(stat => ({
    ...stat,
    change: calculatePercentChange(stat.current, stat.previous),
  }));

  // Danh sách thông báo
  const notifications = [
    { id: 1, message: "Đơn hàng mới #1234 đã được tạo", time: "5 phút trước" },
    { id: 2, message: "Nhân viên Nguyễn Văn A đã hoàn thành mục tiêu tháng", time: "1 giờ trước" },
    { id: 3, message: "Cập nhật hệ thống sẽ diễn ra vào 22:00 tối nay", time: "3 giờ trước" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-grow">
        <div className="flex flex-grow flex-col bg-gray-100">
          <main className="flex-grow p-6">
            <div className="mb-4 grid grid-cols-4 gap-4">
              {statsWithChanges.map((stat, index) => (
                <div key={index} className={`rounded-lg ${stat.bgColor} p-4 shadow-md ${stat.textColor || ''}`}>
                  <div className="text-2xl font-bold">
                    {stat.title === "Income" ? `$${stat.current / 1000}k` : stat.current}
                  </div>
                  <div className={stat.textColor ? "text-gray-200" : "text-gray-500"}>{stat.title}</div>
                  <div className={`text-sm font-semibold ${stat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change >= 0 ? '▲' : '▼'} {Math.abs(stat.change).toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>

            {/* Biểu đồ doanh thu */}
            <div className="mb-4 rounded-lg bg-white p-6 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Biểu đồ doanh thu</h2>
                <div className={`text-sm font-semibold ${revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {revenueChange >= 0 ? '▲' : '▼'} {Math.abs(revenueChange).toFixed(2)}%
                </div>
              </div>
              <div style={{ height: '200px' }}>
                <Line data={revenueData} options={options} />
              </div>
            </div>

            {/* Thông báo */}
            <div className="mb-4 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-bold">Thông báo mới nhất</h2>
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
                <ul>
                  <li className="mb-4 flex items-center">
                    <Image
                      src="https://via.placeholder.com/40"
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-4">
                      <div className="font-bold">Đặng Hữu Phúc</div>
                      <div className="text-gray-500">Full-Stack</div>
                    </div>
                  </li>
                  <li className="mb-4 flex items-center">
                    <Image
                      src="https://via.placeholder.com/40"
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-4">
                      <div className="font-bold">Vũ Minh Quân</div>
                      <div className="text-gray-500">FE</div>
                    </div>
                  </li>
                  <li className="mb-4 flex items-center">
                    <Image
                      src="https://via.placeholder.com/40"
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-4">
                      <div className="font-bold">Lê Ngọc Phú</div>
                      <div className="text-gray-500">FE</div>
                    </div>
                  </li>
                  <li className="mb-4 flex items-center">
                    <Image
                      src="https://via.placeholder.com/40"
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-4">
                      <div className="font-bold">Lê Bá Trung</div>
                      <div className="text-gray-500">BE</div>
                    </div>
                  </li>
                  <li className="mb-4 flex items-center">
                    <Image
                      src="https://via.placeholder.com/40"
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-4">
                      <div className="font-bold">Nguyễn Hoàng Nam</div>
                      <div className="text-gray-500">BE</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;