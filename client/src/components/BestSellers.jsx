import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { ShoppingBag, Star, ArrowLeft, ArrowRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Custom CSS for Swiper pagination bullets to match theme if needed
// You might need to add this to your global CSS or styles block
/*
.swiper-pagination-bullet {
  background: white;
  opacity: 0.5;
}
.swiper-pagination-bullet-active {
  background: white;
  opacity: 1;
}
*/

const products = [
    { id: 1, name: 'Croissant Breakfast Sandwich', description: 'Choice of ham, turkey, bacon, sausage, cheese and egg', price: '$7.45', image: '/pngImages/B&C2.png' },
    { id: 2, name: 'Breakfast Bagel Sandwich', description: 'Choice of ham, turkey, bacon or sausage + cheese and egg', price: '$7.45', image: '/pngImages/B&C2.png' },
    { id: 3, name: 'Croissant Sandwich', description: 'Croissant w choice of ham or turkey or chicken Salad or tuna salad w cheese lettuce tomatoes pickles red onion, jalapeño.', price: '$10.95', image: '/pngImages/B&C2.png' },
    { id: 4, name: 'Croissant Pastrami Sandwich', description: 'Served w lettuce, tomatoes, pickles, red onion and jalapeño.', price: '$10.95', image: '/pngImages/B&C2.png' },
    { id: 5, name: 'Croissant Roast Beef Sandwich', description: 'Served w cheese lettuce, tomato, pickles red onion and jalapeño.', price: '$10.95', image: '/pngImages/B&C2.png' },
    { id: 6, name: 'Turkey Bagel Sandwich', description: 'Served w turkey, cheese lettuce tomatoes red onion and jalapeño.', price: '$8.95', image: '/pngImages/B&C2.png' },
    { id: 7, name: 'Roasted Beef Bagel Sandwich', description: 'Served w beef, lettuce tomatoes red onion and jalapeño', price: '$10.95', image: '/pngImages/B&C2.png' },
    { id: 8, name: 'Bagel with Cream Cheese', description: 'Bagel and cream cheese', price: '$3.75', image: '/pngImages/B&C2.png' },
    { id: 9, name: 'Bagel and Lox', description: 'Bagel w smoke salmon red onion sprouts caper and avocado', price: '$9.95', image: '/pngImages/B&C2.png' },
    { id: 10, name: 'Bagel Breakfast w Bacon', description: 'Bagel w mayo, cheese, egg and bacon', price: '$7.45', image: '/pngImages/B&C2.png' },
    { id: 11, name: 'Bagel w Ham', description: 'Bagel w mayonnaise, cheese, egg and ham', price: '$7.45', image: '/pngImages/B&C2.png' },
    { id: 12, name: 'Bagel w Sausage Links', description: 'Bagel w mayonnaise, cheese, egg and smoked sausage', price: '$7.45', image: '/pngImages/B&C2.png' },
];

const BestSellers = () => {
    // Custom navigation buttons refs could be used, but standard swiper buttons are easier for now.
    // To match the design's bottom arrows, we can customise the controls.

    return (
        <div className="py-20 h-screen w-full bg-[#F14D2D] relative overflow-hidden">
            {/* Background "Sunburst" effect - using CSS radial gradient/conic for simplicity or an image if available. 
            Here imitating the reddish radial effect from the screenshot using Tailwind gradients. 
        */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-400 via-[#ED3e1e] to-[#dc2e0e] opacity-50 pointer-events-none"></div>
            {/* Burst lines can be complex to CSS, simplified here with a subtle pattern or skipping for MVP unless strictly requested */}

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-12">
                    {/* Logo Mark */}
                    <div className="flex justify-center mb-4 text-white">
                        <svg width="40" height="30" viewBox="0 0 40 30" fill="currentColor">
                            {/* Placeholder for the windmill/logo shape in white */}
                            <path d="M20 0 L25 10 L35 10 L27 18 L30 28 L20 22 L10 28 L13 18 L5 10 L15 10 Z" />
                        </svg>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-medium text-white drop-shadow-sm">The best from our kitchen</h2>
                </div>

                <div className="px-4 md:px-12">
                    <Swiper
                        modules={[Navigation, Pagination, A11y]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        loop={true}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                        className="pb-16 !overflow-visible"
                    // !overflow-visible allows generic shadows/scaling to not be clipped, be careful with x-scroll
                    >
                        {products.map((product) => (
                            <SwiperSlide key={product.id}>
                                <div className="flex flex-col   items-center group transition-transform duration-300 hover:scale-105">
                                    {/* Image Container - Transparent BG */}
                                    <div className="w-full aspect-[16/9] flex items-center justify-center p-4">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-contain filter drop-shadow-xl"
                                        />
                                    </div>

                                    {/* Card Content - Text Only, Transparent Card BG */}
                                    <div className="w-full p-4 text-white">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex gap-1 mb-2">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star key={star} className="w-4 h-4 fill-white text-white" />
                                                    ))}
                                                </div>
                                                <h3 className="text-2xl font-serif font-bold leading-tight mb-2 h-14 line-clamp-2">
                                                    {product.name}
                                                </h3>
                                                <p className="text-sm text-gray-100 mb-2 h-10 line-clamp-2 leading-snug opacity-90">
                                                    {product.description}
                                                </p>
                                                <p className="text-xl font-bold mb-4">{product.price}</p>
                                            </div>
                                        </div>

                                        <button className="w-full bg-white text-red-600 font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                                            <ShoppingBag className="w-4 h-4" />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Arrows (Bottom Center) */}
                    <div className="flex justify-center gap-8 mt-9 text-white/70">
                        <button className="swiper-button-prev-custom p-2 hover:text-white hover:scale-110 transition-all cursor-pointer">
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <button className="swiper-button-next-custom p-2 hover:text-white hover:scale-110 transition-all cursor-pointer">
                            <ArrowRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BestSellers;
