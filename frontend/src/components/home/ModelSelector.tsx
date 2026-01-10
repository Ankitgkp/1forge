// ai model selector dropdown 

import { Dropdown, DropdownItem } from '../ui';

interface ModelSelectorProps {
    selectedModel: string;
}

export function ModelSelector({ selectedModel }: ModelSelectorProps) {
    const trigger = (
        <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-300 bg-[#2a2a2a] hover:bg-[#333] rounded-full transition-colors"
        >
            <span>{selectedModel}</span>
            <span className="text-[10px] opacity-75">▼</span>
        </button>
    );

    return (
        <Dropdown trigger={trigger}>
            <DropdownItem disabled badge="Soon">Claude</DropdownItem>
            <DropdownItem disabled badge="Soon">Gemini</DropdownItem>
        </Dropdown>
    );
}
