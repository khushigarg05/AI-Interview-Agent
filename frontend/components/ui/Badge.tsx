import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'teal' | 'gray' | 'orange' | 'red';
  className?: string;
}

export function Badge({ children, variant = 'gray', className = '' }: BadgeProps) {
  const variantStyles = {
    green: 'bg-[#DCFCE7] text-[#15803D] border-[#86EFAC]',
    teal: 'bg-[#E6F4F1] text-[#007A63] border-[#B2DFD6]',
    gray: 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]',
    orange: 'bg-[#FFEDD5] text-[#C2410C] border-[#FDBA74]',
    red: 'bg-[#FEE2E2] text-[#B91C1C] border-[#FCA5A5]'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
