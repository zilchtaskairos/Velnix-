import React, { useState } from 'react';
import { Anime } from '../../types/anime';
import { useApp } from '../../context/AppContext';
import { Play, Star, Bookmark, Check, Heart, Info, Subtitles, Mic } from 'lucide-react';

interface AnimeCardProps {
  anime: Anime;
  ranking?: number;
  layout?: 'standard' | 'compact' | 'horizontal';
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime, ranking, layout = 'standard' }) => {
  const { navigateTo, watchlist, updateWatchlistStatus, removeFromWatchlist, toggleFavorite } = useApp();
  const [isHovered, setIsHovered] = useState(false);

  const watchlistEntry = watchlist[anime.id];
  const isInWatchlist = !!watchlistEntry;
  const isFav = watchlistEntry?.isFavorite;

  const handleCardClick = () => {
    navigateTo('anime', { animeId: anime.id });
  };

  const handleDirectWatch = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigateTo('watch', { animeId: anime.id, episodeId: 1 });
  };

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWatchlist) {
      removeFromWatchlist(anime.id);
    } else {
      updateWatchlistStatus(anime.id, 'watching');
    }
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(anime.id);
  };

  if (layout === 'horizontal') {
    return (
      <div 
        onClick={handleCardClick}
        className="flex gap-3.5 p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-purple-500/50 transition-all cursor-pointer group"
      >
        <div className="relative w-20 h-28 shrink-0 rounded-lg overflow-hidden">
          <img src={anime.poster} alt={anime.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold text-amber-400 flex items-center gap-0.5">
            <Star className="w-2.5 h-2.5 fill-amber-400" /> {anime.score}
          </div>
        </div>
        <div className="flex flex-col justify-between py-1 min-w-0 flex-1">
          <div>
            <span className="text-[10px] font-bold uppercase text-purple-400 tracking-wider">{anime.format} • {anime.studio}</span>
            <h4 className="text-sm font-bold text-slate-100 group-hover:text-purple-300 transition-colors truncate">
              {anime.title}
            </h4>
            <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-snug">{anime.shortSynopsis}</p>
          </div>
          <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-800">
            <span className="text-xs text-slate-400">Ep {anime.episodesCount} / {anime.episodesCount}</span>
            <button 
              onClick={handleDirectWatch}
              className="px-2.5 py-1 rounded-md bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-semibold flex items-center gap-1 shadow-sm"
            >
              <Play className="w-3 h-3 fill-current" /> Watch
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      className="group relative flex flex-col rounded-2xl bg-[#10101f] border border-slate-800/80 hover:border-purple-500/60 overflow-hidden shadow-lg hover:shadow-purple-600/20 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    >
      {/* Poster Container */}
      <div className="relative aspect-[3/4.2] w-full overflow-hidden bg-slate-950">
        <img
          src={anime.poster}
          alt={anime.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-1.5">
            {ranking && (
              <span className="px-2 py-0.5 rounded-md bg-purple-600/90 text-white text-xs font-extrabold shadow-md backdrop-blur-md">
                #{ranking}
              </span>
            )}
            <span className="px-1.5 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-bold text-cyan-300 border border-cyan-500/30">
              {anime.quality}
            </span>
          </div>

          <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-xs font-bold text-amber-400 shadow-md">
            <Star className="w-3 h-3 fill-amber-400" />
            <span>{anime.score}</span>
          </div>
        </div>

        {/* Audio (Sub/Dub) and Episode Count Pill */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-semibold pointer-events-none z-10">
          <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-slate-700/60 text-slate-200">
            <span className="flex items-center gap-0.5 text-cyan-300">
              <Subtitles className="w-3 h-3" /> {anime.subEpisodes}
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-0.5 text-purple-300">
              <Mic className="w-3 h-3" /> {anime.dubEpisodes}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-slate-300 border border-slate-700/60">
            {anime.format}
          </span>
        </div>

        {/* Hover Quick-Action Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#090913] via-[#090913]/70 to-transparent p-4 flex flex-col justify-between transition-opacity duration-300 z-20 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Top Quick Actions */}
          <div className="flex justify-end gap-1.5 pt-1">
            <button
              onClick={handleFavoriteToggle}
              className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-md ${
                isFav
                  ? 'bg-pink-600 text-white'
                  : 'bg-black/70 hover:bg-black/90 text-slate-300 hover:text-pink-400'
              }`}
              title={isFav ? 'Remove Favorite' : 'Mark as Favorite'}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleWatchlistToggle}
              className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-md ${
                isInWatchlist
                  ? 'bg-purple-600 text-white'
                  : 'bg-black/70 hover:bg-black/90 text-slate-300 hover:text-purple-300'
              }`}
              title={isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
            >
              {isInWatchlist ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>

          {/* Center Play Button */}
          <div className="flex flex-col items-center justify-center text-center my-auto">
            <button
              onClick={handleDirectWatch}
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 hover:scale-110 active:scale-95 text-white flex items-center justify-center shadow-xl shadow-purple-600/50 transition-all group/btn"
              title="Stream Episode 1"
            >
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </button>
            <span className="text-xs font-bold text-white mt-2 drop-shadow-md">
              Stream Now
            </span>
          </div>

          {/* Bottom Quick Info */}
          <div className="space-y-1">
            <p className="text-[11px] text-slate-300 line-clamp-2 leading-tight">
              {anime.shortSynopsis}
            </p>
            <div className="pt-2 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium">{anime.studio}</span>
              <span className="flex items-center gap-1 text-purple-300 font-semibold group-hover:underline">
                <Info className="w-3 h-3" /> Details
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Body / Metadata */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-1.5">
        <div>
          <h3 
            className="font-bold text-sm text-slate-100 group-hover:text-purple-300 transition-colors line-clamp-1 leading-snug"
            title={anime.title}
          >
            {anime.title}
          </h3>
          <p className="text-[11px] text-slate-400 truncate mt-0.5">
            {anime.genres.slice(0, 3).join(' • ')}
          </p>
        </div>
        
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
          <span>{anime.season} {anime.year}</span>
          <span className="font-semibold text-slate-300">{anime.episodesCount} eps</span>
        </div>
      </div>
    </div>
  );
};
