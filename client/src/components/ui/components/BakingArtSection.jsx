import React from "react";

const BakingArtSection = () => (
  <section className="bg-brown-900 text-white rounded-3xl shadow-lg p-8 mt-12 flex flex-col md:flex-row items-center">
    <div className="flex-1 flex justify-center items-center mb-8 md:mb-0">
      <div className="w-64 h-40 bg-gray-200 rounded-2xl flex items-center justify-center">
        {/* Placeholder for video or image */}
        <img src="/assets/baking-art.png" alt="Baking Art" className="w-40 h-40 object-cover rounded-xl" />
      </div>
    </div>
    <div className="flex-1">
      <h2 className="text-3xl font-bold mb-4">Why is Baking Considered as Art Form?</h2>
      <p className="text-lg mb-6">Their experience plays a role in the way they work. Bakers use flavours and visual appeal to produce an edible art piece.</p>
      <button className="bg-yellow-500 hover:bg-yellow-600 text-brown-900 font-bold py-3 px-6 rounded-full text-lg shadow-md transition">Learn Baking</button>
    </div>
  </section>
);

export default BakingArtSection;
