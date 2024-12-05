"use client";

import React, { useReducer, useEffect, useCallback, useState } from "react";
import { Search, ArrowUpDown, ArrowDown, ArrowUp, ChevronDown, Globe, MapPin, FolderPlus, PlusCircle } from "lucide-react";
import axios from "axios";
import { AddProductModal } from "./add-product-modal";
import { EditProductModal } from "./edit-product-modal";
import { ProductDetailsModal } from "./product-details-modal";
import { DeleteProductModal } from "./delete-product-modal";
import { ProductProps, ProductManagementAction, Category, Location, Origin } from "@/interface";

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

const DropdownMenu: React.FC<{
  onSelect: (tab: string) => void;
}> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center items-center w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out shadow-sm border border-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="mr-2">Action</span>
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <ActionMenuItem 
              icon={<PlusCircle className="mr-3 h-5 w-5 text-indigo-500" />} 
              text="Add Product" 
              onClick={() => { onSelect("1"); setIsOpen(false); }} 
            />
            <ActionMenuItem 
              icon={<FolderPlus className="mr-3 h-5 w-5 text-green-500" />} 
              text="Add Category" 
              onClick={() => { onSelect("2"); setIsOpen(false); }} 
            />
            <ActionMenuItem 
              icon={<MapPin className="mr-3 h-5 w-5 text-blue-500" />} 
              text="Add Location" 
              onClick={() => { onSelect("3"); setIsOpen(false); }} 
            />
            <ActionMenuItem 
              icon={<Globe className="mr-3 h-5 w-5 text-purple-500" />} 
              text="Add Origin" 
              onClick={() => { onSelect("4"); setIsOpen(false); }} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

const ActionMenuItem: React.FC<{ icon: React.ReactNode; text: string; onClick: () => void }> = ({ icon, text, onClick }) => (
  <button
    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition duration-150 ease-in-out"
    role="menuitem"
    onClick={onClick}
  >
    {icon}
    <span className="ml-3">{text}</span>
  </button>
);

