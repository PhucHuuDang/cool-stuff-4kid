import React from "react";

export const DashboardData = () => {
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
                  <span className="text-red-600">In Active</span>
                </td>
              </tr>
              <tr>
                <td>Lê Bá Trung</td>
                <td>Quận BE</td>
                <td>
                  <span className="text-red-600">In Active</span>
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
        {/* <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Staff</h2>
            <button className="rounded-lg bg-pink-600 px-4 py-2 text-white">
              See all
            </button>
          </div>
          <ul>
            <li className="mb-4 flex items-center">
              <img
                src="https://via.placeholder.com/40"
                alt="Avatar"
                className="h-10 w-10 rounded-full"
              />
              <div className="ml-4">
                <div className="font-bold">Đặng Hữu Phúc</div>
                <div className="text-gray-500">Full-Stack</div>
              </div>
            </li>
            <li className="mb-4 flex items-center">
              <img
                src="https://via.placeholder.com/40"
                alt="Avatar"
                className="h-10 w-10 rounded-full"
              />
              <div className="ml-4">
                <div className="font-bold">Vũ Minh Quân</div>
                <div className="text-gray-500">FE</div>
              </div>
            </li>
            <li className="mb-4 flex items-center">
              <img
                src="https://via.placeholder.com/40"
                alt="Avatar"
                className="h-10 w-10 rounded-full"
              />
              <div className="ml-4">
                <div className="font-bold">Lê Ngọc Phú</div>
                <div className="text-gray-500">FE</div>
              </div>
            </li>
            <li className="mb-4 flex items-center">
              <img
                src="https://via.placeholder.com/40"
                alt="Avatar"
                className="h-10 w-10 rounded-full"
              />
              <div className="ml-4">
                <div className="font-bold">Lê Bá Trung</div>
                <div className="text-gray-500">BE</div>
              </div>
            </li>
            <li className="mb-4 flex items-center">
              <img
                src="https://via.placeholder.com/40"
                alt="Avatar"
                className="h-10 w-10 rounded-full"
              />
              <div className="ml-4">
                <div className="font-bold">Nguyễn Hoàng Nam</div>
                <div className="text-gray-500">BE</div>
              </div>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};
