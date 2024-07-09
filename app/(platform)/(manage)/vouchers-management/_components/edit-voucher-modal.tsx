import React, { useState, useEffect } from 'react';
import { X, Percent, Hash, Tag, Calendar, ToggleLeft } from 'lucide-react';

interface Voucher {
  voucherId: number;
  code: string;
  discountPercent: number;
  quantity: number;
  date: string;
  vouchersStatus: number;
}

interface EditVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedVoucher: Voucher) => void;
  voucher: Voucher;
}

const EditVoucherModal: React.FC<EditVoucherModalProps> = ({ isOpen, onClose, onUpdate, voucher }) => {
  const [editedVoucher, setEditedVoucher] = useState<Voucher>(voucher);
  const [errors, setErrors] = useState({
    discountPercent: '',
    quantity: ''
  });

  useEffect(() => {
    setEditedVoucher(voucher);
  }, [voucher]);

  const validateInput = (name: string, value: number) => {
    if (value < 1) {
      setErrors(prev => ({ ...prev, [name]: 'Value must be 1 or greater' }));
    } else {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newValue = name === 'discountPercent' || name === 'quantity' ? Number(value) : value;
    setEditedVoucher(prev => ({ ...prev, [name]: newValue }));
    if (name === 'discountPercent' || name === 'quantity') {
      validateInput(name, Number(value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedVoucher.discountPercent < 1 || editedVoucher.quantity < 1) {
      return; // Don't submit if there are validation errors
    }
    onUpdate(editedVoucher);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative p-8 bg-white w-full max-w-4xl m-auto rounded-xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold mb-6 text-indigo-700 flex items-center">
          <Tag className="mr-3" /> Edit Voucher
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">Voucher Code</label>
            <div className="relative">
              <input
                id="code"
                name="code"
                type="text"
                value={editedVoucher.code}
                onChange={handleChange}
                className="pl-10 pr-3 py-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                required
              />
              <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={18} />
            </div>
          </div>

          <div>
            <label htmlFor="discountPercent" className="block text-sm font-medium text-gray-700 mb-1">Discount Percentage</label>
            <div className="relative">
              <input
                id="discountPercent"
                name="discountPercent"
                type="number"
                min="1"
                value={editedVoucher.discountPercent}
                onChange={handleChange}
                className={`pl-10 pr-3 py-3 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${errors.discountPercent ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={18} />
            </div>
            {errors.discountPercent && <p className="mt-1 text-sm text-red-600">{errors.discountPercent}</p>}
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <div className="relative">
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                value={editedVoucher.quantity}
                onChange={handleChange}
                className={`pl-10 pr-3 py-3 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${errors.quantity ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={18} />
            </div>
            {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <div className="relative">
              <input
                id="date"
                name="date"
                type="date"
                value={editedVoucher.date.split('T')[0]}
                onChange={handleChange}
                className="pl-10 pr-3 py-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                required
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={18} />
            </div>
          </div>

          <div>
            <label htmlFor="vouchersStatus" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <div className="relative">
              <select
                id="vouchersStatus"
                name="vouchersStatus"
                value={editedVoucher.vouchersStatus}
                onChange={handleChange}
                className="pl-10 pr-3 py-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out appearance-none"
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
              <ToggleLeft className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={18} />
            </div>
          </div>

          <div className="col-span-2 flex items-center justify-end space-x-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              disabled={editedVoucher.discountPercent < 1 || editedVoucher.quantity < 1}
            >
              Update Voucher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVoucherModal;