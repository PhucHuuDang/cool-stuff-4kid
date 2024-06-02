import React from 'react';
import { Header } from '@/components/Header';
import { SideBar } from '@/components/SideBar';
import { Footer } from '@/components/Footer';
import { BarChart } from '@/components/BarChart';

const Revenue = () => {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      
      <div className="flex flex-col flex-grow">
        <Header title="Revenue" />
        
        <main className="flex-grow p-6 bg-gray-100">
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
        
        <Footer />
      </div>
    </div>
  );
};

export default Revenue;
