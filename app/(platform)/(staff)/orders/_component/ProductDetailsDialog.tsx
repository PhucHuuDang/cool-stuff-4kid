import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface Product {
  productName: string;
  price: number;
  discountPrice: number;
  discountPercent: number;
  productDescription: string;
  image: string;
}

interface ProductDetailsDialogProps {
  productId: number | null;
  onClose: () => void;
}

const ProductDetailsDialog: React.FC<ProductDetailsDialogProps> = ({
  productId,
  onClose,
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedDescription, setExpandedDescription] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      setLoading(true);
      setError(null);
      console.log("Fetching product with productId:", productId); // Thêm console.log để kiểm tra giá trị của productId
      try {
        const response = await axios.get(
          `https://milkapplicationapi.azurewebsites.net/api/Product/GetProductsById/${productId}`,
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to fetch product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const renderProductDescription = (description: string) => {
    const maxDescriptionLength = 200; // Maximum length for description display
    if (description.length > maxDescriptionLength && !expandedDescription) {
      return (
        <>
          <div className="max-h-48 overflow-y-auto text-sm text-gray-600">
            {description.slice(0, maxDescriptionLength)}...
          </div>
          <button
            className="mt-2 text-blue-500 hover:underline focus:outline-none"
            onClick={() => setExpandedDescription(true)}
          >
            Read More
          </button>
        </>
      );
    } else if (expandedDescription) {
      return (
        <>
          <div className="max-h-48 overflow-y-auto text-sm text-gray-600">
            {description}
          </div>
          <button
            className="mt-2 text-blue-500 hover:underline focus:outline-none"
            onClick={() => setExpandedDescription(false)}
          >
            Show Less
          </button>
        </>
      );
    }
    return <div className="text-sm text-gray-600">{description}</div>;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <Dialog open={!!productId} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Product Details
          </DialogTitle>
          <DialogClose />
        </DialogHeader>
        {loading ? (
          <div className="flex h-32 items-center justify-center">
            Loading...
          </div>
        ) : error ? (
          <div className="flex h-32 items-center justify-center text-red-500">
            {error}
          </div>
        ) : (
          product && (
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="md:w-1/3">
                <img
                  src={product.image}
                  alt={product.productName}
                  className="h-auto w-full rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-2/3">
                <p className="mb-4 text-lg font-bold">{product.productName}</p>
                <p className="text-gray-700">
                  <strong>Price:</strong> {formatCurrency(product.price)}
                </p>
                <p className="text-gray-700">
                  <strong>Discount Price:</strong>{" "}
                  {formatCurrency(product.discountPrice)}
                </p>
                <p className="text-gray-700">
                  <strong>Discount Percent:</strong> {product.discountPercent}%
                </p>
                <div className="mt-4">
                  <strong className="mb-2 block text-gray-800">
                    Description:
                  </strong>{" "}
                  {renderProductDescription(product.productDescription)}
                </div>
              </div>
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
