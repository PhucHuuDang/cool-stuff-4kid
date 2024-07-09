import React from "react";
import { Header } from "@/components/Header";
import { DashboardData } from "./_component/data";
import SideBar from "../_component/sidebar";

const Staff: React.FC = () => {
  return (
    <div className="">
      <div className="fixed w-full">
        <Header title="Dashboard" />
      </div>
      <div className="flex">
        <div>
          <SideBar />
        </div>
        <main className="ml-64 mt-[100px] h-full w-full px-2 pt-2">
          <DashboardData />
        </main>
      </div>
    </div>
  );
};

export default Staff;
