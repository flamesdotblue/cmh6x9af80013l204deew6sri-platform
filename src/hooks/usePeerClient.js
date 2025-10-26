import { useCallback, useEffect, useRef, useState } from 'react';
import Peer from 'https://esm.sh/peerjs@1.5.2?bundle';

export default function usePeerClient(roomId) {
  const [peer, setPeer] = useState(null);
  const [myId, setMyId] = useState(null);
  const [ready, setReady] = useState(false);
  const dataCons = useRef(new Map()); // peerId -> DataConnection
  const dataHandlers = useRef([]);

  useEffect(() => {
    const p = new Peer(undefined, { debug: 1 });
    setPeer(p);
    p.on('open', (id) => { setMyId(id); setReady(true); });
    return () => {
      try { p.destroy(); } catch {}
    };
  }, []);

  const asHost = useCallback(async (name, onGuestJoin) => {
    if (!peer) return false;
    return new Promise((resolve) => {
      let resolved = false;
      try {
        const host = new Peer(roomId, { debug: 1 });
        host.on('open', (id) => {
          try { peer?.destroy?.(); } catch {}
          setPeer(host);
          setMyId(id);
          setReady(true);
          host.on('connection', (conn) => {
            dataCons.current.set(conn.peer, conn);
            conn.on('data', (data) => {
              dataHandlers.current.forEach((h) => h(conn.peer, data));
            });
            conn.on('close', () => { dataCons.current.delete(conn.peer); });
            if (onGuestJoin) onGuestJoin(conn.peer, 'Guest');
          });
          resolved = true; resolve(true);
        });
        host.on('error', () => {
          if (!resolved) { resolve(false); }
        });
      } catch {
        if (!resolved) resolve(false);
      }
      setTimeout(() => { if (!resolved) resolve(false); }, 1500);
    });
  }, [peer, roomId]);

  const asGuest = useCallback(async (name, onHostMessage) => {
    if (!peer) return false;
    const conn = peer.connect(roomId, { reliable: true });
    dataCons.current.set(roomId, conn);
    conn.on('data', (data) => {
      if (onHostMessage) onHostMessage(data);
      dataHandlers.current.forEach((h) => h(roomId, data));
    });
    conn.on('close', () => { dataCons.current.delete(roomId); });
    conn.on('open', () => {
      try { conn.send({ type: 'hello', name }); } catch {}
    });
    return true;
  }, [peer, roomId]);

  const dataSend = useCallback((payload) => {
    dataCons.current.forEach((conn, id) => {
      try {
        if (payload.to && payload.to !== id) return;
        conn.send(payload);
      } catch {}
    });
  }, []);

  const onData = useCallback((handler) => {
    dataHandlers.current.push(handler);
    return () => {
      dataHandlers.current = dataHandlers.current.filter((h) => h !== handler);
    };
  }, []);

  const onIncomingCall = useCallback((handler) => {
    if (!peer) return () => {};
    const listener = (call) => handler(call);
    peer.on('call', listener);
    return () => { try { peer.off('call', listener); } catch {} };
  }, [peer]);

  const callPeer = useCallback((remoteId, localStream) => {
    if (!peer) return null;
    try {
      const call = peer.call(remoteId, localStream);
      return call;
    } catch {
      return null;
    }
  }, [peer]);

  return {
    peer,
    myId,
    ready,
    asHost,
    asGuest,
    dataSend,
    onData,
    onIncomingCall,
    callPeer,
  };
}
