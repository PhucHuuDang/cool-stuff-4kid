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
  PencilLineIcon,
  Search,
  Trash2Icon,
  MoreHorizontal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { AddProduct } from "./add-product";

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
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Product>({
    productId: 0,
    productName: "",
    price: 0,
    discountPrice: 0,
    discountPercent: 0,
    productDescription: "",
    image: "",
    quantity: 0,
    status: 0,
    categoryId: 1,
    originId: 1,
    locationId: 1,
  });
  const [isAdding, setIsAdding] = useState<boolean>(false);
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

  const handleEdit = (product: Product) => {
    setEditProduct(product);
  };

  const handleSaveEdit = () => {
    if (editProduct) {
      axios
        .put(
          `https://milkapplication20240705013352.azurewebsites.net/api/Product/UpdateProducts/${editProduct.productId}`,
          {
            ...editProduct,
            categoryId: 1,
            originId: 1,
            locationId: 1,
          },
        )
        .then((response) => {
          setEditProduct(null);
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
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
    }
  };

  const handleDelete = (productId: number) => {
    axios
      .delete(
        `https://milkapplication20240705013352.azurewebsites.net/api/Product/DeleteProducts/${productId}`,
      )
      .then((response) => {
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
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const handleAddProduct = () => {
    setIsAdding(true);
  };

  const handleSaveNewProduct = () => {
    axios
      .post(
        "https://milkapplication20240705013352.azurewebsites.net/api/Product/CreateProducts",
        newProduct,
      )
      .then((response) => {
        setNewProduct({
          productId: 0,
          productName: "",
          price: 0,
          discountPrice: 0,
          discountPercent: 0,
          productDescription: "",
          image: "",
          quantity: 0,
          status: 0,
          categoryId: 1,
          originId: 1,
          locationId: 1,
        });
        setIsAdding(false);
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
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  };

  return (
    <div>
      <div className="flex justify-between p-3">
        <div className="relative w-[500px]">
          <Input className="pl-10" placeholder="Product Name" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500" />
        </div>
        <div>
          <button
            onClick={handleAddProduct}
            className="rounded-md bg-blue-500 px-4 py-2 text-white"
          >
            Add Product
          </button>
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
              Description
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
              <TableCell className="w-20 font-bold">{item.productId}</TableCell>
              <TableCell className="w-36 font-medium">
                {item.productName}
              </TableCell>
              <TableCell className="h-[120px] w-[100px]">
                <img src={item.image} alt={item.productName} />
              </TableCell>
              <TableCell className="w-56 font-medium">
                {item.productDescription}
              </TableCell>
              <TableCell
                className={`w-16 font-medium ${getStatusColor(item.status)}`}
              >
                {item.status === 1 ? "In Stock" : "Out of Stock"}
              </TableCell>
              <TableCell className="w-20 font-medium">
                {item.quantity}
              </TableCell>
              <TableCell className="w-20 font-medium">${item.price}</TableCell>
              <TableCell className="w-24 text-center font-medium">
                {item.discountPrice > 0 ? (
                  <>
                    ${item.discountPrice}
                    <br />({item.discountPercent}%)
                  </>
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell className="w-16 text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="rounded bg-gray-200 p-1 text-black">
                    <MoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleEdit(item)}>
                      <PencilLineIcon className="mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(item.productId)}
                    >
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
      {isAdding && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="w-[500px] rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">Add New Product</h2>
            <div className="mb-4">
              <Label>Product Name</Label>
              <Input
                type="text"
                placeholder="Product Name"
                value={newProduct.productName}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, productName: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <Label>Price</Label>
              <Input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => {
                  const value = +e.target.value;
                  if (value >= 0) {
                    setNewProduct({ ...newProduct, price: value });
                  }
                }}
              />
            </div>
            <div className="mb-4">
              <Label>Discount Price</Label>
              <Input
                type="number"
                placeholder="Discount Price"
                value={newProduct.discountPrice}
                onChange={(e) => {
                  const value = +e.target.value;
                  if (value >= 0) {
                    setNewProduct({ ...newProduct, discountPrice: value });
                  }
                }}
              />
            </div>
            <div className="mb-4">
              <Label>Discount Percent</Label>
              <Input
                type="number"
                placeholder="Discount Percent"
                value={newProduct.discountPercent}
                onChange={(e) => {
                  const value = +e.target.value;
                  if (value >= 0) {
                    setNewProduct({ ...newProduct, discountPercent: value });
                  }
                }}
              />
            </div>
            <div className="mb-4">
              <Label>Product Description</Label>
              <Input
                type="text"
                placeholder="Product Description"
                value={newProduct.productDescription}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    productDescription: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-4">
              <Label>Image URL</Label>
              <Input
                type="text"
                placeholder="Image URL"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <Label>Quantity</Label>
              <Input
                type="number"
                placeholder="Quantity"
                value={newProduct.quantity}
                onChange={(e) => {
                  const value = +e.target.value;
                  if (value >= 0) {
                    setNewProduct({ ...newProduct, quantity: value });
                  }
                }}
              />
            </div>
            <div className="mb-4">
              <button
                onClick={handleSaveNewProduct}
                className="rounded-md bg-blue-500 px-4 py-2 text-white"
              >
                Save Product
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="ml-2 rounded-md bg-gray-300 px-4 py-2 text-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {editProduct && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="w-[500px] rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">Edit Product</h2>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Product Name"
                value={editProduct.productName}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    productName: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-4">
              <Input
                type="number"
                placeholder="Price"
                value={editProduct.price}
                onChange={(e) => {
                  const value = +e.target.value;
                  if (value >= 0) {
                    setEditProduct({ ...editProduct, price: value });
                  }
                }}
              />
            </div>
            <div className="mb-4">
              <Input
                type="number"
                placeholder="Discount Price"
                value={editProduct.discountPrice}
                onChange={(e) => {
                  const value = +e.target.value;
                  if (value >= 0) {
                    setEditProduct({ ...editProduct, discountPrice: value });
                  }
                }}
              />
            </div>
            <div className="mb-4">
              <Input
                type="number"
                placeholder="Discount Percent"
                value={editProduct.discountPercent}
                onChange={(e) => {
                  const value = +e.target.value;
                  if (value >= 0) {
                    setEditProduct({ ...editProduct, discountPercent: value });
                  }
                }}
              />
            </div>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Product Description"
                value={editProduct.productDescription}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    productDescription: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Image URL"
                value={editProduct.image}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, image: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <Input
                type="number"
                placeholder="Quantity"
                value={editProduct.quantity}
                onChange={(e) => {
                  const value = +e.target.value;
                  if (value >= 0) {
                    setEditProduct({ ...editProduct, quantity: value });
                  }
                }}
              />
            </div>
            <div className="mb-4">
              <Input
                type="number"
                placeholder="Status"
                value={editProduct.status}
                onChange={(e) => {
                  const value = +e.target.value;
                  if (value >= 0) {
                    setEditProduct({ ...editProduct, status: value });
                  }
                }}
              />
            </div>
            <div className="mb-4">
              <button
                onClick={handleSaveEdit}
                className="rounded-md bg-blue-500 px-4 py-2 text-white"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditProduct(null)}
                className="ml-2 rounded-md bg-gray-300 px-4 py-2 text-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
