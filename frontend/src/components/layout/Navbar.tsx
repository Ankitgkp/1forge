// navbar comp

export function Navbar() {
  return (
    <nav className="relative z-10 flex items-center justify-between px-8 py-5 max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-1.5">
        <span className="text-white/80 font-semibold tracking-tight">
          <span className="text-2xl font-serif italic">1</span>
          <span className="text-sm">forge</span>
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-[11px] text-white/15 font-medium tracking-wide">v0.1</span>
      </div>
    </nav>
  );
}
