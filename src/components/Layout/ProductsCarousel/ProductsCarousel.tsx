"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Plus } from "lucide-react";

// 🔍 DEBUG: Console log per verificare che il nuovo codice sia caricato
console.log("🔥 NUOVO ProductsCarousel caricato - versione DEBUG");

// Interfaccia per le citazioni
interface Quote {
  id: number;
  image: string;
  category: string;      // Es: INNOVAZIONE
  title: string;         // Es: Guidiamo il futuro
  description: string;   // Es: breve spiegazione
  text?: string;
  author?: string;
}

interface ProductsCarouselProps {
  title?: string;
  subtitle?: string;
  quotes?: Quote[];
  autoplayDuration?: number;
  className?: string;
}

// Quote di default - 9 carte totali
const defaultQuotes: Quote[] = [
  {
    id: 1,
    category: "INNOVAZIONE",
    title: "Guidiamo il cambiamento",
    description: "Sperimentiamo, testiamo e portiamo in produzione ciò che serve davvero ai nostri clienti.",
    image: "/img/About/about-bg.jpg"
  },
  {
    id: 2,
    category: "QUALITÀ",
    title: "Standard elevati, risultati concreti",
    description: "Processi chiari, attenzione ai dettagli e feedback continui per un delivery affidabile.",
    image: "/images/carousel/success-quote.jpg"
  },
  {
    id: 3,
    category: "TRASPARENZA",
    title: "Comunicazione semplice e diretta",
    description: "Condividiamo roadmap, metriche e decisioni in modo chiaro. Senza fronzoli.",
    image: "/images/carousel/quality-quote.jpg"
  },
  {
    id: 4,
    category: "SOSTEGNO",
    title: "Vicini al cliente, sempre",
    description: "Supporto proattivo e continuo: siamo presenti nelle fasi critiche, non solo al go-live.",
    image: "/images/carousel/future-quote.jpg"
  },
  {
    id: 5,
    category: "SCALABILITÀ",
    title: "Soluzioni che crescono con te",
    description: "Architetture robuste, performance sotto carico e osservabilità end-to-end.",
    image: "/images/carousel/excellence-quote.jpg"
  },
  {
    id: 6,
    category: "SEMPLICITÀ",
    title: "Less, but better",
    description: "Riduciamo la complessità al minimo indispensabile per favorire l’adozione.",
    image: "/images/carousel/simplicity-quote.jpg"
  },
  {
    id: 7,
    category: "ESPERIENZA",
    title: "Focus sull’utente finale",
    description: "Progettiamo a partire dai comportamenti reali, misurando l’impatto con dati.",
    image: "/images/carousel/customer-quote.jpg"
  },
  {
    id: 8,
    category: "COLLABORAZIONE",
    title: "Un’unica squadra",
    description: "Product, design e engineering lavorano insieme, con ownership condivisa.",
    image: "/images/carousel/communication-quote.jpg"
  },
  {
    id: 9,
    category: "CRESCITA",
    title: "Miglioramento continuo",
    description: "Retrospettive, learning e sperimentazione costante per alzare l’asticella.",
    image: "/images/carousel/discovery-quote.jpg"
  }
];

