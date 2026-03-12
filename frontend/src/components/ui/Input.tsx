/**
 * Reusable Input component with consistent styling.
 */

import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: 'default' | 'dark';
}

const variantStyles = {
    default: 'bg-white border-gray-300 text-gray-800 placeholder-gray-400',
    dark: 'bg-white/[0.03] border-white/[0.08] text-white/70 placeholder-white/20 focus:border-white/[0.15]'
};

export function Input({ 
    variant = 'default', 
    className = '', 
    ...props 
}: InputProps) {
    const baseStyles = 'w-full border rounded-xl px-3.5 py-2.5 text-[14px] outline-none transition-colors duration-200';
    
    return (
        <input
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            {...props}
        />
    );
}
