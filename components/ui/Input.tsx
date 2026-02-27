import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2 text-gray-300">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 bg-dark-light border border-neon-purple/25 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-neon-purple focus:border-neon-purple/50 focus:shadow-glow-purple transition-all duration-300 ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-neon-pink neon-text-pink">{error}</p>
      )}
    </div>
  );
}
