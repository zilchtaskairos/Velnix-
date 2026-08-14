import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Gamepad2, 
  Download, 
  Star, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Plus, 
  Trash2,
  CheckCircle,
  Play
} from 'lucide-react';

export const GamesPage: React.FC = () => {
  const { animeGames, linkedGames, linkGameAccount, unlinkGameAccount, openTrailer, addToast } = useApp();
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState('game-solo-leveling-arise');
  const [inGameName, setInGameName] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [server, setServer] = useState('Global US-East');

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inGameName.trim() || !playerId.trim()) return;
    linkGameAccount(selectedGameId, inGameName, playerId, server);
    setShowLinkModal(false);
    setInGameName('');
    setPlayerId('');
  };

  return (
    <div className="animate-fade-in pb-20 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-purple-950 text-purple-300 border border-purple-800 rounded-full flex items-center gap-1.5">
              <Gamepad2 className="w-3.5 h-3.5 text-cyan-400" />
              Official Anime Gaming Hub
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Anime Games & Account Sync
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Download official anime titles directly from Google Play / Apple App Store and connect your gaming levels to your Velnix profile!
          </p>
        </div>

        <button
          onClick={() => setShowLinkModal(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs tracking-wide shadow-lg shadow-purple-600/30 flex items-center gap-2 self-start md:self-auto transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Connect Gaming Account</span>
        </button>
      </div>

      {/* 1. Connected Gaming Accounts Showcase Banner */}
      {linkedGames.length > 0 && (
        <div className="p-6 rounded-3xl bg-[#0f0f22] border border-purple-900/50 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-white text-base">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Your Connected Gaming Profiles ({linkedGames.length})</span>
            </div>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Live Sync Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {linkedGames.map((account) => (
              <div
                key={account.gameId}
                className="p-4 rounded-2xl bg-[#14142b] border border-slate-800 flex flex-col justify-between gap-3 shadow-md"
              >
                <div className="flex items-start gap-3">
                  <img src={account.gameIcon} alt={account.gameName} className="w-12 h-12 rounded-xl object-cover ring-1 ring-purple-500" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-xs sm:text-sm text-white truncate">{account.gameName}</h4>
                    <p className="text-xs text-purple-300 font-semibold">{account.inGameName}</p>
                    <span className="text-[10px] text-slate-400 font-mono block">{account.playerId}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400">Level:</span> <strong className="text-amber-400 font-bold">{account.level}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Hours:</span> <strong className="text-cyan-300">{account.playtimeHours}h</strong>
                  </div>
                  <button
                    onClick={() => unlinkGameAccount(account.gameId)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                    title="Unlink"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Official Games Catalog */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
          Official Featured Anime Titles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {animeGames.map((game) => (
            <div
              key={game.id}
              className="p-5 rounded-3xl bg-[#101022] border border-slate-800/80 hover:border-purple-500/60 transition-all flex flex-col justify-between space-y-4 shadow-xl group"
            >
              {/* Top Banner Image */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950">
                <img src={game.banner} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-cyan-300 text-xs font-bold border border-cyan-500/30">
                  {game.category}
                </div>
                {game.videoTrailerId && (
                  <button
                    onClick={() => openTrailer(game.videoTrailerId!)}
                    className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xl">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </button>
                )}
              </div>

              {/* Game Metadata */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors">
                    {game.title}
                  </h3>
                  <span className="flex items-center gap-1 text-amber-400 font-bold text-xs bg-amber-950/40 px-2 py-0.5 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {game.rating} ({game.downloads})
                  </span>
                </div>

                <p className="text-xs text-slate-400">{game.publisher} • {game.developer}</p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {game.shortDescription}
                </p>
              </div>

              {/* Download Buttons (App Store & Google Play) */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-800">
                <a
                  href={game.playStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Google Play</span>
                </a>

                <a
                  href={game.appStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>App Store (iOS)</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connect Account Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/80 animate-fade-in">
          <div className="fixed inset-0" onClick={() => setShowLinkModal(false)} />
          <div className="relative w-full max-w-md bg-[#111124] border border-purple-900/60 rounded-3xl p-6 shadow-2xl z-10 animate-slide-up space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-purple-400" />
                <span>Link Game Account to Profile</span>
              </h3>
              <button onClick={() => setShowLinkModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleLinkSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Select Game</label>
                <select
                  value={selectedGameId}
                  onChange={(e) => setSelectedGameId(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                >
                  {animeGames.map((g) => (
                    <option key={g.id} value={g.id}>{g.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">In-Game Nickname / Handle</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ShadowKing#9901"
                  value={inGameName}
                  onChange={(e) => setInGameName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Player UID / Account ID</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SL-8849-0129"
                  value={playerId}
                  onChange={(e) => setPlayerId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Server</label>
                <select
                  value={server}
                  onChange={(e) => setServer(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                >
                  <option value="Global US-East">Global US-East</option>
                  <option value="Global Europe">Global Europe</option>
                  <option value="Asia / Japan">Asia / Japan</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
                >
                  Connect & Sync
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
