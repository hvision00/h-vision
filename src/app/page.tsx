"use client";

import React from "react";
import Button from "@/components/ui/Base/Button";
import PartnerSection from "@/components/Layout/Partner/PartnerSection";
import ProductsCarousel from "@/components/Layout/ProductsCarousel/ProductsCarousel";
import AboutSection from "@/components/Layout/AboutSection/AboutSection";
import ServicesSection from "@/components/Layout/ServicesSection/ServicesSection";
import NewsletterSection from "@/components/Layout/NewsletterSection/NewsletterSection";

// Hero Section Component - Versione avanzata per homepage
const HeroSection: React.FC = () => {
  const handleCTAClick = () => {
    // Scroll to contact or navigate to contact page
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/contact';
    }
  };

  const handleServicesClick = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/services';
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
      
      {/* Background Elements Geometrici Avanzati */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"></div>
        
        {/* Geometric Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>
        
        {/* Floating Dots */}
        <div className="absolute top-32 left-1/4 w-3 h-3 bg-primary/40 rounded-full animate-bounce"></div>
        <div className="absolute top-48 right-1/3 w-2 h-2 bg-secondary/60 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-4 h-4 bg-primary/30 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-32 right-1/4 w-2.5 h-2.5 bg-secondary/50 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
        
        {/* Concentric Circles */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/10 rounded-full opacity-60"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/15 rounded-full opacity-80"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary/20 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="space-y-12 md:space-y-16">
          
          {/* Premium Badge */}
          <div className="inline-flex items-center border border-primary/20 rounded-full px-8 py-3 backdrop-blur-sm bg-white/80 shadow-lg">
            <div className="w-3 h-3 bg-primary rounded-full mr-4 animate-pulse"></div>
            <span className="text-sm font-medium tracking-wide font-sans text-gray-700 uppercase">
              Innovation • Excellence • Results
            </span>
            <div className="w-3 h-3 bg-secondary rounded-full ml-4 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          {/* Revolutionary Typography */}
          <div className="space-y-8 md:space-y-12">
            <h1 className="font-heading font-normal leading-[0.85] tracking-tighter text-6xl md:text-8xl lg:text-9xl xl:text-[12rem]">
              <span className="block text-gray-800">Trasformiamo</span>
              <span className="block">
                <span className="relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-600 to-secondary">
                    Visioni
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent blur-lg opacity-30 pointer-events-none"></div>
                </span>
              </span>
              <span className="block text-gray-800">in</span>
              <span className="block">
                <span className="relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-yellow-500 to-primary">
                    Realtà
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary via-yellow-500 to-primary bg-clip-text text-transparent blur-lg opacity-30 pointer-events-none"></div>
                </span>
              </span>
            </h1>
          </div>

          {/* Enhanced Description */}
          <div className="space-y-6">
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-light font-sans max-w-5xl mx-auto text-gray-600">
              Guidiamo aziende innovative verso l'eccellenza attraverso 
              <span className="text-primary font-medium"> soluzioni digitali su misura</span>, 
              <span className="text-secondary font-medium"> strategie vincenti</span> e 
              <span className="text-primary font-medium"> risultati concreti</span>.
            </p>
            
            <p className="text-lg md:text-xl leading-relaxed font-sans max-w-4xl mx-auto text-gray-500">
              Da oltre 10 anni il partner strategico di scelta per aziende che vogliono fare la differenza nel mercato digitale.
            </p>
          </div>

          {/* Advanced CTA Section */}
          <div className="pt-8 md:pt-12">
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Button
                variant="primary"
                onClick={handleCTAClick}
                className="px-12 py-5 text-lg rounded-full focus:ring-2 focus:ring-primary focus:ring-offset-2 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-primary/25"
              >
                Inizia il tuo progetto
              </Button>
              
              <Button
                variant="secondary"
                onClick={handleServicesClick}
                className="px-12 py-5 text-lg rounded-full border-2 border-gray-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-gray-400 text-gray-700 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Scopri i servizi
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>+100 Progetti Completati</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>10+ Anni di Esperienza</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Soddisfazione 98%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-gray-400 font-sans tracking-wide">SCORRI PER ESPLORARE</span>
          <div className="w-px h-8 bg-gradient-to-b from-gray-400 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  // Dati partner
  const partners = [
    {
      name: "TechCorp",
      logoSrc: "/icons/partner/logo-VFGroup.png",
    },
    {
      name: "InnovateX", 
      logoSrc: "/icons/partner/logo-Fermec.gif",
    },
    {
      name: "DigitalFlow",
      logoSrc: "/icons/partner/logo-Beta.png",
    },
    {
      name: "CloudVision",
      logoSrc: "/icons/partner/logo-Dewalt.png",
    },
    {
      name: "DataSync",
      logoSrc: "/icons/partner/logo-Fami.webp",
    },
    {
      name: "FutureLink",
      logoSrc: "/icons/partner/logo-Fervi.png",
    }
  ];

  return (
    <main className="">
      {/* Hero Section Avanzata */}
      <HeroSection />

      {/* Partner Section */}
      <PartnerSection 
        title="Trusted by Industry Leaders"
        subtitle="Collaboriamo con le aziende più innovative del settore"
        partners={partners}
      />

      {/* Products Carousel */}
      <ProductsCarousel />

      {/* About Section */}
      <AboutSection
        quote="Dove l'innovazione incontra l'eccellenza"
        title="High Vision è il partner strategico che guida le aziende verso risultati straordinari attraverso soluzioni digitali innovative e strategie su misura"
        buttonLabel="La nostra storia"
        buttonHref="/about"
        backgroundImage="/img/About/About-bg.jpg"
      />

      {/* Services Section */}
      <ServicesSection />

      {/* Newsletter Section */}
      <NewsletterSection />
    </main>
  );
}