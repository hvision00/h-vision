"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Base/Button';

interface ServiceIntroSectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  className?: string;
}

const ServiceIntroSection: React.FC<ServiceIntroSectionProps> = ({
  eyebrow,
  title,
  description,
  ctaText = "Scopri di più",
  ctaHref,
  onCtaClick,
  className = ""
}) => {
  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else if (ctaHref) {
      window.location.href = ctaHref;
    }
  };

  return (
    <section className={`relative py-20 md:py-28 bg-primary overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-white/3 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Eyebrow */}
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center border border-white/20 rounded-full px-6 py-2 backdrop-blur-sm"
            >
              <div className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></div>
              <span className="text-white/90 text-sm font-medium tracking-wide">
                {eyebrow}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-regular text-white leading-tight"
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-4"
          >
            <Button
              variant="secondary"
              onClick={handleCtaClick}
              className="px-8 py-4 text-base"
            >
              {ctaText}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceIntroSection;