import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "./ui/Spinner";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [refreshUI, setRefreshUI] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/orders/admin`,
          {
            headers: {
              adminToken: JSON.parse(localStorage.getItem("adminToken")),
            },
          }
        );
        setOrders(result.data.orders);
      } catch (error) {
        console.log(error);
        setError(error?.response?.data?.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [refreshUI]);

  const onStatusChange = async (orderId, status) => {
    try {
      setUpdatingStatus(true);
      await axios.put(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/orders/${orderId}`,
        { status },
        {
          headers: {
            adminToken: JSON.parse(localStorage.getItem("adminToken")),
          },
        }
      );

      setRefreshUI((p) => !p);
      toast.success("Status Updated!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status!");
    } finally {
      setUpdatingStatus(false);
    }
  };

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

  if (orders.length === 0)
    return (
      <div className="w-full flex justify-center items-center">
        No orders found!
      </div>
    );
  return (
    <div className="md:px-26 px-8">
      <div>
        {orders?.map((order) => (
          <div
            key={order._id}
            className="border border-gray-400 shadow-lg p-4 mb-4 mt-6"
          >
            <div className="flex gap-3 mb-3">
              <div className="flex items-center justify-center">
                <img src="/order-box.png" alt="order box" className="size-24" />
              </div>
              <div className="flex flex-col gap-3">
                <div className="font-semibold">
                  Customer Name: {order?.userId?.fullname}
                </div>
                <div className="font-semibold">
                  Ordered on: {order.createdAt.split("T")[0]}
                </div>
                <h2 className="font-semibold mb-2">Order ID: {order._id}</h2>
              </div>
            </div>
            <div className="grid grid-cols-none md:grid-cols-2 gap-6">
              {!loading &&
                orders.length > 0 &&
                order.products?.map((product) => (
                  <div key={product._id} className=" flex gap-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="size-20 object-cover"
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
            <p className="flex items-center">
              <span className="font-semibold mr-3">Status:</span>{" "}
              <select
                name="orderStatus"
                id="orderStatus"
                className="outline-none border border-gray-400 rounded"
                onChange={(e) => {
                  onStatusChange(order._id, e.target.value);
                }}
                disabled={updatingStatus}
              >
                <option value={order.orderStatus}>{order.orderStatus}</option>
                <option
                  value={
                    order.orderStatus === "ordered" ? "delivered" : "ordered"
                  }
                >
                  {order.orderStatus === "ordered" ? "delivered" : "ordered"}
                </option>
              </select>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
