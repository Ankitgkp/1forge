// Single-model display for the configured AI provider.

import { useEffect } from 'react';

interface ModelSelectorProps {
    model: string;
    setModel: (model: string) => void;
}

export function ModelSelector({ model, setModel }: ModelSelectorProps) {
    const modelId = 'tencent/hy3:free';
    const modelName = 'Tencent HY3';

    useEffect(() => {
        if (model !== modelId) {
            setModel(modelId);
        }
    }, [model, setModel]);

    return (
        <button
            type="button"
            className="hidden h-9 items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 text-[13px] font-semibold text-white/58 transition-colors hover:border-[#8ce9e1]/28 hover:text-white/78 sm:inline-flex"
            title={modelId}
        >
            <span className="h-1.5 w-1.5 rounded-full bg-[#35d4c7]" />
            <span>{modelName}</span>
        </button>
    );
}
