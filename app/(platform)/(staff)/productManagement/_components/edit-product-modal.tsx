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
  DialogFooter,
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
  const [editedProduct, setEditedProduct] = useState<ProductProps>({
    ...product,
    imagesCarousel: product.imagesCarousel || [],
  });
  const [carouselImages, setCarouselImages] = useState<string[]>(
    product.imagesCarousel || [],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [origins, setOrigins] = useState<Origin[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showDiscountWarning, setShowDiscountWarning] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    console.log("EditProductModal mounted or product changed");
    setEditedProduct({
      ...product,
      imagesCarousel: product.imagesCarousel || [],
    });
    setCarouselImages(product.imagesCarousel || []);
    fetchCategories();
    fetchLocations();
    fetchOrigins();
  }, [product]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>(
        "https://milkapplicationapi.azurewebsites.net/api/Category/GetAllCategorys",
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
        "https://milkapplicationapi.azurewebsites.net/api/Location/GetAllLocation",
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
        "https://milkapplicationapi.azurewebsites.net/api/Origin/GetAllOrigins",
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
    } else if (editedProduct.productName.length < 5) {
      newErrors.productName = "Product Name must be at least 5 characters";
    } else if (editedProduct.productName.length > 50) {
      newErrors.productName = "Product Name cannot exceed 50 characters";
    }

    if (!editedProduct.price || editedProduct.price < 1) {
      newErrors.price = "Price must be at least 1";
    }

    if (
      editedProduct.discountPercent !== null &&
      editedProduct.discountPercent !== undefined
    ) {
      if (editedProduct.discountPercent < 0) {
        newErrors.discountPercent = "Discount percent cannot be less than 0%";
      } else if (editedProduct.discountPercent > 80) {
        newErrors.discountPercent = "Discount percent cannot exceed 80%";
      }
    }

    if (!editedProduct.productDescription.trim()) {
      newErrors.productDescription = "Product description is required";
    } else if (editedProduct.productDescription.length < 15) {
      newErrors.productDescription =
        "Product description must be at least 15 characters";
    } else if (editedProduct.productDescription.length > 1000) {
      newErrors.productDescription =
        "Product description cannot exceed 1000 characters";
    }

    if (!editedProduct.quantity || editedProduct.quantity < 1) {
      newErrors.quantity = "Quantity must be greater than 0";
    }

    if (!editedProduct.categoryId) {
      newErrors.categoryId = "Please select a category";
    }
    if (!editedProduct.originId) {
      newErrors.originId = "Please select an origin";
    }
    if (!editedProduct.locationId) {
      newErrors.locationId = "Please select a location";
    }

    if (!editedProduct.image.trim()) {
      newErrors.image = "Please select an image for the product";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      let parsedValue: string | number | null = value;

      if (name === "discountPercent") {
        if (value === "") {
          parsedValue = null;
        } else {
          parsedValue = Math.min(parseFloat(value), 80);
        }
        setShowDiscountWarning(parsedValue !== null && parsedValue > 50);
      } else if (["price", "quantity"].includes(name)) {
        parsedValue = Math.max(1, parseFloat(value));
      }

      setEditedProduct((prev) => ({
        ...prev,
        [name]: parsedValue,
      }));

      setErrors((prev) => ({ ...prev, [name]: "" }));
      console.log(`Input changed: ${name} = ${parsedValue}`);
    },
    [],
  );

  const handleCarouselImageChange = (index: number, value: string) => {
    const newCarouselImages = [...carouselImages];
    newCarouselImages[index] = value;
    setCarouselImages(newCarouselImages);
    setEditedProduct((prev) => ({
      ...prev,
      imagesCarousel: newCarouselImages,
    }));
  };

  const addCarouselImage = () => {
    setCarouselImages([...carouselImages, ""]);
  };

  const removeCarouselImage = (index: number) => {
    const newCarouselImages = carouselImages.filter((_, i) => i !== index);
    setCarouselImages(newCarouselImages);
    setEditedProduct((prev) => ({
      ...prev,
      imagesCarousel: newCarouselImages,
    }));
  };

  const handleSelectChange = useCallback((name: string, value: string) => {
    setEditedProduct((prev) => ({
      ...prev,
      [name]: name === "status" ? (value === "1" ? 1 : 0) : parseInt(value, 10),
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    console.log(`Select changed: ${name} = ${value}`);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    if (
      editedProduct.discountPercent !== null &&
      editedProduct.discountPercent > 50
    ) {
      setShowConfirmDialog(true);
    } else {
      await updateProduct();
    }
  };

  const updateProduct = async () => {
    setIsSubmitting(true);

    try {
      console.log("Sending update request for product:", editedProduct);
      const updatedProductData = {
        ...editedProduct,
        id: "34f40b90-f47e-446d-b2b7-18bb0c8465c6",
      };
      const response = await axios.put<ProductProps>(
        `https://milkapplicationapi.azurewebsites.net/api/Product/UpdateProducts/${editedProduct.productId}`,
        updatedProductData,
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
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
          <DialogHeader className="sticky z-10 bg-white pb-6">
            <DialogTitle className="text-3xl font-bold text-primary">
              Edit Product
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
              <div className="col-span-full">
                <div className="flex items-center space-x-4">
                  <Package className="h-6 w-6 text-primary" />
                  <div className="flex-1">
                    <Input
                      id="productName"
                      name="productName"
                      placeholder="Product Name"
                      value={editedProduct.productName}
                      onChange={handleInputChange}
                      className={`text-lg ${errors.productName ? "border-red-500" : ""}`}
                    />
                    {errors.productName && (
                      <p className="mt-2 text-sm font-medium text-red-500">
                        {errors.productName}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FontAwesomeIcon
                  icon={faDongSign}
                  className="h-6 w-6 text-green-600"
                />
                <div className="flex-1">
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={editedProduct.price}
                    onChange={handleInputChange}
                    className={`text-lg ${errors.price ? "border-red-500" : ""}`}
                  />
                  {errors.price && (
                    <p className="mt-2 text-sm font-medium text-red-500">
                      {errors.price}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Percent className="h-6 w-6 text-orange-600" />
                <div className="flex-1">
                  <Input
                    id="discountPercent"
                    name="discountPercent"
                    type="number"
                    placeholder="Discount % (optional)"
                    value={editedProduct.discountPercent ?? ""}
                    onChange={handleInputChange}
                    className={`text-lg ${errors.discountPercent ? "border-red-500" : ""} ${
                      showDiscountWarning ? "border-yellow-500" : ""
                    }`}
                    min="0"
                    max="80"
                    step="0.1"
                  />
                  {errors.discountPercent && (
                    <p className="mt-2 text-sm font-medium text-red-500">
                      {errors.discountPercent}
                    </p>
                  )}
                  {showDiscountWarning && (
                    <p className="mt-2 text-sm font-medium text-yellow-500">
                      Warning: Discount is over 50%
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <LayoutGrid className="h-6 w-6 text-blue-600" />
                <div className="flex-1">
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    placeholder="Quantity"
                    value={editedProduct.quantity}
                    onChange={handleInputChange}
                    className={`text-lg ${errors.quantity ? "border-red-500" : ""}`}
                  />
                  {errors.quantity && (
                    <p className="mt-2 text-sm font-medium text-red-500">
                      {errors.quantity}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <div className="flex items-start space-x-4">
                  <FileText className="mt-2 h-6 w-6 text-purple-600" />
                  <div className="flex-1">
                    <Textarea
                      id="productDescription"
                      name="productDescription"
                      placeholder="Product Description"
                      value={editedProduct.productDescription}
                      onChange={handleInputChange}
                      className={`min-h-[120px] text-lg ${
                        errors.productDescription ? "border-red-500" : ""
                      }`}
                    />
                    {errors.productDescription && (
                      <p className="mt-2 text-sm font-medium text-red-500">
                        {errors.productDescription}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <div className="flex items-center space-x-4">
                  <ImageIcon className="h-6 w-6 text-pink-600" />
                  <div className="flex-1">
                    <Input
                      id="image"
                      name="image"
                      placeholder="Image URL"
                      value={editedProduct.image}
                      onChange={handleInputChange}
                      className={`text-lg ${errors.image ? "border-red-500" : ""}`}
                    />
                    {errors.image && (
                      <p className="mt-2 text-sm font-medium text-red-500">
                        {errors.image}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-700">
                    Carousel Images
                  </label>
                  {carouselImages.map((image, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder={`Carousel Image ${index + 1} URL`}
                        value={image}
                        onChange={(e) =>
                          handleCarouselImageChange(index, e.target.value)
                        }
                        className="flex-grow text-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeCarouselImage(index)}
                        className="px-3 py-2 text-base font-medium text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addCarouselImage}
                    className="px-4 py-2 text-base font-medium text-blue-600 hover:text-blue-800"
                  >
                    Add Carousel Image
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Folder className="h-6 w-6 text-blue-600" />
                <div className="flex-1">
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("categoryId", value)
                    }
                    defaultValue={editedProduct.categoryId?.toString()}
                  >
                    <SelectTrigger
                      className={`text-lg ${errors.categoryId ? "border-red-500" : ""}`}
                    >
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
                  {errors.categoryId && (
                    <p className="mt-2 text-sm font-medium text-red-500">
                      {errors.categoryId}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6 text-green-600" />
                <div className="flex-1">
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("locationId", value)
                    }
                    defaultValue={editedProduct.locationId?.toString()}
                  >
                    <SelectTrigger
                      className={`text-lg ${errors.locationId ? "border-red-500" : ""}`}
                    >
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
                  {errors.locationId && (
                    <p className="mt-2 text-sm font-medium text-red-500">
                      {errors.locationId}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Globe className="h-6 w-6 text-yellow-600" />
                <div className="flex-1">
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("originId", value)
                    }
                    defaultValue={editedProduct.originId?.toString()}
                  >
                    <SelectTrigger
                      className={`text-lg ${errors.originId ? "border-red-500" : ""}`}
                    >
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
                  {errors.originId && (
                    <p className="mt-2 text-sm font-medium text-red-500">
                      {errors.originId}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <ToggleLeft className="h-6 w-6 text-gray-600" />
                <Select
                  onValueChange={(value) => handleSelectChange("status", value)}
                  defaultValue={editedProduct.status === 1 ? "1" : "0"}
                >
                  <SelectTrigger className="flex-1 text-lg">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Active</SelectItem>
                    <SelectItem value="0">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="px-6 py-3 text-lg font-medium"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="hover:bg-primary-dark bg-primary px-6 py-3 text-lg font-medium text-white"
              >
                {isSubmitting ? "Updating..." : "Update Product"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Confirm High Discount
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-base">
              Are you sure you want to set a discount higher than 50%? This is
              an unusually high discount.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              className="px-4 py-2 text-base"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowConfirmDialog(false);
                updateProduct();
              }}
              className="hover:bg-primary-dark bg-primary px-4 py-2 text-base text-white"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProductModal;