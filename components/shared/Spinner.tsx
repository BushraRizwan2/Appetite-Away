
import React from 'react';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md' }) => {
    const sizeClasses = {
        sm: 'h-5 w-5 border-2',
        md: 'h-12 w-12 border-b-2',
        lg: 'h-24 w-24 border-b-4',
    };
  return (
    <div className={`animate-spin rounded-full border-rose-500 ${sizeClasses[size]}`}></div>
  );
};

export default Spinner;