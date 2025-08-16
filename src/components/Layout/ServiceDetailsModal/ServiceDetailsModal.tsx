"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowDown } from 'lucide-react';

interface ServiceDetail {
  title: string;
  description: string;
  features?: string[];
  benefits?: string[];
  imageSrc?: string;
  imageAlt?: string;
}

interface ServiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
  details: ServiceDetail[];
  className?: string;
}

// Memoized animation variants for performance
const ANIMATION_VARIANTS = {
  backdrop: {
    initial: { 
      backdropFilter: 'blur(0px) brightness(100%)',
      backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    animate: { 
      backdropFilter: 'blur(24px) brightness(70%)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    exit: { 
      backdropFilter: 'blur(0px) brightness(100%)',
      backgroundColor: 'rgba(255, 255, 255, 0)'
    }
  },
  modal: {
    initial: { 
      scale: 0.85, 
      opacity: 0,
      y: 40,
      rotateX: 8
    },
    animate: { 
      scale: 1, 
      opacity: 1,
      y: 0,
      rotateX: 0
    },
    exit: { 
      scale: 0.9, 
      opacity: 0,
      y: 20,
      rotateX: 4
    }
  },
  content: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 }
  },
  listItem: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 }
  }
} as const;

// Optimized transition configs
const TRANSITIONS = {
  fast: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  medium: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  slow: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  perspective: { duration: 0.8, ease: [0.23, 1, 0.32, 1] }
} as const;

// Memoized header styles for performance
const createHeaderStyles = (scrolled: boolean) => ({
  background: scrolled 
    ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 70%, transparent 100%)' 
    : 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, transparent 100%)',
  backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(8px)',
  opacity: scrolled ? 0.95 : 1,
  transform: scrolled ? 'translateY(-2px)' : 'translateY(0px)'
});

