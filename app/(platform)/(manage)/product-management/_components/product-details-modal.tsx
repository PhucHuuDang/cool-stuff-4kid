import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductManagement } from '@/interface';
import { ProductDetailsModalProps } from '@/interface';



const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ productId, isOpen, onClose }) => {
  const [product, setProduct] = useState<ProductManagement | null>(null);

  useEffect(() => {
    const fetchProductDetails = async (id: number) => {
      try {
        const response = await axios.get<ProductManagement>(`https://milkapplicationapi.azurewebsites.net/api/Product/GetProductsById/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (isOpen && productId !== null) {
      fetchProductDetails(productId);
    }
  }, [isOpen, productId]);

  if (!isOpen || !product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
        <div className="flex justify-center">
          <img src={product.image} alt={product.productName} className="w-full h-64 object-cover rounded-md mb-4" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">{product.productName}</h1>
          <p className="text-lg text-gray-700">{product.productDescription}</p>
        </div>
        <div className="mt-4">
          <p className="text-xl font-semibold text-green-600">Price: {product.price.toLocaleString()} VND</p>
          {product.discountPrice && (
            <p className="text-lg text-red-600">Discounted Price: {product.discountPrice.toLocaleString()} VND</p>
          )}
          {product.discountPercent && (
            <p className="text-lg text-red-600">Discount: {product.discountPercent}%</p>
          )}
          <p className="text-lg text-gray-700">Quantity: {product.quantity}</p>
          <p className="text-lg text-gray-700">Status: {product.status === 1 ? 'Active' : 'Inactive'}</p>
          <p className="text-lg text-gray-700">Category ID: {product.categoryId}</p>
          <p className="text-lg text-gray-700">Origin ID: {product.originId}</p>
          <p className="text-lg text-gray-700">Location ID: {product.locationId}</p>
        </div>
      </div>
    </div>
  );
};

export { ProductDetailsModal };
