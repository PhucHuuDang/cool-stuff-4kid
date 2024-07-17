"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Product {
  productId: number;
  productName: string;
  price: number;
  discountPrice: number;
  discountPercent: number;
  productDescription: string;
  image: string;
  imagesCarousel: string[];
  quantity: number;
  status: number;
  categoryId: number;
  originId: number;
  locationId: number;
  id: string;
}

interface User {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  password: string | null;
  status: number;
  addresses: any[];
}

interface Activity {
  action: string;
  timestamp: string;
}

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('https://milkapplicationapi.azurewebsites.net/api/Product/GetAllProducts');
  const data = await response.json();
  return data;
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch('https://milkapplicationapi.azurewebsites.net/api/Users/GetAllUsers');
  const data = await response.json();
  return data.data;
}

const AdminAccountContent: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    async function loadActivities() {
      try {
        const [products, users] = await Promise.all([fetchProducts(), fetchUsers()]);
        
        const userMap = new Map(users.map(user => [user.id, user.fullName]));
        
        const lastFiveProducts = products.slice(-5).reverse();
        const newActivities = lastFiveProducts.map(product => ({
          action: `${userMap.get(product.id) || 'Unknown User'} add new a product '${product.productName}'`,
          timestamp: new Date().toLocaleString()
        }));
        
        setActivities(newActivities);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    loadActivities();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-grow">
        <main className="flex-grow bg-gray-100 overflow-y-auto">
          <div className="max-w-4xl mx-auto bg-white rounded shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Image
                  src="https://via.placeholder.com/100x100"
                  alt="User Avatar"
                  height={100}
                  width={100}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg mr-4"
                />
                <div>
                  <h1 className="text-xl font-bold mb-1">Vũ Minh Quân</h1>
                  <div className="text-gray-600">Gò Vấp, Hồ Chí Minh City, VN</div>
                  <div className="text-gray-600">Age: 22 | Gender: Male | Status: <span className="text-green-500">Active</span></div>
                </div>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Edit Profile
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <strong>Role:</strong> <span className="ml-4">Admin</span>
                </div>
                <div className="mb-4">
                  <strong>Email:</strong> <span className="ml-4">vuminhquan@gmail.com</span>
                </div>
                <div className="mb-4">
                  <strong>Contact:</strong> <span className="ml-4">(+84) (78910) (JQKA)</span>
                </div>
                <div className="mb-4">
                  <strong>Region:</strong> <span className="ml-4">Asia</span>
                </div>
              </div>
            </div>
            <div className="flex mt-6">
              <div className="w-1/2 bg-white p-4 rounded shadow mr-6">
                <h2 className="font-bold mb-4">Add Product Activity</h2>
                {activities.map((activity, index) => (
                  <div key={index}>
                    <div className="text-sm text-gray-600 mb-2">{activity.action}</div>
                    <div className="text-xs text-gray-500 mb-4">{activity.timestamp}</div>
                  </div>
                ))}
              </div>
              <div className="w-1/2 bg-white p-4 rounded shadow overflow-y-auto" style={{ maxHeight: '300px' }}>
                <h2 className="font-bold mb-4">Add Voucher Activity</h2>
                <div className="text-sm text-gray-600 mb-2">Fox 1 added a role 'Staff' at Go Vap branch</div>
                <div className="text-xs text-gray-500 mb-4">11/02/2024 10:40:55 AM</div>
                <div className="text-sm text-gray-600 mb-2">Fox 1 assigned task to a role 'Event-Staff'</div>
                <div className="text-xs text-gray-500 mb-4">11/02/2024 10:40:55 AM</div>
                <div className="text-sm text-gray-600 mb-2">Fox 2 role 'Sales-Staff' has been canceled</div>
                <div className="text-xs text-gray-500 mb-4">19/02/2024 10:40:55 AM</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminAccountContent;