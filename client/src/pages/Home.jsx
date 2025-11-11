import React from "react";
import { MapPin, Clock, Coffee, Croissant, GlassWater } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-amber-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
            ☕ Fresh Brews & Flaky Pastries — Now in Hawthorne!
          </h1>
          <p className="text-xl text-amber-800 mb-8 max-w-3xl mx-auto">
            Welcome to Bake & Coffee, now open in the Crenshaw Village Plaza! Enjoy a cozy atmosphere, 
            handcrafted coffees, smoothies, and freshly baked pastries every day.
          </p>
          <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors">
            Visit Us Today
          </button>
          <p className="mt-6 text-amber-700 flex items-center justify-center gap-2">
            <MapPin size={18} /> 12742 Crenshaw Blvd, Hawthorne, CA | Open Daily
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-amber-900 mb-8">A Warm Welcome to Bake & Coffee</h2>
        <div className="bg-white rounded-2xl p-8 shadow-md">
          <p className="text-gray-700 text-lg mb-6">
            We're proud to celebrate the opening of Bake & Coffee's third location right here in the City of Hawthorne! 
            Our story is rooted in a love for community, quality ingredients, and the simple joy of good coffee shared with good company.
          </p>
          <p className="text-gray-700 text-lg">
            Whether you're starting your morning with a fresh croissant or taking an afternoon break with an iced latte, 
            Bake & Coffee is your neighborhood spot for comfort, flavor, and friendly faces.
          </p>
        </div>
      </section>

      {/* Menu Highlights Section */}
      <section className="bg-amber-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">Our Favorites</h2>
          <p className="text-center text-amber-800 text-lg mb-12 max-w-3xl mx-auto">
            From the first sip to the last bite, Bake & Coffee has something for everyone.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-amber-600 mb-4">
                <Croissant size={40} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-3">Pastries & Baked Goods</h3>
              <p className="text-gray-700">
                Croissants, bagels, muffins, danishes, and more — baked fresh daily.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-amber-600 mb-4">
                <Coffee size={40} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-3">Coffee & Beverages</h3>
              <p className="text-gray-700">
                Classic hot and iced coffees, espresso drinks, and seasonal specials.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-amber-600 mb-4">
                <GlassWater size={40} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-3">Smoothies</h3>
              <p className="text-gray-700">
                Refreshing fruit smoothies in a variety of delicious flavors.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors">
              View Full Menu
            </button>
          </div>
        </div>
      </section>

      {/* Location & Hours Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">Find Us</h2>
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <p className="text-lg text-gray-700 mb-6">
              We're conveniently located in Crenshaw Village Plaza — stop by on your way to work, 
              after school, or for a weekend treat!
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <MapPin className="text-amber-600" /> Address
                </h3>
                <p className="text-gray-700">12742 Crenshaw Blvd, Hawthorne, CA</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <Clock className="text-amber-600" /> Hours
                </h3>
                <div className="text-gray-700 space-y-1">
                  <p>Monday–Friday: 5:00 AM – 5:00 PM</p>
                  <p>Saturday–Sunday: 6:00 AM – 3:00 PM</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors">
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="bg-amber-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-900 mb-6">Proud to Be Part of Hawthorne</h2>
          <p className="text-lg text-amber-800 mb-8 max-w-3xl mx-auto">
            Bake & Coffee was welcomed into the City of Hawthorne with a special ribbon-cutting ceremony — 
            a sign of the growing support for local small businesses. We're excited to serve our neighbors 
            and continue building connections in this wonderful community.
          </p>
          <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors">
            Learn More About Our Story
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-amber-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Start Your Day the Bake & Coffee Way ☕</h2>
          <p className="text-xl text-amber-800 mb-8">
            Stop by for a pastry, grab a coffee, and taste the difference made fresh every day.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors">
              Order Ahead
            </button>
            <button className="bg-white hover:bg-gray-100 text-amber-700 font-bold py-3 px-8 rounded-full text-lg border border-amber-600 transition-colors">
              Visit Us Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
