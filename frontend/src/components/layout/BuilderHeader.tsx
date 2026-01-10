// nav cum header for builder page

import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Rocket } from 'lucide-react';

interface BuilderHeaderProps {
    subtitle?: string;
    children?: ReactNode;
}

export function BuilderHeader({ subtitle, children }: BuilderHeaderProps) {
    const navigate = useNavigate();
    
    return (
        <header className="bg-[#0a0a0a] border-b border-gray-800 px-4 py-2.5 flex flex-shrink-0 items-center justify-between">
            <div className="flex items-center gap-4">
                {/* Home button */}
                <button 
                    onClick={() => navigate('/')}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    title="Back to Home"
                >
                    <Home className="w-4 h-4" />
                </button>
                
                {/* Logo and project name */}
                <div className="flex items-center gap-3">
                    <span className="text-white font-bold">
                        <span className="text-xl">1</span>forge
                    </span>
                    {subtitle && (
                        <>
                            <span className="text-gray-600">/</span>
                            <span className="text-sm text-gray-400 truncate max-w-[250px]">
                                {subtitle}
                            </span>
                        </>
                    )}
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                {children}
                <PublishButton />
            </div>
        </header>
    );
}

function PublishButton() {
    return (
        <button className="flex items-center gap-2 bg-white hover:bg-gray-200 text-black text-sm font-medium px-4 py-1.5 rounded-lg transition-colors">
            <Rocket className="w-3.5 h-3.5" />
            Publish
        </button>
    );
}
