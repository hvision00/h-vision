import React, { ReactNode, MouseEventHandler, ButtonHTMLAttributes } from "react";
import { Plus } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: "primary" | "secondary";
  onClick?: MouseEventHandler<HTMLButtonElement>;
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

export default Button;