// Memoized container styles for performance
const CONTAINER_STYLES = {
  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)',
  backdropFilter: 'blur(40px) saturate(200%)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: `
    0 32px 64px -12px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.02)
  `
};

const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({
  isOpen,
  onClose,
  serviceTitle,
  details,
  className = ""
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const [currentSection, setCurrentSection] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // Memoized header styles
  const headerStyles = useMemo(() => createHeaderStyles(scrolled), [scrolled]);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      if (contentRef.current) {
        const scrollTop = contentRef.current.scrollTop;
        const newScrolled = scrollTop > 50;
        if (newScrolled !== scrolled) {
          setScrolled(newScrolled);
        }
      }
    }, 16); // ~60fps throttling
  }, [scrolled]);

  // Optimized scroll setup
  useEffect(() => {
    if (!isOpen) return;
    
    const container = contentRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        container.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, [isOpen, handleScroll]);

  // Optimized keyboard handler
  useEffect(() => {
    if (!isOpen) return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey, { passive: false });
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Optimized backdrop click handler
  const handleBackdropClick = useCallback((event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }, [onClose]);

  // Optimized scroll to next section
  const scrollToNext = useCallback(() => {
    if (contentRef.current && currentSection < details.length - 1) {
      const nextSection = contentRef.current.children[currentSection + 1] as HTMLElement;
      nextSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setCurrentSection(prev => prev + 1);
    }
  }, [currentSection, details.length]);

  // Optimized contact handler
  const handleContactClick = useCallback(() => {
    window.location.href = '/contatti';
  }, []);

  // Early return if not open
  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        variants={ANIMATION_VARIANTS.backdrop}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={TRANSITIONS.medium}
        onClick={handleBackdropClick}
      >
        {/* Ultra-minimal backdrop */}
        <motion.div
          className="absolute inset-0"
          variants={ANIMATION_VARIANTS.backdrop}
          transition={TRANSITIONS.medium}
        />

        {/* Floating modal container */}
        <motion.div
          ref={modalRef}
          className={`relative w-[95vw] max-w-4xl h-[92vh] ${className}`}
          variants={ANIMATION_VARIANTS.modal}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            ...TRANSITIONS.slow,
            rotateX: TRANSITIONS.perspective
          }}
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Ultra-clean glass container */}
          <div 
            className="w-full h-full rounded-3xl overflow-hidden shadow-2xl"
            style={CONTAINER_STYLES}
          >
            {/* Floating header */}
            <div 
              className="absolute top-0 left-0 right-0 z-30 px-8 py-6 transition-all duration-300 will-change-transform"
              style={headerStyles}
            >
              <div className="flex items-start justify-between">
                <motion.div
                  variants={ANIMATION_VARIANTS.content}
                  initial="initial"
                  animate="animate"
                  transition={{ ...TRANSITIONS.medium, delay: 0.3 }}
                >
                  {/* Micro badge */}
                  <div className="inline-flex items-center mb-4">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                    <span className="text-xs text-primary/80 font-medium uppercase tracking-[0.15em]">
                      Specifiche
                    </span>
                  </div>
                  
                  <h1 className="text-3xl font-heading font-light text-foreground leading-tight tracking-tight">
                    {serviceTitle}
                  </h1>
                </motion.div>
                
                {/* Minimal close button */}
                <motion.button
                  onClick={onClose}
                  initial={{ opacity: 0, scale: 0.8, rotate: 90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ ...TRANSITIONS.fast, delay: 0.5 }}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 will-change-transform"
                  aria-label="Chiudi"
                >
                  <X className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                </motion.button>
              </div>
            </div>

            {/* Scrollable content area */}
            <div 
              ref={contentRef}
              className="h-full overflow-y-auto pt-24 pb-8 will-change-scroll"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {/* Content sections */}
              <div className="px-8 space-y-24">
                {details.map((detail, index) => (
                  <motion.section
                    key={index}
                    variants={ANIMATION_VARIANTS.content}
                    initial="initial"
                    animate="animate"
                    transition={{ 
                      ...TRANSITIONS.slow, 
                      delay: 0.5 + index * 0.2
                    }}
                    className="group"
                  >
                    {/* Hero image with optimized loading */}
                    {detail.imageSrc && (
                      <motion.div 
                        className="relative w-full h-72 mb-12 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
                        whileInView={{ scale: 1.02 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        <motion.img
                          src={detail.imageSrc}
                          alt={detail.imageAlt || detail.title}
                          className="w-full h-full object-cover will-change-transform"
                          loading={index === 0 ? "eager" : "lazy"}
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      </motion.div>
                    )}

                    {/* Content area */}
                    <div className="space-y-8">
                      {/* Title and description */}
                      <div className="space-y-6">
                        <motion.h2 
                          className="text-2xl font-heading font-light text-foreground tracking-tight"
                          variants={ANIMATION_VARIANTS.content}
                          transition={{ ...TRANSITIONS.medium, delay: 0.8 + index * 0.1 }}
                        >
                          {detail.title}
                        </motion.h2>
                        
                        <motion.p 
                          className="text-lg text-gray-600 leading-relaxed font-light max-w-3xl"
                          variants={ANIMATION_VARIANTS.content}
                          transition={{ ...TRANSITIONS.medium, delay: 0.9 + index * 0.1 }}
                        >
                          {detail.description}
                        </motion.p>
                      </div>

                      {/* Features and Benefits - Optimized rendering */}
                      {(detail.features || detail.benefits) && (
                        <motion.div 
                          className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8"
                          variants={ANIMATION_VARIANTS.content}
                          transition={{ ...TRANSITIONS.slow, delay: 1 + index * 0.1 }}
                        >
                          
                          {/* Features */}
                          {detail.features && detail.features.length > 0 && (
                            <div className="space-y-6">
                              <div className="flex items-center gap-3">
                                <div className="w-1 h-6 bg-primary rounded-full"></div>
                                <h3 className="text-lg font-heading font-medium text-foreground">
                                  Caratteristiche
                                </h3>
                              </div>
                              
                              <div className="space-y-4 pl-4">
                                {detail.features.map((feature, featureIndex) => (
                                  <motion.div
                                    key={featureIndex}
                                    variants={ANIMATION_VARIANTS.listItem}
                                    transition={{ 
                                      ...TRANSITIONS.fast, 
                                      delay: 1.2 + index * 0.1 + featureIndex * 0.05 
                                    }}
                                    className="flex items-start gap-4 text-gray-600 group/item"
                                  >
                                    <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-2.5 flex-shrink-0 group-hover/item:bg-primary transition-colors duration-300"></div>
                                    <span className="font-light leading-relaxed group-hover/item:text-gray-800 transition-colors duration-300">
                                      {feature}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Benefits */}
                          {detail.benefits && detail.benefits.length > 0 && (
                            <div className="space-y-6">
                              <div className="flex items-center gap-3">
                                <div className="w-1 h-6 bg-secondary rounded-full"></div>
                                <h3 className="text-lg font-heading font-medium text-foreground">
                                  Vantaggi
                                </h3>
                              </div>
                              
                              <div className="space-y-4 pl-4">
                                {detail.benefits.map((benefit, benefitIndex) => (
                                  <motion.div
                                    key={benefitIndex}
                                    variants={ANIMATION_VARIANTS.listItem}
                                    transition={{ 
                                      ...TRANSITIONS.fast, 
                                      delay: 1.3 + index * 0.1 + benefitIndex * 0.05 
                                    }}
                                    className="flex items-start gap-4 text-gray-600 group/item"
                                  >
                                    <div className="w-1.5 h-1.5 bg-secondary/60 rounded-full mt-2.5 flex-shrink-0 group-hover/item:bg-secondary transition-colors duration-300"></div>
                                    <span className="font-light leading-relaxed group-hover/item:text-gray-800 transition-colors duration-300">
                                      {benefit}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>

                    {/* Subtle section divider */}
                    {index < details.length - 1 && (
                      <motion.div 
                        className="flex justify-center pt-16"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ ...TRANSITIONS.medium, delay: 1.5 + index * 0.1 }}
                      >
                        <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                      </motion.div>
                    )}
                  </motion.section>
                ))}

                {/* Final CTA area */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...TRANSITIONS.slow, delay: 1.8 }}
                  className="text-center py-16 space-y-6"
                >
                  <p className="text-gray-500 font-light">
                    Desideri approfondire questo servizio?
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 group will-change-transform"
                    onClick={handleContactClick}
                  >
                    Richiedi consulenza
                    <div className="w-1 h-1 bg-white rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  </motion.button>
                </motion.div>
              </div>
            </div>

            {/* Scroll indicator - conditional render for performance */}
            {currentSection < details.length - 1 && (
              <motion.button
                onClick={scrollToNext}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...TRANSITIONS.medium, delay: 2 }}
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white/90 transition-all duration-300 group will-change-transform"
                aria-label="Scorri al prossimo contenuto"
              >
                <ArrowDown className="w-4 h-4 text-gray-600 group-hover:text-gray-800 animate-bounce" strokeWidth={1.5} />
              </motion.button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ServiceDetailsModal;