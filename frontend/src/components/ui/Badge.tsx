/**
 * Badge component for displaying labels and tags.
 */

import { ReactNode } from 'react';

interface BadgeProps {
    children: ReactNode;
    variant?: 'default' | 'outline' | 'muted';
    className?: string;
}

const variantStyles = {
    default: 'bg-white/[0.04] border-white/[0.08] text-white/50',
    outline: 'bg-transparent border-white/[0.08] text-white/50',
    muted: 'bg-white/[0.03] border-transparent text-white/40'
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
    return (
        <span 
            className={`
                inline-flex items-center gap-2 px-3 py-1.5 
                rounded-full border text-xs font-medium 
                ${variantStyles[variant]} 
                ${className}
            `}
        >
            {children}
        </span>
    );
}
