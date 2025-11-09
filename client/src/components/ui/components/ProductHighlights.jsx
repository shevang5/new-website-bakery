import React from "react";

const categories = [
  { name: "Cookies", count: 12, color: "bg-pink-200" },
  { name: "Cake", count: 27, color: "bg-blue-200" },
  { name: "Breitzel", count: 8, color: "bg-purple-200" },
  { name: "Pastries", count: 23, color: "bg-yellow-200" },
  { name: "Croissant", count: 21, color: "bg-orange-200" },
  { name: "Bagel", count: 13, color: "bg-green-200" },
];

const products = [
  { name: "Bagel with Seeds", image: "/assets/bagel-seeds.png" },
  { name: "Sliced Piece Bread", image: "/assets/sliced-bread.png" },
  { name: "Cookies Glucose", image: "/assets/cookies-glucose.png" },
];

const ProductHighlights = () => (
  <section className="mt-12">
    <h2 className="text-3xl font-bold mb-4 text-brown-900">Product We Bake Here Daily</h2>
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map(cat => (
        <span key={cat.name} className={`px-4 py-2 rounded-full text-brown-900 font-semibold ${cat.color}`}>{cat.name} {cat.count}</span>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {products.map(prod => (
        <div key={prod.name} className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
          <img src={prod.image} alt={prod.name} className="w-32 h-32 object-cover mb-4 rounded-full border-4 border-yellow-100" />
          <h3 className="text-xl font-bold text-brown-900 mb-2">{prod.name}</h3>
        </div>
      ))}
    </div>
  </section>
);

export default ProductHighlights;
