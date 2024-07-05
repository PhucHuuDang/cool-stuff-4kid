// import Footer from "@/components/Footer";
import { Header } from "./(platform)/(staff)/_component/header";
import SideBar from "../components/SideBar";
import React from "react";
import { DashboardData } from "./(platform)/(staff)/dashboard/data";

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
