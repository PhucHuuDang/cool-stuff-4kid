import React, { useState, useEffect } from 'react';
import { X, Percent, Hash, Tag, Calendar } from 'lucide-react';
import { Voucher } from '@/interface';

interface AddVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (voucher: Omit<Voucher, 'voucherId'>) => Promise<void>;
}

const AddVoucherModal: React.FC<AddVoucherModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [newVoucher, setNewVoucher] = useState<Omit<Voucher, 'voucherId'>>({
    code: '',
    discountPercent: 1,
    quantity: 1,
    dateFrom: new Date().toISOString().split('.')[0],
    dateTo: new Date().toISOString().split('.')[0],
    vouchersStatus: 0
  });

  const [expirationPeriod, setExpirationPeriod] = useState('7');

  const [errors, setErrors] = useState({
    discountPercent: '',
    quantity: '',
    code: ''
  });

  const [showDiscountWarning, setShowDiscountWarning] = useState(false);

  const validateCode = (code: string) => {
    const regex = /^[a-zA-Z0-9]{4,6}$/;
    return regex.test(code);
  };

  const validateField = (name: string, value: string | number) => {
    let error = '';
    switch (name) {
      case 'code':
        if (!validateCode(value as string)) {
          error = 'Code must be 4-6 alphanumeric characters';
        }
        break;
      case 'discountPercent':
        if (Number(value) < 1) {
          error = 'Discount must be 1 or greater';
        } else if (Number(value) > 80) {
          error = 'Discount cannot exceed 80%';
        }
        break;
      case 'quantity':
        if (Number(value) < 1) {
          error = 'Quantity must be 1 or greater';
        }
        break;
    }
    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let updatedValue: string | number = value;

    if (name === 'code') {
      updatedValue = value.slice(0, 6);
    } else if (name === 'discountPercent' || name === 'quantity') {
      updatedValue = Number(value);
      if (name === 'discountPercent') {
        updatedValue = Math.min(80, Math.max(1, Number(value)));
        setShowDiscountWarning(Number(updatedValue) >= 50);
      }
    }

    setNewVoucher(prev => ({ ...prev, [name]: updatedValue }));

    const error = validateField(name, updatedValue);
    setErrors(prev => ({ ...prev, [name]: error }));

    if (name === 'expirationPeriod') {
      setExpirationPeriod(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = {
      code: validateField('code', newVoucher.code),
      discountPercent: validateField('discountPercent', newVoucher.discountPercent),
      quantity: validateField('quantity', newVoucher.quantity)
    };

    setErrors(formErrors);

    if (Object.values(formErrors).some(error => error !== '')) {
      return;
    }

    const now = new Date();
    const expirationDate = new Date(now.getTime() + parseInt(expirationPeriod) * 24 * 60 * 60 * 1000);

    const voucherToSubmit = {
      ...newVoucher,
      dateFrom: now.toISOString(),
      dateTo: expirationDate.toISOString()
    };

    try {
      await onAdd(voucherToSubmit);
      setNewVoucher({
        code: '',
        discountPercent: 1,
        quantity: 1,
        dateFrom: new Date().toISOString().split('.')[0],
        dateTo: new Date().toISOString().split('.')[0],
        vouchersStatus: 0
      });
      setExpirationPeriod('7');
      setErrors({ discountPercent: '', quantity: '', code: '' });
      setShowDiscountWarning(false);
    } catch (error) {
      console.error('Error adding voucher:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center mt-10">
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
                placeholder="Enter voucher code (4-6 characters)"
                className={`pl-10 pr-3 py-3 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${errors.code ? 'border-red-500' : 'border-gray-300'}`}
                value={newVoucher.code}
                onChange={handleInputChange}
                required
                minLength={4}
                maxLength={6}
              />
              <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={18} />
            </div>
            {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
          </div>
          <div>
            <label htmlFor="discountPercent" className="block text-sm font-medium text-gray-700 mb-1">Discount Percentage</label>
            <div className="relative">
              <input
                id="discountPercent"
                name="discountPercent"
                type="number"
                min="1"
                max="80"
                placeholder="Enter discount percentage (1-80)"
                className={`pl-10 pr-3 py-3 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${errors.discountPercent ? 'border-red-500' : 'border-gray-300'}`}
                value={newVoucher.discountPercent}
                onChange={handleInputChange}
                required
              />
              <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={18} />
            </div>
            {errors.discountPercent && <p className="mt-1 text-sm text-red-600">{errors.discountPercent}</p>}
            {showDiscountWarning && (
              <p className="mt-1 text-sm text-yellow-600">Warning: Discount is 50% or higher. Please confirm this is intended.</p>
            )}
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
          <div>
            <label htmlFor="expirationPeriod" className="block text-sm font-medium text-gray-700 mb-1">Expiration Period</label>
            <div className="relative">
              <select
                id="expirationPeriod"
                name="expirationPeriod"
                className="pl-10 pr-3 py-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                value={expirationPeriod}
                onChange={handleInputChange}
                required
              >
                <option value="7">7 days</option>
                <option value="14">14 days</option>
              </select>
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={18} />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              The expiration date will be calculated from the time you Add Voucher plus the number of days you have selected
            </p>
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