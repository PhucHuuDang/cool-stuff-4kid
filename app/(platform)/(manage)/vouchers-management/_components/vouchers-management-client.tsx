"use client"

import React, { useState, useEffect } from 'react';
import AddVoucherModal from './add-voucher-modal';
import EditVoucherModal from './edit-voucher-modal';
import { MoreVertical, Edit, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Voucher } from '@/interface';

const VouchersManagementClient: React.FC = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [filteredVouchers, setFilteredVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [searchCode, setSearchCode] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [voucherToDelete, setVoucherToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchVouchers();
  }, []);

  useEffect(() => {
    setFilteredVouchers(
      vouchers.filter(voucher => 
        voucher.code.toLowerCase().includes(searchCode.toLowerCase())
      )
    );
  }, [searchCode, vouchers]);

  const fetchVouchers = async () => {
    try {
      const response = await fetch('https://milkapplicationapi.azurewebsites.net/api/Vouchers/GetAllVouchers');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Voucher[] = await response.json();
      setVouchers(data);
      setFilteredVouchers(data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching vouchers');
      setLoading(false);
    }
  };

  const handleAddVoucher = async (newVoucher: Omit<Voucher, 'voucherId'>) => {
    try {
      const voucherToAdd = {
        ...newVoucher,
        voucherId: 0
      };

      const response = await fetch('https://milkapplicationapi.azurewebsites.net/api/Vouchers/CreateVouchers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(voucherToAdd),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add voucher: ${response.status} ${errorText}`);
      }

      await fetchVouchers();
      setShowAddModal(false);
      setSuccessMessage('Voucher added successfully');
    } catch (error) {
      console.error('Error adding voucher:', error);
      setError('Failed to add voucher. Please try again.');
    }
  };

  const handleEditVoucher = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setShowEditModal(true);
  };

  const handleUpdateVoucher = async (updatedVoucher: Voucher) => {
    try {
      const response = await fetch(`https://milkapplicationapi.azurewebsites.net/api/Vouchers/UpdateVouchers/${updatedVoucher.voucherId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedVoucher),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update voucher: ${response.status} ${errorText}`);
      }

      await fetchVouchers();
      setShowEditModal(false);
      setSuccessMessage('Voucher updated successfully');
    } catch (error) {
      console.error('Error updating voucher:', error);
      setError('Failed to update voucher. Please try again.');
    }
  };

  const handleDeleteClick = (voucherId: number) => {
    setVoucherToDelete(voucherId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (voucherToDelete === null) return;

    try {
      const response = await fetch(`https://milkapplicationapi.azurewebsites.net/api/Vouchers/DeleteVouchers/${voucherToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete voucher');
      }

      await fetchVouchers();
      setSuccessMessage('Voucher deleted successfully');
    } catch (error) {
      console.error('Error deleting voucher:', error);
      setError('Failed to delete voucher. Please try again.');
    } finally {
      setShowConfirmModal(false);
      setVoucherToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).replace(/\//g, '-');
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return <div className="text-center text-red-500 text-xl mt-10">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Vouchers Management</h1>
      
      {successMessage && (
        <div className="text-green-500 text-center mt-4 mb-4">{successMessage}</div>
      )}

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by code"
          className="p-2 border rounded"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
        />
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Voucher
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Voucher ID
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Code
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Discount
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date From
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date To
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredVouchers.map((voucher) => (
              <tr key={voucher.voucherId}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{voucher.voucherId}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{voucher.code}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{voucher.discountPercent}%</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{voucher.quantity}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{formatDate(voucher.dateFrom)}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{formatDate(voucher.dateTo)}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span
                    className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                      voucher.vouchersStatus === 1 ? 'text-green-900' : 'text-red-900'
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-0 opacity-50 rounded-full ${
                        voucher.vouchersStatus === 1 ? 'bg-green-200' : 'bg-red-200'
                      }`}
                    ></span>
                    <span className="relative">{voucher.vouchersStatus === 1 ? 'Active' : 'Inactive'}</span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleEditVoucher(voucher)}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteClick(voucher.voucherId)}>
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddVoucherModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddVoucher}
      />

      {selectedVoucher && (
        <EditVoucherModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdateVoucher}
          voucher={selectedVoucher}
        />
      )}

      {/* Confirm Delete Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4">Are you sure you want to delete this voucher? This can't be undone.</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VouchersManagementClient;