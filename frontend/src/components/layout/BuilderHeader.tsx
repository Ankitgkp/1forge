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
        <header className="bg-[#111110] border-b border-white/[0.06] px-4 py-2.5 flex flex-shrink-0 items-center justify-between">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => navigate('/')}
                    className="p-2 text-white/30 hover:text-white/60 hover:bg-white/[0.04] rounded-lg transition-all duration-200"
                    title="Back to Home"
                >
                    <Home className="w-4 h-4" />
                </button>
                
                <div className="flex items-center gap-3">
                    <span className="text-white/70 font-semibold">
                        <span className="text-lg font-serif italic">1</span>
                        <span className="text-sm">forge</span>
                    </span>
                    {subtitle && (
                        <>
                            <span className="text-white/10">/</span>
                            <span className="text-[13px] text-white/30 truncate max-w-[250px]">
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
            className="flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.08] disabled:bg-white/[0.02] disabled:cursor-not-allowed disabled:opacity-40 text-white/70 text-[13px] font-medium px-4 py-1.5 rounded-lg transition-all duration-200 border border-white/[0.06]"
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
            className="flex items-center gap-2 bg-white/90 hover:bg-white disabled:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:text-white/30 text-[#111110] text-[13px] font-medium px-4 py-1.5 rounded-lg transition-all duration-200"
            title="Publishing feature coming soon"
        >
            <Rocket className="w-3.5 h-3.5" />
            Publish
        </button>
    );
}
