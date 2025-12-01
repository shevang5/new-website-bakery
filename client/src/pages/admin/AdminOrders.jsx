import React, { useEffect, useState } from "react";
import axios from "../../api/config";

const statusOptions = ["pending", "processing", "shipped", "cancelled", "delivered"];

const statusStyles = {
  pending: { active: "bg-yellow-500 text-white ring-2 ring-yellow-300", inactive: "bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100" },
  processing: { active: "bg-blue-500 text-white ring-2 ring-blue-300", inactive: "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100" },
  shipped: { active: "bg-purple-500 text-white ring-2 ring-purple-300", inactive: "bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100" },
  cancelled: { active: "bg-red-500 text-white ring-2 ring-red-300", inactive: "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100" },
  delivered: { active: "bg-green-500 text-white ring-2 ring-green-300", inactive: "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100" },
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/orders"); // Admin-only endpoint

      // Sort orders: pending first, then by creation date (newest first)
      const sorted = [...data].sort((a, b) => {
        // If one is pending and the other is not, pending comes first
        if (a.status === "pending" && b.status !== "pending") return -1;
        if (a.status !== "pending" && b.status === "pending") return 1;

        // If both have the same status, sort by creation date (newest first)
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      setOrders(sorted);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchOrders();

    // Poll for new orders every 5 seconds
    const interval = setInterval(() => {
      fetchOrders();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      const { data } = await axios.put(`/orders/${orderId}/status`, { status });
      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? data : order))
      );
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update status");
    }
  };

  if (loading) return <p className="text-center py-10 text-gray-500">Loading orders...</p>;

  if (!orders.length) return <p className="text-center py-16 text-gray-500">No orders yet.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className={"relative p-4 mb-6 rounded shadow-md border " + (order.status === "pending" ? "bg-yellow-100 border-yellow-400" : "bg-white")}
        >
          {/* created time small light text in corner */}
          {order.createdAt && (
            <p className="absolute bottom-0 left-4 text-xs text-gray-400">{new Date(order.createdAt).toLocaleString()}</p>
          )}
          <div className="flex justify-between items-center mb-4">
            <p>
              <span className="font-semibold">User:</span>{" "}
              {order.user?.name || order.user?._id}
            </p>
            <p>
              <span className="font-semibold">Total:</span> $
              {order.total?.toFixed(2)}
            </p>
          </div>

          {/* Delivery info */}
          <div className="mb-3">
            <p>
              <span className="font-semibold">Delivery:</span>{" "}
              {order.deliveryType === "home" ? (
                <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded">Home Delivery</span>
              ) : (
                <span className="inline-flex items-center">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Pickup</span>
                  {order.pickup?.pickTime && (
                    <>
                      <span className="ml-3 text-sm text-gray-800 bg-white px-2 py-1 rounded font-medium">{new Date(order.pickup.pickTime).toLocaleString()}</span>
                      <span className="ml-3 text-sm text-gray-800 bg-white px-2 py-1 rounded font-medium">Phone: {order.pickup.phone}</span>
                    </>
                  )}
                </span>
              )}
            </p>

            {order.deliveryType === "home" && order.address && (
              <div className="mt-2 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                <div>{order.address.line1}</div>
                <div>
                  {order.address.city}
                  {order.address.state ? ", " + order.address.state : ""} {order.address.postalCode}
                </div>
                {order.address.phone && <div>Phone: {order.address.phone}</div>}
              </div>
            )}
          </div>

          <div className="space-y-3 mb-4">
            {order.products?.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded"
              >
                <div className="flex items-center">
                  <img
                    src={item.product?.image}
                    alt={item.product?.name}
                    className="w-20 h-20 object-cover rounded mr-4"
                  />
                  <div>
                    <p className="font-semibold">{item.product?.name}</p>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-gray-600">
                      Price: ${item.product?.price?.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-3">
            <p className="text-xs text-gray-400">Order ID: {order._id}</p>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(order._id, status)}
                  className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wide transition-all ${order.status === status
                    ? statusStyles[status].active
                    : statusStyles[status].inactive
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}
