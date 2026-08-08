import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 transition-shadow hover:shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
