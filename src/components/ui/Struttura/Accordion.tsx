import React, { useState } from "react";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  className?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  className = ""
}) => {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId || null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={`divide-y divide-gray-300 ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const contentId = `accordion-content-${item.id}`;

        return (
          <div key={item.id}>
            {/* Header */}
            <div
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="flex justify-between items-center cursor-pointer py-4 font-heading text-foreground transition-colors duration-200 focus:outline-none"
              onClick={() => toggleItem(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleItem(item.id);
                }
              }}
            >
              <span className="font-medium">{item.title}</span>
              
              {/* Icona freccia */}
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Content */}
            <div
              id={contentId}
              className={`overflow-hidden transition-all duration-300 ease-out ${
                isOpen ? 'max-h-[999px]' : 'max-h-0'
              }`}
            >
              <div className="pb-4 text-sm font-sans text-foreground/80 leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;