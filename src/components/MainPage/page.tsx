// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React from "react"; // Removed useState as it's not used in this component
import Hero from "./Hero";
import MainSection from "./MainSection";
import FeaturedSection from "./FeaturedSection";
import Textomonial from "./Textomonial";
// Removed Header and Footer imports as they are likely handled in a root layout or App.tsx
// If they are meant to be part of this page, they should be explicitly imported and rendered.

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header (assuming it's handled in App.tsx or a global layout) */}

      {/* Hero Section */}
      <Hero/>
      {/* Main Content */}
      <MainSection/>
      {/* Features Section */}
      <FeaturedSection/>
      {/* Testimonials */}
      <Textomonial/>
      {/* Footer (assuming it's handled in App.tsx or a global layout) */}
    </div>
  );
};
export default MainLayout;