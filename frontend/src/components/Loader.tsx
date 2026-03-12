// spinner
import { Loader2 } from 'lucide-react';

export function Loader() {
    return (
        <div className="w-full py-4 flex items-center justify-center gap-2">
            <Loader2 className="w-3.5 h-3.5 text-white/30 animate-spin" />
            <span className="text-[13px] text-white/25">Building...</span>
        </div>
    );
}