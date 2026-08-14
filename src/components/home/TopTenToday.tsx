import React from 'react';
import { Anime } from '../../types/anime';
import { useApp } from '../../context/AppContext';
import { Flame, Star, Play, Subtitles, Mic } from 'lucide-react';

interface TopTenTodayProps {
  animes: Anime[];
}

export const TopTenToday: React.FC<TopTenTodayProps> = ({ animes }) => {
  const { navigateTo } = useApp();

  const sortedAnimes = [...animes].sort((a, b) => b.score - a.score).slice(0, 10);

  return (
    <section className="my-10">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-red-500 text-black flex items-center justify-center font-bold">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              Top 10 Today on Velnix
            </h2>
            <p className="text-xs text-slate-400">Most viewed anime right now across global edge servers</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {sortedAnimes.map((anime, index) => {
          const rank = index + 1;
          return (
            <div
              key={anime.id}
              onClick={() => navigateTo('anime', { animeId: anime.id })}
              className="group relative flex gap-3 p-2.5 rounded-2xl bg-[#111122] border border-slate-800/80 hover:border-amber-500/50 transition-all cursor-pointer overflow-hidden transform hover:-translate-y-1 shadow-md hover:shadow-amber-500/10"
            >
              {/* Giant Rank Number Badge */}
              <div className="flex items-center justify-center min-w-[32px] text-3xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-amber-500 to-red-600 select-none">
                {rank < 10 ? `0${rank}` : rank}
              </div>

              {/* Poster */}
              <div className="relative w-16 h-22 rounded-xl overflow-hidden shrink-0 bg-slate-900">
                <img
                  src={anime.poster}
                  alt={anime.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="w-5 h-5 text-white fill-current" />
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col justify-between py-0.5 min-w-0 flex-1">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                    {anime.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {anime.genres[0]} • {anime.studio}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-800/60">
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{anime.score}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <span className="text-cyan-400 font-semibold">{anime.subEpisodes} Subs</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
