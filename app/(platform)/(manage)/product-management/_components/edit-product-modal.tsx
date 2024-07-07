import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Package, DollarSign, Percent, LayoutGrid, FileText, Image as ImageIcon, ToggleLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { useToast } from "@/components/ui/use-toast";
import { ProductProps, EditProductModalProps } from '@/interface';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDongSign } from '@fortawesome/free-solid-svg-icons';

export const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  product,
  onProductUpdate,
}) => {
  const [editedProduct, setEditedProduct] = useState<ProductProps>(product);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: ['price', 'discountPrice', 'discountPercent', 'quantity'].includes(name) 
        ? parseFloat(value)
        : value,
    }));
  }, []);

  const handleSelectChange = useCallback((value: string) => {
    setEditedProduct((prev) => ({
      ...prev,
      status: value === '1' ? 1 : 0,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.put<ProductProps>(
        `https://milkapplication20240705013352.azurewebsites.net/api/Product/UpdateProducts/${editedProduct.productId}`,
        editedProduct
      );

      if (response.status === 200 || response.status === 204) {
        await onProductUpdate(response.data || editedProduct);
        onClose();
        toast({
          title: "Success",
          description: "Product updated successfully",
        });
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: axios.isAxiosError(error)
          ? error.response?.data?.message || "An error occurred while updating the product."
          : "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">Edit Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Package className="h-5 w-5 text-primary" />
              <Input
                id="productName"
                name="productName"
                placeholder="Product Name"
                value={editedProduct.productName}
                onChange={handleInputChange}
                className="flex-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faDongSign} className="h-5 w-5 text-green-600" />
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Price"
                  value={editedProduct.price}
                  onChange={handleInputChange}
                  className="flex-1"
                />
              </div>
              <div className="flex items-center space-x-4">
                <Percent className="h-5 w-5 text-orange-600" />
                <Input
                  id="discountPercent"
                  name="discountPercent"
                  type="number"
                  placeholder="Discount %"
                  value={editedProduct.discountPercent ?? ''}
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
              <FileText className="h-5 w-5 text-purple-600 mt-2" />
              <Textarea
                id="productDescription"
                name="productDescription"
                placeholder="Product Description"
                value={editedProduct.productDescription}
                onChange={handleInputChange}
                className="flex-1 min-h-[100px]"
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
              <ToggleLeft className="h-5 w-5 text-gray-600" />
              <Select 
                onValueChange={handleSelectChange}
                defaultValue={editedProduct.status === 1 ? '1' : '0'}
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
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="bg-primary text-white hover:bg-primary-dark">
              {isSubmitting ? 'Updating...' : 'Update Product'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;