"use client"
import React, { useEffect, useReducer } from "react";

interface Order {
  orderId: number;
  orderDate: string;
  totalPrice: number;
  id: string;
}

type State = {
  orders: Order[];
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; payload: Order[] }
  | { type: "FETCH_FAILURE"; payload: string };

const initialState: State = {
  orders: [],
  loading: false,
  error: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const OrdersPage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  const { orders, loading, error } = state;

  return (
    <div>
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
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {orders.map((order) => (
                    <tr key={order.orderId}>
                      <td className="whitespace-nowrap px-4 py-4 text-center">
                        {order.orderId}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-center">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-center">
                        {order.totalPrice}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-center">
                        {order.id}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-center">
                        ...
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
    </div>
  );
};

export default OrdersPage;
