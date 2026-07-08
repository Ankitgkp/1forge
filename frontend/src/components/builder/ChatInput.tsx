// chat input box
import { Send } from 'lucide-react';

interface ChatInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    disabled: boolean;
    aiName?: string;
}

export function ChatInput({ value, onChange, onSubmit, disabled, aiName }: ChatInputProps) {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!disabled && value.trim()) {
                onSubmit();
            }
        }
    };

    return (
        <div className="flex-shrink-0 border-t border-white/[0.07] bg-[#141616] p-3">
            <div className="rounded-[8px] border border-white/[0.08] bg-[#1a1c1c] transition-colors duration-200 hover:border-white/[0.15]">
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Ask ${aiName || 'AI'} to help you...`}
                    className="min-h-[60px] w-full resize-none bg-transparent p-3 pb-2 text-[13px] text-white/70 outline-none placeholder:text-white/28"
                    rows={2}
                />
                <div className="px-3 pb-3 flex items-center justify-between">
                    <span className="text-[10px] text-white/15">
                        Enter to send · Shift+Enter for new line
                    </span>
                    <button
                        disabled={disabled || !value.trim()}
                        onClick={onSubmit}
                        className="flex h-7 w-7 items-center justify-center rounded-[8px] border border-white/[0.08] bg-white/[0.06] text-white/55 transition-colors duration-200 hover:bg-[#35d4c7] hover:text-[#071514] disabled:cursor-not-allowed disabled:opacity-15"
                    >
                        <Send className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
}
