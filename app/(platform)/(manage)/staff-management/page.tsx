"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Mail, MessageCircle, Phone, Search, Trash2 } from "lucide-react";
import AddStaffModal from "./_components/add-staff-modal";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

interface ApiUser {
  fullName: string;
  userName: string;
  email: string;
  password: string | null;
}

interface StaffMember {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  role?: string;
  staffId?: string;
  joinDate?: string;
  gender?: string;
}

const StaffManagementPage: React.FC = () => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchStaffMembers = async () => {
      try {
        const response = await fetch('https://milkapplication20240705013352.azurewebsites.net/api/Users/GetAllStaff');
        const data = await response.json();

        if (data.isSucceed) {
          const staffMembers = data.data.map((user: ApiUser, index: number) => ({
            id: user.userName,
            fullName: user.fullName,
            userName: user.userName,
            email: user.email,
            role: "Staff",
            staffId: `NS-${String(index + 1).padStart(4, '0')}`,
            joinDate: new Date().toLocaleDateString(),
            gender: "Unknown"
          }));

          setStaffMembers(staffMembers);
        }
      } catch (error) {
        console.error('Error fetching staff members:', error);
      }
    };

    fetchStaffMembers();
  }, []);

  const handleDeleteStaff = async (userId: string) => {
    try {
      const response = await fetch(`https://milkapplication20240705013352.azurewebsites.net/api/Users/DeleteUser/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setStaffMembers(staffMembers.filter(staff => staff.id !== userId));
        toast.success('Nhân viên đã được xóa thành công!');
      } else {
        toast.error('Không thể xóa nhân viên. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error deleting staff:', error);
      toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  const indexOfLastStaff = currentPage * itemsPerPage;
  const indexOfFirstStaff = indexOfLastStaff - itemsPerPage;

  const filteredStaff = staffMembers.filter(staff =>
    staff.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentStaff = filteredStaff.slice(indexOfFirstStaff, indexOfLastStaff);
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);

  const totalStaff = staffMembers.length;
  const newStaff = staffMembers.filter(
    (member) => member.joinDate && new Date(member.joinDate) > new Date("1/1/2023")
  ).length;
  const maleStaff = staffMembers.filter(
    (member) => member.gender === "Male"
  ).length;
  const femaleStaff = staffMembers.filter(
    (member) => member.gender === "Female"
  ).length;

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addNewStaff = (newStaff: StaffMember) => {
    const staffMemberToAdd: StaffMember = {
      ...newStaff,
      role: "New Staff",
      joinDate: new Date().toLocaleDateString(),
      gender: "Unknown"
    };
    setStaffMembers([...staffMembers, staffMemberToAdd]);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Toaster position="top-right" />
      <div className="flex flex-grow">
        <main className="flex-grow overflow-y-auto p-6">
          <div className="mb-6 grid grid-cols-4 gap-4">
            <div className="rounded-lg bg-purple-200 p-4">
              <p>Total Staff</p>
              <h3>{totalStaff}</h3>
            </div>
            <div className="rounded-lg bg-yellow-200 p-4">
              <p>New Staff</p>
              <h3>{newStaff}</h3>
            </div>
            <div className="rounded-lg bg-blue-200 p-4">
              <p>Male</p>
              <h3>{maleStaff}</h3>
            </div>
            <div className="rounded-lg bg-green-200 p-4">
              <p>Female</p>
              <h3>{femaleStaff}</h3>
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
            <select className="mr-4 rounded-lg border p-2">
              <option>Select Priority</option>
            </select>
            <button className="rounded-l-lg bg-black p-2 text-white">Search</button>
            <button className="ml-auto rounded-r-lg border bg-white p-2 text-black" onClick={openModal}>
              Add Staff
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {currentStaff.map((staff) => (
              <StaffCard key={staff.id} staff={staff} onDelete={handleDeleteStaff} />
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

const StaffCard: React.FC<{ staff: StaffMember; onDelete: (id: string) => void }> = ({ staff, onDelete }) => {
  return (
    <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow">
      <Image
        src="https://via.placeholder.com/100"
        alt="avatar"
        height={100}
        width={100}
        className="mb-4 h-24 w-24 rounded-full"
      />
      <div>
        <h4 className="mb-2 text-center text-lg font-semibold">{staff.fullName}</h4>
        <p className="mb-4 text-center text-gray-600">{staff.role}</p>
        <p className="text-gray-600 mb-2">Email: {staff.email}</p>
        <p className="text-gray-600 mb-2">Join Date: {staff.joinDate}</p>
        <p className="text-gray-600 mb-2">Gender: {staff.gender}</p>
      </div>
      <div className="mt-5 flex justify-center">
        <button className="mx-2 text-blue-500">
          <Phone />
        </button>
        <button className="mx-2 text-blue-500">
          <MessageCircle />
        </button>
        <button className="mx-2 text-blue-500">
          <Mail />
        </button>
        <button className="mx-2 text-red-500" onClick={() => onDelete(staff.id)}>
          <Trash2 />
        </button>
      </div>
    </div>
  );
};

export default StaffManagementPage;