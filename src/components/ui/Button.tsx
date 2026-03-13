"use client";

import React, { ButtonHTMLAttributes } from "react";
import { Loader2, ArrowRight } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "outline";
  withArrow?: boolean;
}

export default function Button({
  children,
  isLoading,
  variant = "primary",
  withArrow = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "w-full rounded-lg py-3 px-4 font-semibold transition-all duration-300 flex items-center justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group";

  const variants = {
    primary:
      "bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-lg hover:shadow-[0_0_40px_rgba(56,189,248,0.35)] active:scale-[0.98] border border-sky-400/20 hover:border-sky-300/40",
    secondary:
      "bg-slate-800/50 hover:bg-slate-700/40 text-slate-200 border border-slate-700/50 hover:border-slate-600 backdrop-blur-sm hover:shadow-[0_0_20px_rgba(56,189,248,0.1)]",
    outline:
      "bg-transparent border border-slate-600 text-slate-300 hover:border-sky-400 hover:text-sky-300 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)]",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {/* Shimmer effect background */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Content */}
      <span className="relative flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            {children}
            {withArrow && (
              <ArrowRight className="h-4 w-4 arrow-slide transition-transform duration-300" />
            )}
          </>
        )}
      </span>
    </button>
  );
}
