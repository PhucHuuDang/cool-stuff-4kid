"use client"

import React, { useEffect, useReducer, useState } from "react";
import { Order, OrderManagementAction } from "@/interface";
import { Search } from "lucide-react";
import OrderTable from './order-table';
import DeleteModal from './delete-modal';
import DetailsModal from './details-modal';

type State = {
    orders: Order[];
    loading: boolean;
    error: string | null;
    deleteModalOpen: boolean;
    orderToDelete: Order | null;
    detailsModalOpen: boolean;
    selectedOrder: Order | null;
  };
  
  const initialState: State = {
    orders: [],
    loading: false,
    error: null,
    deleteModalOpen: false,
    orderToDelete: null,
    detailsModalOpen: false,
    selectedOrder: null,
  };

  const reducer = (state: State, action: OrderManagementAction): State => {
    switch (action.type) {
      case "FETCH_INIT":
        return { ...state, loading: true, error: null };
      case "FETCH_SUCCESS":
        return { ...state, loading: false, orders: action.payload };
      case "FETCH_FAILURE":
        return { ...state, loading: false, error: action.payload };
      case "DELETE_ORDER":
        const updatedOrders = state.orders.filter(order => order.orderId !== parseInt(action.payload));
        return { ...state, orders: updatedOrders, deleteModalOpen: false, orderToDelete: null };
      case "SET_ORDER_TO_DELETE":
        return { ...state, deleteModalOpen: true, orderToDelete: action.payload };
      case "CLOSE_DELETE_MODAL":
        return { ...state, deleteModalOpen: false, orderToDelete: null };
      case "SET_ORDER_DETAILS":
        return { ...state, detailsModalOpen: true, selectedOrder: action.payload };
      case "CLOSE_DETAILS_MODAL":
        return { ...state, detailsModalOpen: false, selectedOrder: null };
      default:
        return state;
    }
  };

// ... (paste the State type, initialState, and reducer function here)

const OrdersClient: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const response = await fetch("https://milkapplicationapi.azurewebsites.net/api/Order/GetAllOrder");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        let errorMessage = "An unknown error occurred";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        dispatch({ type: "FETCH_FAILURE", payload: errorMessage });
      }
    };

    fetchOrders();
  }, []);

  const { orders, loading, error, deleteModalOpen, orderToDelete, detailsModalOpen, selectedOrder } = state;

  const filteredOrders = orders.filter(order =>
    order.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteOrder = async (orderId: string) => {
    try {
      const response = await fetch(`https://milkapplicationapi.azurewebsites.net/api/Order/DeleteOrder/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete order');
      }

      dispatch({ type: "DELETE_ORDER", payload: orderId });
  
      alert('Order deleted successfully');
    } catch (error) {
      console.error('Error deleting order:', error);
      
      alert('Failed to delete order. Please try again.');
    }
  };

  const handleOpenDeleteModal = (order: Order) => {
    dispatch({ type: "SET_ORDER_TO_DELETE", payload: order });
  };

  const handleCloseDeleteModal = () => {
    dispatch({ type: "CLOSE_DELETE_MODAL" });
  };

  const handleOpenDetailsModal = (order: Order) => {
    dispatch({ type: "SET_ORDER_DETAILS", payload: order });
  };

  const handleCloseDetailsModal = () => {
    dispatch({ type: "CLOSE_DETAILS_MODAL" });
  };

  return (
    <div>
      <div className="flex rounded-lg mx-6 mr-2">
        <div className="relative mr-4 flex flex-grow items-center">
          <Search className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by User Name"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full rounded border p-2 pl-10"
          />
        </div>
      </div>
      <OrderTable
        orders={filteredOrders}
        loading={loading}
        error={error}
        onOpenDelete={handleOpenDeleteModal}
        onOpenDetails={handleOpenDetailsModal}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        order={orderToDelete}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteOrder}
      />
      <DetailsModal
        isOpen={detailsModalOpen}
        order={selectedOrder}
        onClose={handleCloseDetailsModal}
      />
    </div>
  );
};

export default OrdersClient;