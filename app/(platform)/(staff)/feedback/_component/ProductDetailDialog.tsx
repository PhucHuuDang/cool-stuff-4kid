import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";

interface Product {
  productId: number;
  productName: string;
  price: number;
  productDescription: string;
  image: string;
  // Add more fields as needed
}

interface Comment {
  commentId: number;
  commentDetail: string;
  rating: number;
  date: string;
  productId: number;
  id: string;
  productName: string;
  userName: string;
}

interface Props {
  productId: number;
  onClose: () => void;
}

const ProductDetailPopup: React.FC<Props> = ({ productId, onClose }) => {
  const [productDetail, setProductDetail] = useState<Product | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const productResponse = await axios.get<Product>(
          `https://milkapplicationapi.azurewebsites.net/api/Product/GetProductsById/${productId}`,
        );
        setProductDetail(productResponse.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get<Comment[]>(
          "https://milkapplicationapi.azurewebsites.net/api/Comment/GetAllComment",
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchProductDetail();
    fetchComments();
  }, [productId]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleCollapse = () => {
    setExpanded(false);
  };

  if (!productDetail) {
    return <div>Loading...</div>;
  }

  // Function to format price to VNĐ
  const formatPriceToVND = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    } else {
      return text;
    }
  };

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    const starElements = [];

    for (let i = 0; i < fullStars; i++) {
      starElements.push(
        <Star key={`star-full-${i}`} className="h-5 w-5 text-yellow-500" />,
      );
    }

    if (hasHalfStar) {
      starElements.push(
        <Star key={`star-half`} className="h-5 w-5 text-yellow-500" />,
      );
    }

    const remainingStars = 5 - starElements.length;
    for (let i = 0; i < remainingStars; i++) {
      starElements.push(
        <Star key={`star-empty-${i}`} className="h-5 w-5 text-gray-300" />,
      );
    }

    return starElements;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-96 rounded-lg bg-white p-6 shadow-lg">
        <button
          title="Close"
          className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          {productDetail.productName}
        </h2>
        <div className="mb-4 flex items-center">
          <img
            src={productDetail.image}
            alt={productDetail.productName}
            className="h-32 w-32 rounded-lg object-cover shadow-md"
          />
          <div className="ml-4">
            <p className="text-lg font-semibold text-gray-600">
              Giá: {formatPriceToVND(productDetail.price)}
            </p>
            {/* You can add more details here if needed */}
          </div>
        </div>
        <p className="text-sm leading-relaxed text-gray-700">
          {expanded
            ? productDetail.productDescription
            : truncateText(productDetail.productDescription, 120)}
          {expanded && (
            <button
              onClick={handleCollapse}
              className="text-blue-500 hover:underline focus:outline-none"
            >
              {" "}
              Thu gọn
            </button>
          )}
          {!expanded && (
            <button
              onClick={toggleExpanded}
              className="mt-2 text-blue-500 hover:underline focus:outline-none"
            >
              {" "}
              Xem thêm
            </button>
          )}
        </p>
        <div className="mt-4">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">
            Customer Reviews
          </h3>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="mb-4 flex">
                <img
                  src={`https://ui-avatars.com/api/?name=${comment.userName}&size=32&background=random`}
                  alt={comment.userName}
                  className="h-8 w-8 flex-shrink-0 rounded-full object-cover shadow-md"
                />
                <div className="ml-3 flex-1 rounded-lg bg-gray-100 p-3">
                  <div className="mb-1 flex items-center justify-between">
                    <p className="font-semibold text-gray-800">
                      {comment.userName}
                    </p>
                    <div className="flex items-center">
                      {renderStars(comment.rating)}
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.commentDetail}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPopup;
