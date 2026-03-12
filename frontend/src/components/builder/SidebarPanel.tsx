// sidebar panel for builder page for steps for generating the files

import { ReactNode } from 'react';

interface SidebarPanelProps {
    children: ReactNode;
}

export function SidebarPanel({ children }: SidebarPanelProps) {
    return (
        <div className="col-span-2 border-r border-white/[0.06] bg-[#111110] flex flex-col min-h-0">
            {children}
        </div>
    );
}

interface SidebarContentProps {
    children: ReactNode;
}

export function SidebarContent({ children }: SidebarContentProps) {
    return (
        <div className="flex-1 overflow-auto p-4">
            {children}
        </div>
    );
}
