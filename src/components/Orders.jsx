import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "./ui/Spinner";
import { useSelector } from "react-redux";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/orders`,
          {
            withCredentials: true,
          }
        );

        setOrders(result.data);
      } catch (error) {
        console.log(error);
        setError(error?.response?.data?.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading)
    return (
      <div className="w-full flex justify-center items-center">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <div className="w-full flex justify-center items-center">{error}</div>
    );
  return (
    <div>
      <div>
        {orders?.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-400 shadow-lg p-4 mb-4"
            >
              <h2 className="font-semibold mb-2">Order ID: {order._id}</h2>
              <div className="flex flex-col gap-6">
                {order.products.map((product) => (
                  <div key={product._id} className=" flex gap-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-14 object-cover"
                    />
                    <div>
                      <p className="text-sm mt-1 font-semibold">
                        {product.title}
                      </p>
                      <p className="text-sm font-semibold">
                        Price:{" "}
                        <span className="font-normal">₹{product.price}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-2 font-semibold">
                Total Amount:{" "}
                <span className="font-normal">₹{order.totalAmount}</span>
              </p>
              <p className="font-semibold flex items-center">
                Status:{" "}
                <span className="ml-2 py-1 px-3 bg-green-500 rounded-full text-white">
                  {order.orderStatus}
                </span>
              </p>
            </div>
          ))
        ) : (
          <div className="w-full flex justify-center items-center">
            No react orders
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
