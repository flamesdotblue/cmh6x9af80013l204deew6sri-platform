import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function CTAFooter() {
  return (
    <footer id="get-started" className="relative border-t border-white/10">
      <div className="absolute inset-x-0 -top-24 h-48 bg-gradient-to-b from-fuchsia-500/10 via-cyan-500/10 to-transparent" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">Start a secure meeting in seconds</h3>
            <p className="mt-2 text-slate-300">Free forever. Unlimited meetings. Join from any device—no downloads required.</p>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-slate-300">
              {['No ads', 'No time limits', 'No credit card'].map((i) => (
                <li key={i} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> {i}</li>
              ))}
            </ul>
          </div>
          <div className="w-full">
            <form className="rounded-xl border border-white/10 bg-white/[.04] p-4 sm:p-5" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="email" className="block text-sm text-slate-300">Get an instant join link</label>
              <div className="mt-2 flex gap-2">
                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="w-full rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
                />
                <button type="submit" className="shrink-0 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-medium hover:brightness-110 active:brightness-95 transition">Send</button>
              </div>
              <p className="mt-2 text-xs text-slate-400">By continuing you agree to our Terms and Privacy.</p>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-300">HaloMeet</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-200 transition">Privacy</a>
            <a href="#" className="hover:text-slate-200 transition">Terms</a>
            <a href="#security" className="hover:text-slate-200 transition">Security</a>
            <a href="#" className="hover:text-slate-200 transition">Status</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
