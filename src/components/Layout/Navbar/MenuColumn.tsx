import React from 'react';
import type { MenuColumn as MenuColumnType } from './types';

interface MenuColumnProps {
  column: MenuColumnType;
}

const MenuColumn: React.FC<MenuColumnProps> = ({ column }) => {
  return (
    <div className="flex flex-col space-y-4">
      {/* Titolo colonna - stile Apple */}
      <h3 className="text-sm font-medium text-primary tracking-wide">
        {column.title}
      </h3>
      
      {/* Lista item */}
      <nav className="flex flex-col space-y-3">
        {column.items.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="group flex flex-col space-y-1 text-gray-800 hover:text-black transition-colors duration-200"
          >
            <span className="text-sm font-medium leading-tight">
              {item.label}
            </span>
            {item.description && (
              <span className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
                {item.description}
              </span>
            )}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default MenuColumn;