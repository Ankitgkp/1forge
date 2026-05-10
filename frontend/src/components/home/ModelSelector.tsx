// ai model selector dropdown 

import { Dropdown, DropdownItem } from '../ui';

interface ModelSelectorProps {
    model: string;
    setModel: (model: string) => void;
}

export function ModelSelector({ model, setModel }: ModelSelectorProps) {
    const models = [
        { id: 'openrouter/owl-alpha', name: 'Owl Alpha' },
        { id: 'nvidia/nemotron-3-super-120b-a12b:free', name: 'Nemotron 3 Super 120B A12B' },
        { id: 'anthropic/claude-3.5-sonnet', name: 'Claude', disabled: true },
        { id: 'openai/gpt-4o-mini', name: 'GPT', disabled: true },
    ];

    const selectedModelName = models.find(m => m.id === model)?.name || model;

    const trigger = (
        <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-[13px] text-white/50 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/[0.1] rounded-lg transition-all duration-200"
        >
            <span>{selectedModelName}</span>
            <span className="text-[9px] opacity-50">▼</span>
        </button>
    );

    return (
        <Dropdown trigger={trigger}>
            {models.map(m => (
                <DropdownItem
                    key={m.id}
                    onClick={m.disabled ? undefined : () => setModel(m.id)}
                    disabled={m.disabled}
                    className={
                        m.disabled
                            ? 'opacity-40 blur-[1px] cursor-not-allowed'
                            : model === m.id
                              ? 'bg-white/[0.06] text-white/80'
                              : ''
                    }
                >
                    <div className="flex items-center justify-between w-full">
                        <span>{m.name}</span>
                    </div>
                </DropdownItem>
            ))}
        </Dropdown>
    );
}
