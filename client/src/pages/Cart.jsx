import React, { useEffect, useState } from "react";
import axios from "../api/config";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadCart } from "../store/reducers/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const [cart, setCart] = useState(null);
  const [updatingIds, setUpdatingIds] = useState({});
  // delivery state: 'pickup' or 'home' (null = not chosen yet)
  const [deliveryType, setDeliveryType] = useState(null);
  const [address, setAddress] = useState({ line1: "", city: "", state: "", postalCode: "", phone: "" });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const { data } = await axios.get("/cart");
      setCart(data);
      // update redux so Navbar and other components reflect changes
      dispatch(loadCart(data));
    } catch (err) {
      console.log(err);
    }
  };

  const updateQty = async (id, type) => {
    try {
      // mark this item as updating to prevent duplicate clicks
      setUpdatingIds((s) => ({ ...s, [id]: true }));

      // call the update endpoint — it returns the updated cart, so use it
      const { data } = await axios.put(`/cart/item/${id}`, { type }); // returns updated cart

  // update local state using returned cart (avoid an extra GET request)
  setCart(data);
  // also update redux so Navbar updates immediately
  dispatch(loadCart(data));
    } catch (err) {
      console.log(err);
    } finally {
      setUpdatingIds((s) => ({ ...s, [id]: false }));
    }
  };

  const removeItem = async (id) => {
    try {
      // call DELETE /cart/:productId (server expects productId as URL param)
      await axios.delete(`/cart/${id}`);

      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };
  const checkout = async (selectedDeliveryType = "pickup", selectedAddress = null) => {
    try {
      // basic client-side validation for home delivery
      if (selectedDeliveryType === "home") {
        if (!selectedAddress || !selectedAddress.line1 || !selectedAddress.city || !selectedAddress.postalCode) {
          alert("Please provide a valid delivery address (street, city, postal code).");
          return;
        }
      }

      const orderData = {
        products: cart.items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        total: cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
        deliveryType: selectedDeliveryType,
      };

      if (selectedDeliveryType === "home") orderData.address = selectedAddress;

      await axios.post("/orders", orderData);
      setCart({ items: [] }); // immediate UI clear
      fetchCart(); // re-sync with server
      alert("✅ Order Placed Successfully!");

      // reset delivery UI
      setDeliveryType(null);
      setAddress({ line1: "", city: "", state: "", postalCode: "", phone: "" });
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("❌ Failed to place order");
    }
  };


  if (!cart || cart.items.length === 0)
    return (
      <div className="text-center py-16 text-gray-500">
        🛒 Your cart is empty.
        <br />
        <Link to="/products" className="text-blue-600 underline">Go Shopping</Link>
      </div>
    );

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.items.map(item => {
        if (!item.product) return (
          <div key={item._id} className="p-4">Product removed</div>
        );
        return (
          <div
            key={item._id}
            className="flex items-center justify-between bg-white p-4 mb-4 rounded shadow-md"
          >
            <img
              src={item.product.image}
              className="w-20 h-20 object-cover rounded"
              alt={item.product.name}
            />

            <div className="w-1/3">
              <h2 className="font-semibold text-lg">{item.product.name}</h2>
              <p className="text-gray-600">${item.product.price}</p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQty(item._id, "dec")}
                className={`px-3 py-1 rounded ${updatingIds[item._id] ? 'bg-gray-300 cursor-wait' : 'bg-gray-200 hover:bg-gray-300'}`}
                disabled={!!updatingIds[item._id]}
              >
                {updatingIds[item._id] ? '...' : '-'}
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQty(item._id, "inc")}
                className={`px-3 py-1 rounded ${updatingIds[item._id] ? 'bg-gray-300 cursor-wait' : 'bg-gray-200 hover:bg-gray-300'}`}
                disabled={!!updatingIds[item._id]}
              >
                {updatingIds[item._id] ? '...' : '+'}
              </button>
            </div>

            <button
              onClick={() => removeItem(item.product._id)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        )
      })}

      <div className="text-right text-2xl font-semibold mt-4">
        Total: <span className="text-green-600">${total}</span>
      </div>

      <div className="mt-6 w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex gap-3">
            <button
              onClick={() => {
                // immediate pickup order
                setDeliveryType("pickup");
                checkout("pickup", null);
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold"
            >
              🚶 Pickup
            </button>

            <button
              onClick={() => setDeliveryType("home")}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-brown-900 rounded-lg font-semibold"
            >
              🏠 Home Delivery
            </button>
          </div>

          <div className="w-full md:w-1/2">
            {deliveryType === "home" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  checkout("home", address);
                }}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">Street address</label>
                  <input
                    required
                    value={address.line1}
                    onChange={(e) => setAddress((s) => ({ ...s, line1: e.target.value }))}
                    className="mt-1 w-full border px-3 py-2 rounded"
                    placeholder="123 Baker St"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                  <input
                    required
                    value={address.city}
                    onChange={(e) => setAddress((s) => ({ ...s, city: e.target.value }))}
                    className="mt-1 w-full border px-3 py-2 rounded"
                    placeholder="City"
                  />
                  <input
                    value={address.state}
                    onChange={(e) => setAddress((s) => ({ ...s, state: e.target.value }))}
                    className="mt-1 w-full border px-3 py-2 rounded"
                    placeholder="State"
                  />
                  <input
                    required
                    value={address.postalCode}
                    onChange={(e) => setAddress((s) => ({ ...s, postalCode: e.target.value }))}
                    className="mt-1 w-full border px-3 py-2 rounded"
                    placeholder="Postal Code"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    value={address.phone}
                    onChange={(e) => setAddress((s) => ({ ...s, phone: e.target.value }))}
                    className="mt-1 w-full border px-3 py-2 rounded"
                    placeholder="Optional phone number"
                  />
                </div>
                <div className="text-right">
                  <button type="submit" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold">Place Order</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