const ProductsCarousel: React.FC<ProductsCarouselProps> = ({
  title = "Offerte strutturate, impatto misurabile.",
  subtitle,
  quotes = defaultQuotes,
  autoplayDuration = 5000,
  className = ""
}) => {
  console.log("🔍 ProductsCarousel renderizzato con", quotes.length, "slides");

  // Stati del componente
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [pausedAt, setPausedAt] = useState<number>(0); // 🔥 NUOVO: memorizza quando è stato messo in pausa
  const [itemsPerView, setItemsPerView] = useState(1); // responsive: 1 (mobile), 2 (md), 3 (lg)
  
  // Refs per i timer - SEPARATI e PULITI
  const autoplayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseStartTime = useRef<number>(0); // 🔥 NUOVO: timestamp di quando è iniziata la pausa
  const lastIndexRef = useRef<number>(0);

  useEffect(() => {
    const updateItemsPerView = () => {
      const w = window.innerWidth;
      if (w >= 1024) setItemsPerView(3); // lg and up
      else if (w >= 768) setItemsPerView(2); // md
      else setItemsPerView(1); // sm
    };
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const slideCount = quotes.length;

  const totalPages = Math.max(1, Math.ceil(slideCount / itemsPerView));

  // keep currentIndex within bounds when itemsPerView changes
  useEffect(() => {
    setCurrentIndex((idx) => Math.min(idx, totalPages - 1));
  }, [totalPages]);

  // Funzione per ripulire TUTTI i timer
  const clearAllTimers = useCallback(() => {
    console.log("🧹 Clearing all timers");
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  }, []);

  // Funzione per reset completo quando si cambia slide manualmente
  const resetProgressAndTimers = useCallback(() => {
    console.log("🔄 Reset completo progress e timers");
    clearAllTimers();
    setProgress(0);
    setPausedAt(0);
  }, [clearAllTimers]);

  // Funzioni di navigazione - STABILI con useCallback
  const nextSlide = useCallback(() => {
    const next = (currentIndex + 1) % totalPages;
    console.log("📱 nextSlide chiamato - cambio da", currentIndex, "a", next, "(itemsPerView:", itemsPerView, ")");
    setCurrentIndex(next);
  }, [totalPages, currentIndex, itemsPerView]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const goToSlide = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, totalPages - 1));
    console.log("🎯 goToSlide chiamato - vai a slide", clamped, "(itemsPerView:", itemsPerView, ")");
    resetProgressAndTimers(); // Reset completo quando si naviga manualmente
    setCurrentIndex(clamped);
  }, [resetProgressAndTimers, totalPages, itemsPerView]);

  // 1. AUTOPLAY TIMER - Riprende dal punto giusto
  useEffect(() => {
    console.log("⏰ Autoplay effect triggered - currentIndex:", currentIndex, "isPaused:", isPaused, "progress:", Math.round(progress));
    
    if (isPaused || totalPages <= 1) {
      console.log("⏸️ Autoplay fermato (paused o poche slide)");
      clearAllTimers();
      return;
    }

    // 🔥 Calcola quanto tempo rimanente basato sul progress corrente
    const timeElapsed = (progress / 100) * autoplayDuration;
    const remainingTime = autoplayDuration - timeElapsed;
    const timeToWait = Math.max(100, remainingTime); // Minimo 100ms
    
    console.log("▶️ Avvio timer autoplay per", Math.round(timeToWait), "ms (progress:", Math.round(progress), "%)");
    
    autoplayTimerRef.current = setTimeout(() => {
      console.log("⏰ Timer autoplay scaduto - chiamando nextSlide");
      resetProgressAndTimers(); // Reset quando avanza automaticamente
      nextSlide();
    }, timeToWait);

    // Cleanup quando l'effect si riavvia
    return () => {
      console.log("🧹 Cleanup autoplay effect");
      clearAllTimers();
    };
  }, [currentIndex, isPaused, autoplayDuration, totalPages, itemsPerView, nextSlide, clearAllTimers, resetProgressAndTimers]);

  // 2. PROGRESS BAR - Timer semplificato ma che riprende correttamente
  useEffect(() => {
    console.log("📊 Progress effect triggered - currentIndex:", currentIndex, "isPaused:", isPaused);
    
    if (isPaused || totalPages <= 1) {
      if (progressTimerRef.current) {
        console.log("⏸️ Progress fermato - salvando posizione:", Math.round(progress));
        setPausedAt(progress * autoplayDuration / 100); // Salva il tempo trascorso
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
      return;
    }

    // Reset SOLO quando cambia slide; non resettare su pausa/ripresa
    let startProgress = progress;

    const slideChanged = currentIndex !== lastIndexRef.current;
    if (slideChanged) {
      console.log("🔁 Slide changed: reset progress a 0 (da", lastIndexRef.current, "a", currentIndex, ")");
      setProgress(0);
      setPausedAt(0);
      startProgress = 0;
      lastIndexRef.current = currentIndex;
    }

    // Timer progress semplice
    const progressInterval = 50; // Più fluido
    const progressIncrement = (100 / autoplayDuration) * progressInterval;
    
    console.log("📊 Avvio progress timer - start:", Math.round(startProgress), "% incremento:", progressIncrement.toFixed(2));

    progressTimerRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + progressIncrement;
        return Math.min(newProgress, 100);
      });
    }, progressInterval);

    // Cleanup
    return () => {
      console.log("🧹 Cleanup progress effect");
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
    };
  }, [currentIndex, isPaused, autoplayDuration, totalPages, itemsPerView, pausedAt, progress]);

  // 3. CLEANUP GENERALE al unmount
  useEffect(() => {
    console.log("🏗️ Component mounted");
    return () => {
      console.log("💥 Component unmounting - final cleanup");
      clearAllTimers();
    };
  }, [clearAllTimers]);

  // Log del progress per debug
  useEffect(() => {
    if (progress > 0) {
      console.log("📊 Progress update:", Math.round(progress) + "%");
    }
  }, [progress]);

  return (
    <section className={`w-full bg-white overflow-hidden py-14 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary max-w-4xl mx-auto leading-relaxed font-heading">
            {title}
          </h2>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative w-full"
          onMouseEnter={() => {
            console.log("🐭 Mouse enter - pausing at progress:", Math.round(progress), "%");
            pauseStartTime.current = Date.now();
            setIsPaused(true);
          }}
          onMouseLeave={() => {
            console.log("🐭 Mouse leave - resuming");
            setIsPaused(false);
          }}
        >
          {/* Cards Carousel - 3 CARD ALLA VOLTA */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{
                // 🔥 Calcola transform per mostrare 3 card alla volta
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {quotes.map((quote, index) => (
                <div
                  key={`${quote.id}-${index}`}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2 md:px-4" // 🔥 w-1/3 per 3 card alla volta
                >
                  <div
                    className="relative rounded-xl overflow-hidden h-[500px]"
                    style={{
                      backgroundImage: `url(${quote.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {/* Overlay per leggibilità */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />

                    {/* Contenuto */}
                    <div className="relative z-10 h-full p-6 flex flex-col justify-between text-white">
                      <div>
                        <span className="text-[12px] text-sans font-medium uppercase tracking-wide opacity-80">{quote.category}</span>
                        <h3 className="text-2xl md:text-3xl font-heading mt-1 font-regular">{quote.title}</h3>
                      </div>

                      {/* Pulsante circolare stile Apple */}
                      <button
                        type="button"
                        aria-label={`Apri sezione ${quote.title}`}
                        onClick={() => console.log('Plus clicked:', quote.id)}
                        className="group absolute bottom-4 right-4 w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-sm bg-white/40 border border-white/60 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 flex items-center justify-center transition"
                      >
                        <Plus className="w-5 h-5 md:w-6 md:h-6 text-black transition-transform duration-300 group-hover:rotate-45" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Indicators - Per le 9 card */}
        <div className="flex items-center justify-center mt-12">
          <div className="inline-flex items-center gap-3 bg-gray-100 px-6 py-3 rounded-full">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  console.log("🎯 Dot clicked - go to page", i);
                  goToSlide(i);
                }}
                className="relative group"
                aria-label={`Vai alla pagina ${i + 1}`}
              >
                <div className={`
                  relative overflow-hidden rounded-full transition-all duration-500 ease-out
                  ${i === currentIndex ? 'w-20 h-3 bg-gray-200' : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'}
                `}>
                  {i === currentIndex && (
                    <div
                      className="absolute inset-0 bg-primary rounded-full origin-left transition-transform duration-75 ease-linear"
                      style={{ transform: `scaleX(${progress / 100})` }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Play/Pause Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              console.log("⏯️ Play/Pause clicked - was paused:", isPaused);
              setIsPaused(!isPaused);
            }}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors font-sans"
            aria-label={isPaused ? 'Riprendi autoplay' : 'Pausa autoplay'}
          >
            {isPaused ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Riprendi
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Pausa
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsCarousel;