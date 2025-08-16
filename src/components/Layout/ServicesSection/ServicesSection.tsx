"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../ui/Base/Button";

// Interfacce per il componente
export interface ServiceCardImage {
  src: string;
  alt: string;
}

export interface ServiceCardProps {
  images: ServiceCardImage[];
  title: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

export interface ServicesSectionProps {
  title: string;
  description: string;
  cards: ServiceCardProps[];
}

// Varianti di animazione con sovrapposizione perfetta
const imageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 15 : -15,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? -15 : 15,
    opacity: 0,
    scale: 1.05,
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

// Componente Card con Slider ottimizzato
const ServiceCard: React.FC<ServiceCardProps> = ({
  images,
  title,
  description,
  buttonText,
  onButtonClick,
  className = ""
}) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  // Calcola l'indice dell'immagine corrente
  const imageIndex = ((page % images.length) + images.length) % images.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // Auto-play semplificato
  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      paginate(1);
    }, 5000); // 5 secondi

    return () => clearInterval(interval);
  }, [page, images.length, isPaused]);

  const handleDotClick = (index: number) => {
    const newDirection = index > imageIndex ? 1 : -1;
    setPage([page + (index - imageIndex), newDirection]);
  };

  return (
    <div className={`group text-start ${className}`}>
      {/* Slider Container */}
      {images && images.length > 0 && (
        <div 
          className="relative mb-4 overflow-hidden rounded-2xl bg-gray-100"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Image Container */}
          <div className="relative h-64 w-full">
            
            {/* Framer Motion Image Slider con sovrapposizione fluida */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={page}
                src={images[imageIndex]?.src}
                alt={images[imageIndex]?.alt || title}
                className="absolute inset-0 w-full h-full object-cover"
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  x: { duration: 0.5 },
                  opacity: { duration: 0.6 },
                  scale: { duration: 0.6, ease: "easeOut" }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                whileHover={{ scale: 1.01 }}
                style={{ willChange: 'transform, opacity' }}
              />
            </AnimatePresence>

            {/* Gradient Overlay con z-index corretto */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
              style={{ zIndex: 10 }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Dots Navigation */}
            {images.length > 1 && (
              <div 
                className="absolute bottom-4 inset-x-0 flex justify-center"
                style={{ zIndex: 30 }}
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-xl rounded-full px-3 py-2 border border-white/20"
                >
                  {images.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`relative w-2 h-2 rounded-full transition-all duration-300 ${
                        index === imageIndex 
                          ? 'bg-white' 
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                      style={{ zIndex: 31 }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {/* Active dot glow effect */}
                      {index === imageIndex && (
                        <motion.div 
                          className="absolute inset-0 bg-white rounded-full"
                          style={{ zIndex: 32, opacity: 0.6 }}
                          initial={{ scale: 1 }}
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            )}

            {/* Image Counter con z-index corretto */}
            {images.length > 1 && (
              <motion.div 
                className="absolute top-4 right-4 bg-white/10 backdrop-blur-xl rounded-full px-3 py-1 border border-white/20 text-white text-xs font-medium"
                style={{ zIndex: 25 }}
                key={imageIndex}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {imageIndex + 1} / {images.length}
              </motion.div>
            )}

            {/* Swipe Indicator con z-index corretto */}
            <motion.div
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-xs"
              style={{ zIndex: 25 }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
            </motion.div>
          </div>
        </div>
      )}
      
      {/* Info generali */}
      <motion.div 
        className="text-sm text-primary uppercase font-sans font-bold mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Featured Project
      </motion.div>
      
      {/* Titolo */}
      <motion.h3 
        className="font-heading text-xl font-regular text-gray-900 mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {title}
      </motion.h3>
      
      {/* Descrizione */}
      {description && (
        <motion.p 
          className="font-sans text-sm text-gray-600 leading-relaxed mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {description}
        </motion.p>
      )}
      
      {/* Pulsante */}
      {buttonText && onButtonClick && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="primary"
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

// Componente principale
export const ServicesSection: React.FC<ServicesSectionProps> = ({
  title,
  description,
  cards
}) => {
  return (
    <section className="py-16 md:py-24 bg-white">
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
          <p className="text-md md:text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
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
              <ServiceCard
                {...card}
                className="w-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Demo Component
const ServicesDemo: React.FC = () => {
  const demoCards: ServiceCardProps[] = [
    {
      images: [
        { src: "/img/Services/industria-1.jpg", alt: "Industria 4.0 - Automazione" },
        { src: "/img/Services/industria-2.jpg", alt: "Industria 4.0 - IoT" },
        { src: "/img/Services/industria-3.jpg", alt: "Industria 4.0 - AI" }
      ],
      title: "Industria 4.0",
      description: "Trasformazione digitale dei processi industriali attraverso tecnologie avanzate, automazione intelligente e sistemi IoT integrati.",
      buttonText: "Scopri di più",
      onButtonClick: () => console.log("Industria 4.0 clicked")
    },
    {
      images: [
        { src: "/services/comunicazione-1.jpg", alt: "Brand Strategy" },
        { src: "/services/comunicazione-2.jpg", alt: "Digital Marketing" },
        { src: "/services/comunicazione-3.jpg", alt: "Social Media" }
      ],
      title: "Brand & Comunicazione",
      description: "Strategie di comunicazione innovative che amplificano la presenza del brand e creano connessioni autentiche con il target.",
      buttonText: "Esplora",
      onButtonClick: () => console.log("Comunicazione clicked")
    },
    {
      images: [
        { src: "/services/sicurezza-1.jpg", alt: "Cybersecurity" },
        { src: "/services/sicurezza-2.jpg", alt: "Data Protection" },
        { src: "/services/sicurezza-3.jpg", alt: "Risk Management" }
      ],
      title: "Sicurezza & Protezione",
      description: "Soluzioni di cybersecurity avanzate per proteggere gli asset digitali e garantire la continuità operativa dell'azienda.",
      buttonText: "Proteggi ora",
      onButtonClick: () => console.log("Sicurezza clicked")
    },
    {
      images: [
        { src: "/services/formazione-1.jpg", alt: "Corporate Training" },
        { src: "/services/formazione-2.jpg", alt: "Skill Development" },
        { src: "/services/formazione-3.jpg", alt: "Leadership" }
      ],
      title: "Formazione Avanzata",
      description: "Programmi di training personalizzati che sviluppano competenze future-ready e accelerano la crescita professionale.",
      buttonText: "Inizia ora",
      onButtonClick: () => console.log("Formazione clicked")
    }
  ];

  return (
    <ServicesSection
      title="I Nostri Servizi"
      description="Soluzioni innovative e personalizzate per trasformare il tuo business e guidarlo verso il successo nel mercato digitale"
      cards={demoCards}
    />
  );
};

export default ServicesDemo;