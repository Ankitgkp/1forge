// Landing page hero section

import { Badge } from "../ui";

export function HeroSection() {
  return (
    <div className="space-y-6 text-center">
      <Badge>
        <span className="relative flex h-2 w-2 ">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-800 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-600"></span>
        </span>
        <span>Introducing 1forge</span>
      </Badge>
      <h1 className="text-5xl md:text-6xl font-serif text-[#2C2C2C]">
        What you want to create?
      </h1>
    </div>
  );
}
