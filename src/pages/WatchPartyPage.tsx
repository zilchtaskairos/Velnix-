import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Play, 
  Pause, 
  Send, 
  Share2, 
  Copy, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  Volume2, 
  Tv,
  ArrowLeft,
  RotateCcw,
  RotateCw,
  Maximize,
  FastForward,
  Check,
  Plus,
  Flame,
  Heart,
  Smile,
  Zap,
  Radio
} from 'lucide-react';

export const WatchPartyPage: React.FC = () => {
  const { 
    watchParties, 
    activeParty, 
    leaveParty, 
    sendPartyMessage, 
    createParty,
    joinParty,
    currentUser, 
    navigateTo, 
    animes,
    addToast 
  } = useApp();

  const [selectedPartyId, setSelectedPartyId] = useState<string>(activeParty?.id || watchParties[0]?.id || 'party-1');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [selectedAnimeId, setSelectedAnimeId] = useState('41467');
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(1);

  const party = watchParties.find(p => p.id === selectedPartyId) || activeParty || watchParties[0];

  const [messageInput, setMessageInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(322); // 05:22
  const [duration, setDuration] = useState(1471); // 24:31
  const [autoNext, setAutoNext] = useState(true);
  const [reactions, setReactions] = useState<{ id: string; emoji: string; x: number }[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [party?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !party) return;
    sendPartyMessage(party.id, messageInput.trim());
    setMessageInput('');
  };

  const handleSendReaction = (emoji: string) => {
    const newReact = {
      id: 'react-' + Date.now() + Math.random(),
      emoji,
      x: Math.floor(Math.random() * 80) + 10
    };
    setReactions(prev => [...prev, newReact]);
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== newReact.id));
    }, 2500);

    if (party) {
      sendPartyMessage(party.id, emoji);
    }
  };

  const handleCopyInvite = () => {
    if (!party) return;
    navigator.clipboard?.writeText(`${window.location.origin}?party=${party.roomCode}`);
    addToast({ title: 'Room Link Copied! 📋', description: `Room Code: ${party.roomCode}`, type: 'success' });
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;
    const newId = createParty(newRoomName.trim(), selectedAnimeId, selectedEpisodeId);
    setSelectedPartyId(newId);
    setShowCreateModal(false);
    setNewRoomName('');
    addToast({ title: '🎉 Room Created!', description: 'Up to 150 friends can join live!', type: 'success' });
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="animate-fade-in pb-36 max-w-5xl mx-auto space-y-5 text-slate-100 font-sans">
      
      {/* 1. Header matching base44.app/party */}
      <div className="flex items-center justify-between p-4 rounded-3xl bg-[#0d0d18] border border-slate-800/80 shadow-xl flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="p-1.5 rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black font-heading text-white">
                Watch Party
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 font-bold text-[10px] flex items-center gap-1 uppercase">
                <span className="w-2 h-2 rounded-full bg-[#ff2e56] animate-ping" />
                Live
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {party?.name || 'Anime Live Stream'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-3.5 py-2 rounded-2xl bg-[#ff2e56] hover:bg-[#ff4b72] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Host Party</span>
          </button>

          <button
            onClick={handleCopyInvite}
            className="px-3.5 py-2 rounded-2xl bg-[#141426] hover:bg-[#ff2e56]/20 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
          >
            <Users className="w-3.5 h-3.5 text-[#ff2e56]" />
            <span>Invite {party?.participantsCount || 6}</span>
          </button>

          <button
            onClick={() => {
              leaveParty();
              navigateTo('home');
            }}
            className="px-3.5 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-400 text-xs font-semibold transition-colors cursor-pointer"
          >
            Leave
          </button>
        </div>
      </div>

      {/* Public Rooms Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <span className="text-[11px] text-slate-400 shrink-0 font-semibold flex items-center gap-1">
          <Radio className="w-3.5 h-3.5 text-[#ff2e56]" /> Active Rooms:
        </span>
        {watchParties.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setSelectedPartyId(p.id);
              joinParty(p.id);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
              p.id === selectedPartyId
                ? 'bg-[#ff2e56] text-white shadow-md'
                : 'bg-[#121222] border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {p.animeTitle.split(':')[0]} ({p.participantsCount || 6}👥)
          </button>
        ))}
      </div>

      {/* 2. Room Host Bar matching base44 */}
      <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[#090912] border border-slate-800 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span>Room hosted by</span>
          <img src={party?.hostAvatar || 'https://cdn.myanimelist.net/images/characters/15/422168.jpg'} alt="Host" className="w-5 h-5 rounded-full object-cover ring-1 ring-[#ff2e56]" />
          <span className="font-bold text-white">{party?.hostName || 'GojoSatoru'}</span>
          <span className="px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 text-[9px] font-bold border border-amber-800">
            Admin
          </span>
        </div>

        <div className="font-mono text-[11px] text-slate-400">
          Room Code: <strong className="text-[#ff2e56]">{party?.roomCode || 'VELNIX-7731'}</strong>
        </div>
      </div>

      {/* 3. Main Grid: Synchronized Video Player + Live Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 cols: Synchronized Video Player */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-black shadow-2xl border border-slate-800 group">
            <video
              ref={videoRef}
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
              poster={party?.animeBanner || 'https://cdn.myanimelist.net/images/anime/1764/126627l.jpg'}
              playsInline
              onTimeUpdate={() => {
                if (videoRef.current) {
                  setCurrentTime(videoRef.current.currentTime);
                  setDuration(videoRef.current.duration || 1471);
                }
              }}
              className="w-full h-full object-cover"
            />

            {/* Floating Live Reactions Layer */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-25">
              {reactions.map((r) => (
                <div
                  key={r.id}
                  className="absolute text-2xl sm:text-3xl animate-bounce"
                  style={{
                    left: `${r.x}%`,
                    bottom: '20%'
                  }}
                >
                  {r.emoji}
                </div>
              ))}
            </div>

            {/* Sync Overlay Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2">
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (videoRef.current) {
                    videoRef.current.currentTime = val;
                    setCurrentTime(val);
                  }
                }}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#ff2e56]"
              />

              <div className="flex items-center justify-between text-xs text-white">
                <span className="font-mono text-slate-300 font-bold">{formatTime(currentTime)} / {formatTime(duration)}</span>
                
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => {
                      if (videoRef.current) videoRef.current.currentTime += 85;
                    }}
                    className="text-xs font-bold text-white hover:text-[#ff2e56] flex items-center gap-1 cursor-pointer"
                  >
                    <FastForward className="w-3.5 h-3.5" /> Skip Intro
                  </button>

                  <label className="flex items-center gap-1.5 cursor-pointer text-xs text-slate-300 select-none">
                    <span>Auto Next</span>
                    <input
                      type="checkbox"
                      checked={autoNext}
                      onChange={(e) => setAutoNext(e.target.checked)}
                      className="rounded bg-slate-800 border-slate-700 text-[#ff2e56] focus:ring-0 cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Reactions Bar */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0c0c18] border border-slate-800 shadow-md">
            <span className="text-xs text-slate-400 font-semibold">Live Reactions:</span>
            <div className="flex items-center gap-2">
              {['🔥', '😱', '❤️', '⚡', '😂', '👑'].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleSendReaction(emoji)}
                  className="p-1.5 rounded-xl bg-slate-900 hover:bg-[#ff2e56]/20 text-lg hover:scale-125 transition-transform cursor-pointer"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Anime Title & Episode Information */}
          <div className="p-4 rounded-2xl bg-[#0c0c18] border border-slate-800 shadow-md space-y-1">
            <h2 className="text-base sm:text-lg font-bold font-heading text-white">
              {party?.animeTitle || 'BLEACH: Thousand-Year Blood War'}
            </h2>
            <p className="text-xs text-slate-400">
              S1 E1 — THE BLOOD WARFARE • 24m • Synchronized playback with up to 150 members
            </p>
          </div>

        </div>

        {/* Right 5 cols: LIVE CHAT matching base44.app/party */}
        <div className="lg:col-span-5 flex flex-col h-[520px] rounded-3xl bg-[#0d0d18] border border-slate-800/80 p-4 shadow-2xl space-y-3">
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#ff2e56]" />
              <span>Live Chat</span>
            </h3>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Synced ({party?.members?.length || 6})
            </span>
          </div>

          {/* Messages Stream matching exact comments in base44.app/party */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {party?.messages?.map((msg) => (
              <div key={msg.id} className="flex items-start gap-2.5 text-xs animate-fade-in">
                <img src={msg.avatar} alt={msg.username} className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-white/10" />
                <div className="min-w-0 flex-1 bg-[#141424] p-2.5 rounded-2xl border border-slate-800/60">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white text-[11px] truncate">{msg.username}</span>
                      {msg.isVip && (
                        <span className="px-1 py-0.1 rounded bg-[#ff2e56]/20 text-[#ff2e56] text-[8px] font-bold">
                          VIP
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] text-slate-500">{msg.timestamp}</span>
                  </div>
                  <p className="text-slate-200 text-xs leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>

          {/* Live Chat Input Bar */}
          <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2 border-t border-slate-800">
            <input
              type="text"
              placeholder="Send message to room..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 bg-[#141426] border border-slate-700 px-3.5 py-2 rounded-2xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#ff2e56]"
            />
            <button
              type="submit"
              disabled={!messageInput.trim()}
              className="p-2.5 rounded-2xl bg-[#ff2e56] hover:bg-[#ff4b72] disabled:opacity-40 text-white shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>

      {/* CREATE ROOM MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/80 animate-fade-in">
          <div className="fixed inset-0" onClick={() => setShowCreateModal(false)} />
          <div className="relative w-full max-w-md bg-[#111124] border border-[#ff2e56]/60 rounded-3xl p-6 shadow-2xl z-10 animate-slide-up space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-[#ff2e56]" />
                <span>Create Watch Party Room</span>
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateRoom} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Room Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bleach TYBW Cour 3 Party"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded-xl text-white focus:outline-none focus:border-[#ff2e56]"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Select Anime</label>
                <select
                  value={selectedAnimeId}
                  onChange={(e) => setSelectedAnimeId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded-xl text-white focus:outline-none focus:border-[#ff2e56]"
                >
                  {animes.map(a => (
                    <option key={a.id} value={a.id}>{a.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Episode Number</label>
                <input
                  type="number"
                  min={1}
                  max={26}
                  value={selectedEpisodeId}
                  onChange={(e) => setSelectedEpisodeId(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded-xl text-white focus:outline-none focus:border-[#ff2e56]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#ff2e56] hover:bg-[#ff4b72] text-white font-bold shadow-md"
                >
                  Launch Room 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
