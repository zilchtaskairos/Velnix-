import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Play, 
  Sparkles, 
  Plus, 
  Radio, 
  ShieldCheck, 
  ArrowRight,
  Tv
} from 'lucide-react';

export const HomeWatchParties: React.FC = () => {
  const { watchParties, joinParty, createParty, animes, navigateTo } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [partyName, setPartyName] = useState('');
  const [selectedAnimeId, setSelectedAnimeId] = useState('solo-leveling');
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(1);
  const [partyDesc, setPartyDesc] = useState('');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partyName.trim()) return;
    createParty(partyName, selectedAnimeId, selectedEpisodeId, partyDesc);
    setShowCreateModal(false);
    setPartyName('');
    setPartyDesc('');
  };

  return (
    <section className="my-10 p-6 rounded-3xl bg-gradient-to-r from-purple-950/60 via-[#101026] to-indigo-950/50 border border-purple-800/40 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/30 border border-purple-500/40 text-purple-400 flex items-center justify-center shadow-lg shadow-purple-600/30">
            <Radio className="w-6 h-6 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Live Watch Parties (Up to 150 Fans)
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                {watchParties.length > 0 ? `${watchParties.length} ACTIVE ROOMS` : 'READY TO HOST'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Stream together in synchronized rooms with live group chat, emotes, and reaction soundboards.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs tracking-wide shadow-lg shadow-purple-600/30 flex items-center gap-2 self-start md:self-auto transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Host New Watch Party</span>
        </button>
      </div>

      {/* Empty State / Active Parties Grid */}
      {watchParties.length === 0 ? (
        <div className="py-12 px-4 text-center rounded-2xl bg-[#0b0b18]/60 border border-slate-800/80 flex flex-col items-center justify-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400">
            <Users className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-200">
            No Active Watch Parties Right Now
          </h3>
          <p className="text-xs text-slate-400 max-w-md">
            The room list is clear and ready. Be the first to start an anime watchalong room and invite up to 150 friends!
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Host the First Watch Party</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {watchParties.map((party) => {
            const participantPct = Math.round((party.participantsCount / party.maxParticipants) * 100);
            return (
              <div
                key={party.id}
                onClick={() => joinParty(party.id)}
                className="group relative flex flex-col justify-between rounded-3xl bg-[#0b0b18]/90 border border-slate-800/80 hover:border-purple-500/60 overflow-hidden cursor-pointer shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={party.animeBanner}
                    alt={party.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b18] via-[#0b0b18]/40 to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-bold border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>{party.participantsCount} / {party.maxParticipants} Watching</span>
                  </div>

                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-purple-950/80 text-purple-300 border border-purple-800 text-[10px] font-bold">
                    Ep {party.episodeNumber}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xl shadow-purple-600/50">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                      {party.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-snug">
                      {party.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <img src={party.hostAvatar} alt={party.hostName} className="w-5 h-5 rounded-full object-cover ring-1 ring-purple-400" />
                        <span className="text-slate-300 font-medium">Host: {party.hostName}</span>
                      </div>
                      <span className="font-mono text-purple-300 font-bold">{party.roomCode}</span>
                    </div>

                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                        style={{ width: `${participantPct}%` }}
                      />
                    </div>
                  </div>

                  <button className="w-full py-2 rounded-xl bg-purple-600/20 group-hover:bg-purple-600 text-purple-300 group-hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors">
                    <span>Join Party Room</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Party Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/80 animate-fade-in">
          <div className="fixed inset-0" onClick={() => setShowCreateModal(false)} />
          <div className="relative w-full max-w-lg bg-[#111124] border border-purple-900/60 rounded-3xl p-6 shadow-2xl z-10 animate-slide-up space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                <span>Host a 150-Person Watch Party</span>
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Party Room Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solo Leveling Episode 1 Watch Party"
                  value={partyName}
                  onChange={(e) => setPartyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Select Anime</label>
                  <select
                    value={selectedAnimeId}
                    onChange={(e) => setSelectedAnimeId(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  >
                    {animes.map((a) => (
                      <option key={a.id} value={a.id}>{a.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Episode Number</label>
                  <select
                    value={selectedEpisodeId}
                    onChange={(e) => setSelectedEpisodeId(Number(e.target.value))}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((ep) => (
                      <option key={ep} value={ep}>Episode {ep}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Party Description / Rules</label>
                <textarea
                  rows={2}
                  placeholder="Drop a note for joining members (e.g. Welcome everyone to the watch party!)"
                  value={partyDesc}
                  onChange={(e) => setPartyDesc(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-900/40 text-[11px] text-purple-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Room capacity: Up to 150 members with low-latency synced playback!</span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg"
                >
                  Create & Launch Party Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
