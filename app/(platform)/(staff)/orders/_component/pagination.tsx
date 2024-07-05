import { Button } from "@/components/ui/button";
import React from "react";

interface PaginationButtonProps {
  data: any[];
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  data,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePreviousClick = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center">
      <Button
        onClick={handlePreviousClick}
        disabled={currentPage === 1}
        className="mr-2 w-[90px] bg-blue-400 hover:bg-blue-500"
      >
        Previous
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        className="ml-2 w-[90px] bg-blue-400 hover:bg-blue-500"
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationButton;
