import React, { TextareaHTMLAttributes } from "react";

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  name: string;
  value?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  rows?: number;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  name,
  value,
  placeholder,
  label,
  error,
  rows = 4,
  disabled = false,
  onChange,
  className = "",
  ...rest
}) => {
  const textareaId = `textarea-${name}`;

  const baseStyles =
    "w-full px-4 py-2 rounded-lg border border-gray-300 bg-background text-foreground placeholder:text-gray-400 font-sans transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-vertical";

  const disabledStyles = disabled
    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
    : "hover:border-gray-400";

  const errorStyles = error
    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
    : "";

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block mb-1 text-sm font-medium text-foreground font-sans"
        >
          {label}
        </label>
      )}
      
      <textarea
        id={textareaId}
        name={name}
        value={value}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        onChange={onChange}
        aria-invalid={error ? true : false}
        className={`${baseStyles} ${disabledStyles} ${errorStyles} ${className}`}
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

export default Textarea;