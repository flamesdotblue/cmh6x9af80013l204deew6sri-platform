import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative isolate">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.12),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.12),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Free forever • No meeting limits
          </div>
          <h1 className="mt-6 text-4xl sm:text-6xl font-semibold tracking-tight">
            Crystal‑clear, secure video meetings for everyone
          </h1>
          <p className="mt-5 text-slate-300 leading-relaxed">
            HaloMeet blends privacy-first tech with instant join links and buttery‑smooth video. No downloads. No paywalls. Just meet.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#/meet"
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-medium shadow-lg shadow-cyan-600/30 hover:brightness-110 active:brightness-95 transition"
            >
              Start a free meeting
            </a>
            <a
              href="#/meet"
              className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 hover:bg-white/10 transition"
            >
              Join with a code
            </a>
          </div>

          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-slate-300">
            {[
              'End‑to‑end encrypted rooms',
              'One click join—no downloads',
              'Unlimited HD meetings',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
