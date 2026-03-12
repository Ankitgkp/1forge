/**
 * File tree explorer for navigating project files.
 */

import { useState } from 'react';
import { FolderTree, File, ChevronRight, ChevronDown } from 'lucide-react';
import { FileItem } from '../types';

interface FileExplorerProps {
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
  selectedFile?: FileItem | null;
}

interface FileNodeProps {
  item: FileItem;
  depth: number;
  onFileClick: (file: FileItem) => void;
  selectedFile?: FileItem | null;
}

function FileNode({ item, depth, onFileClick, selectedFile }: FileNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleClick = () => {
    if (item.type === 'folder') {
      setIsExpanded(!isExpanded);
    } else {
      onFileClick(item);
    }
  };

  const isSelected = selectedFile?.path === item.path;

  return (
    <div className="select-none">
      <div
        className={`flex items-center gap-2 px-2 py-1.5 hover:bg-white/[0.04] cursor-pointer transition-colors duration-150 ${isSelected ? 'bg-white/[0.05] text-white/70' : 'text-white/35'
          }`}
        style={{ paddingLeft: `${depth * 1.2 + 0.5}rem` }}
        onClick={handleClick}
      >
        <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
          {item.type === 'folder' && (
            <span className="text-white/20">
              {isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </span>
          )}
        </span>
        <span className="flex-shrink-0">
          {item.type === 'folder' ? (
            <FolderTree className="w-4 h-4 text-amber-400/60" />
          ) : (
            <File className="w-4 h-4 text-blue-400/50" />
          )}
        </span>
        <span className="text-[13px] truncate">{item.name}</span>
      </div>
      {item.type === 'folder' && isExpanded && item.children && (
        <div className="mt-0.5">
          {item.children.map((child, index) => (
            <FileNode
              key={`${child.path}-${index}`}
              item={child}
              depth={depth + 1}
              onFileClick={onFileClick}
              selectedFile={selectedFile}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileExplorer({ files, onFileSelect, selectedFile }: FileExplorerProps) {
  return (
    <div className="bg-[#111110] h-full overflow-hidden flex flex-col">
      <div className="px-3 py-3 border-b border-white/[0.06] flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-[11px] font-medium text-white/30 flex items-center gap-1.5 uppercase tracking-wider">
            <FolderTree className="w-3.5 h-3.5" />
            Files
          </h2>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search files..."
            className="w-full bg-white/[0.03] border border-white/[0.06] text-white/50 text-[12px] px-2.5 py-1.5 rounded-lg outline-none focus:border-white/[0.12] transition-colors placeholder-white/15"
            readOnly
          />
        </div>
      </div>
      <div className="flex-1 overflow-auto py-1">
        <div className="space-y-0.5">
          {files.map((file, index) => (
            <FileNode
              key={`${file.path}-${index}`}
              item={file}
              depth={0}
              onFileClick={onFileSelect}
              selectedFile={selectedFile}
            />
          ))}
        </div>
      </div>
    </div>
  );
}