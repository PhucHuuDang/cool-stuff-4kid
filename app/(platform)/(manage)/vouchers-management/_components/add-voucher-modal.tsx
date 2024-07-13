import React, { useState } from 'react';
import { X, Percent, Hash, Tag } from 'lucide-react';
import { Voucher } from '@/interface';

interface AddVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (voucher: Omit<Voucher, 'voucherId' | 'vouchersStatus'>) => Promise<void>;
}

const AddVoucherModal: React.FC<AddVoucherModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [newVoucher, setNewVoucher] = useState<Omit<Voucher, 'voucherId' | 'vouchersStatus'>>({
    code: '',
    discountPercent: 1,
    quantity: 1,
    date: new Date().toISOString(),
  });

  const [errors, setErrors] = useState({
    discountPercent: '',
    quantity: ''
  });

  const validateInput = (name: string, value: number) => {
    if (value < 1) {
      setErrors(prev => ({ ...prev, [name]: 'Value must be 1 or greater' }));
    } else {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVoucher(prev => ({ ...prev, [name]: name === 'code' ? value : Number(value) }));
    if (name === 'discountPercent' || name === 'quantity') {
      validateInput(name, Number(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newVoucher.discountPercent < 1 || newVoucher.quantity < 1) {
      return; // Don't submit if there are validation errors
    }
    console.log('Submitting voucher:', newVoucher);
    try {
      await onAdd(newVoucher);
      setNewVoucher({
        code: '',
        discountPercent: 1,
        quantity: 1,
        date: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error adding voucher:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative p-8 bg-white w-full max-w-md m-auto rounded-xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold mb-6 text-indigo-700 flex items-center">
          <Tag className="mr-3" /> Add New Voucher
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">Voucher Code</label>
            <div className="relative">
              <input
                id="code"
                name="code"
                type="text"
                placeholder="Enter voucher code"
                className="pl-10 pr-3 py-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                value={newVoucher.code}
                onChange={handleInputChange}
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
                placeholder="Enter discount percentage"
                className={`pl-10 pr-3 py-3 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${errors.discountPercent ? 'border-red-500' : 'border-gray-300'}`}
                value={newVoucher.discountPercent}
                onChange={handleInputChange}
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
                placeholder="Enter quantity"
                className={`pl-10 pr-3 py-3 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${errors.quantity ? 'border-red-500' : 'border-gray-300'}`}
                value={newVoucher.quantity}
                onChange={handleInputChange}
                required
              />
              <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={18} />
            </div>
            {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
          </div>
          <div className="flex items-center justify-end space-x-3 mt-8">
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
              disabled={newVoucher.discountPercent < 1 || newVoucher.quantity < 1}
            >
              Add Voucher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVoucherModal;