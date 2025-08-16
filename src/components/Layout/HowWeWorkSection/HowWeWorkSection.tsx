"use client";

import React, { useState } from 'react';
import { Plus } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: "primary" | "secondary";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ...rest
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md px-6 py-3 uppercase font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none group";

  const variantStyles =
    variant === "primary"
      ? "bg-primary text-white hover:brightness-95"
      : "bg-secondary text-white hover:brightness-95";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...rest}
    >
      {children}
      <Plus className="ms-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-45" />
    </button>
  );
};

const HowWeWorkSection: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const startAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setStep(0);
    setShowOverlay(false);
    
    // Tempo per vedere la situazione iniziale: 3 secondi
    const timer1 = setTimeout(() => setStep(1), 2000);
    
    // Tempo per High Vision e coordinamento: 3 secondi dopo il primo step
    const timer2 = setTimeout(() => setStep(2), 4000);
    
    // Tempo per l'ottimizzazione: 3 secondi dopo il secondo step
    const timer3 = setTimeout(() => setStep(3), 5000);
    
    // Mostra overlay dopo aver visto il risultato finale per 4 secondi (invece di 2)
    const overlayTimer = setTimeout(() => setShowOverlay(true), 10000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(overlayTimer);
    };
  };

  const closeOverlay = () => {
    setShowOverlay(false);
    setIsAnimating(false);
  };

  return (
    <section className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-regular text-primary mb-4 md:mb-6">
            Come Lavoriamo
          </h2>
          <p className="text-md md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Un processo semplice che trasforma la complessità in risultati concreti
          </p>
        </div>

        {/* Animation Control */}
        <div className="text-center mb-8">
          <Button 
            variant="secondary"
            onClick={startAnimation}
            disabled={isAnimating}
            className={`${
              isAnimating 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:scale-105'
            }`}
          >
            {isAnimating ? 'Animazione in corso...' : 'Avvia Animazione'}
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            Clicca per vedere come trasformiamo i processi frammentati (10 secondi)
          </p>
        </div>

        {/* Main Animation Container */}
        <div className="relative bg-gray-50 rounded-2xl overflow-hidden mb-12 md:mb-16">
          
          {/* Desktop Layout */}
          <div className="hidden lg:block px-8 py-12">
            <div className="grid grid-cols-5 gap-8 items-center min-h-[320px]">
              
              {/* Column 1: Multiple inputs */}
              <div className="flex flex-col justify-center space-y-4">
                <div className="text-xs text-gray-500 mb-2 text-center">PRIMA</div>
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col space-y-1">
                    <div
                      className={`h-3 bg-red-400 rounded transition-all duration-1000 ${
                        step >= 0 ? 'w-full opacity-100' : 'w-0 opacity-0'
                      } ${step >= 2 ? 'opacity-30' : ''}`}
                      style={{
                        transitionDelay: `${i * 200}ms`
                      }}
                    />
                    <span
                      className={`text-xs text-gray-600 transition-opacity duration-500 ${
                        step >= 0 && step < 2 ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{
                        transitionDelay: `${i * 200 + 500}ms`
                      }}
                    >
                      {['Fornitore A', 'Fornitore B', 'Fornitore C', 'Sistema D', 'Processo E'][i]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Column 2: Arrow */}
              <div className="flex justify-center">
                <div
                  className={`w-full h-1 bg-gray-300 transition-all duration-2000 ease-in-out ${
                    step >= 1 ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  }`}
                  style={{ transformOrigin: 'left' }}
                />
              </div>

              {/* Column 3: High Vision Filter */}
              <div className="flex flex-col items-center justify-center">
              <div className={`w-20 h-20 bg-gray-200 border border-gray-300 rounded-full flex items-center justify-center mx-auto transition-all duration-800 ${
                    step >= 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}>
                    <img 
                        src="/icons/logos/logo-primary.svg" 
                        alt="High Vision Logo" 
                        className="w-12 h-12 filter"
                    />
                </div>
                <div
                  className={`mt-4 text-sm text-gray-600 text-center transition-all duration-1000 ease-out ${
                    step >= 1 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                  }`}
                  style={{ transitionDelay: '800ms' }}
                >
                  High Vision
                </div>
              </div>

              {/* Column 4: Arrow */}
              <div className="flex justify-center">
                <div
                  className={`w-full h-1 bg-green-500 transition-all duration-2000 ease-in-out ${
                    step >= 2 ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  }`}
                  style={{ transformOrigin: 'left' }}
                />
              </div>

              {/* Column 5: Optimized output */}
              <div className="flex flex-col justify-center">
                <div className="text-xs text-gray-500 mb-2 text-center">DOPO</div>
                <div className="flex flex-col items-center space-y-3">
                  <div
                    className={`h-6 bg-green-500 rounded transition-all duration-2000 ease-out w-full ${
                      step >= 3 ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    }`}
                    style={{ transformOrigin: 'left' }}
                  />
                  <div
                    className={`text-sm text-gray-600 text-center transition-all duration-1000 ease-out ${
                      step >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                    }`}
                    style={{ transitionDelay: '600ms' }}
                  >
                    Risultato Ottimizzato
                  </div>
                  <div className="space-y-1">
                    {['Un interlocutore', 'Meno costi', 'Meno problemi'].map((benefit, i) => (
                      <div
                        key={i}
                        className={`text-xs text-green-600 text-center transition-all duration-1000 ease-out ${
                          step >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
                        }`}
                        style={{
                          transitionDelay: `${1000 + i * 300}ms`
                        }}
                      >
                        ✓ {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:block lg:hidden px-6 py-10">
            <div className="space-y-8">
              
              {/* Row 1: Inputs */}
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-4">PRIMA - Situazione Frammentata</div>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex flex-col items-center space-y-2">
                      <div
                        className={`h-3 w-20 bg-red-400 rounded transition-all duration-1000 ${
                          step >= 0 ? 'opacity-100' : 'opacity-0'
                        } ${step >= 2 ? 'opacity-30' : ''}`}
                        style={{
                          transitionDelay: `${i * 200}ms`
                        }}
                      />
                      <span
                        className={`text-xs text-gray-600 transition-opacity duration-500 ${
                          step >= 0 && step < 2 ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{
                          transitionDelay: `${i * 200 + 500}ms`
                        }}
                      >
                        {['Fornitore A', 'Fornitore B', 'Fornitore C', 'Sistema D', 'Processo E'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow down */}
              <div className="flex justify-center">
                <div
                  className={`w-1 h-12 bg-gray-300 transition-all duration-800 ${
                    step >= 1 ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>

              {/* Row 2: High Vision */}
              <div className="text-center">
              <div className={`w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto transition-all duration-800 ${
                    step >= 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}>
                    <img 
                        src="/icons/logos/logo-primary.svg" 
                        alt="High Vision Logo" 
                        className="w-12 h-12 filter brightness-0 invert"
                    />
                </div>
                <div
                  className={`mt-3 text-sm text-gray-600 transition-opacity duration-500 ${
                    step >= 1 ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  High Vision - Coordinamento
                </div>
              </div>

              {/* Arrow down */}
              <div className="flex justify-center">
                <div
                  className={`w-1 h-12 bg-green-500 transition-all duration-800 ${
                    step >= 2 ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>

              {/* Row 3: Output */}
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-4">DOPO - Sistema Ottimizzato</div>
                <div className="max-w-sm mx-auto">
                  <div
                    className={`h-6 bg-green-500 rounded mx-auto transition-all duration-1000 ${
                      step >= 3 ? 'w-32 opacity-100' : 'w-0 opacity-0'
                    }`}
                  />
                  <div
                    className={`mt-3 text-sm text-gray-600 transition-opacity duration-500 ${
                      step >= 3 ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    Risultato Ottimizzato
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-2">
                    {['✓ Più veloce', '✓ Meno costi', '✓ Maggiore qualità'].map((benefit, i) => (
                      <div
                        key={i}
                        className={`text-sm text-green-600 transition-all duration-500 ${
                          step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                        style={{
                          transitionDelay: `${1000 + i * 200}ms`
                        }}
                      >
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden px-4 py-8">
            <div className="space-y-6">
              
              {/* Step 1: Multiple inputs */}
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-3 font-medium">SITUAZIONE INIZIALE</div>
                <div className="space-y-3">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-center">
                      <div
                        className={`h-2 bg-red-400 rounded transition-all duration-1000 ${
                          step >= 0 ? 'w-16 opacity-100' : 'w-0 opacity-0'
                        } ${step >= 2 ? 'opacity-30' : ''}`}
                        style={{
                          transitionDelay: `${i * 300}ms`
                        }}
                      />
                      <span
                        className={`ml-2 text-xs text-gray-600 transition-opacity duration-500 ${
                          step >= 0 && step < 2 ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{
                          transitionDelay: `${i * 300 + 500}ms`
                        }}
                      >
                        {['Fornitore A', 'Fornitore B', 'Sistema C'][i]}
                      </span>
                    </div>
                  ))}
                  <div
                    className={`text-xs text-gray-500 transition-opacity duration-500 ${
                      step >= 0 && step < 2 ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    + Altri processi frammentati
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center py-2">
                <div
                  className={`w-0.5 h-8 bg-gray-400 transition-all duration-800 ${
                    step >= 1 ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>

              {/* Step 2: High Vision */}
              <div className="text-center">
                <div
                  className={`w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mx-auto transition-all duration-800 ${
                    step >= 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  }`}
                >
                  <span className="text-sm">HV</span>
                </div>
                <div
                  className={`mt-2 text-sm text-gray-600 transition-opacity duration-500 ${
                    step >= 1 ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  High Vision
                </div>
                <div
                  className={`mt-1 text-xs text-gray-500 transition-opacity duration-500 ${
                    step >= 1 ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  Coordinamento e ottimizzazione
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center py-2">
                <div
                  className={`w-0.5 h-8 bg-green-500 transition-all duration-800 ${
                    step >= 2 ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>

              {/* Step 3: Result */}
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-3 font-medium">RISULTATO</div>
                <div
                  className={`h-4 bg-green-500 rounded mx-auto transition-all duration-1000 ${
                    step >= 3 ? 'w-24 opacity-100' : 'w-0 opacity-0'
                  }`}
                />
                <div
                  className={`mt-2 text-sm text-gray-600 transition-opacity duration-500 ${
                    step >= 3 ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  Sistema Unificato
                </div>
                <div className="mt-3 space-y-1">
                  {['Più veloce', 'Meno costi', 'Maggiore qualità'].map((benefit, i) => (
                    <div
                      key={i}
                      className={`text-xs text-green-600 transition-all duration-500 ${
                        step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{
                        transitionDelay: `${800 + i * 200}ms`
                      }}
                    >
                      ✓ {benefit}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Status Text - Fixed positioning */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-t-lg shadow-lg">
              <div className="text-center">
                <span className="text-xs md:text-sm font-medium text-gray-700 block">
                  {step === 0 && !isAnimating && "Pronto per iniziare l'animazione"}
                  {step >= 0 && step < 3 && isAnimating && "Fase Iniziale: processi frammentati in trasformazione"}
                  {step === 3 && "Fase Finale: sistema unificato e performante"}
                </span>
              </div>
            </div>
          </div>

          {/* Overlay finale */}
          {showOverlay && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-md flex items-center justify-center p-6 rounded-2xl z-10 transition-all duration-1000 ease-out">
              <div className="text-center max-w-2xl mx-auto transform transition-all duration-1200 ease-out scale-100 opacity-100">
                <div className="mb-6">
                  <h3 className="text-3xl md:text-4xl font-heading text-gray-900 mb-6 transition-all duration-600 ease-out">
                    Questo è quello che facciamo
                  </h3>
                  <p className="text-md md:text-lg text-gray-700 mb-8 transition-all duration-800 ease-out">
                    Trasformiamo la complessità del tuo business in un sistema semplice, coordinato e performante. 
                    High Vision diventa il centro di controllo che allinea fornitori, processi e sistemi, 
                    garantendo risultati superiori con costi ridotti e tempi ottimizzati.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="secondary"
                    onClick={closeOverlay}
                    className="transform"
                  >
                    Chiudi la finestra
                  </Button>
                  <Button 
                    variant="primary"
                    className="transform"
                  >
                    Visita le offerte
                  </Button> 
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default HowWeWorkSection;