const formatVND = (price: number | null | undefined): string => {
  if (price === null || price === undefined) return 'N/A';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const ProductManagementClient: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProduct, setEditingProduct] = useState<ProductProps | null>(null);
  const [viewingProductId, setViewingProductId] = useState<number | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<number | null>(null);
  const [categories, setCategories] = useState<{ categoryId: number; categoryName: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [activeModalTab, setActiveModalTab] = useState<string>("1");
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

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://milkapplicationapi.azurewebsites.net/api/Category/GetAllCategorys"
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

  const handleProductAdd = useCallback(async (product: ProductProps) => {
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
      await fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      dispatch({ type: "SET_SUBMITTING", payload: false });
      dispatch({ type: "TOGGLE_MODAL" });
    }
  }, [fetchProducts]);

  const handleProductDelete = useCallback((productId: number) => {
    setDeletingProductId(productId);
  }, []);

  const handleEditClick = (product: ProductProps) => {
    setEditingProduct(product);
  };

  const handleEditClose = () => {
    setEditingProduct(null);
  };

  const handleProductUpdate = useCallback(async (updatedProduct: ProductProps) => {
    try {
      const response = await axios.put(
        `https://milkapplicationapi.azurewebsites.net/api/Product/UpdateProducts/${updatedProduct.productId}`,
        updatedProduct
      );
      dispatch({ type: "UPDATE_PRODUCT", payload: response.data });
      await fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setEditingProduct(null);
    }
  }, [fetchProducts]);

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

  const sortProducts = (products: ProductProps[]) => {
    if (!sortField) return products;

    return [...products].sort((a, b) => {
      if (sortField === 'quantity') {
        const aValue = a.quantity ?? 0;
        const bValue = b.quantity ?? 0;
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      if (sortField === 'price') {
        return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
      }
      if (sortField === 'discountPrice') {
        const aValue = a.discountPrice ?? Number.MAX_VALUE;
        const bValue = b.discountPrice ?? Number.MAX_VALUE;
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      if (sortField === 'discountPercent') {
        const aValue = a.discountPercent ?? 0;
        const bValue = b.discountPercent ?? 0;
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
  };

  const filteredAndSortedProducts = sortProducts(
    state.products.filter((product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "" || product.categoryId.toString() === selectedCategory) &&
      (selectedStatus === "" || 
        (selectedStatus === "Active" && product.status === 1) ||
        (selectedStatus === "Inactive" && product.status === 0)
      )
    )
  );

  const indexOfLastProduct = state.currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

  const handleClick = useCallback((pageNumber: number) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: pageNumber });
  }, []);

  const toggleDropdown = useCallback((productId: number) => {
    dispatch({ type: "TOGGLE_DROPDOWN", payload: productId });
  }, []);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

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
                <select 
                  className="mr-4 rounded border p-2"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.categoryId} value={category.categoryId.toString()}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
                <select 
                  className="mr-4 rounded border p-2"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <DropdownMenu onSelect={(tab) => {
                  setActiveModalTab(tab);
                  dispatch({ type: "TOGGLE_MODAL" });
                }} />
              </div>
              <div className="overflow-x-auto">
                <ProductTable
                  currentProducts={currentProducts}
                  dropdownVisible={state.dropdownVisible}
                  toggleDropdown={toggleDropdown}
                  handleProductDelete={handleProductDelete}
                  handleEditClick={handleEditClick}
                  handleViewDetails={handleViewDetails}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  handleSort={handleSort}
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
          activeTab={activeModalTab}
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
  sortField: string | null;
  sortDirection: 'asc' | 'desc';
  handleSort: (field: string) => void;
}> = ({
  currentProducts,
  dropdownVisible,
  toggleDropdown,
  handleProductDelete,
  handleEditClick,
  handleViewDetails,
  sortField,
  sortDirection,
  handleSort,
}) => (
  <table className="min-w-full divide-y divide-gray-200 table-fixed">
    <thead className="bg-gray-50">
      <TableHeader text="ID" />
      <TableHeader text="Product Image" />
      <TableHeader text="Product Name" />
      <TableHeader 
        text="Quantity" 
        sortable 
        field="quantity" 
        currentSortField={sortField} 
        currentSortDirection={sortDirection} 
        onSort={handleSort} 
        color="text-[#28a745]"
      />
      <TableHeader 
        text="Origin Price" 
        sortable 
        field="price" 
        currentSortField={sortField} 
        currentSortDirection={sortDirection} 
        onSort={handleSort} 
        color="text-[#dc3545]"
      />
      <TableHeader 
        text="Discount Price" 
        sortable 
        field="discountPrice" 
        currentSortField={sortField} 
        currentSortDirection={sortDirection} 
        onSort={handleSort} 
        color="text-[#007bff]"
      />
      <TableHeader 
        text="Discount Percent" 
        sortable 
        field="discountPercent" 
        currentSortField={sortField} 
        currentSortDirection={sortDirection} 
        onSort={handleSort} 
        color="text-[#fd7e14]"
      />
      <TableHeader text="Status" />
      <TableHeader text="Action" />
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
          <TableCell text={product.productName} isProductName={true} />
          <TableCell text={product.quantity?.toString() ?? '0'} />
          <TableCell text={formatVND(product.price)} />
          <TableCell text={formatVND(product.discountPrice)} />
          <TableCell text={product.discountPercent !== null && product.discountPercent !== 0 ? `${product.discountPercent}%` : 'N/A'} />
          <StatusCell status={product.status} />
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

const TableHeader: React.FC<{ 
  text: string;
  sortable?: boolean;
  field?: string;
  currentSortField?: string | null;
  currentSortDirection?: 'asc' | 'desc';
  onSort?: (field: string) => void;
  color?: string;
}> = ({ text, sortable, field, currentSortField, currentSortDirection, onSort, color }) => (
  <th
    scope="col"
    className={`px-6 py-3 text-center text-xs font-medium uppercase tracking-wider ${color || 'text-gray-500'} ${
      sortable ? 'cursor-pointer hover:bg-gray-100' : ''
    }`}
    onClick={() => sortable && field && onSort && onSort(field)}
  >
    <div className="flex items-center justify-center">
      {text}
      {sortable && (
        <span className="ml-1">
          {currentSortField === field ? (
            currentSortDirection === 'asc' ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )
          ) : (
            <ArrowUpDown className="h-4 w-4 text-gray-400" />
          )}
        </span>
      )}
    </div>
  </th>
);

const TableCell: React.FC<{ text: string; isProductName?: boolean }> = ({ text, isProductName }) => (
  <td className={`px-6 py-4 text-center text-sm text-gray-500 ${
    isProductName ? 'max-w-xs break-words' : 'whitespace-nowrap'
  }`}>
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

const StatusCell: React.FC<{ status: number }> = ({ status }) => {
  const statusText = status === 1 ? 'Active' : 'Inactive';
  const statusColor = status === 1 ? 'text-green-600' : 'text-red-600';
  
  return (
    <td className={`whitespace-nowrap px-6 py-4 text-center text-sm ${statusColor}`}>
      {statusText}
    </td>
  );
};

export default ProductManagementClient;