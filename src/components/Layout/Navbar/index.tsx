"use client";

import React, { useState, useCallback, useRef } from 'react';
import { Menu, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import type { NavLink, MegaMenuData } from './types';

const Navbar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mega menu condiviso per Home, Chi Siamo, Offerte, Contatti
  const defaultMegaMenuData: MegaMenuData = {
    menu1: {
      title: "Servizi",
      items: [
        { label: "Immagine & Comunicazione", href: "#", description: "Servizi e prodotti per l'immagine" },
        { label: "Sicurezza & Protezione", href: "#", description: "Protezione individuale e collettiva" },
        { label: "Industria & Servizi", href: "#", description: "Partner per l'industria" },
        { label: "Formazione obbligatoria", href: "#", description: "Gestione e monitoraggio" }
      ]
    },
    catalogo: {
      title: "Info",
      items: [
        { label: "Richiedi informazioni", href: "#" },
        { label: "Assistenza", href: "#" },
        { label: "FAQ", href: "#" }
      ]
    },
    info: {
      title: "Personalizza",
      items: [
        { label: "Chiamaci", href: "#" },
        { label: "WhatsApp", href: "#" },
        { label: "Email Support", href: "#" },
        { label: "Pagina dedicata", href: "#" }
      ]
    }
  };

  // Mega menu specifico per Catalogo
  const catalogoMegaMenuData: MegaMenuData = {
    menu1: {
      title: "Categorie",
      items: [
        { label: "Abbigliamento personalizzato", href: "#", description: "Grafica e stampa" },
        { label: "Dispositivi DPI", href: "#", description: "Protezione individuale" },
        { label: "Corsi formativi", href: "#", description: "Formazione obbligatoria" },
      ]
    },
    catalogo: {
        title: "Info",
        items: [
            { label: "Newsletter", href: "#" },
            { label: "Richiedi informazioni", href: "#" },
            { label: "Assistenza", href: "#" },
            { label: "FAQ", href: "#" }
        ]
        },
    info: {
      title: "Personalizza",
      items: [
        { label: "Parlaci del tuo progetto", href: "#" },
      ]
    }
  };

  // Link di navigazione - 4 voci centrali + Catalogo a destra
  const navLinks: NavLink[] = [
    { label: "Home", href: "/", megaMenu: defaultMegaMenuData },
    { label: "Chi Siamo", href: "/chi-siamo", megaMenu: defaultMegaMenuData },
    { label: "Offerte", href: "/offerte", megaMenu: defaultMegaMenuData },
    { label: "Contatti", href: "/contatti", megaMenu: defaultMegaMenuData }
  ];

  // Funzione per ottenere i dati del mega menu
  const getMegaMenuData = (menuKey: string) => {
    if (menuKey === 'catalogo') {
      return catalogoMegaMenuData;
    }
    return defaultMegaMenuData;
  };

  // Gestione hover stile Apple
  const handleNavbarMouseEnter = useCallback((menuKey: string) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenu(menuKey);
    }, 100);
  }, []);

  const handleNavbarMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    leaveTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  }, []);

  const handleMegaMenuEnter = useCallback(() => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
  }, []);

  const handleMegaMenuLeave = useCallback(() => {
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  }, []);

  // Cleanup sui timeout
  React.useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <header 
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
        onMouseLeave={handleNavbarMouseLeave}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center justify-center">
                <Image
                  src="/icons/logos/logo-primary.svg"
                  alt="HighVision Logo"
                  width={120}
                  height={32}
                  className="h-8 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => handleNavbarMouseEnter(link.label.toLowerCase())}
                >
                  <a
                    href={link.href}
                    className={`text-gray-800 hover:text-black px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md ${
                      activeMenu === link.label.toLowerCase() ? 'text-black' : ''
                    }`}
                  >
                    {link.label}
                  </a>
                </div>
              ))}
            </div>

            {/* Desktop Right - Link Catalogo con gradiente */}
            <div className="hidden lg:flex lg:items-center">
              <div
                className="relative"
                onMouseEnter={() => handleNavbarMouseEnter('catalogo')}
              >
                <a
                  href="/catalogo"
                  className={`
                    bg-primary text-white px-4 py-2 text-sm font-medium rounded-lg
                    hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20
                    ${activeMenu === 'catalogo' ? 'shadow-lg scale-105' : ''}
                  `}
                >
                  Catalogo
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-label="Apri menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Overlay blur di sfondo quando il mega menu è aperto */}
      {activeMenu && (
        <div className="fixed inset-0 top-16 backdrop-blur-sm z-30 pointer-events-none" />
      )}

      {/* Mega Menu */}
      {activeMenu && (
        <MegaMenu
          data={getMegaMenuData(activeMenu)}
          isOpen={!!activeMenu}
          onMouseEnter={handleMegaMenuEnter}
          onMouseLeave={handleMegaMenuLeave}
        />
      )}

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
};

export default Navbar;