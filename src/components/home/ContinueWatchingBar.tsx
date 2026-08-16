import React from 'react';
import { useApp } from '../../context/AppContext';
import { Play, Clock, Trash2, RotateCcw } from 'lucide-react';

export const ContinueWatchingBar: React.FC = () => {
  const { continueWatching, animes, navigateTo, clearHistory } = useApp();

  if (continueWatching.length === 0) return null;

  const formatSeconds = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <section className="mb-10 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <RotateCcw className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
              Continue Watching
            </h2>
            <p className="text-xs text-slate-400">Pick up right where you left off</p>
          </div>
        </div>

        <button
          onClick={clearHistory}
          className="text-xs text-slate-500 hover:text-rose-400 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-rose-950/20"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {continueWatching.slice(0, 3).map((item) => {
          const anime = animes.find((a) => a.id === item.animeId);
          if (!anime) return null;

          const progressPercent = Math.min(100, Math.round((item.currentTime / (item.duration || 1)) * 100));
          const episode = anime.episodes.find(e => e.id === item.episodeId) || anime.episodes[0];

          return (
            <div
              key={`${item.animeId}-${item.episodeId}`}
              onClick={() => navigateTo('watch', { animeId: item.animeId, episodeId: item.episodeId })}
              className="group relative flex flex-col rounded-2xl bg-[#121222] border border-slate-800/80 hover:border-cyan-500/60 overflow-hidden shadow-lg transition-all cursor-pointer transform hover:-translate-y-1"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                <img
                  src={episode?.thumbnail || anime.banner}
                  alt={item.episodeTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Center Play Pulse button on hover */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-cyan-500/90 text-black flex items-center justify-center shadow-lg shadow-cyan-500/40 group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Top badges */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[11px] font-bold text-cyan-300">
                  Episode {item.episodeNumber}
                </div>

                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-semibold text-slate-300 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  {formatSeconds(item.currentTime)} / {formatSeconds(item.duration)}
                </div>

                {/* Bottom Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Title & Info */}
              <div className="p-3">
                <h4 className="font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors truncate">
                  {anime.title}
                </h4>
                <p className="text-xs text-slate-400 truncate mt-0.5">
                  Ep {item.episodeNumber} — {item.episodeTitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
