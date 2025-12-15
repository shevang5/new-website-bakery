import React, { useState } from 'react';
import { Box } from 'lucide-react'; // Using Box as a placeholder icon for the "triangle" logo

const categories = [
    { id: 1, name: 'Croissant Breakfast Sandwich', price: '$7.45', image: '/images/bgImg.jpg' },
    { id: 2, name: 'Breakfast Bagel Sandwich', price: '$7.45' },
    { id: 3, name: 'Croissant Sandwich', price: '$10.95' },
    { id: 4, name: 'Croissant Pastrami Sandwich', price: '$10.95' },
    { id: 5, name: 'Croissant Roast Beef Sandwich', price: '$10.95' },
    { id: 6, name: 'Turkey Bagel Sandwich', price: '$8.95' },
    { id: 7, name: 'Roasted Beef Bagel Sandwich', price: '$10.95' },
    { id: 8, name: 'Bagel with Cream Cheese', price: '$3.75' },
    // { id: 9, name: 'Bagel and Lox', price: '$9.95' },
    // { id: 10, name: 'Bagel Breakfast w Bacon', price: '$7.45' },
    // { id: 11, name: 'Bagel w Ham', price: '$7.45' },
    // { id: 12, name: 'Bagel w Sausage Links', price: '$7.45' },
];

const CategorySection = () => {
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <div className="py-20 bg-[#Fdf6ed]"> {/* Creamy background color similar to design */}
            <div className="text-center mb-16">
                <div className="flex justify-center mb-4">
                    {/* Simple geometric logo placeholder */}
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-0 h-0 border-l-[10px] border-l-transparent border-b-[15px] border-b-red-500 border-r-[10px] border-r-transparent"></div>
                        <div className="flex gap-1">
                            <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                            <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                        </div>
                    </div>
                </div>
                <h2 className="text-4xl font-serif font-medum text-gray-900">Shop By Categories</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 min-h-[600px] border-t border-gray-200">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="relative border-r border-b border-gray-200 aspect-square group cursor-pointer overflow-hidden transition-all duration-300"
                        onMouseEnter={() => setHoveredId(category.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        {/* Default Content */}
                        <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-opacity duration-300 z-10 ${hoveredId === category.id || category.hover ? 'opacity-0' : 'opacity-100'}`}>
                            <h3 className="text-2xl font-serif font-medium text-gray-900 mb-2 text-center">{category.name}</h3>
                            <span className="text-sm text-gray-600 uppercase tracking-wider">{category.count}</span>
                        </div>

                        {/* Hover Content (Image) */}
                        <div className={`absolute inset-0 bg-black/60 z-0 transition-opacity duration-500 ${hoveredId === category.id || category.hover ? 'opacity-100' : 'opacity-0'}`}>
                            {/* 
                   In a real scenario, each category would have its own image.
                   We are using the single available BG image as requested/placeholder.
                */}
                            <img
                                src="/images/bgImg.jpg"
                                alt={category.name}
                                className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white">
                                <h3 className="text-2xl font-serif font-bold mb-2 text-center shadow-black drop-shadow-lg">{category.name}</h3>
                                <span className="text-sm font-medium uppercase tracking-wider drop-shadow-md">{category.count}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategorySection;
