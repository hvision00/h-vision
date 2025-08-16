"use client";

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Colonna sinistra */}
          <div className="space-y-6">
            {/* Logo */}
            <div>
              <img 
                src="/icons/logos/logo-primary.svg" 
                alt="High Vision" 
                className="h-24 w-auto mb-4 filter brightness-0 invert" 
              />
            </div>
            
            {/* Descrizione */}
            <p className="text-gray-100 text-base leading-relaxed max-w-md">
              High Vision fornisce soluzioni operative integrate a supporto delle aziende.
            </p>
          </div>
          
          {/* Colonna destra */}
          <div className="flex flex-col items-start md:items-end space-y-6">
            
            {/* Link di navigazione */}
            <div className="flex flex-wrap gap-6 text-sm">
              <a 
                href="/contatti"
                className="text-white/80 hover:text-white transition-colors uppercase tracking-wider font-medium"
              >
                RICHIEDI INFORMAZIONI
              </a>
              <a href="/assistenza" className="text-white/80 hover:text-white transition-colors uppercase tracking-wider font-medium">
                ASSISTENZA
              </a>
              <a href="/faq" className="text-white/80 hover:text-white transition-colors uppercase tracking-wider font-medium">
                FAQ
              </a>
            </div>
            
            {/* Social media */}
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/80 hover:text-white transition-colors uppercase tracking-wider font-medium">
                INSTAGRAM
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors uppercase tracking-wider font-medium">
                FACEBOOK
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors uppercase tracking-wider font-medium">
                LINKEDIN
              </a>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-white/20 mt-12 pt-8">
          {/* Bottom section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="text-sm text-white/60">
              © High Vision S.r.l. Tutti i diritti riservati
            </div>
            
            {/* Legal links */}
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="/privacy-policy" className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/termini-condizioni" className="text-white/60 hover:text-white transition-colors">
                Termini e condizioni
              </a>
              <a href="/cookie-policy" className="text-white/60 hover:text-white transition-colors">
                Cookie policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;