import React, { useState, useEffect } from 'react';
import { X, Percent, Hash, Tag, Calendar, ToggleLeft } from 'lucide-react';
import { Voucher } from '@/interface';

interface EditVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedVoucher: Voucher) => void;
  voucher: Voucher;
}

const EditVoucherModal: React.FC<EditVoucherModalProps> = ({ isOpen, onClose, onUpdate, voucher }) => {
  const [editedVoucher, setEditedVoucher] = useState<Voucher>(voucher);
  const [maxExpirationDate, setMaxExpirationDate] = useState<string>('');
  const [minExpirationDate, setMinExpirationDate] = useState<string>('');
  const [originalDuration, setOriginalDuration] = useState<number>(0);
  const [errors, setErrors] = useState({
    discountPercent: '',
    quantity: '',
    code: '',
    dateTo: ''
  });
  const [showDiscountWarning, setShowDiscountWarning] = useState(false);
  const [isExpirationDateChanged, setIsExpirationDateChanged] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isEditingExpirationDate, setIsEditingExpirationDate] = useState(false);

  useEffect(() => {
    setEditedVoucher(voucher);
    setShowDiscountWarning(voucher.discountPercent >= 50);
    const currentDate = new Date(voucher.dateFrom);
    const expirationDate = new Date(voucher.dateTo);
    const durationInDays = Math.ceil((expirationDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
    setOriginalDuration(durationInDays);
    
    const maxDate = new Date(currentDate.getTime() + durationInDays * 24 * 60 * 60 * 1000);
    setMaxExpirationDate(maxDate.toISOString().split('T')[0]);
    setMinExpirationDate(currentDate.toISOString().split('T')[0]);
    setIsExpirationDateChanged(false);
    setIsEditingExpirationDate(false);
  }, [voucher]);

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
      case 'dateTo':
        if (isEditingExpirationDate) {
          const selectedDate = new Date(value as string);
          const maxDate = new Date(maxExpirationDate);
          const minDate = new Date(minExpirationDate);
          if (selectedDate > maxDate || selectedDate < minDate) {
            error = 'Invalid expiration date';
          }
        }
        break;
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let updatedValue: string | number = value;
    
    if (name === 'code') {
      updatedValue = value.slice(0, 6);
    } else if (name === 'discountPercent' || name === 'quantity' || name === 'vouchersStatus') {
      updatedValue = Number(value);
      if (name === 'discountPercent') {
        updatedValue = Math.min(Math.max(Number(value), 1), 80);
        setShowDiscountWarning(Number(updatedValue) >= 50);
      }
    } else if (name === 'dateTo' && isEditingExpirationDate) {
      const selectedDate = new Date(value);
      const maxDate = new Date(maxExpirationDate);
      const minDate = new Date(minExpirationDate);
      
      if (selectedDate <= maxDate && selectedDate >= minDate) {
        updatedValue = new Date(value).toISOString();
        setIsExpirationDateChanged(true);
      } else {
        return; // Don't update if the date is invalid
      }
    }

    setEditedVoucher(prev => ({ ...prev, [name]: updatedValue }));

    const error = validateField(name, updatedValue);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = {
      code: validateField('code', editedVoucher.code),
      discountPercent: validateField('discountPercent', editedVoucher.discountPercent),
      quantity: validateField('quantity', editedVoucher.quantity),
      dateTo: isEditingExpirationDate ? validateField('dateTo', editedVoucher.dateTo) : ''
    };

    setErrors(formErrors);

    if (Object.values(formErrors).some(error => error !== '')) {
      return;
    }

    if (isEditingExpirationDate && isExpirationDateChanged) {
      setShowConfirmModal(true);
    } else {
      onUpdate(editedVoucher);
    }
  };

  const handleConfirmUpdate = () => {
    setShowConfirmModal(false);
    onUpdate(editedVoucher);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center mt-10">
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
                className={`pl-10 pr-3 py-3 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${errors.code ? 'border-red-500' : 'border-gray-300'}`}
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
                value={editedVoucher.discountPercent}
                onChange={handleChange}
                className={`pl-10 pr-3 py-3 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${errors.discountPercent ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={18} />
            </div>
            {errors.discountPercent && <p className="mt-1 text-sm text-red-600">{errors.discountPercent}</p>}
            {showDiscountWarning && editedVoucher.discountPercent < 81 && (
              <p className="mt-1 text-sm text-orange-600">Warning: Discount is 50% or higher. Please confirm this is intended.</p>
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
            <label className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                checked={isEditingExpirationDate}
                onChange={(e) => setIsEditingExpirationDate(e.target.checked)}
              />
              <span>Edit expiration date</span>
            </label>
            <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
            <div className="relative">
              <input
                id="dateTo"
                name="dateTo"
                type="date"
                value={editedVoucher.dateTo.split('T')[0]}
                onChange={handleChange}
                min={minExpirationDate}
                max={maxExpirationDate}
                className={`pl-10 pr-3 py-3 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${errors.dateTo ? 'border-red-500' : 'border-gray-300'}`}
                required
                disabled={!isEditingExpirationDate}
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={18} />
            </div>
            {errors.dateTo && <p className="mt-1 text-sm text-red-600">{errors.dateTo}</p>}
            {isEditingExpirationDate && (
              <p className="mt-1 text-sm text-gray-500">
                You can adjust the expiration date between {minExpirationDate} and {maxExpirationDate} (within {originalDuration} days from the start date)
              </p>
            )}
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
            >
              Update Voucher
            </button>
          </div>
        </form>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Xác nhận thay đổi</h3>
            <p className="mb-6">Bạn có chắc là sẽ thay đổi ngày hết hạn chứ, việc này sẽ không thể hoàn tác</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmUpdate}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditVoucherModal;