// landig page with prompt input for project generation

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/layout";
import { PromptInput, GitHubImport } from "../components/home";
import { BackgroundLines } from "../components/ui/background-lines";
import { Sparkles, Users, Wand2 } from "lucide-react";

export function Home() {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      navigate("/builder", { state: { prompt } });
    }
  };

  const handleFeatureClick = (featurePrompt: string) => {
    navigate("/builder", { state: { prompt: featurePrompt } });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans relative overflow-hidden bg-noise">
      <BackgroundLines
        className="absolute inset-0 z-0"
        svgOptions={{ duration: 8 }}
      >
        <div className="absolute inset-0" />
      </BackgroundLines>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/4 w-[800px] h-[600px] bg-gradient-radial from-gray-800/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <Navbar />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-3xl w-full flex flex-col items-center text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold opacity-85 italic text-white tracking-tight">
            What you want to build?
          </h1>

          <p className="text-gray-400 text-m">
            Type your prompt below and press the button to start the journey.
          </p>

          <div className="w-full max-w-2xl mt-4">
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              onSubmit={handleSubmit}
            />
          </div>

          <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <FeatureCard
              icon={<Sparkles className="w-4 h-4" />}
              title="Gaming Portfolio"
              description="Complete gaming showcase website with hero section, game gallery, and contact form."
              onClick={() =>
                handleFeatureClick(
                  "Create a modern gaming portfolio website using React and TypeScript with minimal and clean design. Include: 1) Animated hero section with solid color gradient background and sharp-edged CTA buttons, 2) Game showcase grid with sharp borders, hover effects and modal previews, 3) About section with rectangular team member cards with solid backgrounds, 4) Featured games carousel with sharp edges and auto-play, 5) Contact form with validation and sharp input fields, 6) Responsive navigation with mobile menu, 7) Dark theme with solid neon accent colors (purple/cyan) and sharp geometric shapes, 8) Smooth scroll animations, 9) Footer with social links. Use Tailwind CSS for styling with sharp borders and solid colors throughout.  also add 2-4 pages"
                )
              }
            />
            <FeatureCard
              icon={<Users className="w-4 h-4" />}
              title="Marketing Agency"
              description="Professional agency website with services, portfolio, testimonials, and pricing."
              onClick={() =>
                handleFeatureClick(
                  "Build a complete marketing agency website with React and TypeScript in minimal and clean design style. Features needed: 1) Hero section with solid color blocks and sharp-edged animated text, 2) Services section with rectangular icon cards with solid backgrounds (SEO, Social Media, Content, PPC), 3) Interactive portfolio grid with sharp borders and filter by category, 4) Client testimonials carousel with rectangular cards and star ratings, 5) Pricing table with sharp-edged comparison boxes and solid color accents, 6) Team section with rectangular member profile cards, 7) Stats counter animation in sharp boxes (clients served, projects completed), 8) Contact form with sharp input fields, 9) Sticky header with sharp navigation. Modern design with solid gradient colors, sharp edges, and minimal clean aesthetic throughout  also add 2-4 pages."
                )
              }
            />
            <FeatureCard
              icon={<Wand2 className="w-4 h-4" />}
              title="Minimal Portfolio"
              description="Clean personal portfolio with sharp edges, solid colors, and modern minimal aesthetic."
              onClick={() =>
                handleFeatureClick(
                  "Create a minimal personal portfolio website using React and TypeScript with clean design and sharp edges. Include: 1) Hero section with solid color background, sharp typography, and rectangular CTA button, 2) About section with rectangular image and solid color accent blocks, 3) Projects/work showcase in sharp grid layout with solid color overlays on hover, 4) Skills section with rectangular progress bars or icon blocks with solid backgrounds, 5) Experience/timeline section with sharp geometric shapes, 6) Contact section with sharp-edged form inputs and solid color button, 7) Smooth scroll navigation with sharp menu items, 8) Responsive design for all devices, 9) Solid color scheme (2-3 colors max) with sharp borders throughout. Use Tailwind CSS with focus on minimalism, sharp edges (no rounded corners), and solid colors (no gradients except subtle accents also add 2-4 pages)."
                )
              }
            />
          </div>

          <GitHubImport />
        </div>
      </main>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

function FeatureCard({ icon, title, description, onClick }: FeatureCardProps) {
  return (
    <div
      className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 text-left hover:border-blue-500/50 hover:bg-[#1f1f1f] transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="inline-flex items-center gap-2 bg-[#2a2a2a] group-hover:bg-blue-500/20 text-gray-300 group-hover:text-blue-400 text-sm px-3 py-1.5 rounded-full mb-3 transition-colors">
        {icon}
        <span>{title}</span>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      <div className="mt-3 flex items-center gap-1 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Try this example</span>
        <span>→</span>
      </div>
    </div>
  );
}
