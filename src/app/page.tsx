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
            <span className="text-gray-500">&#123;</span>{"\n"}
            {"  "}<span className="text-sky-400">&quot;name&quot;</span>: <span className="text-amber-300">&quot;AnimapleCore API&quot;</span>,{"\n"}
            {"  "}<span className="text-sky-400">&quot;version&quot;</span>: <span className="text-amber-300">&quot;v1&quot;</span>,{"\n"}
            {"  "}<span className="text-sky-400">&quot;status&quot;</span>: <span className="text-emerald-400">&quot;Online&quot;</span>,{"\n"}
            {"  "}<span className="text-sky-400">&quot;powered_by&quot;</span>: <span className="text-amber-300">&quot;Otakudesu&quot;</span>,{"\n"}
            {"  "}<span className="text-sky-400">&quot;environment&quot;</span>: <span className="text-amber-300">&quot;{isDev ? 'development' : 'production'}&quot;</span>,{"\n"}
            {"  "}<span className="text-sky-400">&quot;message&quot;</span>: <span className="text-amber-300">&quot;Welcome to AnimapleCore. All systems are operational.&quot;</span>,{"\n"}
            {"  "}<span className="text-sky-400">&quot;available_endpoints&quot;</span>: <span className="text-gray-500">&#123;</span>{"\n"}
            {"    "}<span className="text-sky-400">&quot;home&quot;</span>: <span className="text-amber-300">&quot;/api/home&quot;</span>,{"\n"}
            {"    "}<span className="text-sky-400">&quot;ongoing_anime&quot;</span>: <span className="text-amber-300">&quot;/api/ongoing-anime&quot;</span>,{"\n"}
            {"    "}<span className="text-sky-400">&quot;complete_anime&quot;</span>: <span className="text-amber-300">&quot;/api/complete-anime&quot;</span>,{"\n"}
            {"    "}<span className="text-sky-400">&quot;schedule&quot;</span>: <span className="text-amber-300">&quot;/api/schedule&quot;</span>,{"\n"}
            {"    "}<span className="text-sky-400">&quot;genres&quot;</span>: <span className="text-amber-300">&quot;/api/genre&quot;</span>,{"\n"}
            {"    "}<span className="text-sky-400">&quot;search&quot;</span>: <span className="text-amber-300">&quot;/api/search/&#123;keyword&#125;&quot;</span>,{"\n"}
            {"    "}<span className="text-sky-400">&quot;anime_details&quot;</span>: <span className="text-amber-300">&quot;/api/anime/&#123;slug&#125;&quot;</span>,{"\n"}
            {"    "}<span className="text-sky-400">&quot;episode_details&quot;</span>: <span className="text-amber-300">&quot;/api/episode/&#123;slug&#125;&quot;</span>{"\n"}
            {"  "}<span className="text-gray-500">&#125;</span>{"\n"}
            <span className="text-gray-500">&#125;</span>
          </pre>
        </div>

        {/* Footer Credit */}
        <footer className="text-center text-xs text-gray-500 border-t border-gray-800/60 pt-5">
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