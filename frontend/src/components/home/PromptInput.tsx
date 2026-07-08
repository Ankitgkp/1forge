// Prompt input box form.

import { FormEvent } from "react";
import { ArrowUp, Globe2, Plus } from "lucide-react";
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
    <div className="input-glow w-full rounded-[22px] border border-white/[0.14] bg-[#0f1418]/90 p-1.5 shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl transition-colors duration-200 hover:border-white/[0.22]">
      <form onSubmit={onSubmit}>
        <div className="rounded-[18px] border border-white/[0.08] bg-[#171d22]/96 px-5 pb-3 pt-4 md:px-6 md:pt-5">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Describe your idea..."
            className="min-h-[92px] w-full resize-none bg-transparent text-[16px] leading-relaxed text-white/82 outline-none placeholder:text-white/34 md:min-h-[108px] md:text-[17px]"
            rows={3}
          />

          <div className="flex items-center justify-between pt-3">
            <div className="flex min-w-0 items-center gap-2">
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] text-white/56 transition-colors hover:border-white/[0.22] hover:bg-white/[0.08] hover:text-white"
                title="Add context"
              >
                <Plus className="h-4.5 w-4.5" />
              </button>
              <span className="inline-flex h-9 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] px-3.5 text-[13px] font-semibold text-white/72">
                <Globe2 className="h-4 w-4 text-[#8ce9e1]/80" />
                Website
              </span>
              <ModelSelector model={model} setModel={onModelChange} />
            </div>
            <button
              type="submit"
              disabled={!value.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#071514] shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#8ce9e1] disabled:cursor-not-allowed disabled:bg-white/[0.1] disabled:text-white/32 disabled:shadow-none disabled:hover:translate-y-0"
              title="Send"
            >
              <ArrowUp className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
