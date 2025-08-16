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
    <section className="relative min-h-screen py-20 md:py-32 overflow-hidden" aria-labelledby="hero-title">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('/img/About/About-bg.jpg')`
        }}
        role="img"
        aria-label="High Vision team workspace"
      />

      {/* Overlay per contrasto */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Background Elements Geometrici - Stile PageIntroSection ma più elaborati */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/8 rounded-full opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/10 rounded-full opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/15 rounded-full opacity-60"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/20 rounded-full"></div>
        
        {/* Dots decorativi - Stile PageIntroSection */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-secondary/60 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-primary/60 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-2.5 h-2.5 bg-primary/50 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>

      {/* Content centrato - Stile PageIntroSection */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="space-y-10 md:space-y-14">
          
          {/* Badge - Stile PageIntroSection ma più elaborato */}
          <div>
            <div className="inline-flex items-center border border-white/20 rounded-md px-6 py-2 backdrop-blur-sm bg-white/10">
              <div className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-medium tracking-wide font-sans text-white/90">
                Innovation • Excellence • Results
              </span>
              <div className="w-2 h-2 bg-secondary rounded-full ml-3 animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>

          {/* Typography - Stile PageIntroSection ma più grande per homepage */}
          <div className="space-y-6 md:space-y-8">
            <h1 
              id="hero-title"
              className="font-heading font-normal leading-[0.9] tracking-tighter text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white"
            >
              {/* Split title per effetto gradiente su parole chiave */}
              {['Trasformiamo', 'Visioni', 'in', 'Realtà'].map((word, index) => {
                const isKeyword = ['Trasformiamo', 'Visioni', 'Realtà'].includes(word);
                
                return (
                  <React.Fragment key={index}>
                    {isKeyword ? (
                      <span className="relative">
                        <span className="text-secondary">
                          {word}
                        </span>
                      </span>
                    ) : (
                      <span>{word}</span>
                    )}
                    {index < 3 && ' '}
                  </React.Fragment>
                );
              })}
            </h1>
          </div>

          {/* Description - Stile PageIntroSection ma più dettagliata */}
          <div className="space-y-4">
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed font-light font-sans max-w-4xl mx-auto text-white/90">
              Guidiamo aziende innovative verso l'eccellenza attraverso soluzioni digitali su misura, 
              strategie vincenti e risultati concreti.
            </p>
            
            <p className="text-base md:text-lg leading-relaxed font-sans max-w-3xl mx-auto text-white/80">
              Da oltre 10 anni il partner strategico di scelta per aziende che vogliono fare la differenza nel mercato digitale.
            </p>
          </div>

          {/* CTA Section - Stile PageIntroSection ma con due button */}
          <div className="pt-4 md:pt-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="primary"
                onClick={handleCTAClick}
                className="px-12 py-4 text-base rounded-md focus:ring-2 focus:ring-primary focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 bg-white/20 border border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
              >
                Inizia il tuo progetto
              </Button>
              
              <Button
                variant="secondary"
                onClick={handleServicesClick}
                className="px-12 py-4 text-base rounded-md focus:ring-2 focus:ring-white focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 bg-transparent border border-white/50 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                Scopri i servizi
              </Button>
            </div>
          </div>

          {/* Trust Indicators - Aggiunta per homepage */}
          <div className="pt-8 md:pt-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                <span>+100 Progetti Completati</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <span>10+ Anni di Esperienza</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <span>Soddisfazione 98%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Aggiunta per homepage */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-white/60 font-sans tracking-wide">SCORRI PER ESPLORARE</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"></div>
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