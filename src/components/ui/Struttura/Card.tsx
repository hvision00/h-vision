import React from "react";
import Button from "../Base/Button";

interface CardProps {
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  buttonText,
  onButtonClick,
  className = ""
}) => {
  return (
    <div className={`group text-start ${className}`}>
      {/* Immagine */}
      {imageSrc && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <img
            src={imageSrc}
            alt={imageAlt || title}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      
      {/* Info generali */}
      <div className="text-sm text-foreground/60 font-sans mb-2">
        Featured Project
      </div>
      
      {/* Titolo */}
      <h3 className="font-heading text-xl font-regular text-foreground mb-3">
        {title}
      </h3>
      
      {/* Descrizione */}
      {description && (
        <p className="font-sans text-sm text-foreground/70 leading-relaxed mb-6">
          {description}
        </p>
      )}
      
      {/* Pulsante */}
      {buttonText && onButtonClick && (
        <Button
          variant="primary"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default Card;