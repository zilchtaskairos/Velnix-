import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Character } from '../types/anime';
import { fetchAnimeCharactersAndVA } from '../services/jikanApi';
import { 
  Play, 
  Share2, 
  Plus, 
  ChevronDown,
  Download,
  Zap,
  Sparkles,
  Star
} from 'lucide-react';

export const AnimeDetailPage: React.FC = () => {
  const { 
    currentAnime, 
    animes, 
    params, 
    navigateTo, 
    watchlist, 
    updateWatchlistStatus, 
    removeFromWatchlist, 
    downloadedServers,
    startDownloadEpisode,
    addToast 
  } = useApp();

  const anime = currentAnime || (params.animeId ? animes.find(a => a.id === params.animeId) : null) || animes[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'episodes' | 'characters' | 'voice_actors' | 'related'>('overview');
  const [jikanCharacters, setJikanCharacters] = useState<Character[]>([]);
  const [loadingCharacters, setLoadingCharacters] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadTargetEp, setDownloadTargetEp] = useState(1);

  useEffect(() => {
    if (anime) {
      setLoadingCharacters(true);
      fetchAnimeCharactersAndVA(anime.id).then((chars) => {
        if (chars && chars.length > 0) {
          setJikanCharacters(chars);
        }
        setLoadingCharacters(false);
      });
    }
  }, [anime?.id]);

  const isInLibrary = !!watchlist[anime.id];
  const charactersToDisplay = jikanCharacters.length > 0 ? jikanCharacters : (anime.characters || []);

  const handleWatchNow = () => {
    navigateTo('watch', { animeId: anime.id, episodeId: 1 });
  };

  const handleEpisodeClick = (epNum: number) => {
    navigateTo('watch', { animeId: anime.id, episodeId: epNum });
  };

  const handleStartDownload = (quality: string) => {
    setShowDownloadModal(false);
    startDownloadEpisode(anime.id, downloadTargetEp, quality);
  };

  return (
    <div className="animate-fade-in pb-32 max-w-7xl mx-auto space-y-6">
      
      {/* 1. Header Hero Card matching Screenshot 3 */}
      <div className="relative rounded-3xl overflow-hidden bg-[#0d0d18] border border-slate-800/80 p-5 sm:p-8 flex flex-col md:flex-row gap-6 shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img
            src={anime.banner}
            alt={anime.title}
            className="w-full h-full object-cover brightness-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d18] via-[#0d0d18]/60 to-transparent" />
        </div>

        {/* Poster */}
        <div className="relative z-10 w-28 sm:w-36 aspect-[3/4.4] rounded-2xl overflow-hidden shadow-2xl ring-2 ring-[#ff2e56]/60 shrink-0 mx-auto md:mx-0">
          <img src={anime.poster} alt={anime.title} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div className="relative z-10 flex-1 space-y-3 text-center md:text-left">
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-wide">
            {anime.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300">
            {anime.year} • <span className="text-[#ff2e56] font-bold">★ {anime.score}</span> (48K) • {anime.episodesCount} Episodes • {anime.status}
          </p>

          <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
            {anime.genres.map((g) => (
              <span key={g} className="px-3 py-1 rounded-xl bg-[#141424] border border-slate-700/60 text-xs font-semibold text-slate-300">
                {g}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2 justify-center md:justify-start flex-wrap">
            <button
              type="button"
              onClick={handleWatchNow}
              className="px-6 py-2.5 rounded-xl bg-[#ff2e56] hover:bg-[#ff4b72] active:bg-[#d61e42] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-pink-600/30 transition-transform active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current pointer-events-none" />
              <span className="pointer-events-none">Watch Ep 1</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (isInLibrary) removeFromWatchlist(anime.id);
                else updateWatchlistStatus(anime.id, 'watching');
              }}
              className="px-4 py-2.5 rounded-xl bg-[#181828]/80 hover:bg-[#222234] border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 pointer-events-none" />
              <span className="pointer-events-none">{isInLibrary ? 'In Library' : '+ Add to Library'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setDownloadTargetEp(1);
                setShowDownloadModal(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-[#181828]/80 hover:bg-[#222234] border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#ff2e56] pointer-events-none" />
              <span className="pointer-events-none">Download</span>
            </button>

            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                addToast({ title: 'Link Copied', description: 'Shared anime URL to clipboard.', type: 'info' });
              }}
              className="px-4 py-2.5 rounded-xl bg-[#181828]/80 hover:bg-[#222234] border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4 pointer-events-none" />
              <span className="pointer-events-none">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* CLOUDSTREAM PROVIDER BADGE */}
      <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[#0e0e1a] border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#ff2e56]" />
          <span className="text-slate-300">CloudStream Providers:</span>
          <span className="font-bold text-white">
            {downloadedServers.length > 0
              ? downloadedServers.map(s => s.name.split(' ')[0]).join(', ')
              : 'HiAnime, AnimePahe, GogoAnime (Direct Stream)'}
          </span>
        </div>
        <button
          onClick={() => navigateTo('extensions')}
          className="text-[#ff2e56] hover:underline font-semibold"
        >
          Manage Providers
        </button>
      </div>

      {/* 2. INFO TABS */}
      <div className="flex items-center gap-6 border-b border-slate-800 text-xs sm:text-sm font-semibold overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'episodes', label: 'Episodes' },
          { id: 'characters', label: 'Characters' },
          { id: 'voice_actors', label: 'Voice Actors' },
          { id: 'related', label: 'Related' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 transition-all relative cursor-pointer ${
                isActive ? 'text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff2e56] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* 3. DETAILS & JIKAN CHARACTERS / VA SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-3xl bg-[#0f0f1e] border border-slate-800/80 space-y-5 shadow-xl">
            <div>
              <h3 className="font-bold text-sm text-white mb-2">About & Synopsis</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {anime.synopsis}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 text-xs border-t border-slate-800 pt-4">
              <div><span className="text-slate-400">Studio</span>: <strong className="text-white">{anime.studio}</strong></div>
              <div><span className="text-slate-400">Source</span>: <strong className="text-white">Manga / Official</strong></div>
              <div><span className="text-slate-400">Duration</span>: <strong className="text-white">{anime.durationPerEp}</strong></div>
              <div><span className="text-slate-400">Score</span>: <strong className="text-[#ff2e56]">★ {anime.score}</strong></div>
              <div><span className="text-slate-400">Status</span>: <strong className="text-emerald-400">{anime.status}</strong></div>
              <div><span className="text-slate-400">Episodes</span>: <strong className="text-white">{anime.episodesCount}</strong></div>
            </div>

            {/* Characters with Jikan Photos */}
            <div className="border-t border-slate-800 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-white">Characters & Cast (Jikan API)</h4>
                {loadingCharacters && <span className="text-[10px] text-[#ff2e56] animate-pulse">Loading Jikan...</span>}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {charactersToDisplay.map((char) => (
                  <div key={char.id} className="flex items-center gap-2 p-2 rounded-xl bg-[#141426] border border-slate-800">
                    <img src={char.image} alt={char.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                    <span className="text-[11px] font-semibold text-white truncate">{char.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Voice Actors with Jikan Photos */}
            <div className="border-t border-slate-800 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-white">Japanese Voice Actors</h4>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {charactersToDisplay.map((char) => (
                  <div key={char.id + '-va'} className="flex items-center gap-2 p-2 rounded-xl bg-[#141426] border border-slate-800">
                    <img src={char.voiceActor.image} alt={char.voiceActor.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-white truncate">{char.voiceActor.name}</p>
                      <p className="text-[9px] text-slate-400 truncate">({char.name})</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Episode Stream List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-3xl bg-[#0f0f1e] border border-slate-800 space-y-3 shadow-xl">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">Episodes ({anime.episodes.length})</h4>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {anime.episodes.map((ep) => (
                <div
                  key={ep.id}
                  className="w-full p-2.5 rounded-2xl bg-[#141428] border border-slate-800 flex items-center justify-between hover:border-[#ff2e56] transition-colors"
                >
                  <div 
                    onClick={() => handleEpisodeClick(ep.number)}
                    className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
                  >
                    <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-slate-950 shrink-0">
                      <img src={ep.thumbnail} alt={ep.title} className="w-full h-full object-cover" />
                    </div>
                    <p className="font-bold text-xs text-white truncate">Ep {ep.number} - {ep.title}</p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setDownloadTargetEp(ep.number);
                        setShowDownloadModal(true);
                      }}
                      className="p-1 text-slate-400 hover:text-[#ff2e56] transition-colors cursor-pointer"
                      title="Download Episode"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEpisodeClick(ep.number)}
                      className="p-1 text-[#ff2e56] hover:text-white transition-colors cursor-pointer"
                      title="Play Episode"
                    >
                      <Play className="w-3.5 h-3.5 fill-[#ff2e56]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* CLOUDSTREAM DOWNLOAD EPISODE MODAL */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/80 animate-fade-in">
          <div className="fixed inset-0" onClick={() => setShowDownloadModal(false)} />
          <div className="relative w-full max-w-sm bg-[#111124] border border-[#ff2e56]/60 rounded-3xl p-5 shadow-2xl z-10 animate-slide-up space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-[#ff2e56]" />
                <span>Download Episode {downloadTargetEp}</span>
              </h3>
              <button onClick={() => setShowDownloadModal(false)} className="text-slate-400 hover:text-white cursor-pointer">✕</button>
            </div>

            <p className="text-xs text-slate-300">
              Select download quality for offline playback in your Downloads Library:
            </p>

            <div className="space-y-2">
              {[
                { quality: '480p SD', size: '95 MB', desc: 'Smaller file (Fastest)' },
                { quality: '720p HD', size: '190 MB', desc: 'Balanced storage' },
                { quality: '1080p Ultra HD', size: '380 MB', desc: 'Crisp high-definition' }
              ].map((opt) => (
                <button
                  key={opt.quality}
                  onClick={() => handleStartDownload(opt.quality.split(' ')[0])}
                  className="w-full p-3 rounded-2xl bg-slate-900 hover:bg-[#ff2e56]/20 border border-slate-800 hover:border-[#ff2e56] flex items-center justify-between text-xs transition-colors text-left group cursor-pointer"
                >
                  <div>
                    <h4 className="font-bold text-white group-hover:text-[#ff2e56]">{opt.quality}</h4>
                    <p className="text-[10px] text-slate-400">{opt.desc}</p>
                  </div>
                  <span className="font-mono text-[#ff2e56] font-bold text-[11px]">{opt.size}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
