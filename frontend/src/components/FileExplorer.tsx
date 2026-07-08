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
        className={`flex cursor-pointer items-center gap-2 rounded-[6px] px-2 py-1.5 transition-colors duration-150 hover:bg-white/[0.04] ${isSelected ? 'bg-[#123c3a]/70 text-white/76' : 'text-white/38'
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
            <FolderTree className="h-4 w-4 text-[#35d4c7]/50" />
          ) : (
            <File className="h-4 w-4 text-white/35" />
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
    <div className="flex h-full flex-col overflow-hidden bg-[#141616]">
      <div className="flex flex-col gap-2 border-b border-white/[0.07] px-3 py-3">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/34">
            <FolderTree className="w-3.5 h-3.5" />
            Files
          </h2>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search files..."
            className="w-full rounded-[8px] border border-white/[0.08] bg-white/[0.035] px-2.5 py-1.5 text-[12px] text-white/50 outline-none transition-colors placeholder:text-white/18 focus:border-[#35d4c7]/28"
            readOnly
          />
        </div>
      </div>
      <div className="flex-1 overflow-auto px-1 py-1">
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
