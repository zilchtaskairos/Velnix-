import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bookmark, 
  Play, 
  ChevronRight, 
  Download, 
  Trash2, 
  Film, 
  BookOpen, 
  Gamepad2, 
  RotateCcw,
  CheckCircle,
  HardDrive
} from 'lucide-react';

export const LibraryPage: React.FC = () => {
  const { 
    navigateTo, 
    watchlist, 
    mangaProgress, 
    linkedGames, 
    downloadedEpisodes, 
    deleteDownloadedEpisode, 
    downloadProgress,
    animes 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'All' | 'Anime' | 'Manga' | 'Downloads' | 'Watchlist' | 'Completed' | 'On Hold'>('All');

  const filterPills = ['All', 'Anime', 'Manga', 'Downloads', 'Watchlist', 'Completed', 'On Hold'] as const;

  const animeCount = Object.keys(watchlist).length;
  const mangaCount = Object.keys(mangaProgress).length;
  const completedCount = Object.values(watchlist).filter(w => w.status === 'completed').length;
  const totalEpisodes = Object.values(watchlist).reduce((acc, item) => acc + (item.progressEpisode || 0), 0);
  const watchTimeHours = Math.round((totalEpisodes * 24) / 60);

  // Dynamic Watchlist Items merged with base list
  const dynamicWatchlistItems = Object.entries(watchlist).map(([id, entry]) => {
    const matched = animes.find(a => a.id === id);
    return {
      id,
      title: matched?.title || id,
      subtitle: `${matched?.format || 'TV'} • ${matched?.year || '2024'}`,
      episodes: `${matched?.episodesCount || 12} Episodes`,
      poster: matched?.poster || 'https://cdn.myanimelist.net/images/anime/1764/126627l.jpg',
      status: entry.status
    };
  });

  const baseItems = [
    {
      id: '21',
      title: 'One Piece',
      subtitle: 'TV • Ongoing',
      episodes: '1098 Episodes',
      poster: 'https://cdn.myanimelist.net/images/anime/1244/138851l.jpg',
      status: 'watching'
    },
    {
      id: '41467',
      title: 'Bleach: Thousand-Year Blood War',
      subtitle: 'TV • 2022',
      episodes: '26 Episodes',
      poster: 'https://cdn.myanimelist.net/images/anime/1764/126627l.jpg',
      status: 'watching'
    },
    {
      id: '52299',
      title: 'Solo Leveling',
      subtitle: 'TV • 2024',
      episodes: '12 Episodes',
      poster: 'https://cdn.myanimelist.net/images/anime/1816/141049l.jpg',
      status: 'watching'
    },
    {
      id: '44511',
      title: 'Chainsaw Man',
      subtitle: 'TV • 2022',
      episodes: '12 Episodes',
      poster: 'https://cdn.myanimelist.net/images/anime/1806/126216l.jpg',
      status: 'watching'
    }
  ];

  // Combine unique items
  const allListItems = [
    ...dynamicWatchlistItems,
    ...baseItems.filter(b => !dynamicWatchlistItems.some(d => d.id === b.id))
  ];

  const filteredItems = allListItems.filter(item => {
    if (activeTab === 'Completed') return item.status === 'completed';
    if (activeTab === 'On Hold') return item.status === 'on_hold';
    if (activeTab === 'Watchlist') return true;
    return true;
  });

  return (
    <div className="animate-fade-in pb-32 max-w-md md:max-w-xl mx-auto space-y-6">
      
      {/* 1. Header Title */}
      <div>
        <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
          <span>Your Library</span>
          <span className="text-[#ff2e56] text-lg">✨</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">All your anime, manga, downloads & watchlist.</p>
      </div>

      {/* 2. FILTER PILLS matching Screenshot 5 Right (With Downloads Tab) */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {filterPills.map((pill) => (
          <button
            key={pill}
            type="button"
            onClick={() => setActiveTab(pill)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
              activeTab === pill
                ? 'bg-[#ff2e56] text-white shadow-md'
                : 'bg-[#141424] text-slate-300 hover:bg-[#1c1c30]'
            }`}
          >
            {pill === 'Downloads' ? `Downloads (${downloadedEpisodes.length})` : pill}
          </button>
        ))}
      </div>

      {/* 3. 5 STATS BLOCK */}
      <div className="grid grid-cols-5 gap-1.5 p-3 rounded-2xl bg-[#0f0f1f] border border-slate-800 text-center shadow-md">
        <div>
          <h4 className="font-extrabold text-sm text-white">{allListItems.length}</h4>
          <p className="text-[9px] text-slate-400 mt-0.5 leading-tight">Total Titles</p>
        </div>
        <div>
          <h4 className="font-extrabold text-sm text-white">{animeCount}</h4>
          <p className="text-[9px] text-slate-400 mt-0.5 leading-tight">Anime</p>
        </div>
        <div>
          <h4 className="font-extrabold text-sm text-white">{mangaCount}</h4>
          <p className="text-[9px] text-slate-400 mt-0.5 leading-tight">Manga</p>
        </div>
        <div>
          <h4 className="font-extrabold text-sm text-white">{downloadedEpisodes.length}</h4>
          <p className="text-[9px] text-slate-400 mt-0.5 leading-tight">Offline</p>
        </div>
        <div>
          <h4 className="font-extrabold text-sm text-white">{watchTimeHours}h</h4>
          <p className="text-[9px] text-slate-400 mt-0.5 leading-tight">Watch Time</p>
        </div>
      </div>

      {/* Active Downloads Progress Strip if downloading */}
      {Object.keys(downloadProgress).length > 0 && (
        <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-[#ff2e56]/50 space-y-2 text-xs animate-fade-in shadow-lg">
          <div className="flex items-center justify-between text-white font-semibold">
            <span className="flex items-center gap-1.5">
              <Download className="w-4 h-4 text-[#ff2e56] animate-bounce" /> Downloading to Device Storage...
            </span>
            <span className="text-[#ff2e56] font-mono font-bold">
              {Object.values(downloadProgress)[0]}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-[#ff2e56] transition-all duration-300" style={{ width: `${Object.values(downloadProgress)[0]}%` }} />
          </div>
        </div>
      )}

      {/* TAB: OFFLINE DOWNLOADS (Cloudstream Workflow) */}
      {activeTab === 'Downloads' ? (
        <div className="space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-[#ff2e56]" />
              <span>Offline Downloaded Episodes</span>
            </h3>
            <span className="text-xs text-slate-400">{downloadedEpisodes.length} saved</span>
          </div>

          {downloadedEpisodes.length === 0 ? (
            <div className="p-8 rounded-3xl bg-[#0e0e1a] border border-slate-800 text-center space-y-3">
              <Download className="w-10 h-10 mx-auto text-slate-600 mb-1" />
              <p className="font-bold text-sm text-slate-200">No Offline Downloads Yet</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Open any anime and tap <strong>⬇️ Download</strong> to save episodes in 480p, 720p, or 1080p Ultra HD!
              </p>
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className="px-4 py-2 rounded-xl bg-[#ff2e56] hover:bg-[#ff4b72] text-white text-xs font-bold transition-all cursor-pointer"
              >
                Browse Anime to Download
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {downloadedEpisodes.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-[#111122] border border-slate-800 hover:border-slate-700 flex items-center justify-between gap-3 shadow-md transition-all"
                >
                  <div
                    onClick={() => navigateTo('watch', { animeId: item.animeId, episodeId: item.episodeNumber })}
                    className="flex items-center gap-3 min-w-0 cursor-pointer flex-1 group"
                  >
                    <div className="relative w-14 h-11 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                      <img src={item.animePoster} alt={item.animeTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-[#ff2e56]/40 transition-colors">
                        <Play className="w-3.5 h-3.5 fill-white" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-white truncate group-hover:text-[#ff2e56] transition-colors">{item.animeTitle}</h4>
                      <p className="text-[10px] text-slate-400">
                        Episode {item.episodeNumber} • <span className="text-[#ff2e56] font-bold">{item.quality}</span> • {item.sizeMb} MB
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => navigateTo('watch', { animeId: item.animeId, episodeId: item.episodeNumber })}
                      className="px-2.5 py-1.5 rounded-xl bg-[#ff2e56] hover:bg-[#ff4b72] text-white font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Play</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteDownloadedEpisode(item.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Delete Download"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* STANDARD MY LIST */
        <div className="space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white">My List</h3>
            <button type="button" onClick={() => navigateTo('browse')} className="text-xs text-[#ff2e56] font-semibold flex items-center cursor-pointer">
              <span>See All</span> <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => navigateTo('anime', { animeId: item.id })}
                className="p-2.5 rounded-2xl bg-[#111122] border border-slate-800/80 hover:border-[#ff2e56] flex items-center justify-between gap-3 cursor-pointer transition-all shadow-md group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img src={item.poster} alt={item.title} className="w-12 h-16 rounded-xl object-cover shrink-0 group-hover:scale-103 transition-transform" />
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-white truncate group-hover:text-[#ff2e56] transition-colors">{item.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.subtitle} • {item.episodes}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateTo('watch', { animeId: item.id, episodeId: 1 });
                    }}
                    className="p-2 rounded-xl bg-[#ff2e56]/15 hover:bg-[#ff2e56] text-[#ff2e56] hover:text-white transition-all cursor-pointer"
                    title="Watch Episode 1"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                  <button type="button" className="p-2 text-[#ff2e56] hover:text-[#ff4b72] shrink-0">
                    <Bookmark className="w-5 h-5 fill-[#ff2e56]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
