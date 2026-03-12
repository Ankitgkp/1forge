// webcontainer preview panel 

import { WebContainer } from '@webcontainer/api';
import { PreviewFrame } from '../PreviewFrame';
import { FileItem } from '../../types';

interface PreviewPanelProps {
    webContainer?: WebContainer;
    files: FileItem[];
    isGenerating?: boolean;
}

export function PreviewPanel({ webContainer, files, isGenerating = false }: PreviewPanelProps) {
    return (
        <div className="flex-1 overflow-auto relative">
            <PreviewFrame webContainer={webContainer} files={files} />
            {isGenerating && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-[#1c1c1b] backdrop-blur-sm text-white/60 px-5 py-2.5 rounded-xl shadow-xl shadow-black/40 flex items-center gap-3 border border-white/[0.08]">
                        <svg className="animate-spin h-3.5 w-3.5 text-white/30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-[13px] font-medium">Building your project…</span>
                    </div>
                </div>
            )}
        </div>
    );
}