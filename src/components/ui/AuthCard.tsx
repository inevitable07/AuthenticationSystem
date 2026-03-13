"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

type ColorTheme = 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'cyan';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  category?: string;
  colorTheme?: ColorTheme;
}

const colorThemes: Record<ColorTheme, { glow: string; border: string; accent: string; glowRgb: string; accentLight: string }> = {
  blue: { glow: 'rgba(59, 130, 246, 0.3)', glowRgb: '59, 130, 246', border: 'rgba(59, 130, 246, 0.3)', accent: '#3b82f6', accentLight: 'rgb(59, 130, 246)' },
  purple: { glow: 'rgba(168, 85, 247, 0.3)', glowRgb: '168, 85, 247', border: 'rgba(168, 85, 247, 0.3)', accent: '#a855f7', accentLight: 'rgb(168, 85, 247)' },
  green: { glow: 'rgba(16, 185, 129, 0.3)', glowRgb: '16, 185, 129', border: 'rgba(16, 185, 129, 0.3)', accent: '#10b981', accentLight: 'rgb(16, 185, 129)' },
  orange: { glow: 'rgba(249, 115, 22, 0.3)', glowRgb: '249, 115, 22', border: 'rgba(249, 115, 22, 0.3)', accent: '#f97316', accentLight: 'rgb(249, 115, 22)' },
  pink: { glow: 'rgba(236, 72, 153, 0.3)', glowRgb: '236, 72, 153', border: 'rgba(236, 72, 153, 0.3)', accent: '#ec4899', accentLight: 'rgb(236, 72, 153)' },
  cyan: { glow: 'rgba(34, 211, 238, 0.3)', glowRgb: '34, 211, 238', border: 'rgba(34, 211, 238, 0.3)', accent: '#22d3ee', accentLight: 'rgb(34, 211, 238)' },
};

export default function AuthCard({ 
  children, 
  title, 
  description,
  category = "Security",
  colorTheme = 'blue'
}: AuthCardProps) {
  const [isFormActive, setIsFormActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const colors = colorThemes[colorTheme];
  const shouldShowHover = isHovered || isFormActive;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          if (!isFormActive) setIsFormActive(false);
        }}
        onFocus={() => setIsFormActive(true)}
        onBlur={(e) => {
          if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as HTMLElement)) {
            setIsFormActive(false);
            setIsHovered(false);
          }
        }}
        className="w-full max-w-[480px] relative z-10 rounded-[20px] overflow-hidden transition-all duration-300"
        style={{
          transform: shouldShowHover ? 'translateY(-6px) scale(1.01)' : 'translateY(0) scale(1)',
        }}
      >
        {/* Glass background container */}
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />
        
        {/* Radial gradient accent */}
        <div 
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 20% 20%, ${colors.glow} 0%, transparent 50%)`,
            opacity: shouldShowHover ? 1 : 0,
          }}
        />
        
        {/* Border */}
        <div 
          className="absolute inset-0 rounded-[20px] pointer-events-none transition-all duration-300"
          style={{
            border: `1px solid ${shouldShowHover ? colors.border : 'rgba(255,255,255,0.05)'}`,
            boxShadow: shouldShowHover ? `0 0 30px ${colors.glow}` : 'none',
          }}
        />

        {/* Bottom accent line */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent, ${colors.accent}60, transparent)`,
            opacity: shouldShowHover ? 1 : 0,
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-8 sm:p-10">
          {/* Category Label */}
          {category && (
            <motion.p
              custom={0}
              variants={childVariants}
              className="text-xs uppercase tracking-[0.15em] text-white/40 mb-4 font-medium"
            >
              {category}
            </motion.p>
          )}

          {/* Title */}
          <motion.h1
            custom={1}
            variants={childVariants}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-tight"
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              custom={2}
              variants={childVariants}
              className="text-slate-400 text-base leading-relaxed mb-8 max-w-sm"
            >
              {description}
            </motion.p>
          )}

          {/* Form Content Wrapper */}
          <motion.div
            custom={3}
            variants={childVariants}
            onFocus={() => setIsFormActive(true)}
            onBlur={(e) => {
              if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as HTMLElement)) {
                setIsFormActive(false);
              }
            }}
            className="w-full"
          >
            {children}
          </motion.div>
        </div>

        {/* Subtle top glow line */}
        <div 
          className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent, ${colors.accentLight}30, transparent)`,
            opacity: shouldShowHover ? 0.5 : 0,
          }}
        />
      </motion.div>

      {/* Floating background element for extra polish */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 opacity-0 rounded-full blur-3xl pointer-events-none"
      />
    </div>
  );
}
