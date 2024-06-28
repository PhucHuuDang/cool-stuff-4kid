"use client";

import React, { useReducer, useEffect, useCallback } from "react";
import { Header } from "@/components/Header";
import { SideBar } from "@/components/side-bar";
import { Search } from "lucide-react";
import { AddProductModal } from "./_components/add-product";

interface Product {
  productId: number;
  productName: string;
  price: number;
  productDescription: string;
  image: string;
  categoryId: number;
  originId: number;
}

interface State {
  products: Product[];
  currentPage: number;
  dropdownVisible: number | null;
  isOpen: boolean;
}

const initialState: State = {
  products: [],
  currentPage: 1,
  dropdownVisible: null,
  isOpen: false,
};

type Action =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "SET_CURRENT_PAGE"; payload: number }
  | { type: "TOGGLE_DROPDOWN"; payload: number }
  | { type: "TOGGLE_MODAL" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "TOGGLE_DROPDOWN":
      return {
        ...state,
        dropdownVisible:
          state.dropdownVisible === action.payload ? null : action.payload,
      };
    case "TOGGLE_MODAL":
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
};

const ProductManagementPage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const itemsPerPage = 7;

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(
        "https://milkapplicationapi.azurewebsites.net/api/Product/GetAllProducts",
      );
      const data = await response.json();
      dispatch({ type: "SET_PRODUCTS", payload: data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const indexOfLastProduct = state.currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = state.products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(state.products.length / itemsPerPage);

  const handleClick = useCallback((pageNumber: number) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: pageNumber });
  }, []);

  const toggleDropdown = useCallback((productId: number) => {
    dispatch({ type: "TOGGLE_DROPDOWN", payload: productId });
  }, []);

  const handleAddProduct = useCallback(() => {
    dispatch({ type: "TOGGLE_MODAL" });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="fixed left-0 top-0 h-full w-64 bg-pink-600 text-white">
        <SideBar />
      </div>
      <div className="ml-64 flex flex-grow flex-col">
        <div className="fixed left-64 right-0 top-0 z-10 bg-white shadow-md">
          <Header title="Product Management" />
        </div>
        <main className="mb-16 mt-16 flex-grow overflow-y-auto bg-gray-100 p-6">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="mb-6 flex items-center">
                <div className="relative mr-4 flex flex-grow items-center">
                  <Search className="absolute left-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="w-full rounded border p-2 pl-10"
                  />
                </div>
                <select className="mr-4 rounded border p-2">
                  <option>Select Category</option>
                  <option>Tã</option>
                  <option>Sữa</option>
                  <option>Quần Áo</option>
                  <option>Ăn Dặm</option>
                </select>
                <select className="mr-4 rounded border p-2">
                  <option>Select Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <button className="rounded bg-black p-2 text-white">
                  Search
                </button>
                <button
                  className="ml-auto rounded border bg-white p-2 text-black"
                  onClick={handleAddProduct}
                >
                  Add Product
                </button>
              </div>
              <ProductTable
                currentProducts={currentProducts}
                dropdownVisible={state.dropdownVisible}
                toggleDropdown={toggleDropdown}
              />
              <Pagination
                currentPage={state.currentPage}
                totalPages={totalPages}
                handleClick={handleClick}
              />
            </div>
          </div>
        </main>
      </div>
      <AddProductModal setIsOpen={handleAddProduct} isOpen={state.isOpen} />
    </div>
  );
};

const ProductTable: React.FC<{
  currentProducts: Product[];
  dropdownVisible: number | null;
  toggleDropdown: (productId: number) => void;
}> = ({ currentProducts, dropdownVisible, toggleDropdown }) => (
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <TableHeader text="ID" />
        <TableHeader text="Product Image" />
        <TableHeader text="Product Name" />
        <TableHeader text="Quantity" />
        <TableHeader text="Sale Price" />
        <TableHeader text="Status" />
        <TableHeader text="Link" />
        <TableHeader text="Action" />
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200 bg-white">
      {currentProducts.map((product) => (
        <tr key={product.productId}>
          <TableCell text={product.productId.toString()} />
          <td className="flex justify-center whitespace-nowrap px-6 py-4 text-sm text-gray-500">
            <img
              src={product.image}
              className="h-10 w-10 object-cover"
              alt="Product"
            />
          </td>
          <TableCell text={product.productName} />
          <TableCell text="N/A" />
          <TableCell text={product.price.toString()} />
          <TableCell text="Active" />
          <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-blue-500">
            <a href="#" target="_blank" rel="noopener noreferrer">
              View
            </a>
          </td>
          <td className="relative whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
            <button
              onClick={() => toggleDropdown(product.productId)}
              className="focus:outline-none"
            >
              ...
            </button>
            {dropdownVisible === product.productId && (
              <div className="absolute right-0 z-10 mt-2 w-48 rounded border border-gray-300 bg-white shadow-lg">
                <DropdownItem text="Product Details" />
                <DropdownItem text="Stop Selling" />
              </div>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  handleClick: (pageNumber: number) => void;
}> = ({ currentPage, totalPages, handleClick }) => (
  <div className="mt-4 flex items-center justify-between">
    <PaginationButton
      onClick={() => handleClick(currentPage - 1)}
      disabled={currentPage === 1}
      text="Previous"
    />
    <div className="text-sm text-gray-700">
      Page {currentPage} of {totalPages}
    </div>
    <PaginationButton
      onClick={() => handleClick(currentPage + 1)}
      disabled={currentPage === totalPages}
      text="Next"
    />
  </div>
);

const TableHeader: React.FC<{ text: string }> = ({ text }) => (
  <th
    scope="col"
    className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
  >
    {text}
  </th>
);

const TableCell: React.FC<{ text: string }> = ({ text }) => (
  <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
    {text}
  </td>
);

const DropdownItem: React.FC<{ text: string }> = ({ text }) => (
  <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
    {text}
  </button>
);

const PaginationButton: React.FC<{
  onClick: () => void;
  disabled: boolean;
  text: string;
}> = ({ onClick, disabled, text }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`rounded bg-gray-200 px-4 py-2 ${disabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-300"}`}
  >
    {text}
  </button>
);

export default ProductManagementPage;
