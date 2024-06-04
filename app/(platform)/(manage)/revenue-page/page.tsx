import React from 'react';
import { Header } from '@/components/Header';
import { SideBar } from '@/components/SideBar';
import { Footer } from '@/components/Footer';
import { BarChart } from '@/components/BarChart';

const RevenuePage = () => {
  return (
    <div className="flex min-h-screen overflow-x-hidden">
      {/* Side Bar */}
      <div className="fixed top-0 left-0 h-full w-64 bg-pink-600 text-white">
        <SideBar />
      </div>
      {/* Content */}
      <div className="flex flex-col flex-grow ml-64">
        {/* Header */}
        <div className="fixed top-0 left-64 right-0 bg-white shadow-md z-10">
          <Header title="Product Management" />
        </div>
        {/* Main Content */}
        <main className="flex-grow p-6 mt-16 mb-16 bg-gray-100 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 shadow rounded-lg">
              <h2>Total Profit</h2>
              <p>$100,897</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
              <h2>Total Expense</h2>
              <p>$20,897</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
              <h2>New Customers</h2>
              <p>630</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
              <h2>Total Products Sold</h2>
              <p>24903</p>
            </div>
          </div>
          <div className="mt-8 bg-white p-6 shadow rounded-lg">
            <BarChart />
          </div>
        </main>
        {/* Footer */}
        <div className="fixed bottom-0 left-64 right-0 bg-white shadow-md z-10">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default RevenuePage;
