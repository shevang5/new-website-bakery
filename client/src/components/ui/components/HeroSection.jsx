import React from "react";

const HeroSection = () => (
  <section className="bg-white rounded-3xl shadow-lg p-8 md:mt-32 mt-8 flex flex-col md:flex-row items-center justify-between">
    <div className="flex-1">
      <h1 className="text-5xl md:text-5xl font-extrabold  mb-4">
        <span className="text-[#553404]">☕ Fresh Brews & Flaky Pastries — Now in Hawthorne!</span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-700 mb-6">
        Premium bread and cookies made from scratch <span className="bg-blue-100 text-blue-700 px-2 rounded">FRESH</span>
      </p>
      <p className="text-lg text-gray-500 mb-6">We're literally obsessed with giving more of what you love!</p>
      <div className="flex gap-4">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-md transition">Order Now</button>
        <button className="bg-gray-200 hover:bg-gray-300 text-brown-900 font-bold py-3 px-6 rounded-full text-lg shadow-md transition">Cooking Blog</button>
      </div>
    </div>
    <div className="flex-1 flex justify-center items-center mt-8 md:mt-0">
      <img src="/assets/bread-hero.png" alt="Bread and Cookies" className="w-80 h-80 object-cover rounded-2xl shadow-xl border-4 border-yellow-200" />
    </div>
  </section>
);

export default HeroSection;
