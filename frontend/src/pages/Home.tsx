import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Github, ArrowUp } from "lucide-react";

export function Home() {
  const [prompt, setPrompt] = useState("");
  const [showModelMenu, setShowModelMenu] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      navigate("/builder", { state: { prompt } });
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F0E2] text-[#1A1A1A] flex flex-col font-sans overflow-hidden relative">
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-[#1A1A1A]">
            bolt.new
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-black transition-colors">
            Community
          </a>
          <a href="#" className="hover:text-black transition-colors">
            Enterprise
          </a>
          <a
            href="#"
            className="hover:text-black transition-colors flex items-center gap-1"
          >
            Resources <span className="text-[10px] opacity-75">▼</span>
          </a>
          <a href="#" className="hover:text-black transition-colors">
            Careers
          </a>
          <a href="#" className="hover:text-black transition-colors">
            Pricing
          </a>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 text-gray-600">
            <a href="#" className="hover:text-black transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-black transition-colors">
              <span className="text-lg">𝕏</span>
            </a>
          </div>
          <button className="hidden md:block text-sm px-4 py-2 hover:bg-black/5 rounded-lg text-gray-700 transition-colors">
            Sign In
          </button>
          <button className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors">
            Get started
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 min-h-[80vh]">
        <div className="max-w-3xl w-full flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E5E3D5] border border-[#D6D4C5] text-xs font-medium text-gray-600">
            <span className="font-bold text-gray-800">b²</span>
            <span>Introducing Bolt V2</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl font-serif text-[#2C2C2C]">
              Good evening, Builder
            </h1>
          </div>

          <div className="w-full max-w-2xl mt-8">
            <form
              onSubmit={handleSubmit}
              className="relative bg-white rounded-2xl border border-gray-300 overflow-visible"
            >
              <div className="p-4">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Type / for commands"
                  className="w-full h-16 bg-transparent text-gray-800 placeholder-gray-400 resize-none outline-none text-lg font-light font-serif"
                  style={{ minHeight: "4rem" }}
                />
              </div>

              <div className="flex items-center justify-between px-3 pb-3">
                <div className="flex items-center gap-2 relative">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowModelMenu(!showModelMenu)}
                      className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <span>Devstral 4.5</span>
                      <span className="text-[10px] opacity-75">▼</span>
                    </button>

                    {showModelMenu && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden z-50">
                        <div className="p-1">
                          <button
                            type="button"
                            className="w-full flex items-center justify-between px-3 py-2 text-sm text-left text-gray-600 hover:bg-gray-50 rounded-md transition-colors opacity-50 cursor-not-allowed"
                            disabled
                          >
                            <span>Claude</span>
                            <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                              Soon
                            </span>
                          </button>
                          <button
                            type="button"
                            className="w-full flex items-center justify-between px-3 py-2 text-sm text-left text-gray-600 hover:bg-gray-50 rounded-md transition-colors opacity-50 cursor-not-allowed"
                            disabled
                          >
                            <span>Gemini</span>
                            <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                              Soon
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={!prompt.trim()}
                    className="flex items-center justify-center w-8 h-8 bg-[#D08F74] hover:bg-[#c08269] disabled:opacity-50 disabled:bg-gray-200 text-white rounded-lg transition-all"
                  >
                    <ArrowUp className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-6">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-black/5 transition-colors text-gray-500">
              <Github className="w-4 h-4" /> Import from GitHub
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
