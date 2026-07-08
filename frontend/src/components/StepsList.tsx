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
    <div className="flex h-full flex-col bg-[#141616]">
      <div className="border-b border-white/[0.07] px-4 py-4">
        <h2 className="text-[13px] font-semibold text-white/62">
          Build Steps
        </h2>
        <p className="mt-1 text-[11px] text-white/26">
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
              className={`group relative flex cursor-pointer items-start gap-3 rounded-[8px] border p-3 transition-colors duration-200 ${isCurrent
                ? 'border-[#35d4c7]/20 bg-[#123c3a]/45'
                : 'border-transparent bg-transparent hover:border-white/[0.07] hover:bg-white/[0.025]'
                }`}
              onClick={() => onStepClick(step.id)}
            >
              <div className="flex-shrink-0 mt-0.5">
                {isCompleted ? (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#35d4c7]/12">
                    <CheckCircle className="h-3.5 w-3.5 text-[#35d4c7]/80" />
                  </div>
                ) : isInProgress ? (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.06]">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-white/45" />
                  </div>
                ) : (
                  <div className={`flex h-5 w-5 items-center justify-center rounded-full ${isCurrent ? 'bg-white/[0.06]' : 'bg-white/[0.03]'}`}>
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
                  <span className="rounded-[6px] bg-white/[0.035] px-1.5 py-0.5 font-mono text-[10px] text-white/24">
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
                  <div className="mt-2 flex w-fit items-center gap-1.5 rounded-[6px] bg-white/[0.025] px-2 py-1 font-mono text-[11px] text-white/28">
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
