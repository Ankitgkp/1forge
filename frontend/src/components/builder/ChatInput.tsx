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
        <div className="p-3 border-t border-white/[0.06] bg-[#111110] flex-shrink-0">
            <div className="bg-white/[0.03] rounded-xl border border-white/[0.06] hover:border-white/[0.1] transition-all duration-200">
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Ask ${aiName || 'AI'} to help you...`}
                    className="w-full bg-transparent text-white/70 placeholder-white/20 text-[13px] p-3 pb-2 outline-none resize-none min-h-[60px]"
                    rows={2}
                />
                <div className="px-3 pb-3 flex items-center justify-between">
                    <span className="text-[10px] text-white/15">
                        Enter to send · Shift+Enter for new line
                    </span>
                    <button
                        disabled={disabled || !value.trim()}
                        onClick={onSubmit}
                        className="flex items-center justify-center w-7 h-7 bg-white/80 hover:bg-white disabled:opacity-15 disabled:cursor-not-allowed text-[#111110] rounded-lg transition-all duration-200"
                    >
                        <Send className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
}
