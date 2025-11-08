import React from 'react';

interface ControlButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ControlButton: React.FC<ControlButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500/50 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${className}`}
    >
      {children}
    </button>
  );
};

export default ControlButton;