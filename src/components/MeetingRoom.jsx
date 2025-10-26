import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Video, Mic, MicOff, Camera, CameraOff, ScreenShare, PhoneOff, Users, Copy, Shield } from 'lucide-react';
import usePeerClient from '../hooks/usePeerClient';

export default function MeetingRoom({ roomId }) {
  const displayName = (typeof window !== 'undefined' && sessionStorage.getItem('halomeet:name')) || 'Guest';
  const isHost = useMemo(() => true, []);

  const [role, setRole] = useState(isHost ? 'host' : 'guest');
  const [peers, setPeers] = useState({});
  const [localStream, setLocalStream] = useState(null);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [screenTrack, setScreenTrack] = useState(null);
  const gridRef = useRef(null);

  const roomLink = `${location.origin}${location.pathname}#/room/${roomId}`;

  const {
    peer,
    myId,
    ready,
    asHost,
    asGuest,
    dataSend,
    onData,
    callPeer,
    onIncomingCall,
  } = usePeerClient(roomId);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: { width: { ideal: 1280 }, height: { ideal: 720 } } });
        if (!active) return;
        setLocalStream(stream);
      } catch (e) {
        alert('Microphone/Camera permissions are required to join.');
      }
    })();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!peer || !ready) return;
    (async () => {
      const didHost = await asHost(displayName, onGuestJoin);
      if (didHost) {
        setRole('host');
      } else {
        setRole('guest');
        await asGuest(displayName, onHostMessage);
      }
    })();
  }, [peer, ready]);

  useEffect(() => {
    if (!localStream) return;
    return onIncomingCall((call) => {
      call.answer(localStream);
      call.on('stream', (remoteStream) => {
        setPeers((prev) => ({ ...prev, [call.peer]: { ...(prev[call.peer] || {}), stream: remoteStream } }));
      });
      call.on('close', () => {
        setPeers((prev) => {
          const n = { ...prev };
          delete n[call.peer];
          return n;
        });
      });
    });
  }, [localStream, onIncomingCall]);

  const onGuestJoin = useCallback((guestId, guestName) => {
    setPeers((prev) => ({ ...prev, [guestId]: { ...(prev[guestId] || {}), name: guestName } }));
    dataSend({ type: 'host:new-peer', id: guestId, name: guestName });
    const others = Object.keys(peers).filter((id) => id !== guestId);
    dataSend({ type: 'host:peers', to: guestId, peers: others });
  }, [dataSend, peers]);

  const onHostMessage = useCallback((msg) => {
    if (msg.type === 'host:peers' && msg.peers && localStream) {
      msg.peers.forEach((pid) => {
        callPeer(pid, localStream);
      });
    }
    if (msg.type === 'host:new-peer' && msg.id && localStream) {
      callPeer(msg.id, localStream);
    }
    if (msg.type === 'host:name' && msg.id && msg.name) {
      setPeers((prev) => ({ ...prev, [msg.id]: { ...(prev[msg.id] || {}), name: msg.name } }));
    }
  }, [callPeer, localStream]);

  useEffect(() => {
    return onData((from, payload) => {
      if (payload?.type === 'hello' && role === 'host') {
        onGuestJoin(from, payload.name || 'Guest');
        dataSend({ type: 'host:name', id: from, name: payload.name || 'Guest' });
      }
      if (payload?.type === 'goodbye') {
        setPeers((prev) => { const n = { ...prev }; delete n[from]; return n; });
      }
    });
  }, [onData, dataSend, role, onGuestJoin]);

  useEffect(() => {
    if (!localStream || !peer || !ready) return;
    if (role === 'guest') {
      callPeer(roomId, localStream);
      dataSend({ type: 'hello', name: displayName });
    }
  }, [localStream, peer, ready, role, callPeer, dataSend, roomId, displayName]);

  const toggleMute = () => {
    const track = localStream?.getAudioTracks?.()[0];
    if (track) {
      track.enabled = !track.enabled;
      setMuted(!track.enabled);
    }
  };

  const toggleCamera = () => {
    const track = localStream?.getVideoTracks?.()[0];
    if (track) {
      track.enabled = !track.enabled;
      setCameraOff(!track.enabled);
    }
  };

  const startScreenShare = async () => {
    try {
      const display = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
      const track = display.getVideoTracks()[0];
      setScreenTrack(track);
      replaceOutgoingVideoTrack(track);
      track.onended = () => {
        stopScreenShare();
      };
    } catch {}
  };

  const stopScreenShare = () => {
    if (screenTrack) {
      screenTrack.stop();
      setScreenTrack(null);
      const cam = localStream?.getVideoTracks?.()[0];
      if (cam) replaceOutgoingVideoTrack(cam);
    }
  };

  const leave = () => {
    try { dataSend({ type: 'goodbye' }); } catch {}
    try { localStream?.getTracks?.().forEach(t => t.stop()); } catch {}
    window.location.hash = '#/meet';
  };

  return (
    <section className="relative isolate min-h-[calc(100vh-4rem)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.12),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.12),transparent_60%)]" aria-hidden />
      <div className="relative z-10 mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm text-slate-300 flex items-center gap-2"><Shield className="h-4 w-4 text-emerald-400"/> Secure room</div>
            <h2 className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight">Room {roomId} {role === 'host' ? '(Host)' : ''}</h2>
            <p className="text-sm text-slate-400">You are: {displayName} • ID: {myId || '—'}</p>
          </div>
          <div className="flex items-center gap-2">
            <a href={roomLink} className="hidden sm:block text-xs sm:text-sm text-slate-300 truncate max-w-[40ch] hover:text-white">{roomLink}</a>
            <button onClick={() => navigator.clipboard.writeText(roomLink)} className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10 transition">
              <Copy className="h-4 w-4"/> Copy invite
            </button>
          </div>
        </div>

        <div ref={gridRef} className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <VideoTile label={`You — ${displayName}`} stream={localStream} mutedSelf />
          {Object.entries(peers).map(([id, info]) => (
            <VideoTile key={id} label={info?.name ? `${info.name}` : id} stream={info.stream} />
          ))}
        </div>

        <div className="sticky bottom-4 mt-6 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-3 py-2 backdrop-blur supports-[backdrop-filter]:bg-slate-900/50">
            <ControlButton active={!muted} onClick={toggleMute} iconOn={<Mic className="h-5 w-5"/>} iconOff={<MicOff className="h-5 w-5"/>} label={muted ? 'Unmute' : 'Mute'} />
            <ControlButton active={!cameraOff} onClick={toggleCamera} iconOn={<Camera className="h-5 w-5"/>} iconOff={<CameraOff className="h-5 w-5"/>} label={cameraOff ? 'Camera on' : 'Camera off'} />
            {!screenTrack ? (
              <ControlButton onClick={startScreenShare} iconOn={<ScreenShare className="h-5 w-5"/>} label="Share" />
            ) : (
              <ControlButton onClick={stopScreenShare} iconOn={<Video className="h-5 w-5"/>} label="Stop" />
            )}
            <div className="mx-2 h-6 w-px bg-white/10" />
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300"><Users className="h-4 w-4"/> {1 + Object.keys(peers).length}</div>
            <button onClick={leave} className="ml-2 inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-sm font-medium hover:brightness-110 active:brightness-95 transition"><PhoneOff className="h-5 w-5"/> Leave</button>
          </div>
        </div>

        {role === 'host' && (
          <div className="mt-6 text-xs text-slate-400">
            Tip: As host, you coordinate the room. New participants get a list of peers to call for a full mesh.
          </div>
        )}
      </div>
    </section>
  );

  function replaceOutgoingVideoTrack(newTrack) {
    try {
      peer?.connections && Object.values(peer.connections).forEach((arr) => {
        arr.forEach((conn) => {
          try {
            const sender = conn.peerConnection.getSenders().find(s => s.track && s.track.kind === 'video');
            if (sender) sender.replaceTrack(newTrack);
          } catch {}
        });
      });
    } catch {}
  }
}

function VideoTile({ label, stream, mutedSelf }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && stream) {
      ref.current.srcObject = stream;
    }
  }, [stream]);
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[.03]">
      <video ref={ref} autoPlay playsInline muted={mutedSelf} className="h-52 sm:h-64 w-full object-cover bg-slate-900" />
      <div className="absolute inset-x-2 bottom-2 rounded-md bg-slate-900/70 px-2 py-1 text-xs text-slate-200 truncate">{label}</div>
    </div>
  );
}

function ControlButton({ active = true, onClick, iconOn, iconOff, label }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs transition ${active ? 'bg-white/5 hover:bg-white/10' : 'bg-rose-600/80 hover:bg-rose-600'}`}
    >
      {active ? iconOn : (iconOff || iconOn)}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
