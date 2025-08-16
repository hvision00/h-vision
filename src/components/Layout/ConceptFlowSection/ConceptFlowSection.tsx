"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ConceptCard {
  id: number;
  number: string;
  title: string;
  description: string;
  insight: string;
  quote: string;
  bgPattern: string;
}

const concepts: ConceptCard[] = [
  {
    id: 1,
    number: "01",
    title: "Il problema è sempre lo stesso",
    description: "Le aziende crescono, i sistemi si moltiplicano, la comunicazione si frammenta. Quello che prima funzionava, ora rallenta tutto.",
    insight: "Complessità",
    quote: "Non è colpa tua se è diventato tutto più complicato. È normale che succeda quando si cresce.",
    bgPattern: "complexity"
  },
  {
    id: 2,
    number: "02", 
    title: "La soluzione non è tecnologica",
    description: "Non servono più strumenti. Serve chi sa orchestrare quelli esistenti e far dialogare mondi diversi con un linguaggio comune.",
    insight: "Strategia",
    quote: "La tecnologia è un mezzo, non il fine. Il fine è far funzionare meglio il tuo business.",
    bgPattern: "strategy"
  },
  {
    id: 3,
    number: "03",
    title: "Il valore è nell'integrazione",
    description: "High Vision non aggiunge complessità: la riduce. Coordina, semplifica, ottimizza. Un solo interlocutore per risultati sistemici.",
    insight: "Semplificazione",
    quote: "Meglio un sistema semplice che funziona che dieci sistemi complessi che si bloccano a vicenda.",
    bgPattern: "integration"
  },
  {
    id: 4,
    number: "04",
    title: "L'eccellenza diventa sostenibile",
    description: "Quando tutto funziona insieme, i risultati si moltiplicano. Meno sforzo, più impatto. Questo è il futuro che costruiamo ogni giorno.",
    insight: "Risultati",
    quote: "L'eccellenza non è un evento, ma un'abitudine. E le abitudini si costruiscono con sistemi che funzionano.",
    bgPattern: "excellence"
  }
];

// Background patterns dinamici - Versione COMPLETAMENTE invisibile
const getBackgroundPattern = (pattern: string) => {
  // Per ora disabilitiamo completamente tutti i pattern di background
  // per eliminare qualsiasi elemento geometrico visibile
  return null;
  
  /* 
  // Se in futuro volessimo riattivare pattern ultra-discreti:
  switch (pattern) {
    case 'complexity':
      return (
        <div className="absolute inset-0 opacity-2">
          <div className="absolute bottom-8 right-8 w-4 h-4 bg-red-50 rounded-full"></div>
        </div>
      );
    case 'strategy':
      return null; // Nessun pattern per evitare linee SVG visibili
    case 'integration':
      return null; // Nessun pattern per evitare quadrati visibili
    case 'excellence':
      return (
        <div className="absolute inset-0 opacity-2">
          <div className="absolute top-8 right-8 w-6 h-6 bg-green-50 rounded-full"></div>
        </div>
      );
    default:
      return null;
  }
  */
};

