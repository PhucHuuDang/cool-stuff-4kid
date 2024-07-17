import React, { useState } from 'react';
import { Order, OrderTableProps } from '@/interface';



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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date).replace(/\//g, '-');
  };

  if (loading) return <div className='text-center mt-60'>Loading...</div>;
  if (error) return <div  className='text-center mt-60'>Error: {error}</div>;

  return (
    <div className="flex flex-grow">
      <main className="flex-grow overflow-y-auto bg-gray-100 p-6 relative">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 ">
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
                    {formatDate(order.orderDate)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-center">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalPrice)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-center">
                    {order.userName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-center">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-center">
                    <button 
                      onClick={() => toggleExpandRow(order.orderId)} 
                      className="text-gray-500 hover:text-gray-700 font-bold"
                    >
                      &#8942; {/* Dấu ba chấm dọc */}
                    </button>
                    {expandedRow === order.orderId && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          <button
                            onClick={() => onOpenDetails(order)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-900 w-full text-left transition duration-150 ease-in-out"
                          >
                            <i className="fas fa-info-circle mr-2"></i> Details
                          </button>
                          <button
                            onClick={() => onOpenDelete(order)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-100 hover:text-red-900 w-full text-left transition duration-150 ease-in-out"
                          >
                            <i className="fas fa-trash-alt mr-2"></i> Delete
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