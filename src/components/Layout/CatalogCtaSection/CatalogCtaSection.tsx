"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShoppingBag, Search } from 'lucide-react';
import Button from '@/components/ui/Base/Button';

interface CatalogCtaSectionProps {
  title?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  showFeatures?: boolean;
  className?: string;
}

const CatalogCtaSection: React.FC<CatalogCtaSectionProps> = ({
  title = "Scopri il nostro catalogo completo",
  description = "Migliaia di prodotti selezionati, personalizzabili e pronti per dare vita alle tue idee più creative",
  primaryCtaText = "Esplora il catalogo",
  primaryCtaHref = "/catalogo",
  secondaryCtaText = "Richiedi consulenza",
  secondaryCtaHref = "/contatti",
  onPrimaryClick,
  onSecondaryClick,
  showFeatures = true,
  className = ""
}) => {
  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    } else if (primaryCtaHref) {
      window.location.href = primaryCtaHref;
    }
  };

  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    } else if (secondaryCtaHref) {
      window.location.href = secondaryCtaHref;
    }
  };

  const features = [
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      text: "Oltre 10.000 prodotti disponibili"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      text: "Personalizzazione completa"
    },
    {
      icon: <Search className="w-5 h-5" />,
      text: "Ricerca avanzata per categoria"
    }
  ];

  return (
    <section className={`py-16 md:py-20 bg-gradient-to-br m-24 rounded-xl from-secondary via-secondary/90 to-secondary/80 overflow-hidden ${className}`}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>
        
        {/* Pattern Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 60 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-full w-2 h-2"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animation: `pulse 3s infinite ease-in-out`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-2"
          >
            <Sparkles className="w-4 h-4 text-white mr-2" />
            <span className="text-white text-sm font-medium">
              Catalogo Premium
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-regular text-black leading-tight"
          >
            {title}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-black/80 max-w-3xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>

          {/* Features List */}
          {showFeatures && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 pt-4"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-black/80">
                  <div className="p-1 bg-white/20 rounded-full">
                    {feature.icon}
                  </div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </motion.div>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <Button
              variant="primary"
              onClick={handlePrimaryClick}
              className="group px-8 py-4 text-base bg-black text-white hover:bg-black/90 border-black"
            >
              {primaryCtaText}
              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>

            <Button
              variant="primary"
              onClick={handleSecondaryClick}
              className="px-8 py-4 text-base bg-transparent text-black border-black/30 hover:bg-white/20 hover:border-black"
            >
              {secondaryCtaText}
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="pt-12 border-t border-white/20"
          >
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-heading font-bold text-black">24h</div>
                <div className="text-xs text-black/70 uppercase tracking-wider">Spedizione rapida</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-heading font-bold text-black">10K+</div>
                <div className="text-xs text-black/70 uppercase tracking-wider">Prodotti disponibili</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-heading font-bold text-black">99%</div>
                <div className="text-xs text-black/70 uppercase tracking-wider">Clienti soddisfatti</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CatalogCtaSection;