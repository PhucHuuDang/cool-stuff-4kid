"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Mail, MessageCircle, Phone, Search } from "lucide-react";
import AddStaffModal from "./add-staff-modal";
import BanStaffButton from "./ban-staff-modal";
import UnbanStaffButton from "./unbanned-staff-modal";
import { Toaster } from 'react-hot-toast';

interface ApiUser {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  status: number;
}

interface StaffMember {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  status: number;
}

const StaffManagementClient: React.FC = () => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 9;

  useEffect(() => {
    fetchStaffMembers();
  }, []);

  const fetchStaffMembers = async () => {
    try {
      const response = await fetch('https://milkapplicationapi.azurewebsites.net/api/Users/GetAllStaff');
      const data = await response.json();

      if (data.isSucceed) {
        const staffMembers = data.data.map((user: ApiUser) => ({
          id: user.id,
          fullName: user.fullName,
          userName: user.userName,
          email: user.email,
          status: user.status
        }));

        setStaffMembers(staffMembers);
      }
    } catch (error) {
      console.error('Error fetching staff members:', error);
    }
  };

  const handleStaffStatusChange = (userId: string, newStatus: number) => {
    setStaffMembers(prevStaff => prevStaff.map(staff => 
      staff.id === userId ? { ...staff, status: newStatus } : staff
    ));
  };

  const indexOfLastStaff = currentPage * itemsPerPage;
  const indexOfFirstStaff = indexOfLastStaff - itemsPerPage;

  const filteredStaff = staffMembers.filter(staff =>
    staff.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentStaff = filteredStaff.slice(indexOfFirstStaff, indexOfLastStaff);
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);

  const totalStaff = staffMembers.length;
  const activeStaff = staffMembers.filter(member => member.status === 1).length;
  const inactiveStaff = staffMembers.filter(member => member.status === 0).length;

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addNewStaff = (newStaff: StaffMember) => {
    setStaffMembers([...staffMembers, newStaff]);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Toaster position="top-right" />
      <div className="flex flex-grow">
        <main className="flex-grow overflow-y-auto p-6">
          <div className="mb-6 grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-purple-200 p-4">
              <p>Total Staff</p>
              <h3>{totalStaff}</h3>
            </div>
            <div className="rounded-lg bg-green-200 p-4">
              <p>Active Staff</p>
              <h3>{activeStaff}</h3>
            </div>
            <div className="rounded-lg bg-red-200 p-4">
              <p>Inactive Staff</p>
              <h3>{inactiveStaff}</h3>
            </div>
          </div>

          <div className="mb-6 flex rounded-lg">
            <div className="relative mr-4 flex flex-grow items-center">
              <Search className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search Name Of Staff"
                className="w-full rounded border p-2 pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select className="mr-4 rounded-lg border p-2">
              <option>Select Status</option>
            </select>
            <button className="rounded-l-lg bg-black p-2 text-white">Search</button>
            <button className="ml-auto rounded-r-lg border bg-white p-2 text-black" onClick={openModal}>
              Add Staff
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {currentStaff.map((staff) => (
              <StaffCard key={staff.id} staff={staff} onStatusChange={handleStaffStatusChange} />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => handleClick(currentPage - 1)}
              disabled={currentPage === 1}
              className={`rounded bg-gray-200 px-4 py-2 ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-300"
              }`}
            >
              Previous
            </button>
            <div className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={() => handleClick(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`rounded bg-gray-200 px-4 py-2 ${
                currentPage === totalPages ? "cursor-not-allowed opacity-50" : "hover:bg-gray-300"
              }`}
            >
              Next
            </button>
          </div>

          <AddStaffModal isOpen={isModalOpen} onClose={closeModal} onAddStaff={addNewStaff} />
        </main>
      </div>
    </div>
  );
};

const StaffCard: React.FC<{ staff: StaffMember; onStatusChange: (userId: string, newStatus: number) => void }> = ({ staff, onStatusChange }) => {
  return (
    <div className="relative flex flex-col items-center rounded-lg bg-white p-4 shadow">
      {staff.status === 0 && (
        <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center pointer-events-none">
          <div className="rotate-45 text-red-600 border-8 border-red-600 rounded-full p-4 text-xl font-bold opacity-70">
            BANNED
          </div>
        </div>
      )}
      <Image
        src="https://via.placeholder.com/100"
        alt="avatar"
        height={100}
        width={100}
        className="mb-4 h-24 w-24 rounded-full"
      />
      <div>
        <h4 className="mb-2 text-center text-lg font-semibold">{staff.fullName}</h4>
        <p className="mb-4 text-center text-gray-600">Status: {staff.status === 0 ? 'Inactive' : 'Active'}</p>
        <p className="text-gray-600 mb-2">Username: {staff.userName}</p>
        <p className="text-gray-600 mb-2">Email: {staff.email}</p>
      </div>
      <div className="mt-5 flex justify-center items-center">
        <button className="mx-2 text-blue-500">
          <Phone />
        </button>
        <button className="mx-2 text-blue-500">
          <MessageCircle />
        </button>
        <button className="mx-2 text-blue-500">
          <Mail />
        </button>
        {staff.status === 1 && (
          <BanStaffButton 
            userId={staff.id}
            userName={staff.fullName}
            onStatusChange={onStatusChange}
          />
        )}
        {staff.status === 0 && (
          <UnbanStaffButton
            userId={staff.id}
            userName={staff.fullName}
            onStatusChange={onStatusChange}
          />
        )}
      </div>
    </div>
  );
};

export default StaffManagementClient;