// PaginationButton.js

import { Button } from '@/components/ui/button';
import React from 'react';

const PaginationButton = ({ data, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePreviousClick = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center items-center">
      <Button onClick={handlePreviousClick} disabled={currentPage === 1} className='bg-pink-500 mr-2 w-[90px]'>Previous</Button>
      <span>Page {currentPage} of {totalPages}</span>
      <Button onClick={handleNextClick} disabled={currentPage === totalPages} className='bg-pink-500 ml-2 w-[90px] '>Next</Button>
    </div>
  );
};

export default PaginationButton;
