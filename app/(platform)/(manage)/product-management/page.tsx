"use client";

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { SideBar } from '@/components/SideBar';
import { Footer } from '@/components/Footer';

const products = [
  { id: 1, image: 'image1.jpg', name: 'Product 1', quantity: 10, purchasePrice: 100, salePrice: 150, link: 'https://example.com/product1' },
  { id: 2, image: 'image2.jpg', name: 'Product 2', quantity: 20, purchasePrice: 200, salePrice: 250, link: 'https://example.com/product2' },
  { id: 3, image: 'image3.jpg', name: 'Product 3', quantity: 30, purchasePrice: 300, salePrice: 350, link: 'https://example.com/product3' },
  { id: 4, image: 'image4.jpg', name: 'Product 4', quantity: 40, purchasePrice: 400, salePrice: 450, link: 'https://example.com/product4' },
  { id: 5, image: 'image5.jpg', name: 'Product 5', quantity: 50, purchasePrice: 500, salePrice: 550, link: 'https://example.com/product5' },
  { id: 6, image: 'image6.jpg', name: 'Product 6', quantity: 60, purchasePrice: 600, salePrice: 650, link: 'https://example.com/product6' },
  { id: 7, image: 'image7.jpg', name: 'Product 7', quantity: 70, purchasePrice: 700, salePrice: 750, link: 'https://example.com/product7' },
  { id: 8, image: 'image8.jpg', name: 'Product 8', quantity: 80, purchasePrice: 800, salePrice: 850, link: 'https://example.com/product8' },
  { id: 9, image: 'image9.jpg', name: 'Product 9', quantity: 90, purchasePrice: 900, salePrice: 950, link: 'https://example.com/product9' },
  { id: 10, image: 'image10.jpg', name: 'Product 10', quantity: 100, purchasePrice: 1000, salePrice: 1050, link: 'https://example.com/product10' },
  { id: 11, image: 'image11.jpg', name: 'Product 11', quantity: 110, purchasePrice: 1100, salePrice: 1150, link: 'https://example.com/product11' },
  { id: 12, image: 'image12.jpg', name: 'Product 12', quantity: 120, purchasePrice: 1200, salePrice: 1250, link: 'https://example.com/product12' },
  { id: 13, image: 'image13.jpg', name: 'Product 13', quantity: 130, purchasePrice: 1300, salePrice: 1350, link: 'https://example.com/product13' },
  { id: 14, image: 'image14.jpg', name: 'Product 14', quantity: 140, purchasePrice: 1400, salePrice: 1450, link: 'https://example.com/product14' },
  { id: 15, image: 'image15.jpg', name: 'Product 15', quantity: 150, purchasePrice: 1500, salePrice: 1550, link: 'https://example.com/product15' },
  { id: 16, image: 'image16.jpg', name: 'Product 16', quantity: 160, purchasePrice: 1600, salePrice: 1650, link: 'https://example.com/product16' },
  { id: 17, image: 'image17.jpg', name: 'Product 17', quantity: 170, purchasePrice: 1700, salePrice: 1750, link: 'https://example.com/product17' },
  { id: 18, image: 'image18.jpg', name: 'Product 18', quantity: 180, purchasePrice: 1800, salePrice: 1850, link: 'https://example.com/product18' },
  { id: 19, image: 'image19.jpg', name: 'Product 19', quantity: 190, purchasePrice: 1900, salePrice: 1950, link: 'https://example.com/product19' },
  { id: 20, image: 'image20.jpg', name: 'Product 20', quantity: 200, purchasePrice: 2000, salePrice: 2050, link: 'https://example.com/product20' },
];

const ProductManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="fixed top-0 left-0 h-full w-64 bg-pink-600 text-white">
        <SideBar />
      </div>
      <div className="flex flex-col flex-grow ml-64">
        <div className="fixed top-0 left-64 right-0 bg-white shadow-md z-10">
          <Header title="Product Management" />
        </div>

        <main className="flex-grow p-6 mt-16 mb-16 bg-gray-100 overflow-y-auto">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hình ảnh sản phẩm
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên sản phẩm
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Số lượng
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giá Nhập
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giá bán
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Link
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <img src={product.image} alt={product.name} className="h-10 w-10 object-cover" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.purchasePrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.salePrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                        <a href={product.link} target="_blank" rel="noopener noreferrer">View</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex justify-between items-center">
                <button 
                  onClick={() => handleClick(currentPage - 1)} 
                  disabled={currentPage === 1} 
                  className={`bg-gray-200 py-2 px-4 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
                >
                  Previous
                </button>
                <div className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </div>
                <button 
                  onClick={() => handleClick(currentPage + 1)} 
                  disabled={currentPage === totalPages} 
                  className={`bg-gray-200 py-2 px-4 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
        <div className="fixed bottom-0 left-64 right-0 bg-white shadow-md z-10">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default ProductManagement;
