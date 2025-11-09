// controllers/orderController.js
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const createOrder = async (req, res) => {
  try {
    const { products, total, deliveryType, address } = req.body;

    // Validate products
    if (!products || !products.length) {
      return res.status(400).json({ message: "No products in order" });
    }

    // If home delivery requested, ensure address is provided
    if (deliveryType === "home") {
      if (!address || !address.line1 || !address.city || !address.postalCode) {
        return res.status(400).json({ message: "Delivery address required for home delivery" });
      }
    }

    // Create order (include delivery fields if provided)
    const orderPayload = {
      user: req.user._id,
      products, // [{ product: productId, quantity }]
      total,
      deliveryType: deliveryType || "pickup",
    };

    if (deliveryType === "home") orderPayload.address = address;

    const order = await Order.create(orderPayload);

    // Populate product details
    await order.populate("products.product");

    // Clear user's cart after successful order creation
    try {
      await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
    } catch (err) {
      console.error("Failed to clear cart after order:", err);
      // Non-fatal: we still return the created order
    }

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("products.product");
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};


export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user").populate("products.product");
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(order);
};

export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Only the owner can cancel
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to cancel this order" });
    }

    // Allow cancellation only when order hasn't progressed too far
    if (!["pending", "processing"].includes(order.status)) {
      return res.status(400).json({ message: "Order cannot be cancelled at this stage" });
    }

    order.status = "cancelled";
    await order.save();

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to cancel order" });
  }
};
