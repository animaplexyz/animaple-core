import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service - Animaple Core API',
  description: 'Terms of Service and usage guidelines for the Animaple API.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors mb-10">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Documentation
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">Terms of Service</h1>
        <p className="text-sm text-slate-500 mb-10">Last Updated: March 2026</p>

        <div className="space-y-8 text-slate-600 leading-relaxed text-justify">
          
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Animaple Core API ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Description of Service</h2>
            <p>
              Animaple Core API is an unofficial, open-source REST API designed to scrape and serve anime metadata and streaming links from third-party sources (primarily Otakudesu). We do not host, store, or upload any video files or copyrighted media on our servers. The Service merely provides structured JSON links to content already publicly available on the internet.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Usage Limitations & Rate Limiting</h2>
            <p>
              To ensure stability and fair use for all consumers, the Service implements strict rate limiting. Public access is limited to <strong>30 requests per minute per IP address</strong>. Users attempting to bypass these limits, perform denial-of-service (DoS) attacks, or engage in malicious scraping will be permanently banned from the Service via edge-level blocking.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Disclaimer of Warranties (As-Is)</h2>
            <p>
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Because this API relies on scraping third-party HTML structures, we cannot guarantee 100% uptime or accuracy. We explicitly disclaim any warranties of merchantability, fitness for a particular purpose, or non-infringement. We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Limitation of Liability</h2>
            <p>
              In no event shall the developer (
              <a 
                href="https://github.com/ofikur" 
                target="_blank" 
                rel="noreferrer" 
                className="text-indigo-600 hover:text-indigo-700 hover:underline transition-all"
              >
                Ofikur R.
              </a>
              ) or contributors of the Animaple Project be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of this Service. You use the data provided by this API entirely at your own risk.
            </p>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 text-center">
            &copy; {new Date().getFullYear()} Animaple Project. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
