"use client";
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
import { Search, Star } from "lucide-react";
import axios from "axios";

interface Comment {
  commentId: number;
  commentDetail: string;
  rating: number;
  date: string;
  productId: number;
}

export const Details = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 4;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get<Comment[]>(
          "https://milkapplication20240705013352.azurewebsites.net/api/Comment/GetAllComment",
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

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="bg-[#FCFBF4] hover:bg-[#FCFBF4]">
            <TableHead className="w-[100px] text-base font-bold text-black">
              ID
            </TableHead>
            <TableHead className="text-base font-bold text-black">
              Product Name
            </TableHead>
            <TableHead className="w-[450px] text-base font-bold text-black">
              Comments
            </TableHead>
            <TableHead className="text-base font-bold text-black">
              Rate
            </TableHead>
            <TableHead className="text-center text-base font-bold text-black">
              Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentComments.map((comment) => (
            <TableRow key={comment.commentId}>
              <TableCell className="font-bold">{comment.commentId}</TableCell>
              <TableCell className="font-semibold">
                <ProductName productId={comment.productId} />
              </TableCell>
              <TableCell>{comment.commentDetail}</TableCell>
              <TableCell className="flex w-[200px] text-xl text-yellow-400">
                <Star className="mr-1" />
                {comment.rating}
              </TableCell>
              <TableCell className="text-center">{comment.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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

const ProductName: React.FC<{ productId: number }> = ({ productId }) => {
  const [productName, setProductName] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<{ productName: string }>(
          `https://milkapplication20240705013352.azurewebsites.net/api/Product/GetProductsById/${productId}`,
        );
        setProductName(response.data.productName);
      } catch (error) {
        console.error(`Error fetching product ${productId}:`, error);
      }
    };

    fetchProduct();
  }, [productId]);

  return <>{productName}</>;
};
