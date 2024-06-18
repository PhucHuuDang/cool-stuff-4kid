"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { SideBar } from "@/components/Sidebar";
import Image from "next/image";
import { Mail, MessageCircle, Phone } from "lucide-react";

const StaffManagementPage: React.FC = () => {
  const staffMembers = [
    {
      id: 1,
      name: "Fox 1",
      role: "Sales-Staff",
      staffId: "SS-HCM-GV-0001",
      joinDate: "2/4/2023",
      gender: "Male",
    },
    {
      id: 2,
      name: "Fox 2",
      role: "Sales-Staff",
      staffId: "SS-HCM-D1-0001",
      joinDate: "2/4/2023",
      gender: "Male",
    },
    {
      id: 3,
      name: "Fox 3",
      role: "Sales-Staff",
      staffId: "SS-HCM-D12-0001",
      joinDate: "2/4/2023",
      gender: "Male",
    },
    {
      id: 4,
      name: "Fox 4",
      role: "Sales-Staff",
      staffId: "SS-HCM-GV-0002",
      joinDate: "2/4/2023",
      gender: "Male",
    },
    {
      id: 5,
      name: "Fox 5",
      role: "Sales-Staff",
      staffId: "SS-HCM-D7-0001",
      joinDate: "2/4/2023",
      gender: "Male",
    },
    {
      id: 6,
      name: "Fox 6",
      role: "Event-Staff",
      staffId: "ES-HCM-GV-0001",
      joinDate: "2/4/2023",
      gender: "Male",
    },
    {
      id: 7,
      name: "Fox 7",
      role: "Event-Staff",
      staffId: "ES-HCM-D1-0001",
      joinDate: "2/4/2023",
      gender: "Male",
    },
    {
      id: 8,
      name: "Fox 8",
      role: "Event-Staff",
      staffId: "ES-HCM-D12-0001",
      joinDate: "2/4/2023",
      gender: "Male",
    },
    {
      id: 9,
      name: "Fox 9",
      role: "Event-Staff",
      staffId: "ES-HCM-D7-0001",
      joinDate: "2/4/2023",
      gender: "Male",
    },
    {
      id: 10,
      name: "Fox 10",
      role: "Event-Staff",
      staffId: "ES-HCM-GV-0002",
      joinDate: "2/4/2023",
      gender: "Male",
    },
    {
      id: 11,
      name: "Fox 11",
      role: "Event-Staff",
      staffId: "ES-HCM-D1-0002",
      joinDate: "2/4/2023",
      gender: "Male",
    },
    {
      id: 12,
      name: "Fox 12",
      role: "Storage-Staff",
      staffId: "StS-HCMM-GV-0001",
      joinDate: "2/4/2023",
      gender: "Male",
    },
    {
      id: 13,
      name: "Fox 13",
      role: "Storage-Staff",
      staffId: "StS-HCMM-D1-0001",
      joinDate: "2/4/2023",
      gender: "Male",
    },
    {
      id: 14,
      name: "Fox 14",
      role: "Storage-Staff",
      staffId: "StS-HCMM-D12-0001",
      joinDate: "2/4/2023",
      gender: "Male",
    },
    {
      id: 15,
      name: "Fox 15",
      role: "Storage-Staff",
      staffId: "StS-HCMM-D7-0001",
      joinDate: "2/4/2023",
      gender: "Male",
    },
    {
      id: 16,
      name: "Fox 16",
      role: "Storage-Staff",
      staffId: "StS-HCMM-GV-0002",
      joinDate: "2/4/2023",
      gender: "Male",
    },
    {
      id: 17,
      name: "Fox 17",
      role: "Storage-Staff",
      staffId: "StS-HCMM-D1-0002",
      joinDate: "2/4/2023",
      gender: "Male",
    },
    {
      id: 18,
      name: "Fox 18",
      role: "Event-Staff",
      staffId: "ES-HCM-D7-0002",
      joinDate: "2/4/2023",
      gender: "Male",
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Pagination logic
  const indexOfLastStaff = currentPage * itemsPerPage;
  const indexOfFirstStaff = indexOfLastStaff - itemsPerPage;
  const currentStaff = staffMembers.slice(indexOfFirstStaff, indexOfLastStaff);
  const totalPages = Math.ceil(staffMembers.length / itemsPerPage);

  const totalStaff = staffMembers.length;
  const newStaff = staffMembers.filter(
    (member) => new Date(member.joinDate) > new Date("1/1/2023"),
  ).length;
  const maleStaff = staffMembers.filter(
    (member) => member.gender === "Male",
  ).length;
  const femaleStaff = staffMembers.filter(
    (member) => member.gender === "Female",
  ).length;

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <div className="flex flex-grow">
        <main className="flex-grow overflow-y-auto p-6">
          <div className="mb-6 grid grid-cols-4 gap-4">
            <div className="rounded bg-purple-200 p-4">
              <p>Total Staff</p>
              <h3>{totalStaff}</h3>
            </div>
            <div className="rounded bg-yellow-200 p-4">
              <p>New Staff</p>
              <h3>{newStaff}</h3>
            </div>
            <div className="rounded bg-blue-200 p-4">
              <p>Male</p>
              <h3>{maleStaff}</h3>
            </div>
            <div className="rounded bg-green-200 p-4">
              <p>Female</p>
              <h3>{femaleStaff}</h3>
            </div>
          </div>

          <div className="mb-6 flex">
            <input
              type="text"
              placeholder="Staff Name"
              className="mr-4 flex-grow rounded border p-2"
            />
            <select className="mr-4 rounded border p-2">
              <option>Select Status</option>
              {/* Add more options as needed */}
            </select>
            <select className="mr-4 rounded border p-2">
              <option>Select Priority</option>
              {/* Add more options as needed */}
            </select>
            <button className="rounded bg-black p-2 text-white">Search</button>
            <button className="ml-auto rounded border bg-white p-2 text-black">
              Add Staff
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {currentStaff.map((staff) => (
              <StaffCard key={staff.id} staff={staff} />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => handleClick(currentPage - 1)}
              disabled={currentPage === 1}
              className={`rounded bg-gray-200 px-4 py-2 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-300"}`}
            >
              Previous
            </button>
            <div className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={() => handleClick(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`rounded bg-gray-200 px-4 py-2 ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : "hover:bg-gray-300"}`}
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

const StaffCard: React.FC<{ staff: any }> = ({ staff }) => {
  return (
    <div className="flex flex-col items-center rounded bg-white p-4 shadow">
      <Image
        src="https://via.placeholder.com/100"
        alt="avatar"
        height={100}
        width={100}
        className="mb-4 h-24 w-24 rounded-full"
      />
      <div className="text-center">
        <h4 className="mb-2 text-lg font-semibold">{staff.name}</h4>
        <p className="mb-4 text-gray-600">{staff.role}</p>
        <p className="mb-1 text-gray-600">Staff ID: {staff.staffId}</p>
        <p className="mb-4 text-gray-600">Join Date: {staff.joinDate}</p>
      </div>
      <div className="mt-auto flex justify-center">
        <button className="mx-2 text-blue-500">
          <Phone />
        </button>
        <button className="mx-2 text-blue-500">
          <MessageCircle />
        </button>
        <button className="mx-2 text-blue-500">
          <Mail />
        </button>
      </div>
    </div>
  );
};

export default StaffManagementPage;