const ConceptFlowSection: React.FC = () => {
  const [currentConcept, setCurrentConcept] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const conceptRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Rileva se siamo su mobile e gestisce l'osservatore scroll
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Solo su desktop usiamo l'IntersectionObserver per lo scroll
    if (isMobile) return;

    const observers: IntersectionObserver[] = [];

    concepts.forEach((_, index) => {
      const element = conceptRefs.current[index];
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const rect = entry.boundingClientRect;
              const windowHeight = window.innerHeight;
              const elementHeight = rect.height;
              
              const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
              const visibilityRatio = Math.max(0, Math.min(1, visibleHeight / elementHeight));
              
              if (visibilityRatio > 0.6) {
                setCurrentConcept(index);
              }
            }
          });
        },
        {
          threshold: Array.from({ length: 11 }, (_, i) => i / 10),
          rootMargin: '-15% 0px -15% 0px'
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [isMobile]);

  const handleConceptClick = (index: number) => {
    setCurrentConcept(index);
    
    // Solo su desktop facciamo scroll alla sezione
    if (!isMobile) {
      const element = conceptRefs.current[index];
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 xl:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-20">
          <span className="text-sm font-medium text-gray-500 tracking-wider uppercase mb-4 block">
            Come pensiamo
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-primary mb-4 sm:mb-6 leading-tight">
            Quattro principi che guidano ogni nostro progetto
          </h2>
        </div>

        {/* Layout Mobile - Verticale pulito e minimale */}
        <div className="lg:hidden">
          <div className="space-y-8 sm:space-y-12">
            {concepts.map((concept, index) => (
              <motion.div
                key={concept.id}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              >
                {/* Header della card */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary text-white flex items-center justify-center font-heading text-lg sm:text-xl font-semibold shadow-lg">
                    {concept.number}
                  </div>
                  <span className="px-4 py-2 bg-primary/10 text-primary text-xs sm:text-sm font-medium rounded-full border border-primary/20">
                    {concept.insight}
                  </span>
                </div>

                {/* Card principale con background subtile */}
                <div className="relative bg-gradient-to-br from-white to-gray-50/50 border border-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                  
                  {/* Background pattern discreto - solo per visual appeal */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl">
                    {getBackgroundPattern(concept.bgPattern)}
                  </div>

                  <div className="relative z-10">
                    <h3 className="font-heading text-xl sm:text-2xl text-gray-900 mb-4 leading-tight">
                      {concept.title}
                    </h3>
                    
                    <p className="text-base sm:text-lg leading-relaxed text-gray-700 mb-6">
                      {concept.description}
                    </p>

                    {/* Quote stilizzata */}
                    <div className="border-l-4 border-primary bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-r-xl sm:rounded-r-2xl">
                      <p className="text-sm sm:text-base italic text-gray-600 leading-relaxed">
                        &ldquo;{concept.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Layout Desktop - Due colonne con scroll sync */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 xl:gap-20">
          
          {/* Lato sinistro: Navigazione scrollabile */}
          <div className="space-y-0">
            {concepts.map((concept, index) => (
              <motion.div
                key={concept.id}
                ref={(el) => {
                  conceptRefs.current[index] = el;
                }}
                className="min-h-screen flex items-center py-20"
                onClick={() => handleConceptClick(index)}
              >
                <div className={`cursor-pointer transition-all duration-500 w-full ${
                  currentConcept === index ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                }`}>
                  <div className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                    
                    {/* Numero */}
                    <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-heading text-xl font-semibold transition-colors ${
                      currentConcept === index 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {concept.number}
                    </div>
                    
                    {/* Contenuto */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-heading text-2xl font-semibold mb-4 transition-colors leading-tight ${
                        currentConcept === index ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {concept.title}
                      </h3>
                      
                      <p className={`text-base leading-relaxed transition-colors ${
                        currentConcept === index ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {concept.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lato destro: Contenuto fisso con background dinamico */}
          <div className="relative">
            <div className="sticky top-8">
              
              {/* Background Pattern Dinamico */}
              <motion.div
                key={`bg-${currentConcept}`}
                className="absolute inset-0 rounded-3xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                {getBackgroundPattern(concepts[currentConcept].bgPattern)}
              </motion.div>

              {/* Contenuto principale */}
              <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-3xl p-8 xl:p-12 border border-gray-100">
                
                {/* Badge insight */}
                <motion.div
                  key={`badge-${currentConcept}`}
                  className="mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-full">
                    {concepts[currentConcept].insight}
                  </span>
                </motion.div>

                {/* Titolo */}
                <motion.h3
                  key={`title-${currentConcept}`}
                  className="font-heading text-3xl xl:text-4xl text-gray-900 mb-6 leading-tight"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {concepts[currentConcept].title}
                </motion.h3>

                {/* Descrizione */}
                <motion.p
                  key={`desc-${currentConcept}`}
                  className="text-lg leading-relaxed text-gray-700 mb-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {concepts[currentConcept].description}
                </motion.p>

                {/* Quote */}
                <motion.div
                  key={`quote-${currentConcept}`}
                  className="border-l-4 border-primary bg-gray-50/50 p-6 rounded-r-2xl"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <p className="text-base italic text-gray-600">
                    &ldquo;{concepts[currentConcept].quote}&rdquo;
                  </p>
                </motion.div>

                {/* Indicatori di navigazione */}
                <div className="flex space-x-3 mt-8">
                  {concepts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleConceptClick(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentConcept === index 
                          ? 'bg-primary w-8' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Call to action */}
        <div className="text-center mt-16 sm:mt-24 lg:mt-32 pt-12 sm:pt-16 border-t border-gray-100">
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Questi principi non sono teoria. Sono il risultato di anni di lavoro con aziende 
            che hanno scelto la semplicità dell&apos;eccellenza.
          </p>
          
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors text-sm sm:text-base">
            Parliamone insieme
          </button>
        </div>

      </div>
    </section>
  );
};

export default ConceptFlowSection;