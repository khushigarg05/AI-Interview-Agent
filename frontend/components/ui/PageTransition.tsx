'use client';

import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  return (
    <div className={`animate-slide-up w-full ${className}`}>
      {children}
    </div>
  );
}
