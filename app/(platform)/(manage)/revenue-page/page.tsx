import React from "react";
import { Header } from "@/components/Header";
import { SideBar } from "@/components/Sidebar";
import { BarChart } from "@/components/bar-chart";

const RevenuePage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-grow">
        <main className="flex-grow overflow-y-auto bg-gray-100 p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-pink-600 p-4 shadow">
              <h2>Total Profit</h2>
              <p>$100,897</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <h2>Total Expense</h2>
              <p>$20,897</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <h2>New Customers</h2>
              <p>630</p>
            </div>
            <div className="rounded-lg bg-pink-600 p-4 shadow">
              <h2>Total Products Sold</h2>
              <p>24903</p>
            </div>
          </div>
          <div className="mt-8 rounded-lg bg-white p-6 shadow">
            <BarChart />
          </div>
        </main>
        {/* Footer */}
        {/* <div className="fixed bottom-0 left-64 right-0 bg-white shadow-md z-10">
          <Footer />
        </div> */}
      </div>
    </div>
  );
};

export default RevenuePage;
