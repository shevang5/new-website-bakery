import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/config"; // Axios instance with baseURL

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        console.log(res);
        
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const storedUser = JSON.parse(localStorage.getItem("user"));
const token = storedUser?.token;
console.log("Token being sent:", token);

  const renderProduct = products.map((product) => (
    <div key={product._id} className="h-full">
      <Link
        to={`/products/${product._id}`}
        className="group h-full flex flex-col bg-[#fff8f3] rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-pink-100"
      >
        <div className="relative flex-shrink-0">
          <img
            className="w-full h-40 md:h-48 lg:h-56 object-cover"
            src={product.image}
            alt={product.name}
          />
          <div className="absolute top-2 right-2 bg-white/80 text-pink-600 px-2 py-0.5 text-xs md:text-sm rounded-full font-medium shadow-sm">
            {product.category}
          </div>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="mb-3">
            <h2 className="text-base md:text-lg font-semibold text-[#4b2e05] group-hover:text-pink-700 transition-colors line-clamp-1">
              {product.name}
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="mt-auto pt-2 flex items-center justify-between">
            <span className="text-base md:text-lg font-bold text-pink-700">
              ${product.price}
            </span>
            <button
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                try {
                  if (!token) {
                    alert("❌ Please login first");
                    return;
                  }

                  await axios.post(
                    "http://localhost:5000/api/cart",
                    { productId: product._id },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );

                  alert("✅ Added to Cart");
                } catch (err) {
                  console.log("Error adding to cart:", err.response?.data || err.message);
                  alert("❌ Failed to add to cart");
                }
              }}
              className="bg-gradient-to-r from-pink-500 to-rose-400 text-white text-xs px-3 py-1.5 rounded-full hover:from-pink-600 hover:to-rose-500 shadow-md transition-all whitespace-nowrap"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  ));


  return products.length > 0 ? (
    <div className="min-h-screen bg-gray-100">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 max-w-7xl mx-auto">
        {renderProduct}
      </div>
    </div>
  ) : (
    <div className="text-center py-10 text-gray-500">Loading...</div>
  );
};

export default Products;
