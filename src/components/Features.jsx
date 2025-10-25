import React from 'react';
import { Video, Users, Shield, Zap, Globe } from 'lucide-react';

export default function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="absolute inset-x-0 top-0 z-0 h-40 bg-gradient-to-b from-cyan-500/10 to-transparent" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Everything you need to meet better</h2>
          <p className="mt-3 text-slate-300">
            Built for speed, privacy, and ease. HaloMeet cuts friction so your team can connect instantly.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Video className="h-5 w-5 text-cyan-400" />}
            title="Ultra‑low‑latency HD"
            desc="Adaptive bitrate with crisp audio and video that stays smooth—even on flaky networks."
          />
          <FeatureCard
            icon={<Users className="h-5 w-5 text-fuchsia-400" />}
            title="One‑click join"
            desc="Invite with a link. Guests join in the browser—no installs, no accounts required."
          />
          <FeatureCard
            icon={<Shield className="h-5 w-5 text-emerald-400" />}
            title="End‑to‑end encryption"
            desc="Private rooms powered by strong encryption and modern security defaults."
          />
          <FeatureCard
            icon={<Zap className="h-5 w-5 text-yellow-300" />}
            title="Instant screen share"
            desc="Share screens and tabs with system audio and presenter handoff."
          />
          <FeatureCard
            icon={<Globe className="h-5 w-5 text-blue-300" />}
            title="Global edge network"
            desc="Auto‑routing across regions for low latency wherever your team is."
          />
          <FeatureCard
            icon={<Shield className="h-5 w-5 text-emerald-300" />}
            title="Privacy by design"
            desc="No tracking, no ads, and strict data minimization out of the box."
          />
        </div>

        <div id="security" className="mt-16 rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[.02] p-6 sm:p-8">
          <h3 className="text-2xl font-semibold">Security that earns trust</h3>
          <p className="mt-2 text-slate-300">
            HaloMeet uses end‑to‑end encrypted rooms, modern SRTP with perfect forward secrecy, and optional lobby locks with host controls.
          </p>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> E2EE for private rooms</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Waiting rooms & host approvals</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" /> Noise suppression & background blur</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-blue-400" /> Regional routing & data residency options</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[.03] p-5 hover:bg-white/[.05] transition">
      <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition" aria-hidden>
        <div className="pointer-events-none h-full w-full bg-gradient-to-br from-cyan-500/10 via-fuchsia-500/10 to-blue-500/10" />
      </div>
      <div className="relative z-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 ring-1 ring-white/10">
          {icon}
        </div>
        <h3 className="mt-4 text-lg font-medium">{title}</h3>
        <p className="mt-2 text-sm text-slate-300">{desc}</p>
      </div>
    </div>
  );
}
