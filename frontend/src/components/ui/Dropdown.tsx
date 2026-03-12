/**
 * Dropdown menu component with toggle functionality.
 */

import { ReactNode, useState, useRef, useEffect, ButtonHTMLAttributes } from 'react';

interface DropdownProps {
    trigger: ReactNode;
    children: ReactNode;
    className?: string;
}

interface DropdownItemProps {
    children: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    badge?: string;
}

export function Dropdown({ trigger, children, className = '' }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className={`relative ${className}`}>
            <div onClick={() => setIsOpen(!isOpen)}>
                {trigger}
            </div>
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#1c1c1b] border border-white/[0.08] rounded-xl shadow-xl shadow-black/40 backdrop-blur-sm">
                    <div className="p-1" onClick={() => setIsOpen(false)}>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}

// ... imports

interface DropdownItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    badge?: string;
    // className is already included in ButtonHTMLAttributes, but explicit definition is fine too if we want to override documentation
}

export function DropdownItem({ children, badge, className = '', ...props }: DropdownItemProps) {
    return (
        <button
            type="button"
            className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left text-white/60 hover:bg-white/[0.06] hover:text-white/80 rounded-lg transition-colors ${props.disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
            {...props}
        >
            <span>{children}</span>
            {badge && (
                <span className="text-[10px] bg-white/[0.06] text-white/30 px-1.5 py-0.5 rounded">
                    {badge}
                </span>
            )}
        </button>
    );
}
