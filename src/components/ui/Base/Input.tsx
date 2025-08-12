import React, { InputHTMLAttributes } from "react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  name: string;
  value?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  variant?: "gray-400" | "gray-600";
}

const Input: React.FC<InputProps> = ({
  type = "text",
  name,
  value,
  placeholder,
  label,
  error,
  disabled = false,
  onChange,
  className = "",
  variant = "gray-400",
  ...rest
}) => {
  const inputId = `input-${name}`;

  const baseStyles =
    "w-full px-0 py-2 bg-transparent text-foreground placeholder:text-gray-400 font-sans transition-all duration-200 focus:outline-none border-0 border-b-2";

  const variantStyles = variant === "gray-400" 
    ? "border-b-gray-400 focus:border-b-primary" 
    : "border-b-gray-600 focus:border-b-primary";

  const disabledStyles = disabled
    ? "text-gray-400 cursor-not-allowed border-b-gray-300"
    : "hover:border-b-gray-500";

  const errorStyles = error
    ? "border-b-red-500 focus:border-b-red-500"
    : "";

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block mb-1 text-sm font-medium text-foreground font-sans"
        >
          {label}
        </label>
      )}
      
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        aria-invalid={error ? true : false}
        className={`${baseStyles} ${variantStyles} ${disabledStyles} ${errorStyles} ${className}`}
        {...rest}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-500 font-sans">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;