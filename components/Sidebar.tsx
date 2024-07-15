"use client";
import React, { useState } from "react";
import Link from "next/link";
import { routes } from "../routes/routes";
import {
  Activity,
  LayoutDashboard,
  ListOrdered,
  PackageSearch,
  Settings,
  TicketPercent,
  Users,
} from "lucide-react";

const SideBar: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("dashboard");

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const getLinkClassName = (page: string) => {
    return `flex p-4 items-center transition-colors duration-200
      ${
        currentPage === page
          ? "bg-pink-600 text-white rounded-l-lg"
          : "text-slate-700 hover:bg-red-200"
      }`;
  };

  return (
    <aside className="h-screen w-64 bg-slate-500/10">
      <nav className="space-y-1">
        <Link
          href={routes.dashboard}
          className={getLinkClassName("dashboard")}
          onClick={() => handlePageChange("dashboard")}
        >
          <LayoutDashboard className="mr-2" />
          <span>Dashboard</span>
        </Link>
        <Link
          href={routes.staffManagement}
          className={getLinkClassName("staffManagement")}
          onClick={() => handlePageChange("staffManagement")}
        >
          <Users className="mr-2" />
          <span>Staff</span>
        </Link>
        <Link
          href={routes.orders}
          className={getLinkClassName("orders")}
          onClick={() => handlePageChange("orders")}
        >
          <ListOrdered className="mr-2" />
          <span>Orders</span>
        </Link>
        <Link
          href={routes.revenue}
          className={getLinkClassName("revenue")}
          onClick={() => handlePageChange("revenue")}
        >
          <Activity className="mr-2" />
          <span>Revenue</span>
        </Link>
        <Link
          href={routes.productManagement}
          className={getLinkClassName("productManagement")}
          onClick={() => handlePageChange("productManagement")}
        >
          <PackageSearch className="mr-2" />
          <span>Products</span>
        </Link>
        <Link
          href={routes.vouchers}
          className={getLinkClassName("vouchers")}
          onClick={() => handlePageChange("vouchers")}
        >
          <TicketPercent className="mr-2" />
          <span>Voucher</span>
        </Link>
        <Link
          href={routes.adminAccount}
          className={getLinkClassName("adminAccount")}
          onClick={() => handlePageChange("adminAccount")}
        >
          <Settings className="mr-2" />
          <span>Account</span>
        </Link>
      </nav>
    </aside>
  );
};

export { SideBar };
