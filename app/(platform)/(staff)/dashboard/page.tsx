import React from "react";
import { Header } from "../_component/header";
import { DashboardData } from "./_component/data";
import SideBar from "../_component/sidebar";

const Staff: React.FC = () => {
  return (
    <div>
      <SideBar />
      <div>
        <Header title="Dashboard" />
        <main className="ml-64 flex-grow overflow-auto bg-gray-100 p-3">
          <DashboardData />
        </main>
      </div>
    </div>
  );
};

export default Staff;
