"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Award, Shield, Users, Zap } from 'lucide-react';

interface WhyChooseUsItem {
  icon?: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
}

interface WhyChooseUsSectionProps {
  title?: string;
  description?: string;
  items: WhyChooseUsItem[];
  className?: string;
}

// Icone di default
const defaultIcons = {
  quality: <Award className="w-6 h-6" />,
  experience: <Star className="w-6 h-6" />,
  security: <Shield className="w-6 h-6" />,
  support: <Users className="w-6 h-6" />,
  innovation: <Zap className="w-6 h-6" />,
  reliability: <Check className="w-6 h-6" />
};

const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({
  title = "Perché scegliere High Vision",
  description = "La combinazione perfetta di esperienza, innovazione e risultati concreti per il successo del tuo business",
  items,
  className = ""
}) => {
  return (
    <section className={`py-16 md:py-24 bg-gray-50 ${className}`}>
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

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="group"
            >
              {/* Card */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group-hover:border-primary/20 h-full">
                
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {item.icon || defaultIcons.quality}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-heading font-regular text-foreground group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Highlight */}
                  {item.highlight && (
                    <div className="pt-2">
                      <span className="inline-flex items-center bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                        <Star className="w-4 h-4 mr-2" />
                        {item.highlight}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-12 border-t border-gray-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-heading font-regular text-primary">10+</div>
              <div className="text-sm text-gray-600 uppercase tracking-wider">Anni di esperienza</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-heading font-regular text-primary">500+</div>
              <div className="text-sm text-gray-600 uppercase tracking-wider">Progetti completati</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-heading font-regular text-primary">99%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wider">Clienti soddisfatti</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-heading font-regular text-primary">24/7</div>
              <div className="text-sm text-gray-600 uppercase tracking-wider">Supporto attivo</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;