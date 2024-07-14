import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Package,
  DollarSign,
  Percent,
  LayoutGrid,
  FileText,
  Image as ImageIcon,
  ToggleLeft,
  Folder,
  MapPin,
  Globe,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { message } from "antd";
import {
  ProductProps,
  EditProductModalProps,
  Category,
  Location,
  Origin,
} from "@/interface";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDongSign } from "@fortawesome/free-solid-svg-icons";

export const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  product,
  onProductUpdate,
}) => {
  const [editedProduct, setEditedProduct] = useState<ProductProps>(product);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [origins, setOrigins] = useState<Origin[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    console.log("EditProductModal mounted or product changed");
    setEditedProduct(product);
    fetchCategories();
    fetchLocations();
    fetchOrigins();
  }, [product]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>(
        "https://milkapplication20240705013352.azurewebsites.net/api/Category/GetAllCategorys",
      );
      setCategories(response.data);
      console.log("Categories fetched:", response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      message.error("Failed to load categories");
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get<Location[]>(
        "https://milkapplication20240705013352.azurewebsites.net/api/Location/GetAllLocation",
      );
      setLocations(response.data);
      console.log("Locations fetched:", response.data);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
      message.error("Failed to load locations");
    }
  };

  const fetchOrigins = async () => {
    try {
      const response = await axios.get<Origin[]>(
        "https://milkapplication20240705013352.azurewebsites.net/api/Origin/GetAllOrigins",
      );
      setOrigins(response.data);
      console.log("Origins fetched:", response.data);
    } catch (error) {
      console.error("Failed to fetch origins:", error);
      message.error("Failed to load origins");
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!editedProduct.productName.trim()) {
      newErrors.productName = "Product name is required";
    }

    if (!editedProduct.price || editedProduct.price < 1) {
      newErrors.price = "Price must be 1 or greater";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setEditedProduct((prev) => ({
        ...prev,
        [name]: [
          "price",
          "discountPrice",
          "discountPercent",
          "quantity",
        ].includes(name)
          ? parseFloat(value)
          : value,
      }));
      // Clear error when user starts typing
      setErrors((prev) => ({ ...prev, [name]: "" }));
      console.log(`Input changed: ${name} = ${value}`);
    },
    [],
  );

  const handleSelectChange = useCallback((name: string, value: string) => {
    setEditedProduct((prev) => ({
      ...prev,
      [name]: name === "status" ? (value === "1" ? 1 : 0) : parseInt(value, 10),
    }));
    console.log(`Select changed: ${name} = ${value}`);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Sending update request for product:", editedProduct);
      const response = await axios.put<ProductProps>(
        `https://milkapplication20240705013352.azurewebsites.net/api/Product/UpdateProducts/${editedProduct.productId}`,
        editedProduct,
      );

      console.log("Update response received:", response);

      if (response.status === 200 || response.status === 204) {
        console.log("Product updated successfully");
        await onProductUpdate(response.data || editedProduct);

        message.success("Product updated successfully");

        console.log("Closing modal");
        onClose();
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      message.error(
        axios.isAxiosError(error)
          ? error.response?.data?.message ||
              "An error occurred while updating the product."
          : "An unexpected error occurred.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log("Rendering EditProductModal", { isOpen, product: editedProduct });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            Edit Product
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Package className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <Input
                  id="productName"
                  name="productName"
                  placeholder="Product Name"
                  value={editedProduct.productName}
                  onChange={handleInputChange}
                  className={errors.productName ? "border-red-500" : ""}
                />
                {errors.productName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.productName}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-4">
                <FontAwesomeIcon
                  icon={faDongSign}
                  className="h-5 w-5 text-green-600"
                />
                <div className="flex-1">
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={editedProduct.price}
                    onChange={handleInputChange}
                    className={errors.price ? "border-red-500" : ""}
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Percent className="h-5 w-5 text-orange-600" />
                <Input
                  id="discountPercent"
                  name="discountPercent"
                  type="number"
                  placeholder="Discount %"
                  value={editedProduct.discountPercent ?? ""}
                  onChange={handleInputChange}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LayoutGrid className="h-5 w-5 text-blue-600" />
              <Input
                id="quantity"
                name="quantity"
                type="number"
                placeholder="Quantity"
                value={editedProduct.quantity}
                onChange={handleInputChange}
                className="flex-1"
              />
            </div>
            <div className="flex items-start space-x-4">
              <FileText className="mt-2 h-5 w-5 text-purple-600" />
              <Textarea
                id="productDescription"
                name="productDescription"
                placeholder="Product Description"
                value={editedProduct.productDescription}
                onChange={handleInputChange}
                className="min-h-[100px] flex-1"
              />
            </div>
            <div className="flex items-center space-x-4">
              <ImageIcon className="h-5 w-5 text-pink-600" />
              <Input
                id="image"
                name="image"
                placeholder="Image URL"
                value={editedProduct.image}
                onChange={handleInputChange}
                className="flex-1"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Folder className="h-5 w-5 text-blue-600" />
              <Select
                onValueChange={(value) =>
                  handleSelectChange("categoryId", value)
                }
                defaultValue={editedProduct.categoryId?.toString()}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.categoryId}
                      value={category.categoryId.toString()}
                    >
                      {category.categoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="h-5 w-5 text-green-600" />
              <Select
                onValueChange={(value) =>
                  handleSelectChange("locationId", value)
                }
                defaultValue={editedProduct.locationId?.toString()}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem
                      key={location.locationId}
                      value={location.locationId.toString()}
                    >
                      {location.locationName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-4">
              <Globe className="h-5 w-5 text-yellow-600" />
              <Select
                onValueChange={(value) => handleSelectChange("originId", value)}
                defaultValue={editedProduct.originId?.toString()}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select origin" />
                </SelectTrigger>
                <SelectContent>
                  {origins.map((origin) => (
                    <SelectItem
                      key={origin.originId}
                      value={origin.originId.toString()}
                    >
                      {origin.originName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-4">
              <ToggleLeft className="h-5 w-5 text-gray-600" />
              <Select
                onValueChange={(value) => handleSelectChange("status", value)}
                defaultValue={editedProduct.status === 1 ? "1" : "0"}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Active</SelectItem>
                  <SelectItem value="0">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="hover:bg-primary-dark bg-primary text-white"
            >
              {isSubmitting ? "Updating..." : "Update Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
