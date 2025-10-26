import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MeetingLobby from './components/MeetingLobby';
import MeetingRoom from './components/MeetingRoom';

export default function App() {
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const content = useMemo(() => {
    if (route.name === 'room') return <MeetingRoom roomId={route.params.id} />;
    if (route.name === 'meet') return <MeetingLobby />;
    return <Hero />;
  }, [route]);

  return (
    <div className="min-h-screen bg-slate-950 text-white antialiased">
      <Navbar />
      <main>{content}</main>
    </div>
  );
}

function getRoute() {
  const hash = (typeof window !== 'undefined' && window.location.hash) || '';
  if (hash.startsWith('#/room/')) {
    const id = hash.replace('#/room/', '').trim();
    return { name: 'room', params: { id } };
  }
  if (hash.startsWith('#/meet')) return { name: 'meet', params: {} };
  return { name: 'home', params: {} };
}
