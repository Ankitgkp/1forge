/**
 * Build steps list showing progress of file generation.
 */

import { CheckCircle, Circle, FileText, Terminal, Loader2 } from 'lucide-react';
import { Step, StepType } from '../types';
import { useEffect, useRef } from 'react';

interface StepsListProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
}

export function StepsList({ steps, currentStep, onStepClick }: StepsListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastStepRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest step
  useEffect(() => {
    if (lastStepRef.current && scrollContainerRef.current) {
      lastStepRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [steps.length]);

  return (
    <div className="h-full flex flex-col bg-[#111110]">
      <div className="px-4 py-4 border-b border-white/[0.06]">
        <h2 className="text-[13px] font-medium text-white/60">
          Build Steps
        </h2>
        <p className="text-[11px] text-white/20 mt-1">
          Follow the progress of your build
        </p>
      </div>
      <div ref={scrollContainerRef} className="flex-1 overflow-auto p-3 space-y-2">
        {steps.map((step, index) => {
          const isCurrent = currentStep === step.id;
          const isCompleted = step.status === 'completed';
          const isInProgress = step.status === 'in-progress';
          const uniqueKey = step.path ? `${step.type}-${step.path}` : `${step.type}-${index}`;
          const isLastStep = index === steps.length - 1;

          return (
            <div
              key={uniqueKey}
              ref={isLastStep ? lastStepRef : null}
              className={`group relative flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border ${isCurrent
                ? 'bg-white/[0.04] border-white/[0.08]'
                : 'bg-transparent border-transparent hover:border-white/[0.06] hover:bg-white/[0.02]'
                }`}
              onClick={() => onStepClick(step.id)}
            >
              <div className="flex-shrink-0 mt-0.5">
                {isCompleted ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400/70" />
                  </div>
                ) : isInProgress ? (
                  <div className="w-5 h-5 rounded-full bg-white/[0.06] flex items-center justify-center">
                    <Loader2 className="w-3.5 h-3.5 text-white/40 animate-spin" />
                  </div>
                ) : (
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isCurrent ? 'bg-white/[0.06]' : 'bg-white/[0.03]'}`}>
                    <Circle className={`w-3.5 h-3.5 ${isCurrent ? 'text-white/30' : 'text-white/15'}`} />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`text-[13px] font-medium truncate ${isCurrent || isCompleted ? 'text-white/60' : 'text-white/25'
                    }`}>
                    {step.title}
                  </h3>
                  <span className="text-[10px] text-white/20 font-mono px-1.5 py-0.5 rounded bg-white/[0.03]">
                    {step.type === StepType.CreateFile ? 'File' : 'Shell'}
                  </span>
                </div>
                {step.description && (
                  <p className={`text-[11px] leading-relaxed line-clamp-2 ${isCurrent ? 'text-white/30' : 'text-white/15'
                    }`}>
                    {step.description}
                  </p>
                )}
                {step.path && (
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-white/25 font-mono bg-white/[0.02] px-2 py-1 rounded-lg w-fit">
                    {step.type === StepType.CreateFile ? (
                      <FileText className="w-3 h-3" />
                    ) : (
                      <Terminal className="w-3 h-3" />
                    )}
                    <span className="truncate max-w-[150px]">{step.path}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}