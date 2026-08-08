import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: 'teal' | 'orange' | 'green';
  height?: string;
  className?: string;
}

export function ProgressBar({ progress, color = 'teal', height = 'h-2.5', className = '' }: ProgressBarProps) {
  const colorMap = {
    teal: 'bg-[#007A63]',
    orange: 'bg-[#F97316]',
    green: 'bg-[#10B981]'
  };

  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full bg-[#E2E8F0] rounded-full overflow-hidden ${height} ${className}`}>
      <div
        className={`${colorMap[color]} h-full rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
}
