"use client";

import React from "react";
import { Plus } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: "primary" | "secondary";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ...rest
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md px-6 py-3 uppercase font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none group";

  const variantStyles =
    variant === "primary"
      ? "bg-primary text-white hover:brightness-95"
      : "bg-secondary text-white hover:brightness-95";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...rest}
    >
      {children}
      <Plus className="ms-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-45" />
    </button>
  );
};

interface AboutSectionProps {
  quote: string;
  title: string;
  buttonLabel: string;
  buttonHref: string;
  backgroundImage?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  quote,
  title,
  buttonLabel,
  buttonHref,
  backgroundImage = "/about-bg.jpg"
}) => {
  const handleButtonClick = () => {
    if (buttonHref.startsWith('http') || buttonHref.startsWith('https')) {
      window.open(buttonHref, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = buttonHref;
    }
  };

  return (
    <section className="relative h-[350px] md:h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
        role="img"
        aria-label="About section background"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative z-10 px-4 md:px-6 max-w-4xl mx-auto">
        
        {/* Quote */}
        <div className="mb-6 md:mb-8">
          <p className="text-sm md:text-base font-sans text-white/90 italic tracking-wide">
            "{quote}"
          </p>
        </div>
        
        {/* Divider Line */}
        <div className="w-24 md:w-32 h-0.5 bg-white/60 mx-auto mb-6 md:mb-8"></div>
        
        {/* Title - Multi-line */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-regular mb-8 md:mb-12 leading-relaxed max-w-3xl mx-auto">
          {title}
        </h2>
        
        {/* Button with Blur Background */}
        <div className="inline-block">
          <div className="bg-white/20 rounded-gl ">
            <Button 
              variant="primary"
              onClick={handleButtonClick}
              className="bg-transparent border border-gray-200 text-white hover:border-white/50 backdrop-blur-sm"
            >
              {buttonLabel}
            </Button>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default AboutSection;