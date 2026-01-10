// navbar comp
// import { useNavigate } from "react-router-dom";
import { Button } from "../ui";

export function Navbar() {
  // const navigate = useNavigate();

  return (
    <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-2">
        <span className="text-l font-bold tracking-tight text-white">
          <span className="text-3xl">1</span>forge
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 bg-gray-400/10 px-2 py-1 rounded-full border border-gray-600/20">
          Work in Progress
        </span>
        <Button
          variant="ghost"
          className="text-white opacity-70 hover:text-white hover:bg-white/10 cursor-not-allowed"
          onClick={(e) => e.preventDefault()}
        >
          Sign In
        </Button>
      </div>
    </nav>
  );
}
