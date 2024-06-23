import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  productId: number;
  productName: string;
  price: number;
  productDescription: string;
  image: string;
  categoryId: number;
  originId: number;
}

interface ProductDetailsModalProps {
  productId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ productId, isOpen, onClose }) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (productId !== null) {
      fetchProductDetails(productId);
    }
  }, [productId]);

  const fetchProductDetails = async (id: number) => {
    try {
      const response = await axios.get(`https://milkapplicationapi.azurewebsites.net/api/Product/GetProductsById/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  if (!isOpen || !product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <button onClick={onClose} className="float-right text-gray-500 hover:text-gray-700">&times;</button>
        <img src={product.image} alt={product.productName} className="w-full h-64 object-cover rounded-md mb-4" />
        <h1 className="text-2xl font-bold">{product.productName}</h1>
        <p className="text-lg text-gray-700 mt-2">{product.productDescription}</p>
        <p className="text-xl font-semibold text-green-600 mt-4">Price: {product.price.toLocaleString()} VND</p>
      </div>
    </div>
  );
};

export { ProductDetailsModal };
