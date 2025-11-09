import React from "react";

const FooterSection = () => (
  <footer className="bg-blue-100 rounded-3xl shadow-lg p-8 mt-12 flex flex-col md:flex-row items-center justify-between">
    <div className="flex-1 mb-4 md:mb-0">
      <h3 className="text-2xl font-bold text-brown-900 mb-2">With enough butter, anything is good!</h3>
      <p className="text-gray-700 mb-2">Our master plan to freshen up a 200-year-old</p>
      <p className="text-gray-700">What we are dishing out?</p>
    </div>
    <div className="flex-1 flex flex-col items-center">
      <div className="flex gap-2 mb-2">
        <span className="bg-white px-3 py-1 rounded-full text-brown-900 font-semibold">Plain Cake</span>
        <span className="bg-white px-3 py-1 rounded-full text-brown-900 font-semibold">Croissant</span>
        <span className="bg-white px-3 py-1 rounded-full text-brown-900 font-semibold">Loaf Bread</span>
        <span className="bg-white px-3 py-1 rounded-full text-brown-900 font-semibold">Cookies</span>
        <span className="bg-white px-3 py-1 rounded-full text-brown-900 font-semibold">Breitzel</span>
        <span className="bg-white px-3 py-1 rounded-full text-brown-900 font-semibold">Apple Pie</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-brown-900">3.73</span>
        <span className="text-yellow-600">★</span>
        <span className="text-gray-700">Based on 4350 reviews.</span>
      </div>
    </div>
    <div className="flex-1 flex flex-col items-end">
      <div className="flex gap-4 mb-2">
        <a href="#" className="text-gray-700 hover:text-blue-600"><i className="fab fa-linkedin"></i></a>
        <a href="#" className="text-gray-700 hover:text-blue-600"><i className="fab fa-facebook"></i></a>
        <a href="#" className="text-gray-700 hover:text-blue-600"><i className="fab fa-twitter"></i></a>
      </div>
      <span className="text-gray-500 text-sm">Design by Rylc Studio 2024</span>
    </div>
  </footer>
);

export default FooterSection;
