import React from "react";

const SpecialItemsSection = () => (
  <section className="mt-12">
    <h2 className="text-3xl font-bold mb-4 text-brown-900">Why Bakery's Items Are So Special to Customer?</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
        <img src="/assets/cookies-special.png" alt="Special Cookies" className="w-32 h-32 object-cover mb-4 rounded-full border-4 border-yellow-100" />
        <h3 className="text-xl font-bold text-brown-900 mb-2">Taste the Real Wheat Baked Items</h3>
        <span className="text-yellow-600 font-bold text-lg mb-2">$16</span>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
        <img src="/assets/bagel-buns.png" alt="Bagel Buns" className="w-32 h-32 object-cover mb-4 rounded-full border-4 border-yellow-100" />
        <h3 className="text-xl font-bold text-brown-900 mb-2">Bagel Buns (Gluten Free)</h3>
        <span className="text-yellow-600 font-bold text-lg mb-2">$16</span>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
        <img src="/assets/bakery-combo.png" alt="Bakery Combo" className="w-32 h-32 object-cover mb-4 rounded-full border-4 border-yellow-100" />
        <h3 className="text-xl font-bold text-brown-900 mb-2">Baking is a craft in itself</h3>
        <span className="text-gray-700 text-base mb-2">We bake these delicious and crumbly flavours bakery items.</span>
        <span className="italic text-gray-500">— Ashton Cooper</span>
      </div>
    </div>
    <div className="flex justify-center">
      <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-md transition">Shop Now</button>
    </div>
  </section>
);

export default SpecialItemsSection;
