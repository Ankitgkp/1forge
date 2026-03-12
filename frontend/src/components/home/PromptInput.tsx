// prompt input box form

import { FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { ModelSelector } from "./ModelSelector";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  model: string;
  onModelChange: (model: string) => void;
}

export function PromptInput({ value, onChange, onSubmit, model, onModelChange }: PromptInputProps) {
  return (
    <div className="w-full bg-white/[0.03] rounded-2xl border border-white/[0.06] hover:border-white/[0.1] transition-all duration-300 shadow-2xl shadow-black/30">
      <form onSubmit={onSubmit}>
        <div className="p-5 pb-3">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Describe what you want to build..."
            className="w-full bg-transparent text-white/80 placeholder-white/20 text-[15px] leading-relaxed outline-none resize-none min-h-[64px]"
            rows={2}
          />
        </div>

        <div className="px-5 pb-4 flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <ModelSelector model={model} setModel={onModelChange} />
            <span className="text-[11px] text-white/15">free</span>
          </div>
          <button
            type="submit"
            disabled={!value.trim()}
            className="flex items-center justify-center w-9 h-9 bg-white/90 hover:bg-white disabled:opacity-20 disabled:cursor-not-allowed text-[#0e0e0d] rounded-xl transition-all duration-200"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
