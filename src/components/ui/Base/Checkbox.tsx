import React, { InputHTMLAttributes } from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  name: string;
  checked?: boolean;
  label: string;
  error?: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  checked = false,
  label,
  error,
  disabled = false,
  onChange,
  className = "",
  ...rest
}) => {
  const checkboxId = `checkbox-${name}`;

  return (
    <div className="w-full">
      <label
        htmlFor={checkboxId}
        className={`flex items-center gap-3 select-none ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer group'}`}
      >
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            id={checkboxId}
            name={name}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            aria-invalid={error ? true : false}
            className="sr-only"
            {...rest}
          />
          
          {/* Checkbox container con effetti */}
          <div className={`
            relative h-5 w-5 rounded-sm border-2 transition-all duration-300 ease-out
            ${checked 
              ? 'bg-primary border-primary shadow-lg shadow-primary/25 scale-110' 
              : 'bg-white border-gray-300 group-hover:border-primary group-hover:shadow-md'
            }
            ${error ? 'border-red-500' : ''}
            ${disabled ? '' : 'group-hover:scale-105'}
          `}>
            
            {/* Effetto riempimento con gradiente */}
            <div className={`
              absolute inset-0 rounded-sm bg-gradient-to-br from-primary to-blue-600 
              transition-all duration-300 ease-out transform
              ${checked ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}
            `} />
            
            {/* Puntino centrale animato */}
            <div className={`
              absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
              w-2 h-2 bg-white rounded-full transition-all duration-200 ease-out
              ${checked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
            `} />
            
            {/* Effetto glow */}
            {checked && !disabled && (
              <div className="absolute inset-0 rounded-sm bg-primary animate-pulse opacity-20" />
            )}
          </div>
        </div>
        
        <span className={`
          font-sans text-foreground leading-tight
          ${disabled ? '' : 'group-hover:text-primary transition-colors duration-200'}
        `}>
          {label}
        </span>
      </label>
      
      {error && (
        <p className="mt-2 ml-8 text-sm text-red-500 font-sans">
          {error}
        </p>
      )}
    </div>
  );
};

export default Checkbox;