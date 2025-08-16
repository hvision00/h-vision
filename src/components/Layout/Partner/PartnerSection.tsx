"use client";

import React from 'react';
import Image from 'next/image';

interface Partner {
  name: string;
  logoSrc: string;
  link?: string;
}

interface PartnerSectionProps {
  title: string;
  subtitle?: string;
  partners: Partner[];
}

const PartnerSection: React.FC<PartnerSectionProps> = ({
  title,
  subtitle,
  partners
}) => {
  return (
    <section className="py-14 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-xl md:text-2xl font-medium text-gray-600 mb-4">
            {title}
          </h2>
          
          {subtitle && (
            <p className="font-sans text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Partners Grid - 3 sopra e 3 sotto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center group"
            >
              {partner.link ? (
                <a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <PartnerLogo partner={partner} />
                </a>
              ) : (
                <PartnerLogo partner={partner} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Componente interno per il logo del partner
const PartnerLogo: React.FC<{ partner: Partner }> = ({ partner }) => {
  return (
    <div className="relative w-full h-16 flex items-center justify-center p-4 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-300 group-hover:scale-105">
      <Image
        src={partner.logoSrc}
        alt={`${partner.name} logo`}
        width={120}
        height={60}
        className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0"
      />
    </div>
  );
};

export default PartnerSection;