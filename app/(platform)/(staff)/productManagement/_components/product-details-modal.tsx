import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  X,
  ShoppingCart,
  Tag,
  MapPin,
  Package,
  Folder,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ProductDetails {
  productId: number;
  productName: string;
  price: number;
  discountPrice: number | null;
  discountPercent: number;
  productDescription: string;
  image: string;
  imagesCarousel: string[];
  quantity: number;
  status: number;
  comment: string | null;
  category: { categoryId: number; categoryName: string };
  origin: { originId: number; originName: string };
  location: { locationId: number; locationName: string; address: string };
}

interface ProductDetailsModalProps {
  productId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  productId,
  isOpen,
  onClose,
}) => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProductDetails = async (id: number) => {
      try {
        const response = await axios.get<ProductDetails>(
          `https://milkapplication20240705013352.azurewebsites.net/api/Product/GetProductsById/${id}`,
        );
        console.log("Product details:", response.data);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (isOpen && productId !== null) {
      fetchProductDetails(productId);
    }
  }, [isOpen, productId]);

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex + 1) % (product ? product.imagesCarousel.length + 1 : 1),
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + (product ? product.imagesCarousel.length + 1 : 1)) %
        (product ? product.imagesCarousel.length + 1 : 1),
    );
  };

  if (!isOpen || !product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {product.productName}
          </h1>
          <button
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-gray-600"
            title="a"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-6">
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="lg:w-1/2">
              <img
                src={
                  currentImageIndex === 0
                    ? product.image
                    : product.imagesCarousel[currentImageIndex - 1]
                }
                alt={product.productName}
                className="h-full w-full rounded-lg object-cover shadow-md"
              />
              <div className="mt-4 flex items-center justify-center">
                <button
                  onClick={prevImage}
                  className="mr-2 rounded-full bg-gray-200 p-2"
                  title="b"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex space-x-2 overflow-x-auto">
                  {[product.image, ...product.imagesCarousel].map(
                    (img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Product view ${index + 1}`}
                        className={`h-16 w-16 cursor-pointer rounded-md object-cover ${
                          index === currentImageIndex
                            ? "border-2 border-blue-500"
                            : ""
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ),
                  )}
                </div>
                <button
                  onClick={nextImage}
                  className="ml-2 rounded-full bg-gray-200 p-2"
                  title="c"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-between lg:w-1/2">
              <div>
                <div className="mb-4 break-words text-lg text-gray-600">
                  {product.productDescription}
                </div>
                <div className="mb-4 flex items-center">
                  <Tag className="mr-2 text-blue-500" size={20} />
                  {product.discountPrice ? (
                    <>
                      <span className="text-lg text-blue-500 line-through">
                        {product.price.toLocaleString()} VND
                      </span>
                      <span className="ml-2 text-xl font-semibold text-red-500">
                        {product.discountPrice.toLocaleString()} VND
                      </span>
                    </>
                  ) : (
                    <span className="text-xl font-semibold text-blue-500">
                      {product.price.toLocaleString()} VND
                    </span>
                  )}
                </div>
                {product.discountPercent > 0 && (
                  <div className="mb-4 mr-2 inline-block rounded-full bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800">
                    {product.discountPercent}% OFF
                  </div>
                )}
              </div>
              <div className="space-y-2 text-gray-700">
                <InfoRow
                  icon={<ShoppingCart size={18} />}
                  label="Quantity"
                  value={product.quantity.toString()}
                />
                <InfoRow
                  icon={<Package size={18} />}
                  label="Status"
                  value={product.status === 1 ? "In Stock" : "Out Of Stock"}
                />
                <InfoRow
                  icon={<Folder size={18} />}
                  label="Category"
                  value={product.category.categoryName}
                />
                <InfoRow
                  icon={<MapPin size={18} />}
                  label="Location"
                  value={`${product.location.locationName}, ${product.location.address}`}
                />
                <InfoRow
                  icon={<Globe size={18} />}
                  label="Origin"
                  value={product.origin.originName}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex items-center">
    <span className="mr-2 text-gray-500">{icon}</span>
    <span className="font-medium">{label}:</span>
    <span className="ml-2">{value}</span>
  </div>
);

export { ProductDetailsModal };
