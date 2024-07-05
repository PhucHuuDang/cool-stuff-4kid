import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductProps, ProductDetailsModalProps } from '@/interface';
import { X, ShoppingCart, Tag, MapPin, Package } from 'lucide-react';

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ productId, isOpen, onClose }) => {
  const [product, setProduct] = useState<ProductProps | null>(null);

  useEffect(() => {
    const fetchProductDetails = async (id: number) => {
      try {
        const response = await axios.get<ProductProps>(`https://milkapplication20240705013352.azurewebsites.net/api/Product/GetProductsById/${id}`);
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
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl p-8 overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <X size={24} />
        </button>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <img src={product.image} alt={product.productName} className="w-full h-80 object-cover rounded-lg shadow-md" />
          </div>
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gray-800">{product.productName}</h1>
              <p className="text-lg text-gray-600 mb-4">{product.productDescription}</p>
              <div className="flex items-center mb-4">
                <Tag className="text-blue-500 mr-2" size={20} />
                {product.discountPrice ? (
                  <>
                    <span className="text-lg text-blue-500 line-through">{product.price.toLocaleString()} VND</span>
                    <span className="ml-2 text-xl font-semibold text-red-500">{product.discountPrice.toLocaleString()} VND</span>
                  </>
                ) : (
                  <span className="text-xl font-semibold text-blue-500">{product.price.toLocaleString()} VND</span>
                )}
              </div>
              {product.discountPercent && (
                <div className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full inline-block mb-4">
                  {product.discountPercent}% OFF
                </div>
              )}
            </div>
            <div className="space-y-2 text-gray-700">
              <InfoRow icon={<ShoppingCart size={18} />} label="Quantity" value={product.quantity.toString()} />
              <InfoRow icon={<Package size={18} />} label="Status" value={product.status === 1 ? 'Active' : 'Inactive'} />
              <InfoRow icon={<Tag size={18} />} label="Category ID" value={product.categoryId.toString()} />
              <InfoRow icon={<MapPin size={18} />} label="Origin ID" value={product.originId.toString()} />
              <InfoRow icon={<MapPin size={18} />} label="Location ID" value={product.locationId.toString()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center">
    <span className="mr-2 text-gray-500">{icon}</span>
    <span className="font-medium">{label}:</span>
    <span className="ml-2">{value}</span>
  </div>
);

export { ProductDetailsModal };
