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
            <div className="w-56 flex-shrink-0 border-r border-white/[0.07] bg-[#141616]">
                <FileExplorer
                    files={files}
                    onFileSelect={onFileSelect}
                    selectedFile={selectedFile}
                />
            </div>
            <div className="flex-1 overflow-hidden bg-[#171919]">
                <CodeEditor file={selectedFile} />
            </div>
        </>
    );
}
