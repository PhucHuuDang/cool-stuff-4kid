import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import React from "react";
import { DashboardData } from "./dashboard/data";

const Staff: React.FC = () => {
  return (
    <div>
      <SideBar />
      <div>
        <Header title="Dashboard" />
        <main className="flex-grow bg-gray-100 p-3 overflow-auto mt-16 ml-64 ">
          <DashboardData/>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Staff;
