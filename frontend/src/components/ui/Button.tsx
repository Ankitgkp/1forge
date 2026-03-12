/**
 * Reusable Button component with multiple variants and sizes.
 */

import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-white/90 hover:bg-white text-[#111110]',
    secondary: 'bg-white/[0.06] hover:bg-white/[0.1] text-white/70 border border-white/[0.08]',
    ghost: 'hover:bg-white/[0.04] text-white/50',
    icon: 'flex items-center justify-center'
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5'
};

export function Button({ 
    variant = 'primary', 
    size = 'md', 
    className = '', 
    disabled,
    children, 
    ...props 
}: ButtonProps) {
    const baseStyles = 'rounded-xl font-medium transition-all duration-200 disabled:opacity-40';
    
    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
