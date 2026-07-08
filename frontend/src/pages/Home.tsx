// Landing page with prompt input for project generation.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "../components/layout";
import { PromptInput, GitHubImport } from "../components/home";
import { BACKEND_URL } from "../config";

const DEFAULT_MODEL = "cohere/north-mini-code:free";
const EXAMPLES = [
  {
    title: "Build appointment booking website",
    prompt:
      "Build a modern appointment booking website with React and TypeScript. Include service selection, availability calendar, booking form, confirmation screen, admin-style booking list, responsive navigation, clean dark theme, and 2-4 pages.",
  },
  {
    title: "Build restaurant ordering website",
    prompt:
      "Build a restaurant ordering website with React and TypeScript. Include menu categories, item detail modal, cart, checkout form, order status page, restaurant info section, responsive layout, polished dark theme, and 2-4 pages.",
  },
  {
    title: "Create real estate listing website",
    prompt:
      "Create a real estate listing website with React and TypeScript. Include property search filters, listing cards, property detail page, agent contact form, saved homes UI, neighborhood highlights, dark premium styling, and 2-4 pages.",
  },
  {
    title: "Create SaaS analytics dashboard",
    prompt:
      "Create a SaaS analytics dashboard with React and TypeScript. Include KPI cards, charts, activity feed, customer table, billing overview, settings page, responsive sidebar layout, dark professional styling, and 2-4 pages.",
  },
];

export function Home() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState(DEFAULT_MODEL);
  const [aiName, setAiName] = useState("North Mini Code");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BACKEND_URL}/settings`)
      .then(res => res.json())
      .then(data => {
        setModel(data.model);
        setAiName(data.aiName);
      })
      .catch(err => console.error("Failed to fetch AI settings:", err));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      navigate("/builder", { state: { prompt, model, aiName } });
    }
  };

  const handleFeatureClick = (featurePrompt: string) => {
    navigate("/builder", { state: { prompt: featurePrompt, model, aiName } });
  };

  return (
    <div className="home-shell relative min-h-screen overflow-hidden text-white/90">
      <Navbar />

      <main className="relative z-10 flex min-h-screen justify-center px-5 pb-10 pt-24 md:px-10 md:pt-28">
        <div className="animate-page-in w-full max-w-[980px] text-center">
          <h1 className="mx-auto max-w-[720px] text-[36px] font-semibold leading-[1.08] tracking-[-0.045em] text-white md:text-[54px]">
            The fastest way to build a website with AI
          </h1>

          <p className="mx-auto mt-4 max-w-[600px] text-[15px] leading-7 text-white/62 md:text-[17px]">
            Create production-ready websites, apps, and dashboards by turning natural language prompts into working software.
          </p>

          <div className="mx-auto mt-8 w-full max-w-[700px]">
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              onSubmit={handleSubmit}
              model={model}
              onModelChange={setModel}
            />
          </div>

          <div className="mx-auto mt-6 w-full max-w-[680px] overflow-hidden rounded-[16px] border border-white/[0.09] bg-[#10161a]/70 text-left shadow-[0_18px_64px_rgba(0,0,0,0.24)] backdrop-blur-xl">
            {EXAMPLES.map((example, index) => (
              <button
                key={example.title}
                type="button"
                className="example-chip group flex w-full items-center justify-between border-b border-white/[0.07] px-4 py-3 text-left transition-colors duration-200 last:border-b-0 hover:bg-white/[0.045] md:px-5"
                style={{ animationDelay: `${index * 90 + 180}ms` }}
                onClick={() => handleFeatureClick(example.prompt)}
              >
                <span className="text-[14px] font-semibold text-white/52 transition-colors group-hover:text-white/82 md:text-[15px]">
                  {example.title}
                </span>
                <ArrowUpRight className="h-4 w-4 text-white/30 transition-colors group-hover:text-[#8ce9e1]" />
              </button>
            ))}
          </div>

          <GitHubImport />
        </div>
      </main>
    </div>
  );
}
