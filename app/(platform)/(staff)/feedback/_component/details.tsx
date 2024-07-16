// Details.tsx
"use client";
// Details.tsx
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import axios from "axios";
import { format } from "date-fns";
import ProductDetailPopup from "./ProductDetailDialog";

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

const Details = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const commentsPerPage = 4;

  useEffect(() => {
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

    fetchComments();
  }, []);

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment,
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(comments.length / commentsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  };

  const handleViewProductDetail = (productId: number) => {
    setSelectedProductId(productId);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProductId(null);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="bg-[#FCFBF4] hover:bg-[#FCFBF4]">
            <TableHead className="text-base font-bold text-black">ID</TableHead>
            <TableHead className="text-base font-bold text-black">
              User Name
            </TableHead>
            <TableHead className="text-base font-bold text-black">
              Product Name
            </TableHead>
            <TableHead className="text-base font-bold text-black">
              Comments
            </TableHead>
            <TableHead className="w-[100px] text-base font-bold text-black">
              Rate
            </TableHead>
            <TableHead className="text-center text-base font-bold text-black">
              Date
            </TableHead>
            <TableHead className="text-center text-base font-bold text-black">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentComments.map((comment) => (
            <TableRow key={comment.commentId}>
              <TableCell className="font-bold">{comment.commentId}</TableCell>
              <TableCell className="font-semibold">
                {comment.userName}
              </TableCell>
              <TableCell className="font-semibold">
                {truncateText(comment.productName, 30)}
              </TableCell>
              <TableCell className="font-semibold">
                {truncateText(comment.commentDetail, 30)}
              </TableCell>
              <TableCell className="flex w-[150px] text-yellow-400">
                {Array.from({ length: comment.rating }).map((_, index) => (
                  <Star key={index} className="mr-1" />
                ))}
              </TableCell>
              <TableCell className="w-[180px] text-center">
                <span className="text-blue-500">
                  {format(new Date(comment.date), "HH:mm")}
                </span>
                {format(new Date(comment.date), ", dd-MM-yyyy")}
              </TableCell>
              <TableCell className="text-center">
                <button
                  onClick={() => handleViewProductDetail(comment.productId)}
                  className="text-blue-500 hover:underline"
                >
                  View
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showPopup && selectedProductId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <ProductDetailPopup
            productId={selectedProductId}
            onClose={handleClosePopup}
          />
        </div>
      )}

      {comments.length > commentsPerPage && (
        <div className="mb-4 flex items-center justify-center text-center">
          <Button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="w-[100px]"
          >
            Previous
          </Button>
          <span className="mx-2 text-lg">
            Page {currentPage} of {Math.ceil(comments.length / commentsPerPage)}
          </span>
          <Button
            className="w-[100px]"
            onClick={handleNext}
            disabled={
              currentPage === Math.ceil(comments.length / commentsPerPage)
            }
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Details;
