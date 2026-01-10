// spinner
import { Loader2 } from 'lucide-react';

export function Loader() {
    return (
        <div className="w-full py-4 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 text-white animate-spin" />
            <span className="text-sm text-gray-400">Building...</span>
        </div>
    );
}