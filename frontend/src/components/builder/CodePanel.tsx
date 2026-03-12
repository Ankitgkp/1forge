// codepanel

import { FileExplorer } from '../FileExplorer';
import { CodeEditor } from '../CodeEditor';
import { FileItem } from '../../types';

interface CodePanelProps {
    files: FileItem[];
    selectedFile: FileItem | null;
    onFileSelect: (file: FileItem) => void;
}

export function CodePanel({ files, selectedFile, onFileSelect }: CodePanelProps) {
    return (
        <>
            <div className="w-56 flex-shrink-0 border-r border-white/[0.06] bg-[#111110]">
                <FileExplorer
                    files={files}
                    onFileSelect={onFileSelect}
                    selectedFile={selectedFile}
                />
            </div>
            <div className="flex-1 overflow-hidden bg-[#141413]">
                <CodeEditor file={selectedFile} />
            </div>
        </>
    );
}
