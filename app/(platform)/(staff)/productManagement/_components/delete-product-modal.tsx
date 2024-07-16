import React from "react";
import axios from "axios";

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  onProductDelete: (productId: number) => void;
}

export const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  isOpen,
  onClose,
  productId,
  onProductDelete,
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://milkapplicationapi.azurewebsites.net/api/Product/DeleteProducts/${productId}`,
      );
      onProductDelete(productId);
      onClose();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative z-50 mx-auto my-6 w-auto max-w-sm">
        <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
          <div className="flex items-start justify-between rounded-t border-b border-solid border-gray-300 p-5">
            <h3 className="text-2xl font-semibold">Delete Product</h3>
            <button
              className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black outline-none focus:outline-none"
              onClick={onClose}
            >
              <span className="block h-6 w-6 bg-transparent text-2xl text-black outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <div className="relative flex-auto p-6">
            <p className="my-4 text-lg leading-relaxed text-gray-600">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
          </div>
          <div className="flex items-center justify-end rounded-b border-t border-solid border-gray-300 p-6">
            <button
              className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-gray-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="mb-1 mr-1 rounded bg-red-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-600"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
