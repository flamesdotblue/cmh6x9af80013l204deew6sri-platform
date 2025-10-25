import React from 'react';
import Spline from '@splinetool/react-spline';
import { CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative isolate">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" aria-hidden>
          <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/60 to-slate-950" />
      </div>

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Free forever • No meeting limits
            </div>
            <h1 className="mt-6 text-4xl sm:text-6xl font-semibold tracking-tight">
              Crystal‑clear, secure video meetings for everyone
            </h1>
            <p className="mt-5 text-slate-300 leading-relaxed">
              HaloMeet blends world‑class encryption with instant join links and buttery‑smooth video. No downloads. No paywalls. Just meet.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#get-started"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-medium shadow-lg shadow-cyan-600/30 hover:brightness-110 active:brightness-95 transition"
              >
                Start a free meeting
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 hover:bg-white/10 transition"
              >
                Explore features
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
      </div>
    </section>
  );
}
