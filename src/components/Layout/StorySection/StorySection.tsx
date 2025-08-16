"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StoryStep {
  id: number;
  era: string;
  title: string;
  concept: string;
  description: string;
  color: string;
  bgGradient: string;
}

const storySteps: StoryStep[] = [
  {
    id: 1,
    era: "COMPLESSITÀ",
    title: "Il mondo si è complicato",
    concept: "Processi frammentati, tecnologie isolate, comunicazione dispersa",
    description: "Le aziende si trovano intrappolate in un labirinto di sistemi che non comunicano tra loro.",
    color: "#dc2626",
    bgGradient: "from-red-50 to-red-100"
  },
  {
    id: 2,
    era: "TRASFORMAZIONE", 
    title: "L'innovazione è necessaria",
    concept: "Serve un ponte tra passato e futuro, tra analogico e digitale",
    description: "Non basta adottare nuove tecnologie; serve una strategia che unifichi e semplifichi.",
    color: "#ea580c",
    bgGradient: "from-orange-50 to-orange-100"
  },
  {
    id: 3,
    era: "UNIFICAZIONE",
    title: "La visione diventa reale",
    concept: "Un ecosistema coerente dove ogni elemento lavora in armonia",
    description: "High Vision coordina, integra e ottimizza ogni aspetto del business digitale.",
    color: "#3672e0",
    bgGradient: "from-blue-50 to-blue-100"
  },
  {
    id: 4,
    era: "ECCELLENZA",
    title: "Il futuro è già qui",
    concept: "Risultati superiori, processi fluidi, crescita sostenibile",
    description: "Le aziende che collaborano con noi non si limitano a sopravvivere: prosperano.",
    color: "#16a34a",
    bgGradient: "from-green-50 to-green-100"
  }
];

const StorySection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Auto-play dell'animazione
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % storySteps.length);
      }, 4000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  // Intersection Observer per avviare l'animazione
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsPlaying(true);
          } else {
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.6 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    setIsPlaying(false);
    
    // Riavvia l'auto-play dopo 2 secondi
    setTimeout(() => {
      setIsPlaying(true);
    }, 2000);
  };

  const currentStepData = storySteps[currentStep];

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="text-sm font-medium text-gray-500 tracking-wider uppercase mb-4 block">
              La nostra storia
            </span>
            <h2 className="font-heading text-4xl lg:text-5xl text-primary mb-6">
              L&apos;evoluzione del business digitale
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Quattro concetti che definiscono il nostro approccio e la nostra missione
            </p>
          </div>
        </div>

        {/* Story Container principale */}
        <div className="relative max-w-6xl mx-auto">
          
          {/* Timeline Navigation */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-4">
              {storySteps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(index)}
                  className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-500 ${
                    index === currentStep
                      ? 'text-white shadow-lg scale-105'
                      : 'text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200'
                  }`}
                  style={{
                    backgroundColor: index === currentStep ? currentStepData.color : undefined
                  }}
                >
                  {step.era}
                  
                  {/* Progress indicator */}
                  {index === currentStep && isPlaying && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-white/30"
                      initial={{ scale: 1 }}
                      animate={{ scale: 1.1 }}
                      transition={{
                        duration: 4,
                        ease: "linear",
                        repeat: Infinity
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Card */}
          <div className="relative min-h-[500px] perspective-1000">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94] 
                }}
                className={`relative bg-gradient-to-br ${currentStepData.bgGradient} rounded-3xl p-12 lg:p-16 shadow-2xl transform-gpu`}
                style={{
                  transformStyle: 'preserve-3d'
                }}
              >
                
                {/* Decorative Elements */}
                <div className="absolute top-6 right-6 opacity-10">
                  <div 
                    className="w-32 h-32 rounded-full"
                    style={{ backgroundColor: currentStepData.color }}
                  />
                </div>
                
                <div className="absolute bottom-6 left-6 opacity-5">
                  <div 
                    className="w-24 h-24 rounded-full"
                    style={{ backgroundColor: currentStepData.color }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <span 
                      className="inline-block px-4 py-2 rounded-full text-white text-sm font-semibold mb-6"
                      style={{ backgroundColor: currentStepData.color }}
                    >
                      {currentStepData.era}
                    </span>
                    
                    <h3 className="font-heading text-3xl lg:text-4xl text-gray-900 mb-6">
                      {currentStepData.title}
                    </h3>
                    
                    <p 
                      className="text-xl lg:text-2xl font-medium mb-8 leading-relaxed"
                      style={{ color: currentStepData.color }}
                    >
                      {currentStepData.concept}
                    </p>
                    
                    <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
                      {currentStepData.description}
                    </p>
                  </motion.div>
                </div>

                {/* Morphing Visual Element */}
                <div className="absolute right-12 top-1/2 transform -translate-y-1/2 hidden lg:block">
                  <motion.div
                    className="relative w-40 h-40"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      ease: "linear",
                      repeat: Infinity
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-20"
                      style={{ backgroundColor: currentStepData.color }}
                      animate={{
                        borderRadius: ["25%", "50%", "25%"],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 4,
                        ease: "easeInOut",
                        repeat: Infinity
                      }}
                    />
                    
                    <motion.div
                      className="absolute inset-4 rounded-2xl opacity-30"
                      style={{ backgroundColor: currentStepData.color }}
                      animate={{
                        borderRadius: ["50%", "25%", "50%"],
                        scale: [1.1, 1, 1.1],
                      }}
                      transition={{
                        duration: 4,
                        ease: "easeInOut",
                        repeat: Infinity,
                        delay: 1
                      }}
                    />
                  </motion.div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Bar */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">Progresso della storia</span>
              <span className="text-sm text-gray-500">
                {currentStep + 1} di {storySteps.length}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="h-2 rounded-full"
                style={{ backgroundColor: currentStepData.color }}
                animate={{
                  width: `${((currentStep + 1) / storySteps.length) * 100}%`
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Play/Pause Control */}
          <div className="text-center mt-8">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <span>{isPlaying ? '⏸️' : '▶️'}</span>
              <span>{isPlaying ? 'Pausa' : 'Riproduci'}</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StorySection;