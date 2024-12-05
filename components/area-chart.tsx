"use client";

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface RevenueData {
  [key: string]: number;
}

const AreaChart = () => {
  const [revenueData, setRevenueData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://milkapplicationapi.azurewebsites.net/api/Payment/totalAmountsForLast12Months');
        const data: RevenueData = await response.json();
        const sortedData = Object.entries(data).sort(([a], [b]) => a.localeCompare(b));
        setLabels(sortedData.map(([month]) => month));
        setRevenueData(sortedData.map(([, amount]) => amount));
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      }
    };

    fetchData();
  }, []);

  const data: ChartData<'line'> = {
    labels: labels,
    datasets: [
      {
        label: 'Revenue',
        data: revenueData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: true,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Revenue',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export { AreaChart };