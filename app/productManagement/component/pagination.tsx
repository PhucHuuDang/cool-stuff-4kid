import { Button } from "@/components/ui/button";
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center">
      <Button className="bg-pink-500 mr-2 w-[90px]"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span className="">
        Page {currentPage} of {totalPages}
      </span>
      <Button className="bg-pink-500 ml-2 w-[90px]"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
