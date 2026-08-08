'use client';

import React, { useState } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'dark-outline' | 'teal-outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  animateOnClick?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  onClick,
  animateOnClick = true,
  ...props
}: ButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (animateOnClick) {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 200);
    }
    if (onClick) {
      onClick(e);
    }
  };

  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const variantStyles = {
    primary: 'bg-[#007A63] hover:bg-[#006250] text-white shadow-sm hover:shadow-md tracking-wider uppercase font-bold',
    secondary: 'bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] hover:border-[#94A3B8]',
    danger: 'bg-white border border-red-400 text-red-600 hover:bg-red-50 text-xs font-semibold',
    'dark-outline': 'bg-[#1E293B] border border-[#334155] text-white hover:bg-[#334155]',
    'teal-outline': 'bg-white border border-[#007A63] text-[#007A63] hover:bg-[#E6F4F1] font-semibold'
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${isClicked ? 'animate-btn-click' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
