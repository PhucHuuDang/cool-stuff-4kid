import React, { useState } from 'react';
import { Order } from '@/interface';

interface OrderTableProps {
  orders?: Order[];
  loading: boolean;
  error: string | null;
  onOpenDelete: (order: Order) => void;
  onOpenDetails: (order: Order) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders = [], loading, error, onOpenDelete, onOpenDetails }) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleExpandRow = (orderId: number) => {
    setExpandedRow(expandedRow === orderId ? null : orderId);
  };

  const getStatusLabel = (status: number) => {
    switch (status) {
      case 0: return 'Chưa thanh toán';
      case 1: return 'Đã thanh toán';
      case 2: return 'Đang xử lý';
      case 3: return 'Đang vận chuyển';
      case 4: return 'Hoàn thành';
      case 5: return 'Đã hủy';
      default: return 'Không rõ';
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0: return 'bg-yellow-100 text-yellow-800';
      case 1: return 'bg-blue-100 text-blue-800';
      case 2: return 'bg-purple-100 text-purple-800';
      case 3: return 'bg-indigo-100 text-indigo-800';
      case 4: return 'bg-green-100 text-green-800';
      case 5: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-grow">
      <main className="flex-grow overflow-y-auto bg-gray-100 p-6">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-black">
                  ORDER ID
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-black">
                  ORDER DATE
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-black">
                  TOTAL PRICE
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-black">
                  CUSTOMER ID
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-black">
                  USER NAME
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-black">
                  STATUS
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-black">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td className="whitespace-nowrap px-4 py-4 text-center">
                    {order.orderId}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-center">
                    {new Intl.DateTimeFormat('vi-VN', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    }).format(new Date(order.orderDate))}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-center">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalPrice)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-center">
                    {order.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-center">
                    {order.userName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-center">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-center relative">
                    <button onClick={() => toggleExpandRow(order.orderId)} className="text-gray-500 hover:text-gray-700">
                      ...
                    </button>
                    {expandedRow === order.orderId && (
                      <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          <button
                            onClick={() => onOpenDetails(order)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => onOpenDelete(order)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
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
    </div>
  );
};

export default OrderTable;