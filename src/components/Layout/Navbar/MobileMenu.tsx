// src/components/layout/Navbar/MobileMenu.tsx

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import type { NavLink } from './types';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navLinks
}) => {
  // Gestione ESC per chiudere
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Blocca scroll del body
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`
          fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden
          transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={`
          fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-heading text-lg font-medium text-gray-800">
            Menu
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Chiudi menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col p-6 space-y-1">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={onClose}
              className="block py-4 px-3 text-gray-800 hover:bg-gray-50 hover:text-primary rounded-lg transition-all duration-200 font-sans font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100">
          <div className="space-y-3">
            <a
              href="#"
              className="block text-sm text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Richiedi informazioni
            </a>
            <a
              href="#"
              className="block text-sm text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Assistenza
            </a>
            <a
              href="#"
              className="block text-sm text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Contatti
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;