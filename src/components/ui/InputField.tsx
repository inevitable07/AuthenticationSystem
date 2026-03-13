"use client";

import React, { InputHTMLAttributes, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, LucideIcon } from "lucide-react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function InputField({
  label,
  icon: Icon,
  type = "text",
  className = "",
  error,
  onFocus,
  onBlur,
  ...props
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isPassword = type === "password";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <motion.div 
      className="w-full mb-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
        {label}
      </label>
      <div className="relative group">
        {/* Background glow on focus */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isFocused ? 0.5 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-r from-sky-400/10 to-indigo-400/10 rounded-lg blur-sm pointer-events-none"
        />

        {/* Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-sky-400 transition-colors duration-300">
          {Icon && <Icon size={18} strokeWidth={1.5} />}
        </div>

        {/* Input field */}
        <input
          type={isPassword && showPassword ? "text" : type}
          className={`glass-input w-full rounded-lg py-3 ${Icon ? "pl-10" : "pl-4"} ${
            isPassword ? "pr-10" : "pr-4"
          } text-slate-100 placeholder-slate-600 focus:ring-0 text-sm font-medium ${
            error ? "border-red-500/50 focus:border-red-500/50 bg-red-500/5" : ""
          } ${className}`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {/* Password visibility toggle */}
        {isPassword && (
          <motion.button
            type="button"
            onClick={togglePasswordVisibility}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-sky-400 transition-colors cursor-pointer"
          >
            {showPassword ? (
              <EyeOff size={18} strokeWidth={1.5} />
            ) : (
              <Eye size={18} strokeWidth={1.5} />
            )}
          </motion.button>
        )}
      </div>

      {/* Error message */}
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-xs text-red-400 font-medium"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}
