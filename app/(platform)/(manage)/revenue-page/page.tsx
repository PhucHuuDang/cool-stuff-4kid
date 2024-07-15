"use client"
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const AreaChart = dynamic(() => import('@/components/area-chart').then((mod) => mod.AreaChart), {
  ssr: false
});

const RevenuePage = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const response = await fetch('https://milkapplicationapi.azurewebsites.net/api/Payment/totalAmountsForLast12Months');
        const data: { [key: string]: number } = await response.json();
        const total = Object.values(data).reduce((sum, value) => sum + value, 0);
        setTotalRevenue(total);
      } catch (error) {
        console.error('Error fetching total revenue:', error);
      }
    };

    const fetchTotalProducts = async () => {
      try {
        const response = await fetch('https://your-api-endpoint.com/total-products-sold');
        const data = await response.json();
        setTotalProducts(data.totalSold);
      } catch (error) {
        console.error('Error fetching total products sold:', error);
      }
    };

    fetchTotalRevenue();
    fetchTotalProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-grow">
        <main className="flex-grow p-6 bg-gray-100 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-pink-600 p-4 shadow rounded-lg text-white">
              <h2 className="text-lg font-semibold">Total Revenue</h2>
              <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700">Total Expense</h2>
              <p className="text-2xl font-bold text-gray-900">$20,897</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700">New Customers</h2>
              <p className="text-2xl font-bold text-gray-900">630</p>
            </div>
            <div className="bg-pink-600 p-4 shadow rounded-lg text-white">
              <h2 className="text-lg font-semibold">Total Products Sold</h2>
              <p className="text-2xl font-bold">{totalProducts}</p>
            </div>
          </div>
          <div className="mt-8 bg-white p-6 shadow rounded-lg">
            <AreaChart />
          </div>
        </main>
      </div>
    </div>
  );
};

export default RevenuePage;