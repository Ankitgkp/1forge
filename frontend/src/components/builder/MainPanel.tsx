
// content panel for code editor and preview

import { ReactNode } from 'react';

interface MainPanelProps {
    children: ReactNode;
}

export function MainPanel({ children }: MainPanelProps) {
    return (
        <div className="col-span-4 flex min-h-0 flex-col bg-[#171919]">
            <div className="flex-1 flex overflow-hidden">
                {children}
            </div>
        </div>
    );
}
