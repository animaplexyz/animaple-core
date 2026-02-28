export default function HomePage() {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 font-mono text-sm">
      <div className="max-w-2xl w-full">
        
        {/* Header / Brand Bar */}
        <div className="mb-2 flex items-center gap-3">
          <div className="h-2.5 w-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></div>
          <h1 className="text-gray-200 font-semibold tracking-wide text-base">AnimapleCore API</h1>
          <span className="text-gray-500 text-xs px-2 py-0.5 rounded border border-gray-800 bg-gray-900/50">
            v1
          </span>
        </div>

        {/* Short Description */}
        <p className="mb-6 text-gray-400 text-xs sm:text-sm leading-relaxed">
          The official backend engine powering the Animaple Project. Providing fast, reliable, and structured anime data integration.
        </p>

        {/* JSON Terminal Window */}
        <div className="bg-[#111111] border border-gray-800/80 rounded-lg p-6 shadow-2xl overflow-x-auto mb-8">
          <pre className="leading-relaxed">
            <span className="text-gray-500">{"{"}</span>{"\n"}
            {"  "}<span className="text-sky-400">"name"</span>: <span className="text-amber-300">"AnimapleCore API"</span>,{"\n"}
            {"  "}<span className="text-sky-400">"version"</span>: <span className="text-amber-300">"v1"</span>,{"\n"}
            {"  "}<span className="text-sky-400">"status"</span>: <span className="text-emerald-400">"Online"</span>,{"\n"}
            {"  "}<span className="text-sky-400">"powered_by"</span>: <span className="text-amber-300">"Otakudesu"</span>,{"\n"}
            {"  "}<span className="text-sky-400">"environment"</span>: <span className="text-amber-300">{"\"" + (isDev ? "development" : "production") + "\""}</span>,{"\n"}
            {"  "}<span className="text-sky-400">"message"</span>: <span className="text-amber-300">"Welcome to AnimapleCore. All systems are operational."</span>,{"\n"}
            {"  "}<span className="text-sky-400">"available_endpoints"</span>: <span className="text-gray-500">{"{"}</span>{"\n"}
            {"    "}<span className="text-sky-400">"home"</span>: <span className="text-amber-300">"/api/home"</span>,{"\n"}
            {"    "}<span className="text-sky-400">"ongoing_anime"</span>: <span className="text-amber-300">"/api/ongoing-anime"</span>,{"\n"}
            {"    "}<span className="text-sky-400">"complete_anime"</span>: <span className="text-amber-300">"/api/complete-anime"</span>,{"\n"}
            {"    "}<span className="text-sky-400">"schedule"</span>: <span className="text-amber-300">"/api/schedule"</span>,{"\n"}
            {"    "}<span className="text-sky-400">"genres"</span>: <span className="text-amber-300">"/api/genre"</span>,{"\n"}
            {"    "}<span className="text-sky-400">"search"</span>: <span className="text-amber-300">{"\"/api/search/{keyword}\""}</span>,{"\n"}
            {"    "}<span className="text-sky-400">"anime_details"</span>: <span className="text-amber-300">{"\"/api/anime/{slug}\""}</span>,{"\n"}
            {"    "}<span className="text-sky-400">"episode_details"</span>: <span className="text-amber-300">{"\"/api/episode/{slug}\""}</span>{"\n"}
            {"  "}<span className="text-gray-500">{"}"}</span>{"\n"}
            <span className="text-gray-500">{"}"}</span>
          </pre>
        </div>

        {/* Footer Credit */}
        <footer className="text-center text-xs text-gray-500">
          <p className="mb-1">&copy; {new Date().getFullYear()} Animaple Project</p>
          <p>
            Developed by{" "}
            <a 
              href="https://github.com/ofikur" 
              target="_blank" 
              rel="noreferrer" 
              className="text-emerald-500 hover:text-emerald-400 hover:underline transition-colors duration-200"
            >
              Ofikur R.
            </a>
          </p>
        </footer>

      </div>
    </main>
  );
}