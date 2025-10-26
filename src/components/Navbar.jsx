import React from 'react';
import { Video, Shield, Rocket } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 bg-slate-950/80 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 rounded-md bg-gradient-to-br from-cyan-400 via-blue-500 to-fuchsia-500 blur-md opacity-60" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-md bg-slate-900 ring-1 ring-white/15">
                <Video className="h-5 w-5 text-cyan-300" />
              </div>
            </div>
            <span className="font-semibold tracking-tight">HaloMeet</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <a href="#/meet" className="hover:text-white transition">Start</a>
            <a href="#/meet" className="hover:text-white transition">Join</a>
            <a href="#" className="hover:text-white transition">About</a>
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-2 text-xs sm:text-sm text-slate-300">
              <Shield className="h-4 w-4 text-emerald-400" /> E2EE-capable
            </span>
            <a
              href="#/meet"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium shadow-lg shadow-cyan-600/30 hover:brightness-110 active:brightness-95 transition"
            >
              <Rocket className="h-4 w-4" /> Launch
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
