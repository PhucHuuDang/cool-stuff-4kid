"use client";

import React, { useReducer, useEffect, useCallback, useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import {
  ProductProps,
  ProductManagementAction,
  Category,
  Location,
  Origin,
} from "@/interface";
import { ProductDetailsModal } from "./product-details-modal";
import { DeleteProductModal } from "./delete-product-modal";
import { AddProductModal } from "./add-product-modal";
import EditProductModal from "./edit-product-modal";
import { Button } from "@/components/ui/button";

interface State {
  products: ProductProps[];
  currentPage: number;
  dropdownVisible: number | null;
  isOpen: boolean;
  isSubmitting: boolean;
}

const initialState: State = {
  products: [],
  currentPage: 1,
  dropdownVisible: null,
  isOpen: false,
  isSubmitting: false,
};

const reducer = (state: State, action: ProductManagementAction): State => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_PRODUCT":
      return { ...state, products: [action.payload, ...state.products] };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product.productId === action.payload.productId
            ? { ...action.payload }
            : product,
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.productId !== action.payload,
        ),
      };
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
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.payload };
    default:
      return state;
  }
};

const ProductManagementPage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProduct, setEditingProduct] = useState<ProductProps | null>(
    null,
  );
  const [viewingProductId, setViewingProductId] = useState<number | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<number | null>(
    null,
  );
  const [categories, setCategories] = useState<
    { categoryId: number; categoryName: string }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const itemsPerPage = 7;

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://milkapplicationapi.azurewebsites.net/api/Product/GetAllProducts",
        { timeout: 10000 },
      );
      dispatch({ type: "SET_PRODUCTS", payload: response.data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          console.error("Request timed out. Please try again.");
        } else if (error.message === "Network Error") {
          console.error(
            "Network error. Please check your internet connection.",
          );
        } else {
          console.error("Error fetching products:", error.message);
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://milkapplicationapi.azurewebsites.net/api/Category/GetAllCategorys",
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const handleAddProduct = () => {
    dispatch({ type: "TOGGLE_MODAL" });
  };

  const handleProductAdd = useCallback(
    async (product: ProductProps) => {
      dispatch({ type: "SET_SUBMITTING", payload: true });
      try {
        const response = await axios.post(
          "https://milkapplicationapi.azurewebsites.net/api/Product/CreateProducts",
          {
            productName: product.productName,
            price: product.price,
            quantity: product.quantity,
            productDescription: product.productDescription,
            image: product.image,
            categoryId: product.categoryId,
            originId: product.originId,
            locationId: product.locationId,
            discountPrice: product.discountPrice,
          },
        );

        const newProduct = response.data;
        dispatch({ type: "ADD_PRODUCT", payload: newProduct });
        await fetchProducts();
      } catch (error) {
        console.error("Error adding product:", error);
      } finally {
        dispatch({ type: "SET_SUBMITTING", payload: false });
        dispatch({ type: "TOGGLE_MODAL" });
      }
    },
    [fetchProducts],
  );

  const handleProductDelete = useCallback((productId: number) => {
    setDeletingProductId(productId);
  }, []);

  const handleEditClick = (product: ProductProps) => {
    setEditingProduct(product);
  };

  const handleEditClose = () => {
    setEditingProduct(null);
  };

  const handleProductUpdate = useCallback(
    async (updatedProduct: ProductProps) => {
      try {
        const response = await axios.put(
          `https://milkapplicationapi.azurewebsites.net/api/Product/UpdateProducts/${updatedProduct.productId}`,
          updatedProduct,
        );
        dispatch({ type: "UPDATE_PRODUCT", payload: response.data });
        await fetchProducts();
      } catch (error) {
        console.error("Error updating product:", error);
      } finally {
        setEditingProduct(null);
      }
    },
    [fetchProducts],
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, state.products]);

  const handleViewDetails = (productId: number) => {
    setViewingProductId(productId);
  };

  const handleCloseDetails = () => {
    setViewingProductId(null);
  };

  const handleCloseDelete = () => {
    setDeletingProductId(null);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const filteredProducts = state.products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "" ||
        product.categoryId.toString() === selectedCategory) &&
      (selectedStatus === "" ||
        (selectedStatus === "In Stock" && product.status === 1) ||
        (selectedStatus === "Out Of Stock" && product.status === 0)),
  );

  const indexOfLastProduct = state.currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleClick = useCallback((pageNumber: number) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: pageNumber });
  }, []);

  const toggleDropdown = useCallback((productId: number) => {
    dispatch({ type: "TOGGLE_DROPDOWN", payload: productId });
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-grow">
        <main className="flex-grow overflow-y-auto bg-gray-100 p-6">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="mb-6 flex items-center">
                <div className="relative mr-4 flex flex-grow items-center">
                  <Search className="absolute left-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="w-full rounded border p-2 pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  title="a"
                  className="mr-4 rounded border p-2"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option
                      key={category.categoryId}
                      value={category.categoryId.toString()}
                    >
                      {category.categoryName}
                    </option>
                  ))}
                </select>
                <select
                  title="a"
                  className="mr-4 rounded border p-2"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                >
                  <option value="">All</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Out Of Stock">Out Of Stock</option>
                </select>
                <Button
                  className="ml-auto rounded-3xl border bg-blue-500 p-2 text-white hover:bg-blue-600"
                  onClick={handleAddProduct}
                >
                  Add Product
                </Button>
              </div>
              <div className="overflow-x-auto">
                <ProductTable
                  currentProducts={currentProducts}
                  dropdownVisible={state.dropdownVisible}
                  toggleDropdown={toggleDropdown}
                  handleProductDelete={handleProductDelete}
                  handleEditClick={handleEditClick}
                  handleViewDetails={handleViewDetails}
                />
              </div>
              <Pagination
                currentPage={state.currentPage}
                totalPages={totalPages}
                handleClick={handleClick}
              />
            </div>
          </div>
        </main>
      </div>
      {state.isOpen && (
        <AddProductModal
          setIsOpen={handleAddProduct}
          isOpen={state.isOpen}
          onProductAdd={handleProductAdd}
          onCategoryAdd={async (category: Category) => {
            console.log("Adding category:", category);
          }}
          onLocationAdd={async (location: Location) => {
            console.log("Adding location:", location);
          }}
          onOriginAdd={async (origin: Origin) => {
            console.log("Adding origin:", origin);
          }}
        />
      )}
      {editingProduct && (
        <EditProductModal
          isOpen={!!editingProduct}
          onClose={handleEditClose}
          product={editingProduct}
          onProductUpdate={handleProductUpdate}
        />
      )}
      <ProductDetailsModal
        isOpen={viewingProductId !== null}
        onClose={handleCloseDetails}
        productId={viewingProductId}
      />
      {deletingProductId !== null && (
        <DeleteProductModal
          isOpen={deletingProductId !== null}
          onClose={handleCloseDelete}
          productId={deletingProductId}
          onProductDelete={async (productId) => {
            dispatch({ type: "DELETE_PRODUCT", payload: productId });
            handleCloseDelete();
            await fetchProducts();
          }}
        />
      )}
    </div>
  );
};

