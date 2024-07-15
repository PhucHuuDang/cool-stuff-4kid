import React from 'react';
import { Order } from '@/interface';

interface DetailsModalProps {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ isOpen, order, onClose }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg p-8 m-4 max-w-xl w-full">
          <h2 className="text-2xl font-bold mb-4">Order Details</h2>
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
          <p><strong>Total Price:</strong> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalPrice)}</p>
          <p><strong>Customer ID:</strong> {order.id}</p>
          <p><strong>User Name:</strong> {order.userName}</p>
          <p><strong>Status:</strong> {order.status === 0 ? 'Pending' : 'Completed'}</p>
          <button
            onClick={onClose}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;