import React from 'react';
import { BarChart } from '@/components/bar-chart';

const RevenuePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-grow">
        <main className="flex-grow p-6 bg-gray-100 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-pink-600 p-4 shadow rounded-lg">
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
            <div className="bg-pink-600 p-4 shadow rounded-lg">
              <h2>Total Products Sold</h2>
              <p>24903</p>
            </div>
          </div>
          <div className="mt-8 bg-white p-6 shadow rounded-lg">
            <BarChart />
          </div>
        </main>
      </div>
    </div>
  );
};

export default RevenuePage;