const ProductTable: React.FC<{
  currentProducts: ProductProps[];
  dropdownVisible: number | null;
  toggleDropdown: (productId: number) => void;
  handleProductDelete: (productId: number) => void;
  handleEditClick: (product: ProductProps) => void;
  handleViewDetails: (productId: number) => void;
}> = ({
  currentProducts,
  dropdownVisible,
  toggleDropdown,
  handleProductDelete,
  handleEditClick,
  handleViewDetails,
}) => (
  <table className="min-w-full table-fixed divide-y divide-gray-200">
    <thead className="bg-[#FCFBF4] hover:bg-[#FCFBF4]">
      <tr>
        <TableHeader text="ID" />
        <TableHeader text="Image" />
        <TableHeader text="Product Name" />
        <TableHeader text="Quantity" />
        <TableHeader text="Price" />
        <TableHeader text="Discount Price" />
        <TableHeader text="Discount Percent" />
        <TableHeader text="Status" />
        {/* <TableHeader text="Link" /> */}
        <TableHeader text="Action" />
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200 bg-white">
      {currentProducts.map((product) => (
        <tr key={product.productId}>
          <TableCell text={product.productId.toString()} isSemi />
          <td className="flex justify-center whitespace-nowrap px-6 py-4 text-sm text-gray-500">
            <img
              src={product.image}
              className="h-10 w-10 object-cover"
              alt="Product"
            />
          </td>
          <TableCell text={product.productName} isProductName={true} />
          <TableCell text={product.quantity?.toString() ?? "0"} />
          <TableCell text={product.price.toString()} />
          <TableCell
            text={
              product.discountPrice !== null
                ? product.discountPrice.toString()
                : "0"
            }
          />
          <TableCell
            text={
              product.discountPercent !== null && product.discountPercent !== 0
                ? `${product.discountPercent}%`
                : "0"
            }
          />
          <TableCell
            text={product.status === 1 ? "In Stock" : "Out Of Stock"}
            isSemi
          />
          {/* <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-blue-500">
            <a href="#" target="_blank" rel="noopener noreferrer">
              View
            </a>
          </td> */}
          <td className="relative whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
            <Button
              onClick={() => toggleDropdown(product.productId)}
              className="bg-white text-black hover:bg-white"
            >
              ...
            </Button>
            {dropdownVisible === product.productId && (
              <div className="absolute right-0 z-10 mt-2 w-48 rounded border shadow-xl">
                <DropdownItem
                  onClick={() => handleViewDetails(product.productId)}
                >
                  View Details
                </DropdownItem>
                <DropdownItem onClick={() => handleEditClick(product)}>
                  Edit
                </DropdownItem>
                <DropdownItem
                  className="text-red-600"
                  onClick={() => handleProductDelete(product.productId)}
                >
                  Delete
                </DropdownItem>
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
  <div className="mt-4 flex items-center justify-center text-center">
    <PaginationButton
      onClick={() => handleClick(currentPage - 1)}
      disabled={currentPage === 1}
      text="Previous"
    />
    <div className="font mx-3 text-sm text-gray-700">
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
    className="px-6 text-center text-base font-bold tracking-wider"
  >
    {text}
  </th>
);

const TableCell: React.FC<{
  text: string;
  isProductName?: boolean;
  isSemi?: boolean;
}> = ({ text, isProductName, isSemi }) => (
  <td
    className={`px-6 py-4 text-center text-sm ${
      isProductName ? "max-w-xs break-words" : "whitespace-nowrap"
    } ${isSemi ? "font-semibold" : ""} ${isSemi ? "px-0" : ""}`}
  >
    {text}
  </td>
);

const DropdownItem: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}> = ({ onClick, children, className }) => (
  <button
    className={`block w-full rounded-none bg-white px-4 py-2 text-left text-sm text-black hover:bg-gray-400 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const PaginationButton: React.FC<{
  onClick: () => void;
  disabled: boolean;
  text: string;
}> = ({ onClick, disabled, text }) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    className={`hover w-[100px] rounded bg-blue-500 hover:bg-blue-600 ${
      disabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-300"
    }`}
  >
    {text}
  </Button>
);

export default ProductManagementPage;
