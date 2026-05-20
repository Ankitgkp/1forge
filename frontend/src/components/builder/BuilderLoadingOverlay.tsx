// Full-panel loading overlay shown while waiting for LLM response
// Provides visual feedback so users know the app is working

import { AlertTriangle, RefreshCw } from 'lucide-react';

interface BuilderLoadingOverlayProps {
    isLoading: boolean;
    error: string | null;
    onRetry?: () => void;
    onGoBack?: () => void;
}

export function BuilderLoadingOverlay({
    isLoading,
    error,
    onRetry,
    onGoBack,
}: BuilderLoadingOverlayProps) {
    if (!isLoading && !error) return null;

    return (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#141413]/95 backdrop-blur-sm">
            {error ? (
                <ErrorState error={error} onRetry={onRetry} onGoBack={onGoBack} />
            ) : (
                <LoadingState />
            )}
        </div>
    );
}

function LoadingState() {
    return (
        <div className="flex flex-col items-center gap-6 max-w-md px-8 text-center">
            <div className="relative w-20 h-20">
                <div
                    className="absolute inset-0 rounded-full border-2 border-white/[0.06]"
                    style={{ animation: 'none' }}
                />
                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: 'conic-gradient(from 0deg, transparent 0%, transparent 60%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.3) 100%)',
                        animation: 'spin 1.5s linear infinite',
                        maskImage: 'radial-gradient(transparent 58%, black 60%, black 68%, transparent 70%)',
                        WebkitMaskImage: 'radial-gradient(transparent 58%, black 60%, black 68%, transparent 70%)',
                    }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className="w-3 h-3 rounded-full bg-white/30"
                        style={{ animation: 'pulse 2s ease-in-out infinite' }}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-[15px] font-medium text-white/60">
                    Generating your project
                </h3>
                <p className="text-[13px] text-white/25 leading-relaxed">
                    Analyzing your prompt and building the code structure. This may take a few moments…
                </p>
            </div>

            <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-white/20"
                        style={{
                            animation: 'bounce-dot 1.4s ease-in-out infinite',
                            animationDelay: `${i * 0.16}s`,
                        }}
                    />
                ))}
            </div>

            <style>{`
                @keyframes bounce-dot {
                    0%, 80%, 100% {
                        transform: scale(0.6);
                        opacity: 0.3;
                    }
                    40% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}

function ErrorState({
    error,
    onRetry,
    onGoBack,
}: {
    error: string;
    onRetry?: () => void;
    onGoBack?: () => void;
}) {
    return (
        <div className="flex flex-col items-center gap-5 max-w-md px-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-red-400/70" />
            </div>

            <div className="space-y-2">
                <h3 className="text-[15px] font-medium text-white/70">
                    Something went wrong
                </h3>
                <p className="text-[13px] text-white/30 leading-relaxed">
                    {error}
                </p>
            </div>

            <div className="flex items-center gap-3 mt-1">
                {onGoBack && (
                    <button
                        onClick={onGoBack}
                        className="px-4 py-2 text-[13px] font-medium text-white/40 hover:text-white/60 rounded-lg border border-white/[0.08] hover:border-white/[0.15] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-200"
                    >
                        Go Back
                    </button>
                )}
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="px-4 py-2 text-[13px] font-medium text-white/80 rounded-lg bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] hover:border-white/[0.2] transition-all duration-200 flex items-center gap-2"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Try Again
                    </button>
                )}
            </div>
        </div>
    );
}
