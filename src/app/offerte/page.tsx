"use client";

import React from "react";
import PageIntroSection from "@/components/Layout/PageIntroSection/PageIntroSection";
import PartnerSection from "@/components/Layout/Partner/PartnerSection";
import AboutSection from "@/components/Layout/AboutSection/AboutSection";
import HowWeWorkSection from "@/components/Layout/HowWeWorkSection/HowWeWorkSection";
import type { ServiceCardProps } from "@/components/Layout/ServicesSection/ServicesSection";
import ServicesSection from "@/components/Layout/ServicesSection/ServicesSection";
import NewsletterSection from "@/components/Layout/NewsletterSection/NewsletterSection";

export default function AboutPage() {

    // Array delle service cards con percorsi corretti
  const serviceCards: ServiceCardProps[] = [
    {
      images: [
        { src: "/img/Services/industria-1.jpg", alt: "Industria 4.0 - Automazione" },
        { src: "/img/Services/industria-2.jpg", alt: "Industria 4.0 - IoT Systems" },
        { src: "/img/Services/industria-3.jpg", alt: "Industria 4.0 - Smart Factory" }
      ],
      title: "Industria 4.0",
      description: "Trasformazione digitale dei processi industriali attraverso tecnologie avanzate, automazione intelligente e sistemi IoT integrati.",
      buttonText: "Scopri le soluzioni",
      onButtonClick: () => {
        window.location.href = "/servizi/industria";
      }
    },
    {
      images: [
        { src: "/img/Services/comunicazione-1.jpg", alt: "Brand Strategy" },
        { src: "/img/Services/comunicazione-2.jpg", alt: "Digital Marketing" },
        { src: "/img/Services/comunicazione-3.jpg", alt: "Social Media Management" }
      ],
      title: "Brand & Comunicazione",
      description: "Strategie di comunicazione innovative che amplificano la presenza del brand e creano connessioni autentiche con il pubblico target.",
      buttonText: "Potenzia il brand",
      onButtonClick: () => {
        window.location.href = "/servizi/comunicazione";
      }
    },
    {
      images: [
        { src: "/img/Services/sicurezza-1.jpg", alt: "Cybersecurity" },
        { src: "/img/Services/sicurezza-2.jpg", alt: "Data Protection" },
        { src: "/img/Services/sicurezza-3.jpg", alt: "Risk Assessment" }
      ],
      title: "Sicurezza & Protezione",
      description: "Soluzioni di cybersecurity all'avanguardia per proteggere gli asset digitali e garantire la continuità operativa aziendale.",
      buttonText: "Proteggi l'azienda",
      onButtonClick: () => {
        window.location.href = "/servizi/sicurezza";
      }
    },
    {
      images: [
        { src: "/img/Services/formazione-1.jpg", alt: "Corporate Training" },
        { src: "/img/Services/formazione-2.jpg", alt: "Skill Development" },
        { src: "/img/Services/formazione-3.jpg", alt: "Leadership Program" }
      ],
      title: "Formazione Avanzata",
      description: "Programmi di training personalizzati che sviluppano competenze future-ready e accelerano la crescita professionale.",
      buttonText: "Investi nel team",
      onButtonClick: () => {
        window.location.href = "/servizi/formazione";
      }
    }
  ];

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

      {/* Hero section about */}
      <PageIntroSection
        subtitle="Le nostre offerte • Chi siamo • Come funziona"
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

      {/* Come Lavoriamo */}
      <HowWeWorkSection />

      {/* Servizi con il componente ottimizzato */}
      <ServicesSection
        title="I Nostri Servizi"
        description="Soluzioni innovative e personalizzate per trasformare il tuo business e guidarlo verso il successo nel mercato digitale di domani"
        cards={serviceCards}
      />

      {/* Newsletter */}
      <NewsletterSection />

    </main>
  );
}