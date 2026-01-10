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
    default: 'bg-[#E5E3D5] border-[#D6D4C5] text-gray-600',
    outline: 'bg-transparent border-gray-800 text-gray-600',
    muted: 'bg-gray-100 text-gray-500'
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
            style={{
                animation: 'shimmer 2s ease-in-out infinite'
            }}
        >
            <style>{`
                @keyframes shimmer {
                    0%, 100% {
                        box-shadow: 0 0 4px 0 rgba(200, 200, 180, 0.4), 
                                    inset 0 0 2px 0 rgba(200, 200, 180, 0.2);
                        background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%);
                        background-size: 200% 100%;
                        background-position: 100% 0;
                    }
                    50% {
                        box-shadow: 0 0 12px 3px rgba(200, 200, 180, 0.7), 
                                    inset 0 0 6px 2px rgba(200, 200, 180, 0.4);
                        background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%);
                        background-size: 200% 100%;
                        background-position: -100% 0;
                    }
                }
            `}</style>
            {children}
        </span>
    );
}
