import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ProductManagement, EditProductModalProps } from '@/interface';

export const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  product,
  onProductUpdate,
}) => {
  const [editedProduct, setEditedProduct] = useState<ProductManagement>(product);
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
      const response = await axios.put<ProductManagement>(
        `https://milkapplicationapi.azurewebsites.net/api/Product/UpdateProducts/${editedProduct.productId}`,
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <Button
            onClick={onClose}
            variant="ghost"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="productName" className="text-right">Name</Label>
            <Input
              id="productName"
              name="productName"
              value={editedProduct.productName}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={editedProduct.price}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="discountPercent" className="text-right">Discount %</Label>
            <Input
              id="discountPercent"
              name="discountPercent"
              type="number"
              value={editedProduct.discountPercent ?? ''}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">Quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              value={editedProduct.quantity}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="productDescription" className="text-right">Description</Label>
            <Textarea
              id="productDescription"
              name="productDescription"
              value={editedProduct.productDescription}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={editedProduct.image}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">Status</Label>
            <Select 
              onValueChange={handleSelectChange}
              defaultValue={editedProduct.status === 1 ? '1' : '0'}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Active</SelectItem>
                <SelectItem value="0">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Product'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;