"use client";
import React, { useState } from "react";
import Link from "next/link";
import { routes } from "../routes/routes";
import { Activity, LayoutDashboard, ListOrdered, PackageSearch, Settings, Users } from "lucide-react";

const SideBar: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("dashboard");
  console.log('currentPage',currentPage)

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <aside className="w-64 h-screen bg-[#F5F7FD]">
      <nav>
        <Link
          href={routes.dashboard}
           className={`flex p-4 text-slate-700 items-center ${currentPage === "dashboard" ? "bg-pink-600 rounded-l-lg text-white" : "bg-[#F5F7FD] hover:bg-red-200"}`}
          onClick={() => handlePageChange("dashboard")}
        >
          <LayoutDashboard />
          <span className="ml-2">Dashboard</span>
        </Link>
        <Link
          href={routes.staffManagement}
          className={`flex p-4 text-slate-700 ${currentPage === "staffManagement" ? "bg-pink-600 rounded-l-lg text-white" : "bg-[#F5F7FD] hover:bg-red-200"}`}
          onClick={() => handlePageChange("staffManagement")}
        >
           <Users />
           <span className="ml-2">Staff</span>
        </Link>
        <Link
          href={routes.orders}
          className={`flex p-4 text-slate-700 ${currentPage === "orders" ? "bg-pink-600 rounded-l-lg text-white" : "bg-[#F5F7FD] hover:bg-red-200"}`}
          onClick={() => handlePageChange("orders")}
        >
          <ListOrdered />
          <span className="ml-2">Orders</span>
        </Link>
        <Link
          href={routes.revenue}
          className={`flex p-4 text-slate-700 ${currentPage === "revenue" ? "bg-pink-600 rounded-l-lg text-white" : "bg-[#F5F7FD] hover:bg-red-200"}`}
          onClick={() => handlePageChange("revenue")}
        >
          <Activity />
          <span className="ml-2">Revenue</span>
        </Link>
        <Link
          href={routes.productManagement}
          className={`flex p-4 text-slate-700 ${currentPage === "productManagement" ? "bg-pink-600 rounded-l-lg text-white" : "bg-[#F5F7FD] hover:bg-red-200"}`}
          onClick={() => handlePageChange("productManagement")}
        >
           <PackageSearch />
           <span className="ml-2">Products</span>
        </Link>
        <Link
          href={routes.adminAccount}
          className={`flex p-4 text-slate-700 ${currentPage === "adminAccount" ? "bg-pink-600 rounded-l-lg text-white" : "bg-[#F5F7FD] hover:bg-red-200"}`}
          onClick={() => handlePageChange("adminAccount")}
        >
           <Settings />
           <span className="ml-2">Account</span>
        </Link>
      </nav>
    </aside>
  );
};

export { SideBar };
