"use client";
import React, { useState } from "react";
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
import { RateFilter } from "./ratefilter";
import { Input } from "@/components/ui/input";
import { feedbackData } from "./feedbackdata";

export const Details = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRate, setSelectedRate] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 5;

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(
        prevPage + 1,
        Math.ceil(filteredFeedbackData.length / rowsPerPage),
      ),
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleRateFilterChange = (value: string) => {
    setSelectedRate(value === "All" ? "All" : value);
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredFeedbackData = feedbackData
    .filter((feedback) =>
      selectedRate !== "All" ? feedback.Rate.toString() === selectedRate : true,
    )
    .filter((feedback) =>
      feedback.Username.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const startIndex = (currentPage - 1) * rowsPerPage;
  const limitedFeedbackData = filteredFeedbackData.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  const renderStars = (rate: number) => {
    const stars = [];
    for (let i = 0; i < rate; i++) {
      stars.push(<Star className="fill-yellow-400" key={i} />);
    }
    return stars;
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="relative w-[500px]">
          <Input
            className="pl-10"
            placeholder="User Name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Search className="absolute left-3 top-5 -translate-y-1/2 transform text-gray-500" />
        </div>
        <RateFilter
          selectedRate={selectedRate}
          onChange={handleRateFilterChange}
        />
      </div>
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
          {limitedFeedbackData.map((feedback, index) => (
            <TableRow key={index}>
              <TableCell className="font-bold">{feedback.ID}</TableCell>
              <TableCell className="font-semibold">
                {feedback.Username}
              </TableCell>
              <TableCell>{feedback.Comments}</TableCell>
              <TableCell className="flex w-[200px] text-yellow-400">
                {renderStars(feedback.Rate)}
              </TableCell>
              <TableCell className="text-center">{feedback.Time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-2 flex items-center justify-center">
        <Button
          className="bg-blue-400 hover:bg-blue-500"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="mx-4">
          Page {currentPage} of{" "}
          {Math.ceil(filteredFeedbackData.length / rowsPerPage)}
        </span>
        <Button
          className="w-[90px] bg-blue-400 hover:bg-blue-500"
          onClick={handleNextPage}
          disabled={
            currentPage === Math.ceil(filteredFeedbackData.length / rowsPerPage)
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};
