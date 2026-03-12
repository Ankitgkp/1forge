/**
 * Tab switcher for code/preview views.
 */

import { Code2, Eye } from 'lucide-react';

interface TabViewProps {
  activeTab: 'code' | 'preview';
  onTabChange: (tab: 'code' | 'preview') => void;
  disabled?: boolean;
}

export function TabView({ activeTab, onTabChange, disabled = false }: TabViewProps) {
  
  const handlePreviewClick = () => {
    if (!disabled) {
      onTabChange('preview');
    }
  };

  return (
    <div className="flex items-center bg-white/[0.04] rounded-lg p-0.5 gap-0.5">
      <button
        onClick={() => onTabChange('code')}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium transition-all duration-200 rounded-md ${
          activeTab === 'code'
            ? 'bg-white/90 text-[#111110]'
            : 'text-white/35 hover:text-white/60 hover:bg-white/[0.04]'
          }`}
      >
        <Code2 className="w-3.5 h-3.5" />
        Code
      </button>
      <button
        onClick={handlePreviewClick}
        disabled={disabled}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium transition-all duration-200 rounded-md ${
          disabled 
            ? 'text-white/15 cursor-not-allowed' 
            : activeTab === 'preview'
            ? 'bg-white/90 text-[#111110]'
            : 'text-white/35 hover:text-white/60 hover:bg-white/[0.04]'
          }`}
        title={disabled ? 'Wait for code generation to complete' : 'Preview'}
      >
        <Eye className="w-3.5 h-3.5" />
        Preview
      </button>
    </div>
  );
}