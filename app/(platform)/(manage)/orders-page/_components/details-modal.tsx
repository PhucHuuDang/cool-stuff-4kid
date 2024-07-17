import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Order, OrderDetail } from '@/interface';

interface DetailsModalProps {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
}

interface OrderUpdate {
  staffName: string;
  status: number;
  orderDate: string;
}

const OrderUpdateTracker: React.FC<OrderUpdate> = ({ staffName, status, orderDate }) => {
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
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear().toString()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">Cập nhật trạng thái đơn hàng</h3>
      <p className="mb-1"><span className="font-medium">Nhân viên:</span> {staffName}</p>
      <p className="mb-1">
        <span className="font-medium">Trạng thái mới:</span>
        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(status)}`}>
          {getStatusLabel(status)}
        </span>
      </p>
      <p><span className="font-medium">Thời gian cập nhật:</span> {formatDate(orderDate)}</p>
    </div>
  );
};

const DetailsModal: React.FC<DetailsModalProps> = ({ isOpen, order, onClose }) => {
  const [orderUpdate, setOrderUpdate] = useState<OrderUpdate | null>(null);
console.log("order", orderUpdate);

  useEffect(() => {
    setOrderUpdate(null)
    if (isOpen && order) {
      axios.get(`https://milkapplicationapi.azurewebsites.net/api/Order/${order.orderId}/response`)
        .then(response => {
          if (response.data.isSucceed) {
            setOrderUpdate(response.data.data);
            console.log("response", response.data.data);
            
          }
        })
        .catch(error => {
          console.error('Error fetching order update:', error);
        });
    }
  }, [isOpen, order]);

  if (!isOpen || !order) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear().toString()}`;
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full m-4 p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Chi tiết đơn hàng</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition duration-150">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {orderUpdate && (
          <OrderUpdateTracker
            staffName={orderUpdate.staffName}
            status={orderUpdate.status}
            orderDate={orderUpdate.orderDate}
          />
        )}

        <div className="grid grid-cols-2 gap-6 text-gray-700 mb-8">
          <div className="col-span-2 sm:col-span-1">
            <p className="mb-2"><span className="font-semibold">Mã đơn hàng:</span> {order.orderId}</p>
            <p className="mb-2"><span className="font-semibold">Ngày đặt hàng:</span> {formatDate(order.orderDate)}</p>
            <p className="mb-2"><span className="font-semibold">Tổng tiền:</span> {formatCurrency(order.totalPrice)}</p>
            <p className="mb-2"><span className="font-semibold">Họ và tên:</span> {order.fullName}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="mb-2"><span className="font-semibold">Mã khách hàng:</span> {order.id}</p>
            <p className="mb-2"><span className="font-semibold">Tên khách hàng:</span> {order.userName}</p>
            <p className="mb-2"><span className="font-semibold">Email:</span> {order.email}</p>
            <p className="mb-2">
              <span className="font-semibold">Trạng thái:</span>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                {getStatusLabel(order.status)}
              </span>
            </p>
          </div>
          {order.voucherId !== 0 && (
            <p className="col-span-2"><span className="font-semibold">Mã voucher:</span> {order.voucher?.code || 'Không có'}</p>
          )}
        </div>

        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Chi tiết sản phẩm</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left font-semibold">Sản phẩm</th>
                <th className="border p-3 text-left font-semibold">Số lượng</th>
                <th className="border p-3 text-left font-semibold">Giá</th>
                <th className="border p-3 text-left font-semibold">Tổng</th>
              </tr>
            </thead>
            <tbody>
              {order.orderDetails.map(detail => (
                <tr key={detail.orderDetailId} className="hover:bg-gray-50">
                  <td className="border p-3">{detail.product.productName}</td>
                  <td className="border p-3">{detail.quantity}</td>
                  <td className="border p-3">{formatCurrency(detail.product.discountPrice || detail.product.price)}</td>
                  <td className="border p-3">{formatCurrency((detail.product.discountPrice || detail.product.price) * detail.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
