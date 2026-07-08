// Minimal home navigation.

export function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-30 px-5 py-5 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center">
        <span className="text-[20px] font-semibold tracking-[-0.035em] text-white">
          1forge
        </span>
      </div>
    </nav>
  );
}
