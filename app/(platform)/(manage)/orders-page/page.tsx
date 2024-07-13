"use client"

import React, { useEffect, useReducer, useState } from "react";
import { Order, OrderManagementAction } from "@/interface";
import { Search } from "lucide-react";

type State = {
  orders: Order[];
  loading: boolean;
  error: string | null;
  deleteModalOpen: boolean;
  orderToDelete: Order | null;
};

const initialState: State = {
  orders: [],
  loading: false,
  error: null,
  deleteModalOpen: false,
  orderToDelete: null,
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
    default:
      return state;
  }
};

const OrdersPage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const response = await fetch("https://milkapplication20240705013352.azurewebsites.net/api/Order/GetAllOrder");
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

  const { orders, loading, error, deleteModalOpen, orderToDelete } = state;

  const filteredOrders = orders.filter(order =>
    order.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteOrder = async (orderId: string) => {
    try {
      const response = await fetch(`https://milkapplication20240705013352.azurewebsites.net/api/Order/DeleteOrder/${orderId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error("Failed to delete order");
      }
      dispatch({ type: "DELETE_ORDER", payload: orderId });
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleOpenDeleteModal = (order: Order) => {
    dispatch({ type: "SET_ORDER_TO_DELETE", payload: order });
  };

  const handleCloseDeleteModal = () => {
    dispatch({ type: "CLOSE_DELETE_MODAL" });
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
      <div className="flex flex-grow">
        <main className="flex-grow overflow-y-auto bg-gray-100 p-6">
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-black">
                      ORDER ID
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-black">
                      ORDER DATE
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-black">
                      TOTAL PRICE
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-black">
                      CUSTOMER ID
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-black">
                      USER NAME
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-black">
                      STATUS
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-black">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredOrders.map((order) => (
                    <tr key={order.orderId}>
                      <td className="whitespace-nowrap px-4 py-4 text-center">
                        {order.orderId}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-center">
                        {new Intl.DateTimeFormat('vi-VN', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit'
                        }).format(new Date(order.orderDate))}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-center">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalPrice)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-center">
                        {order.id}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-center">
                        {order.userName}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-center">
                        {order.status === 0 ? 'Pending' : 'Completed'}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-center">
                        <button
                          onClick={() => handleOpenDeleteModal(order)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button className="rounded bg-gray-200 px-4 py-2">Previous</button>
            <button className="rounded bg-gray-200 px-4 py-2">Next</button>
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && orderToDelete && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete Order
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete order ID: {orderToDelete.orderId}?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => {
                    handleDeleteOrder(orderToDelete.orderId.toString());
                    handleCloseDeleteModal();
                  }}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={handleCloseDeleteModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;