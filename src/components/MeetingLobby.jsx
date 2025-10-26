import React, { useMemo, useState } from 'react';
import { Rocket, Users, Shield, Copy, Check } from 'lucide-react';

export default function MeetingLobby() {
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [copied, setCopied] = useState(false);
  const newRoomId = useMemo(() => shortId(), []);
  const newRoomLink = `${location.origin}${location.pathname}#/room/${newRoomId}`;

  const goCreate = () => {
    if (!name.trim()) return alert('Enter your display name');
    sessionStorage.setItem('halomeet:name', name.trim());
    window.location.hash = `#/room/${newRoomId}`;
  };

  const goJoin = () => {
    if (!name.trim()) return alert('Enter your display name');
    const id = roomCode.trim().replace(/^.*#\/room\//, '');
    if (!id) return alert('Enter a valid room code or link');
    sessionStorage.setItem('halomeet:name', name.trim());
    window.location.hash = `#/room/${id}`;
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(newRoomLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <section className="relative isolate">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cyan-500/10 to-transparent" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Meet now — free and secure
            </div>
            <h1 className="mt-5 text-3xl sm:text-5xl font-semibold tracking-tight">Start or join a secure meeting</h1>
            <p className="mt-3 text-slate-300 max-w-xl">Create a room and share a link, or join with a code. Modern WebRTC with privacy-first defaults. No downloads.</p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-slate-300">
              <li className="flex items-center gap-2"><Shield className="h-4 w-4 text-emerald-400"/> E2EE capable</li>
              <li className="flex items-center gap-2"><Users className="h-4 w-4 text-fuchsia-400"/> Small groups</li>
              <li className="flex items-center gap-2"><Rocket className="h-4 w-4 text-cyan-400"/> No account needed</li>
            </ul>
          </div>

          <div className="w-full">
            <div className="rounded-2xl border border-white/10 bg-white/[.04] p-5 sm:p-6">
              <label className="block text-sm text-slate-300">Your name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Doe"
                className="mt-2 w-full rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
              />

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/[.03] p-4">
                  <div className="text-sm text-slate-300">Instant room</div>
                  <div className="mt-2 text-xs break-all text-slate-400">{newRoomLink}</div>
                  <div className="mt-3 flex items-center gap-2">
                    <button onClick={goCreate} className="inline-flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-medium hover:brightness-110 active:brightness-95 transition">Create & enter</button>
                    <button onClick={copyLink} className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10 transition">
                      {copied ? <Check className="h-4 w-4 text-emerald-400"/> : <Copy className="h-4 w-4"/>}
                      {copied ? 'Copied' : 'Copy link'}
                    </button>
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[.03] p-4">
                  <div className="text-sm text-slate-300">Join with code or link</div>
                  <input
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    placeholder="Paste link or code"
                    className="mt-2 w-full rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
                  />
                  <div className="mt-3">
                    <button onClick={goJoin} className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition">Join</button>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-400">By continuing you agree to our Terms and Privacy.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function shortId() {
  if (crypto?.randomUUID) return crypto.randomUUID().slice(0, 8);
  return Math.random().toString(36).slice(2, 10);
}
