import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({ variant = "primary", size = "md", children, className = "", ...props }: ButtonProps) {
  const baseStyles =
    "font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden";

  const variants = {
    primary: "bg-white text-black hover:bg-white/90 hover:scale-105 active:scale-95 font-bold",
    secondary: "bg-surface border border-border text-white hover:bg-white/10 hover:scale-105 active:scale-95 font-semibold",
    outline: "border border-border text-white bg-transparent hover:bg-white/10 hover:scale-105 active:scale-95 font-semibold",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
