"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface ServiceOfferingImage {
  src: string;
  alt: string;
}

interface ServiceOfferingCard {
  images: ServiceOfferingImage[];
  title: string;
  description: string;
  onDetailsClick: () => void;
  className?: string;
}

interface ServiceOfferingsSectionProps {
  title?: string;
  description?: string;
  cards: ServiceOfferingCard[];
  className?: string;
}

const ServiceOfferingCard: React.FC<ServiceOfferingCard> = ({
  images,
  title,
  description,
  onDetailsClick,
  className = ""
}) => {
  const bg = images && images.length > 0 ? images[0] : { src: '', alt: '' };

  return (
    <motion.div
      className={`group relative rounded-xl overflow-hidden h-80 md:h-96 shadow-sm hover:shadow-xl transition-all duration-500 ${className}`}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      aria-label={bg.alt || title}
    >
      {/* Overlay gradient per leggibilità (come il carosello) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />

      {/* Contenuto overlay */}
      <div className="relative z-10 h-full p-6 flex flex-col justify-between text-white">
        <div>
          <span className="text-[11px] uppercase tracking-wide opacity-80">Servizio</span>
          <h3 className="text-2xl md:text-3xl font-semibold mt-1 max-w-[85%] leading-snug">{title}</h3>
          <p className="text-sm md:text-base opacity-90 mt-2 max-w-[70%] leading-relaxed">{description}</p>
        </div>

        {/* Pulsante circolare stile Apple (apre popup esistente) */}
        <button
          type="button"
          onClick={onDetailsClick}
          aria-label={`Apri dettagli ${title}`}
          className="group/btn absolute bottom-4 right-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 flex items-center justify-center transition"
        >
          <Plus className="w-5 h-5 md:w-6 md:h-6 text-black transition-transform duration-300 group-hover/btn:rotate-45" />
        </button>
      </div>
    </motion.div>
  );
};

// Componente principale
const ServiceOfferingsSection: React.FC<ServiceOfferingsSectionProps> = ({
  title = "Cosa offriamo",
  description = "Soluzioni complete e innovative per trasformare il tuo business",
  cards,
  className = ""
}) => {
  return (
    <section className={`py-16 md:py-24 bg-white ${className}`}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-regular text-primary mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-md md:text-lg text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
            >
              <ServiceOfferingCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceOfferingsSection;