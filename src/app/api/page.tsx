"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const CopyButton = ({ text, variant = 'dark' }: { text: string, variant?: 'light' | 'dark' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const btnStyle = variant === 'light'
    ? "p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1.5"
    : "p-1.5 text-slate-500 hover:text-slate-300 hover:bg-slate-800/80 rounded-md transition-colors flex items-center gap-1.5";

  return (
    <button
      onClick={handleCopy}
      className={btnStyle}
      title="Copy to clipboard"
    >
      {copied ? (
        <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
};

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const endpoints = [
    {
      id: 'home',
      title: 'Homepage Data',
      path: '/api/home',
      method: 'GET',
      desc: 'Retrieves the latest ongoing and completed anime updates displayed on the Otakudesu homepage.',
      params: [],
      json: `{
  "data": {
    "ongoing_anime": [
      {
        "title": "Enen no Shouboutai: San no Shou Part 2",
        "slug": "enen-shouboutai-season-3-p2-sub-indo",
        "poster": "https://otakudesu.best/.../152472.jpg",
        "current_episode": "Episode 8",
        "release_day": "Sabtu",
        "newest_release_date": "28 Feb",
        "otakudesu_url": "https://otakudesu.best/..."
      }
    ],
    "complete_anime": [
      {
        "title": "Towa no Yuugure",
        "slug": "towa-yuugure-sub-indo",
        "episode_count": "12",
        "rating": "6.52"
      }
    ]
  }
}`
    },
    {
      id: 'search',
      title: 'Search Anime',
      path: '/api/search/{keyword}',
      method: 'GET',
      desc: 'Search for anime titles across the entire database using a specific keyword.',
      params: [
        { name: 'keyword', type: 'string', required: true, desc: 'The search query (e.g., "naruto"). URL encoding is handled automatically.' }
      ],
      json: `{
  "data": [
    {
      "title": "Naruto Shippuden",
      "slug": "naruto-shippuden-sub-indo",
      "poster": "https://otakudesu.best/.../naruto.jpg",
      "genres": ["Action", "Adventure", "Fantasy"],
      "status": "Completed",
      "rating": "8.5"
    }
  ]
}`
    },
    {
      id: 'anime-details',
      title: 'Anime Details',
      path: '/api/anime/{slug}',
      method: 'GET',
      desc: 'Fetches comprehensive metadata for a specific anime, including synopsis, studio, and the complete episode list.',
      params: [
        { name: 'slug', type: 'string', required: true, desc: 'The unique URL slug of the anime.' }
      ],
      json: `{
  "data": {
    "title": "Sousou no Frieren Season 2",
    "japanese_title": "葬送のフリーレン",
    "poster": "https://otakudesu.best/.../frieren.jpg",
    "rating": "9.1",
    "produser": "Madhouse",
    "status": "Ongoing",
    "synopsis": "The adventure continues for the elf mage Frieren...",
    "episode_list": [
      {
        "episode_title": "Episode 6",
        "episode_slug": "frieren-s2-episode-6-sub-indo",
        "release_date": "28 Feb 2026"
      }
    ]
  }
}`
    },
    {
      id: 'episode-details',
      title: 'Episode Details',
      path: '/api/episode/{slug}',
      method: 'GET',
      desc: 'Retrieves streaming iframe URLs and multi-resolution direct download links for a specific anime episode.',
      params: [
        { name: 'slug', type: 'string', required: true, desc: 'The unique slug of the episode.' }
      ],
      json: `{
  "data": {
    "title": "Sousou no Frieren S2 Episode 6 Subtitle Indonesia",
    "iframe_url": "https://desustream.me/frieren-s2-ep-6/",
    "download_links": [
      {
        "quality": "360p",
        "servers": [
          { "server_name": "Zippyshare", "url": "https://..." },
          { "server_name": "Google Drive", "url": "https://..." }
        ]
      },
      {
        "quality": "720p",
        "servers": [
          { "server_name": "Mega", "url": "https://..." }
        ]
      }
    ]
  }
}`
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -70% 0px' } 
    );

    const sectionIds = ['overview', 'architecture', 'errors', ...endpoints.map(ep => ep.id)];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [endpoints]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col lg:flex-row selection:bg-indigo-100 selection:text-indigo-900 relative">
      
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="block">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 leading-none">Animaple</h2>
          <p className="text-[10px] font-mono font-bold text-indigo-600 mt-1 uppercase tracking-widest">Core API v1.0</p>
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 -mr-2 text-slate-600 hover:text-slate-900 transition-colors"
          aria-label="Open Menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Kiri */}
      <aside className={`fixed lg:sticky inset-y-0 left-0 z-50 w-[280px] xl:w-[320px] bg-slate-50 border-r border-slate-200 py-8 lg:py-10 px-6 lg:pl-10 xl:pl-12 lg:pr-8 flex-shrink-0 h-screen overflow-y-auto custom-scrollbar transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>

        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
          aria-label="Close Menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-10">
          <Link href="/" className="block" onClick={() => setIsMobileMenuOpen(false)}>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 leading-none">Animaple</h2>
            <p className="text-[10px] font-mono font-bold text-indigo-600 mt-1.5 uppercase tracking-widest">Core API v1.0</p>
          </Link>
        </div>
        
        <nav className="space-y-8 text-sm font-medium">
          <div>
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Introduction</h3>
            <div className="space-y-2.5 flex flex-col text-slate-500">
              <Link 
                href="#overview" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={`transition-colors ${activeSection === 'overview' ? 'text-indigo-600 font-bold lg:text-slate-500 lg:font-medium lg:hover:text-indigo-600' : 'hover:text-indigo-600'}`}
              >
                Overview
              </Link>
              <Link 
                href="#architecture" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={`transition-colors ${activeSection === 'architecture' ? 'text-indigo-600 font-bold lg:text-slate-500 lg:font-medium lg:hover:text-indigo-600' : 'hover:text-indigo-600'}`}
              >
                Architecture & Limits
              </Link>
              <Link 
                href="#errors" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={`transition-colors ${activeSection === 'errors' ? 'text-indigo-600 font-bold lg:text-slate-500 lg:font-medium lg:hover:text-indigo-600' : 'hover:text-indigo-600'}`}
              >
                Errors & Status Codes
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">API Reference</h3>
            <div className="space-y-3 flex flex-col border-l border-slate-200 ml-1 pl-4 text-slate-500">
              {endpoints.map((ep) => (
                <Link 
                  key={ep.id} 
                  href={`#${ep.id}`} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`truncate relative transition-all duration-200 before:absolute before:-left-[21px] before:top-2 before:w-1.5 before:h-1.5 before:rounded-full ${activeSection === ep.id ? 'text-indigo-600 font-bold before:bg-indigo-600 before:scale-125' : 'hover:text-indigo-600 before:bg-slate-300 hover:before:bg-indigo-400'}`}
                >
                  {ep.title}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 min-w-0 bg-white">
        
        {/* Intro Section */}
        <div className="w-full px-5 sm:px-8 lg:px-10 xl:px-12 pt-8 pb-10 lg:pt-10 lg:pb-14 border-b border-slate-200 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-10">
            
            {/* Kiri: Judul, Base URL, dan Credits */}
            <div className="col-span-1">
              <h1 id="overview" className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight scroll-mt-28 lg:scroll-mt-24 leading-none lg:leading-none">
                Documentation
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 text-justify mt-2">
                Welcome to the Animaple Core API. A highly optimized, <strong className="font-semibold text-slate-900">Unofficial Otakudesu REST API</strong> built with Next.js App Router and TypeScript. It utilizes ScraperAPI to effortlessly bypass Cloudflare protections, providing clean JSON responses for your anime streaming applications.
              </p>

              {/* Base URL Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Base URL</p>
                  <code className="text-[13px] sm:text-sm font-mono text-indigo-600 font-medium break-all">https://animaple-core.vercel.app/api</code>
                </div>
                <div className="bg-white border border-slate-200 p-1 rounded-md flex items-center shrink-0 self-start sm:self-auto">
                  <CopyButton text="https://animaple-core.vercel.app/api" variant="light" />
                </div>
              </div>

              {/* Credits Section */}
              <div className="p-4 bg-slate-50/50 border border-slate-200 rounded-lg flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 text-sm text-slate-600">
                    <div className="w-7 h-7 rounded-md bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <span className="leading-none">
                      Built by{' '}
                      <a 
                        href="https://github.com/ofikur" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-all"
                      >
                        Ofikur R.
                      </a>
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-slate-400">
                    © {new Date().getFullYear()} Animaple Project
                  </span>
                </div>
                
                <div className="h-px w-full bg-slate-200/80 my-0.5"></div>
                
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                  <a 
                    href="https://github.com/ofikur/animaple-core/blob/main/LICENCE" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    MIT License
                  </a>
                  <span className="text-slate-300">•</span>
                  <Link href="#terms" className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>

            {/* Kanan: Architecture & Errors */}
            <div className="col-span-1 lg:sticky lg:top-10 self-start mt-4 lg:mt-0">
              <h2 id="architecture" className="text-xl font-bold text-slate-900 mb-3 scroll-mt-28 lg:scroll-mt-24 tracking-tight">Architecture & Limits</h2>
              <div className="prose prose-slate prose-sm max-w-none text-slate-600 mb-8 text-justify">
                <p className="mb-3">This API is designed for speed and reliability using a dual-layer caching strategy:</p>
                <ul className="list-disc pl-5 space-y-1.5 mb-4">
                  <li><strong>Edge Caching:</strong> All endpoints are cached at the Vercel Edge Network. Response times for cached hits are typically under 50ms.</li>
                  <li><strong>Automated Revalidation:</strong> A background Cron Job triggers every 1 hour (3600s) to silently update the cache from upstream sources.</li>
                  <li><strong>Rate Limits:</strong> Because responses are served from the Edge Cache, there are <strong>no strict rate limits</strong> applied to consumers.</li>
                </ul>
              </div>

              <h2 id="errors" className="text-xl font-bold text-slate-900 mb-3 scroll-mt-28 lg:scroll-mt-24 tracking-tight">Errors & Status Codes</h2>
              <div className="border border-slate-200 rounded-lg overflow-x-auto">
                <table className="w-full text-sm text-left min-w-[400px]">
                  <thead className="bg-slate-50 text-slate-700">
                    <tr>
                      <th className="py-2.5 px-4 font-semibold border-b border-slate-200 w-32">Code</th>
                      <th className="py-2.5 px-4 font-semibold border-b border-slate-200">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600 bg-white">
                    <tr>
                      <td className="py-2.5 px-4 font-mono font-medium text-emerald-600 whitespace-nowrap">200 OK</td>
                      <td className="py-2.5 px-4">The request was successful and data is returned.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-mono font-medium text-amber-600 whitespace-nowrap">400 Bad Req</td>
                      <td className="py-2.5 px-4">Missing required parameters (e.g., empty slug or keyword).</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-mono font-medium text-rose-600 whitespace-nowrap">500 Server Err</td>
                      <td className="py-2.5 px-4">Upstream server is unreachable or formatting changed.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

        {/* Endpoints Mapping */}
        <div>
          {endpoints.map((ep, idx) => (
            <div key={ep.id} id={ep.id} className={`scroll-mt-20 lg:scroll-mt-0 border-b border-slate-200 ${idx % 2 === 0 ? 'bg-slate-50/20' : 'bg-white'}`}>
              <div className="w-full px-5 sm:px-8 lg:px-10 xl:px-12 py-10 lg:py-14">
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-10">
                  
                  {/* Penjelasan Endpoint */}
                  <div className="col-span-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight">{ep.title}</h3>
                    </div>
                    
                    <p className="text-sm text-slate-600 mb-6 leading-relaxed text-justify">{ep.desc}</p>
                    
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">HTTP Request</h4>
                    <div className="flex items-center gap-3 bg-white border border-slate-200 px-3 py-2 rounded-md mb-6 w-max max-w-full overflow-x-auto">
                      <span className="text-indigo-600 font-bold text-xs tracking-wide shrink-0">
                        {ep.method}
                      </span>
                      <code className="text-[13px] font-mono font-medium text-slate-700 whitespace-nowrap">{ep.path}</code>
                    </div>

                    {ep.params.length > 0 && (
                      <div>
                        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Parameters</h4>
                        <ul className="space-y-3">
                          {ep.params.map((param, i) => (
                            <li key={i} className="text-sm border-l-2 border-slate-200 pl-3">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <code className="font-mono font-semibold text-slate-900">{param.name}</code>
                                <span className="font-mono text-[11px] text-slate-500">{param.type}</span>
                                {param.required && <span className="text-[9px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-1.5 py-0.5 rounded uppercase tracking-wider">Required</span>}
                              </div>
                              <p className="text-slate-600 text-[13px] leading-relaxed text-justify">{param.desc}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Blok Kode JSON */}
                  <div className="col-span-1 lg:sticky lg:top-10 self-start">
                    <div className="bg-[#0A0A0B] rounded-xl border border-slate-800 flex flex-col w-full shadow-lg">
                      <div className="bg-[#121214] px-4 py-2.5 border-b border-slate-800 flex justify-between items-center rounded-t-xl">
                        <div className="flex gap-2 shrink-0">
                          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 font-medium tracking-wide truncate ml-3 mr-auto sm:ml-0 sm:mr-0 text-center flex-1">
                          Example Response
                        </span>
                        <div className="shrink-0">
                          <CopyButton text={ep.json} variant="dark" />
                        </div>
                      </div>
                      
                      <div className="p-4 overflow-x-auto custom-scrollbar-dark">
                        <pre className="text-[12px] sm:text-[13px] leading-snug font-mono text-emerald-400 w-max min-w-full">
                          <code dangerouslySetInnerHTML={{ 
                            __html: ep.json
                              .replace(/"(.*?)":/g, '<span class="text-indigo-300">"$1"</span>:') 
                              .replace(/:\s"(.*?)"/g, ': <span class="text-emerald-400">"$1"</span>') 
                              .replace(/:\s([0-9.]+)/g, ': <span class="text-amber-300">$1</span>') 
                              .replace(/\[/g, '<span class="text-slate-400">[</span>')
                              .replace(/\]/g, '<span class="text-slate-400">]</span>')
                              .replace(/\{/g, '<span class="text-slate-400">{</span>')
                              .replace(/\}/g, '<span class="text-slate-400">}</span>')
                          }} />
                        </pre>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Global Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #94a3b8; }

        .custom-scrollbar-dark::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scrollbar-dark::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        .custom-scrollbar-dark:hover::-webkit-scrollbar-thumb { background: #475569; }

        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}