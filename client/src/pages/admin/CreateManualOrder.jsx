import React, { useState, useEffect } from "react";
import axios from "../../api/config";
import { useNavigate } from "react-router-dom";

export default function CreateManualOrder() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    // Form State
    const [customerDetails, setCustomerDetails] = useState({
        name: "",
        phone: "",
    });
    const [deliveryType, setDeliveryType] = useState("pickup");
    const [address, setAddress] = useState({
        line1: "",
        city: "",
        state: "",
        postalCode: "",
        phone: "",
    });
    const [pickup, setPickup] = useState({
        phone: "",
        pickTime: "",
    });

    // Fetch Products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get("/products");
                setProducts(data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch products", err);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Cart Functions
    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.product._id === product._id);
            if (existing) {
                return prev.map((item) =>
                    item.product._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.product._id !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setCart((prev) =>
            prev.map((item) => {
                if (item.product._id === productId) {
                    const newQty = Math.max(1, item.quantity + delta);
                    return { ...item, quantity: newQty };
                }
                return item;
            })
        );
    };

    const cartTotal = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    // Submit Order
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!cart.length) return alert("Cart is empty!");
        if (!customerDetails.name || !customerDetails.phone)
            return alert("Customer Name and Phone are required!");

        setSubmitting(true);

        const orderPayload = {
            products: cart.map((item) => ({
                product: item.product._id,
                quantity: item.quantity,
            })),
            total: cartTotal,
            deliveryType,
            customerDetails,
        };

        if (deliveryType === "home") {
            orderPayload.address = { ...address, phone: customerDetails.phone };
        } else {
            orderPayload.pickup = {
                phone: customerDetails.phone,
                pickTime: pickup.pickTime,
            };
        }

        try {
            await axios.post("/orders", orderPayload);
            alert("Order Created Successfully!");
            navigate("/admin/orders");
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to create order");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading products...</div>;

    return (
        <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Product Selection */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Select Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto pr-2">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="border p-4 rounded shadow-sm flex flex-col justify-between bg-white"
                        >
                            <div className="flex items-center mb-2">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-16 h-16 object-cover rounded mr-3"
                                />
                                <div>
                                    <h3 className="font-semibold">{product.name}</h3>
                                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => addToCart(product)}
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column: Order Details & Cart */}
            <div className="bg-gray-50 p-6 rounded shadow-md h-fit">
                <h2 className="text-2xl font-bold mb-4">New Order Details</h2>

                {/* Customer Info */}
                <div className="mb-6 space-y-3">
                    <h3 className="font-semibold text-lg border-b pb-1">Customer Info</h3>
                    <input
                        type="text"
                        placeholder="Customer Name"
                        className="w-full p-2 border rounded"
                        value={customerDetails.name}
                        onChange={(e) =>
                            setCustomerDetails({ ...customerDetails, name: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        className="w-full p-2 border rounded"
                        value={customerDetails.phone}
                        onChange={(e) =>
                            setCustomerDetails({ ...customerDetails, phone: e.target.value })
                        }
                    />
                </div>

                {/* Delivery Method */}
                <div className="mb-6">
                    <h3 className="font-semibold text-lg border-b pb-1 mb-3">
                        Delivery Method
                    </h3>
                    <div className="flex gap-4 mb-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="deliveryType"
                                value="pickup"
                                checked={deliveryType === "pickup"}
                                onChange={(e) => setDeliveryType(e.target.value)}
                            />
                            Pickup
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="deliveryType"
                                value="home"
                                checked={deliveryType === "home"}
                                onChange={(e) => setDeliveryType(e.target.value)}
                            />
                            Home Delivery
                        </label>
                    </div>

                    {deliveryType === "pickup" ? (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Pickup Time
                            </label>
                            <input
                                type="datetime-local"
                                className="w-full p-2 border rounded"
                                value={pickup.pickTime}
                                onChange={(e) =>
                                    setPickup({ ...pickup, pickTime: e.target.value })
                                }
                            />
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Address Line 1"
                                className="w-full p-2 border rounded"
                                value={address.line1}
                                onChange={(e) =>
                                    setAddress({ ...address, line1: e.target.value })
                                }
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="text"
                                    placeholder="City"
                                    className="w-full p-2 border rounded"
                                    value={address.city}
                                    onChange={(e) =>
                                        setAddress({ ...address, city: e.target.value })
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Postal Code"
                                    className="w-full p-2 border rounded"
                                    value={address.postalCode}
                                    onChange={(e) =>
                                        setAddress({ ...address, postalCode: e.target.value })
                                    }
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="State (Optional)"
                                className="w-full p-2 border rounded"
                                value={address.state}
                                onChange={(e) =>
                                    setAddress({ ...address, state: e.target.value })
                                }
                            />
                        </div>
                    )}
                </div>

                {/* Cart Summary */}
                <div className="mb-6">
                    <h3 className="font-semibold text-lg border-b pb-1 mb-3">
                        Cart Summary
                    </h3>
                    {cart.length === 0 ? (
                        <p className="text-gray-500 italic">No items selected</p>
                    ) : (
                        <div className="space-y-2">
                            {cart.map((item) => (
                                <div
                                    key={item.product._id}
                                    className="flex justify-between items-center bg-white p-2 rounded border"
                                >
                                    <div className="flex-1">
                                        <p className="font-medium">{item.product.name}</p>
                                        <p className="text-sm text-gray-500">
                                            ${item.product.price} x {item.quantity}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateQuantity(item.product._id, -1)}
                                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.product._id, 1)}
                                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() => removeFromCart(item.product._id)}
                                            className="ml-2 text-red-500 hover:text-red-700"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="text-right font-bold text-xl mt-4">
                                Total: ${cartTotal.toFixed(2)}
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={submitting || cart.length === 0}
                    className={`w-full py-3 rounded text-white font-bold text-lg transition ${submitting || cart.length === 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                >
                    {submitting ? "Placing Order..." : "Place Order"}
                </button>
            </div>
        </div>
    );
}
