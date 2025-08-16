"use client";

import React from "react";
import PageIntroSection from "@/components/Layout/PageIntroSection/PageIntroSection";
import PartnerSection from "@/components/Layout/Partner/PartnerSection";
import ProductsCarousel from '@/components/Layout/ProductsCarousel/ProductsCarousel';
import ConceptFlowSection from '@/components/Layout/ConceptFlowSection/ConceptFlowSection';
import AboutSection from "@/components/Layout/AboutSection/AboutSection";

export default function AboutPage() {
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
    <>
      {/* Hero section about */}
      <PageIntroSection
        subtitle="La nostra storia • Chi siamo • Come funziona"
        title="Innovatori per passione, professionisti per scelta"
        description="Da oltre 10 anni guidiamo aziende verso l'eccellenza attraverso tecnologie innovative e strategie su misura."
        buttonLabel="Scopri il team"
        buttonHref="/team"
        imageSrc="/img/about/about-bg.jpg"
        imageAlt="Il team di High Vision nel nostro ufficio"
      />

      {/* Partner section */}
      <PartnerSection 
        title="Collaborazioni che valgono molto di più"
        partners={partners}
      />

      {/* Products Carousel */}
      <ProductsCarousel />

      {/* Concept Flow Section */}
      <ConceptFlowSection />

      {/* Chi Siamo */}
      <AboutSection
        quote="Trasformare la complessità in semplicità"
        title="High Vision è il partner strategico che guida le aziende verso l'eccellenza operativa attraverso soluzioni innovative e risultati misurabili"
        buttonLabel="Scopri di più"
        buttonHref="/contact"
        backgroundImage="/img/About/About-bg.jpg"
      />

    </>
  );
}