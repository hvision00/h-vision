import React, { useState, useRef } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = `tooltip-${Math.random().toString(36).substring(2)}`;

  const positionStyles = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 translate-y-2", 
    left: "right-full top-1/2 transform -translate-y-1/2 -translate-x-2",
    right: "left-full top-1/2 transform -translate-y-1/2 translate-x-2"
  };

  const arrowStyles = {
    top: "top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-foreground",
    bottom: "bottom-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-foreground",
    left: "left-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-foreground",
    right: "right-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-foreground"
  };

  const animationClasses = isVisible
    ? "opacity-100 visible"
    : "opacity-0 invisible";

  return (
    <div className="relative inline-block">
      {/* Trigger element */}
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        aria-describedby={isVisible ? tooltipId : undefined}
      >
        {children}
      </div>

      {/* Tooltip */}
      <div
        id={tooltipId}
        role="tooltip"
        className={`
          absolute z-50 bg-foreground text-background text-xs px-2 py-1 rounded-md shadow-lg
          whitespace-nowrap transition-all duration-200 pointer-events-none
          ${positionStyles[position]}
          ${animationClasses}
          ${className}
        `}
      >
        {content}
        
        {/* Arrow */}
        <div
          className={`absolute w-0 h-0 ${arrowStyles[position]}`}
        />
      </div>
    </div>
  );
};

export default Tooltip;