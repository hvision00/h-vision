import React from 'react';
import MenuColumn from './MenuColumn';
import type { MegaMenuData } from './types';

interface MegaMenuProps {
  data?: MegaMenuData;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({
  data,
  isOpen,
  onMouseEnter,
  onMouseLeave
}) => {
  if (!data || !isOpen) return null;

  return (
    <div
      className="fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg z-40 transition-all duration-200 ease-out"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Grid delle 3 colonne allineate a sinistra */}
        <div className="grid grid-cols-3 gap-8 justify-start">
          <MenuColumn column={data.menu1} />
          <MenuColumn column={data.catalogo} />
          <MenuColumn column={data.info} />
        </div>
        
        {/* Footer del mega menu */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Vivi una collaborazione sara e produttiva con High Vision
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;