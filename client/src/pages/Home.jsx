import React from "react";
import HeroSection from "../components/ui/components/HeroSection";
import ProductHighlights from "../components/ui/components/ProductHighlights";
import BakingArtSection from "../components/ui/components/BakingArtSection";
import SpecialItemsSection from "../components/ui/components/SpecialItemsSection";
import FooterSection from "../components/ui/components/FooterSection";

const Home = () => {
  return (
    <main className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <HeroSection />
        <ProductHighlights />
        <BakingArtSection />
        <SpecialItemsSection />
        <FooterSection />
      </div>
    </main>
  );
};

export default Home;
