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
    <div className="h-full flex flex-col bg-[#0a0a0a]">
      <div className="px-4 py-4 border-b border-gray-800">
        <h2 className="text-sm font-medium text-white">
          Build Steps
        </h2>
        <p className="text-xs text-gray-500 mt-1">
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
                ? 'bg-[#1a1a1a] border-gray-700'
                : 'bg-[#0d0d0d] border-gray-800 hover:border-gray-700 hover:bg-[#1a1a1a]'
                }`}
              onClick={() => onStepClick(step.id)}
            >
              <div className="flex-shrink-0 mt-0.5">
                {isCompleted ? (
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                  </div>
                ) : isInProgress ? (
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                    <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                  </div>
                ) : (
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isCurrent ? 'bg-gray-700' : 'bg-gray-800'}`}>
                    <Circle className={`w-3.5 h-3.5 ${isCurrent ? 'text-gray-400' : 'text-gray-600'}`} />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`text-sm font-medium truncate ${isCurrent || isCompleted ? 'text-gray-200' : 'text-gray-500'
                    }`}>
                    {step.title}
                  </h3>
                  <span className="text-[10px] text-gray-500 font-mono px-1.5 py-0.5 rounded bg-gray-800">
                    {step.type === StepType.CreateFile ? 'File' : 'Shell'}
                  </span>
                </div>
                {step.description && (
                  <p className={`text-xs leading-relaxed line-clamp-2 ${isCurrent ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                    {step.description}
                  </p>
                )}
                {step.path && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500 font-mono bg-black/30 px-2 py-1 rounded-lg w-fit">
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