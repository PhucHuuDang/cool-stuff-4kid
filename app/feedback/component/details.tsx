"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React, { useState } from 'react';
import { feedbackData } from './feedbackdata';
import { Button } from '@/components/ui/button';
import { Frown, Laugh, Meh, Search, Smile } from 'lucide-react';
import { RateFilter } from './ratefilter';
import { Input } from '@/components/ui/input';

export const Details = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRate, setSelectedRate] = useState('All'); 
  const rowsPerPage = 7;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(filteredFeedbackData.length / rowsPerPage)));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleRateFilterChange = (value: string) => {
    setSelectedRate(value === 'All' ? 'All' : value); 
    setCurrentPage(1);
  };

  const filteredFeedbackData = selectedRate !== 'All'
    ? feedbackData.filter((feedback) => feedback.Rate.toString() === selectedRate)
    : feedbackData;

  const startIndex = (currentPage - 1) * rowsPerPage;
  const limitedFeedbackData = filteredFeedbackData.slice(startIndex, startIndex + rowsPerPage);

  const renderRateIcons = (rate: number): JSX.Element | null => {
    switch (rate) {
      case 1:
        return <Frown className="text-red-500" />;
      case 2:
        return <Meh className="text-yellow-500" />;
      case 3:
        return <Smile className="text-green-500" />;
      case 4:
        return <Laugh className="text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div>
        <div className='flex justify-between'>
        <div className='relative w-[500px]'>
        <Input className="pl-10" placeholder="User Name" />
        <Search className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500" />
        </div>
      <RateFilter selectedRate={selectedRate} onChange={handleRateFilterChange} />
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-pink-500">
          <TableHead className="text-white font-bold text-base w-[100px]">ID</TableHead>
            <TableHead className="text-white font-bold text-base">Username</TableHead>
            <TableHead className="w-[450px] text-white font-bold text-base">Comments</TableHead>
            <TableHead className="text-white font-bold text-base">Rate</TableHead>
            <TableHead className="text-center text-white font-bold text-base">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {limitedFeedbackData.map((feedback, index) => (
              <TableRow key={index}>
              <TableCell className="font-bold">{feedback.ID}</TableCell>
              <TableCell className="font-semibold">{feedback.Username}</TableCell>
              <TableCell>{feedback.Comments}</TableCell>
              <TableCell>{renderRateIcons(feedback.Rate)}</TableCell>
              <TableCell className="text-center">{feedback.Time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center items-center mt-2">
        <Button className='bg-pink-500' onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span className="mx-4">
          Page {currentPage} of {Math.ceil(filteredFeedbackData.length / rowsPerPage)}
        </span>
        <Button className='bg-pink-500 w-[90px]' onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredFeedbackData.length / rowsPerPage)}>
          Next
        </Button>
      </div>
    </div>
  );
};
