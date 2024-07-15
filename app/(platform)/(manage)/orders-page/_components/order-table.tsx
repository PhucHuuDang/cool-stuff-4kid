import React from 'react';
import { Order } from '@/interface';

interface OrderTableProps {
  orders: Order[];
  loading: boolean;
  error: string | null;
  onOpenDelete: (order: Order) => void;
  onOpenDetails: (order: Order) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, loading, error, onOpenDelete, onOpenDetails }) => {
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
                    {order.status === 0 ? 'Pending' : 'Completed'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-center">
                    <button
                      onClick={() => onOpenDetails(order)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onOpenDelete(order)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
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