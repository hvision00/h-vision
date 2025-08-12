import React, { SelectHTMLAttributes } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  name: string;
  value?: string;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  className?: string;
  variant?: "gray-400" | "gray-600";
}

const Select: React.FC<SelectProps> = ({
  name,
  value,
  options,
  placeholder,
  label,
  error,
  disabled = false,
  onChange,
  className = "",
  variant = "gray-400",
  ...rest
}) => {
  const selectId = `select-${name}`;

  const baseStyles =
    "w-full px-0 py-2 pr-6 bg-transparent text-foreground font-sans transition-all duration-200 focus:outline-none border-0 border-b-2 appearance-none cursor-pointer";

  const variantStyles = variant === "gray-400" 
    ? "border-b-gray-400 focus:border-b-primary" 
    : "border-b-gray-600 focus:border-b-primary";

  const disabledStyles = disabled
    ? "text-gray-400 cursor-not-allowed border-b-gray-300"
    : "hover:border-b-gray-500";

  const errorStyles = error
    ? "border-b-red-500 focus:border-b-red-500"
    : "";

  // Stili per le opzioni del dropdown
  const optionStyles = `
    select option {
      background-color: white;
      color: #374151;
      padding: 8px 12px;
      font-family: var(--font-poppins), sans-serif;
    }
    select option:checked {
      background-color: #3672e0;
      color: white;
    }
    select option:hover {
      background-color: #f3f4f6;
    }
  `;

  return (
    <div className="w-full">
      <style dangerouslySetInnerHTML={{ __html: optionStyles }} />
      
      {label && (
        <label
          htmlFor={selectId}
          className="block mb-1 text-sm font-medium text-foreground font-sans"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <select
          id={selectId}
          name={name}
          value={value}
          disabled={disabled}
          onChange={onChange}
          aria-invalid={error ? true : false}
          className={`${baseStyles} ${variantStyles} ${disabledStyles} ${errorStyles} ${className}`}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
          ▼
        </span>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500 font-sans">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;