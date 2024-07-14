import { Header } from "../_component/Header";
import React from "react";
import SideBar from "../_component/sidebar";
import { VoucherManagement } from "./_components/details";

const VoucherPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed z-50 w-full">
        <Header title="Voucher " />
      </div>
      <div className="mt-[100px] flex flex-grow">
        <div className="fixed h-full">
          <SideBar />
        </div>
        <main className="ml-64 flex-grow p-4">
          <VoucherManagement />
        </main>
      </div>
    </div>
  );
};

export default VoucherPage;
