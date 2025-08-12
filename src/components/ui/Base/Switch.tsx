import React, { InputHTMLAttributes } from "react";

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  name: string;
  checked?: boolean;
  label?: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({
  name,
  checked = false,
  label,
  disabled = false,
  onChange,
  className = "",
  ...rest
}) => {
  const switchId = `switch-${name}`;

  return (
    <label
      htmlFor={switchId}
      className={`inline-flex items-center gap-3 select-none ${
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer group'
      } ${className}`}
    >
      <input
        type="checkbox"
        id={switchId}
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        role="switch"
        aria-checked={checked}
        className="sr-only"
        {...rest}
      />
      
      {/* Switch container */}
      <div className={`
        relative w-11 h-6 rounded-full transition-all duration-200 ease-out
        ${checked 
          ? 'bg-primary shadow-lg shadow-primary/25' 
          : 'bg-gray-300 group-hover:bg-gray-400'
        }
        ${disabled ? '' : 'group-hover:scale-105'}
      `}>
        
        {/* Manopola */}
        <span className={`
          absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full shadow-sm
          transition-all duration-200 ease-out transform
          ${checked ? 'translate-x-5' : 'translate-x-0'}
          ${disabled ? '' : 'group-hover:shadow-md'}
        `}>
          {/* Effetto interno sulla manopola */}
          <span className={`
            absolute inset-0 rounded-full transition-all duration-200
            ${checked 
              ? 'bg-gradient-to-br from-white to-blue-50' 
              : 'bg-gradient-to-br from-white to-gray-50'
            }
          `} />
        </span>
        
        {/* Effetto glow quando attivo */}
        {checked && !disabled && (
          <div className="absolute inset-0 rounded-full bg-primary animate-pulse opacity-20" />
        )}
      </div>
      
      {label && (
        <span className="font-sans text-foreground leading-tight">
          {label}
        </span>
      )}
    </label>
  );
};

export default Switch;