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
        <header className="flex flex-shrink-0 items-center justify-between border-b border-white/[0.07] bg-[#141616] px-4 py-2.5">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => navigate('/')}
                    className="rounded-[8px] p-2 text-white/34 transition-colors duration-200 hover:bg-white/[0.04] hover:text-white/65"
                    title="Back to Home"
                >
                    <Home className="w-4 h-4" />
                </button>
                
                <div className="flex items-center gap-3">
                    <span className="text-[15px] font-semibold tracking-[-0.01em] text-white/76">
                        1forge
                    </span>
                    {subtitle && (
                        <>
                            <span className="text-white/12">/</span>
                            <span className="max-w-[250px] truncate text-[13px] text-white/36">
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
            className="flex items-center gap-2 rounded-[8px] border border-white/[0.08] bg-white/[0.045] px-4 py-1.5 text-[13px] font-medium text-white/62 transition-colors duration-200 hover:border-[#35d4c7]/25 hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:bg-white/[0.02] disabled:opacity-40"
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
            className="flex items-center gap-2 rounded-[8px] bg-[#35d4c7] px-4 py-1.5 text-[13px] font-semibold text-[#071514] transition-colors duration-200 hover:bg-[#61e2d8] disabled:cursor-not-allowed disabled:bg-white/[0.08] disabled:text-white/30 disabled:opacity-50"
            title="Publishing feature coming soon"
        >
            <Rocket className="w-3.5 h-3.5" />
            Publish
        </button>
    );
}
