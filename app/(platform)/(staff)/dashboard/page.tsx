import React from "react";
import { Header } from "../_component/Header";
import { DashboardData } from "./_component/data";
import SideBar from "../_component/sidebar";

const Staff: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed z-50 w-full">
        <Header title="Dashboard" />
      </div>
      <div className="mt-[100px] flex flex-grow">
        <div className="fixed h-full">
          <SideBar />
        </div>
        <main className="ml-64 flex-grow p-4">
          <DashboardData />
        </main>
      </div>
    </div>
  );
};

export default Staff;
