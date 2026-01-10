// nav cum header for builder page

import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Rocket, Download } from 'lucide-react';
import { FileItem } from '../../types';
import { downloadProjectAsZip } from '../../utils';

interface BuilderHeaderProps {
    subtitle?: string;
    children?: ReactNode;
    files?: FileItem[];
    isGenerating?: boolean;
}

export function BuilderHeader({ subtitle, children, files = [], isGenerating = false }: BuilderHeaderProps) {
    const navigate = useNavigate();
    
    const handleDownload = () => {
        const projectName = subtitle ? subtitle.substring(0, 30).replace(/[^a-z0-9]/gi, '-').toLowerCase() : 'my-project';
        downloadProjectAsZip(files, projectName);
    };
    
    return (
        <header className="bg-[#0a0a0a] border-b border-gray-800 px-4 py-2.5 flex flex-shrink-0 items-center justify-between">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => navigate('/')}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    title="Back to Home"
                >
                    <Home className="w-4 h-4" />
                </button>
                
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
                <DownloadButton onClick={handleDownload} disabled={files.length === 0 || isGenerating} />
                <PublishButton disabled={true} />
            </div>
        </header>
    );
}

function DownloadButton({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors border border-gray-700"
            title={disabled ? 'Wait for code generation to complete' : 'Download project as ZIP'}
        >
            <Download className="w-3.5 h-3.5" />
            Download
        </button>
    );
}

function PublishButton({ disabled }: { disabled: boolean }) {
    return (
        <button 
            disabled={disabled}
            className="flex items-center gap-2 bg-white hover:bg-gray-200 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 text-black text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
            title="Publishing feature coming soon"
        >
            <Rocket className="w-3.5 h-3.5" />
            Publish
        </button>
    );
}
