"use client";

import React from "react";
import Button from "@/components/ui/Base/Button";

interface PageIntroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

const PageIntroSection: React.FC<PageIntroSectionProps> = ({
  title,
  subtitle,
  description,
  buttonLabel,
  buttonHref,
  imageSrc,
  imageAlt,
  className = ""
}) => {
  const handleButtonClick = () => {
    if (!buttonHref) return;
    
    if (buttonHref.startsWith('http') || buttonHref.startsWith('https')) {
      window.open(buttonHref, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = buttonHref;
    }
  };

  return (
    <section 
      className={`relative py-14 md:py-20 overflow-hidden ${className}`}
      aria-labelledby="page-intro-title"
    >
      {/* Background Image */}
      {imageSrc && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: `url(${imageSrc})`
          }}
          role="img"
          aria-label={imageAlt || "Background image"}
        />
      )}

      {/* Overlay per contrasto */}
      {imageSrc && (
        <div className="absolute inset-0 bg-black/50"></div>
      )}

      {/* Background Elements Geometrici - Centrati */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/10 rounded-full opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/15 rounded-full opacity-60"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/20 rounded-full"></div>
        
        {/* Dots decorativi */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-secondary/60 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-primary/60 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Content centrato */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="space-y-10">
          
          {/* Avant-garde Badge */}
          {subtitle && (
            <div>
              <div className="inline-flex items-center border border-white/20 rounded-md px-6 py-2 backdrop-blur-sm bg-white/10">
                <div className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></div>
                <span className={`text-sm font-medium tracking-wide font-sans ${imageSrc ? 'text-white/90' : 'text-black/80'}`}>
                  {subtitle}
                </span>
              </div>
            </div>
          )}

          {/* Revolutionary Typography */}
          <div className="space-y-6 md:space-y-8">
            <h1 
              id="page-intro-title"
              className={`
                font-heading font-normal leading-[0.9] tracking-tighter
                text-5xl md:text-7xl lg:text-8xl xl:text-9xl
                ${imageSrc ? 'text-white' : 'text-gray-800'}
              `}
            >
              {/* Split title per effetto gradiente su parole chiave */}
              {title.split(' ').map((word, index) => {
                const isKeyword = ['innovatori', 'professionali', 'trasformiamo', 'concrete', 'eccellenza'].some(
                  keyword => word.toLowerCase().includes(keyword.toLowerCase())
                );
                
                return (
                  <React.Fragment key={index}>
                    {isKeyword ? (
                      <span className="relative">
                        <span className={`${imageSrc ? 'text-secondary' : 'bg-clip-text text-primary'}`}>
                          {word}
                        </span>
                        {!imageSrc && (
                          <div className="absolute inset-0 bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent blur-lg opacity-30 pointer-events-none"></div>
                        )}
                      </span>
                    ) : (
                      <span>{word}</span>
                    )}
                    {index < title.split(' ').length - 1 && ' '}
                  </React.Fragment>
                );
              })}
            </h1>
          </div>

          {/* Description */}
          {description && (
            <div>
              <p className={`
                text-lg md:text-xl lg:text-2xl leading-relaxed font-light font-sans
                max-w-4xl mx-auto
                ${imageSrc ? 'text-white/90' : 'text-black/70'}
              `}>
                {description}
              </p>
            </div>
          )}

          {/* Premium CTA Section */}
          {buttonLabel && (
            <div className="pt-4 md:pt-8">
              <Button
                variant="primary"
                onClick={handleButtonClick}
                className={`
                  px-12 py-4 text-base rounded-md focus:ring-2 focus:ring-primary focus:ring-offset-2 
                  transform hover:scale-105 transition-all duration-200
                  ${imageSrc ? 'bg-white/20 border border-white/30 text-white hover:bg-white/30 backdrop-blur-sm' : ''}
                `}
                aria-describedby={description ? "page-intro-title" : undefined}
              >
                {buttonLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageIntroSection;