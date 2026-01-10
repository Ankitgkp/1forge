
// content panel for code editor and preview

import { ReactNode } from 'react';

interface MainPanelProps {
    children: ReactNode;
}

export function MainPanel({ children }: MainPanelProps) {
    return (
        <div className="col-span-4 flex flex-col bg-[#0d0d0d] min-h-0">
            <div className="flex-1 flex overflow-hidden">
                {children}
            </div>
        </div>
    );
}
