"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "./pagination";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  CirclePlus,
  PencilLineIcon,
  Search,
  Trash2Icon,
  MoreHorizontal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { AddProduct } from "./add-product";

const ITEMS_PER_PAGE = 3;

interface Product {
  productId: number;
  productName: string;
  price: number;
  discountPrice: number;
  discountPercent: number;
  productDescription: string;
  image: string;
  quantity: number;
  status: number;
  categoryId: number;
  originId: number;
  locationId: number;
}

export const Details: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<string[]>([
    "In Stock",
    "Out of Stock",
  ]);
  const [data, setData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  useEffect(() => {
    axios
      .get(
        "https://milkapplication20240705013352.azurewebsites.net/api/Product/GetAllProducts",
      )
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((item: Product) =>
        statusFilter.includes(item.status === 0 ? "Out of Stock" : "In Stock"),
      ),
    );
  }, [statusFilter, data]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter((prev: string[]) =>
      prev.includes(status)
        ? prev.filter((item: string) => item !== status)
        : [...prev, status],
    );
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const getStatusColor = (status: number) => {
    return status === 1 ? "text-green-500" : "text-red-500";
  };
  return (
    <div>
      <div className="flex justify-between p-3">
        <div className="relative w-[500px]">
          <Input className="pl-10" placeholder="Product Name" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500" />
        </div>
        <div>
          <AddProduct />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-[#FCFBF4] hover:bg-[#FCFBF4]">
            <TableHead className="font-bold text-black">ID</TableHead>
            <TableHead className="text-base font-bold text-black">
              Product Name
            </TableHead>
            <TableHead className="text-center text-base font-bold text-black">
              Image
            </TableHead>
            <TableHead className="text-base font-bold text-black">
              Decriptions
            </TableHead>
            <TableHead className="flex items-center text-base font-bold text-black">
              Status
              <DropdownMenu>
                <DropdownMenuTrigger className="ml-2 rounded bg-gray-200 p-1 text-black">
                  Filter
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter.includes("In Stock")}
                    onCheckedChange={() => handleStatusChange("In Stock")}
                  >
                    In Stock
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter.includes("Out of Stock")}
                    onCheckedChange={() => handleStatusChange("Out of Stock")}
                  >
                    Out of Stock
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableHead>
            <TableHead className="text-base font-bold text-black">
              Quantity
            </TableHead>
            <TableHead className="text-base font-bold text-black">
              Price
            </TableHead>
            <TableHead className="text-center text-base font-bold text-black">
              Discount
            </TableHead>
            <TableHead className="text-center text-base font-bold text-black">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedData.map((item: Product, index: number) => (
            <TableRow key={index}>
              <TableCell className="w-4 font-bold">{item.productId}</TableCell>
              <TableCell className="w-36 font-medium">
                {item.productName}
              </TableCell>
              <TableCell className="h-[120px] w-[100px]">
                <img src={item.image} alt={item.productName} />
              </TableCell>
              <TableCell className="w-20">{item.productDescription}</TableCell>
              <TableCell
                className={`w-[10px] font-bold ${getStatusColor(item.status)}`}
              >
                {item.status === 1 ? "In Stock" : "Out of Stock"}
              </TableCell>
              <TableCell className="w-[140px] pl-10">{item.quantity}</TableCell>
              <TableCell className="w-[50px]">{item.discountPrice}</TableCell>
              <TableCell className="w-[180px] text-center">
                {item.discountPercent}
              </TableCell>
              <TableCell className="w-11 text-center text-base font-bold text-black">
                <DropdownMenu>
                  <DropdownMenuTrigger className="rounded p-1 text-black">
                    <MoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <PencilLineIcon className="mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Trash2Icon className="mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
