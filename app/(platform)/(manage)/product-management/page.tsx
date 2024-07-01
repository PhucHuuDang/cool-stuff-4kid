"use client";

import React, { useReducer, useEffect, useCallback, useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import { AddProductModal } from "./_components/add-product";
import { EditProductModal } from "./_components/edit-product-modal";
import { ProductDetailsModal } from "./_components/product-details-modal";
import { ProductManagement, ProductManagementAction } from "@/interface";

interface State {
  products: ProductManagement[];
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
            product.productId === action.payload.productId ? { ...action.payload } : product
          ),
        };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.productId !== action.payload
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
  const [editingProduct, setEditingProduct] = useState<ProductManagement | null>(null);
  const [viewingProductId, setViewingProductId] = useState<number | null>(null);
  const itemsPerPage = 7;

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://milkapplicationapi.azurewebsites.net/api/Product/GetAllProducts",
        { timeout: 10000 }
      );
      dispatch({ type: "SET_PRODUCTS", payload: response.data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          console.error("Request timed out. Please try again.");
        } else if (error.message === 'Network Error') {
          console.error("Network error. Please check your internet connection.");
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

  const handleAddProduct = () => {
    dispatch({ type: "TOGGLE_MODAL" });
  };

  const handleProductAdd = useCallback(async (product: ProductManagement) => {
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
        }
      );
  
      const newProduct = response.data;
      dispatch({ type: "ADD_PRODUCT", payload: newProduct });
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      dispatch({ type: "SET_SUBMITTING", payload: false });
      dispatch({ type: "TOGGLE_MODAL" });
    }
  }, []);

  const handleProductDelete = async (productId: number) => {
    try {
      await axios.delete(
        `https://milkapplicationapi.azurewebsites.net/api/Product/DeleteProducts/${productId}`
      );
      dispatch({ type: "DELETE_PRODUCT", payload: productId });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = (product: ProductManagement) => {
    setEditingProduct(product);
  };

  const handleEditClose = () => {
    setEditingProduct(null);
  };

  const handleProductUpdate = useCallback(async (updatedProduct: ProductManagement) => {
    try {
      const response = await axios.put(
        `https://milkapplicationapi.azurewebsites.net/api/Product/UpdateProducts/${updatedProduct.productId}`,
        updatedProduct
      );
      dispatch({ type: "UPDATE_PRODUCT", payload: response.data });
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setEditingProduct(null);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, state.products]);

  const handleViewDetails = (productId: number) => {
    setViewingProductId(productId);
  };

  const handleCloseDetails = () => {
    setViewingProductId(null);
  };

  const indexOfLastProduct = state.currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const filteredProducts = state.products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleClick = useCallback((pageNumber: number) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: pageNumber });
  }, []);

  const toggleDropdown = useCallback((productId: number) => {
    dispatch({ type: "TOGGLE_DROPDOWN", payload: productId });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
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
                handleProductDelete={handleProductDelete}
                handleEditClick={handleEditClick}
                handleViewDetails={handleViewDetails}
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
      {state.isOpen && (
        <AddProductModal
          setIsOpen={handleAddProduct}
          isOpen={state.isOpen}
          onProductAdd={handleProductAdd}
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
    </div>
  );
};

const ProductTable: React.FC<{
  currentProducts: ProductManagement[];
  dropdownVisible: number | null;
  toggleDropdown: (productId: number) => void;
  handleProductDelete: (productId: number) => void;
  handleEditClick: (product: ProductManagement) => void;
  handleViewDetails: (productId: number) => void;
}> = ({
  currentProducts,
  dropdownVisible,
  toggleDropdown,
  handleProductDelete,
  handleEditClick,
  handleViewDetails,
}) => (
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <TableHeader text="ID" />
        <TableHeader text="Product Image" />
        <TableHeader text="Product Name" />
        <TableHeader text="Quantity" />
        <TableHeader text="Normal Price" />
        <TableHeader text="Discount Price" />
        <TableHeader text="Discount Percent" />
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
          <TableCell text={product.quantity?.toString() ?? '0'} />
          <TableCell text={product.price.toString()} />
          <TableCell text={product.discountPrice !== null ? product.discountPrice.toString() : 'N/A'} />
          <TableCell text={product.discountPercent !== null ? `${product.discountPercent}%` : 'N/A'} />
          <TableCell text={product.status === 1 ? 'Active' : 'Inactive'} />
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
                <DropdownItem
                  text="Product Details"
                  onClick={() => handleViewDetails(product.productId)}
                />
                <DropdownItem
                  text="Edit Product"
                  onClick={() => handleEditClick(product)}
                />
                <DropdownItem
                  text="Stop Selling"
                  onClick={() => handleProductDelete(product.productId)}
                />
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

const DropdownItem: React.FC<{ text: string; onClick?: () => void }> = ({
  text,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
  >
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
    className={`rounded bg-gray-200 px-4 py-2 ${
      disabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-300"
    }`}
  >
    {text}
  </button>
);

export default ProductManagementPage;