import React from "react";

const Blog = () => {
  return (
    <section id="services" className="bg-gradient-to-b from-amber-50 via-white to-rose-50 py-16 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-amber-800 tracking-tight">
            Crafting Moments, Serving You
          </h2>
          <p className="mt-4 text-base-content/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            From unforgettable flavors to seamless service, we make every meal special.
            Whether you dine in, take out, or order online — we’ve got your cravings covered.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Card 1 */}
          <div className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-amber-100">
            <figure className="overflow-hidden">
              <img
                src="https://demos.flyonui.com/templates/assets/img/free-landing-page/free-blog-1.png"
                alt="Buffet Service"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </figure>
            <div className="p-6 flex flex-col gap-3">
              <h5 className="text-xl font-semibold text-amber-700">Buffet Service</h5>
              <p className="text-base-content/70 leading-relaxed mb-4">
                Experience variety and flavor with our buffet selection — crafted fresh and served with care.
              </p>
              <a
                href="#"
                className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold 
                bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 
                hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 shadow-md"
              >
                Read More
                <span className="icon-[tabler--arrow-right] size-5 rtl:rotate-180"></span>
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-amber-100">
            <figure className="overflow-hidden">
              <img
                src="https://demos.flyonui.com/templates/assets/img/free-landing-page/free-blog-2.png"
                alt="Food Delivery"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </figure>
            <div className="p-6 flex flex-col gap-3">
              <h5 className="text-xl font-semibold text-amber-700">Food Delivery</h5>
              <p className="text-base-content/70 leading-relaxed mb-4">
                Delicious meals, delivered hot and fast — from our kitchen straight to your doorstep.
              </p>
              <a
                href="#"
                className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold 
                bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 
                hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 shadow-md"
              >
                Read More
                <span className="icon-[tabler--arrow-right] size-5 rtl:rotate-180"></span>
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-amber-100">
            <figure className="overflow-hidden">
              <img
                src="https://demos.flyonui.com/templates/assets/img/free-landing-page/free-blog-3.png"
                alt="Cafeteria"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </figure>
            <div className="p-6 flex flex-col gap-3">
              <h5 className="text-xl font-semibold text-amber-700">Cafeteria</h5>
              <p className="text-base-content/70 leading-relaxed mb-4">
                Cozy atmosphere, premium brews, and delightful treats — your perfect cafe escape awaits.
              </p>
              <a
                href="#"
                className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold 
                bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 
                hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 shadow-md"
              >
                Read More
                <span className="icon-[tabler--arrow-right] size-5 rtl:rotate-180"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
