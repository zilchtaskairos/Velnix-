import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Anime } from '../types/anime';
import { searchAnimeFromJikan, fetchTopAnimeFromJikan } from '../services/jikanApi';
import { 
  ArrowLeft, 
  Search, 
  X, 
  SlidersHorizontal, 
  Star, 
  Sparkles,
  Play,
  Zap,
  Layers,
  Filter
} from 'lucide-react';

export const BrowsePage: React.FC = () => {
  const { animes, params, navigateTo, downloadedServers, registerAnimes } = useApp();

  const [searchQuery, setSearchQuery] = useState(params.search || '');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedProvider, setSelectedProvider] = useState<string>('All');
  const [jikanResults, setJikanResults] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const genreChips = ['All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Romance', 'Sci-Fi', 'Slice of Life', 'Shonen', 'Supernatural'];

  const providerNames = downloadedServers.length > 0
    ? ['All', ...downloadedServers.map(s => s.name.split(' ')[0])]
    : ['All', 'HiAnime', 'AnimePahe', 'GogoAnime', 'AllWish', 'AniDb'];

  // Search effect querying Jikan MAL Database & registering all results
  useEffect(() => {
    if (!searchQuery.trim()) {
      fetchTopAnimeFromJikan(1).then((top) => {
        if (top && top.length > 0) {
          setJikanResults(top);
          registerAnimes(top);
        }
      });
      return;
    }

    setIsLoading(true);
    const debounceTimer = setTimeout(async () => {
      const liveResults = await searchAnimeFromJikan(searchQuery);
      if (liveResults && liveResults.length > 0) {
        setJikanResults(liveResults);
        registerAnimes(liveResults);
      } else {
        const localMatches = animes.filter(a => 
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.romajiTitle?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setJikanResults(localMatches);
      }
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  useEffect(() => {
    if (params.search) {
      setSearchQuery(params.search);
    }
  }, [params.search]);

  const displayList = (jikanResults.length > 0 ? jikanResults : animes).filter(anime => {
    if (selectedGenre !== 'All') {
      return anime.genres?.some(g => g.toLowerCase().includes(selectedGenre.toLowerCase()));
    }
    return true;
  });

  const handleAnimeClick = (anime: Anime) => {
    registerAnimes([anime]);
    navigateTo('anime', { animeId: anime.id });
  };

  return (
    <div className="animate-fade-in pb-36 max-w-md md:max-w-3xl mx-auto space-y-4">
      
      {/* 1. TOP CLOUDSTREAM SEARCH BAR */}
      <div className="flex items-center gap-3 pt-1">
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="p-1.5 rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="relative flex-1 flex items-center px-4 py-2 rounded-full bg-[#121220] border-2 border-[#ff2e56] shadow-lg shadow-pink-600/20">
          <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search any anime (Naruto, Bleach, One Piece, Dress-Up, DanDaDan)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 text-slate-400 hover:text-white shrink-0 ml-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* CLOUDSTREAM PROVIDER STATUS STRIP */}
      <div className="flex items-center justify-between px-3.5 py-2 rounded-2xl bg-[#0e0e1a] border border-slate-800 text-xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <Zap className="w-3.5 h-3.5 text-[#ff2e56] shrink-0" />
          <span className="text-[11px] text-slate-400 shrink-0 font-medium">Source:</span>
          {providerNames.map(prov => (
            <button
              key={prov}
              type="button"
              onClick={() => setSelectedProvider(prov)}
              className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold shrink-0 transition-colors cursor-pointer ${
                selectedProvider === prov
                  ? 'bg-[#ff2e56] text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {prov}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => navigateTo('extensions')}
          className="text-[#ff2e56] font-bold text-[10px] hover:underline shrink-0 ml-2 cursor-pointer"
        >
          Extensions Repo
        </button>
      </div>

      {/* 2. GENRE FILTER CHIPS */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {genreChips.map((genre) => {
          const isSelected = selectedGenre === genre;
          return (
            <button
              key={genre}
              type="button"
              onClick={() => setSelectedGenre(genre)}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#ff2e56] text-white shadow-md'
                  : 'bg-[#181828] text-slate-300 hover:bg-[#222236]'
              }`}
            >
              {genre}
            </button>
          );
        })}
      </div>

      {isLoading && (
        <div className="text-center py-2 text-xs text-[#ff2e56] font-semibold flex items-center justify-center gap-2 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Searching CloudStream providers & MAL database for "{searchQuery}"...</span>
        </div>
      )}

      {/* 3. 2-COLUMN ANIME CARDS GRID matching Screenshots */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
        {displayList.map((anime, idx) => {
          const providerTag = downloadedServers.length > 0 
            ? downloadedServers[idx % downloadedServers.length]?.name.split(' ')[0] 
            : ['HiAnime', 'AnimePahe', 'GogoAnime', 'AllWish', 'AniDb'][idx % 5];

          return (
            <div
              key={anime.id + '-' + idx}
              onClick={() => handleAnimeClick(anime)}
              className="group cursor-pointer space-y-1 text-left focus:outline-none"
            >
              <div className="relative aspect-[3/4.4] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-xl border border-slate-800/80 group-hover:border-[#ff2e56] transition-all">
                <img
                  src={anime.poster}
                  alt={anime.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />

                {/* Top Right Dark Badge with Yellow Star */}
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-xl bg-black/80 backdrop-blur-md text-white font-bold text-xs flex items-center gap-1 shadow-md">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{anime.score}</span>
                </div>

                {/* Top Left Provider Badge (Cloudstream style) */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-black/80 backdrop-blur-md text-[#ff2e56] font-bold text-[9px] border border-[#ff2e56]/40 shadow-md">
                  {providerTag}
                </div>

                {/* Center Hover Play Icon */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-[#ff2e56] text-white flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom Gradient with Overlay Bold White Title */}
                <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <h3 className="font-bold text-xs sm:text-sm text-white line-clamp-2 leading-tight drop-shadow-md group-hover:text-[#ff4b72] transition-colors">
                    {anime.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center justify-between px-1 text-[10px] text-slate-400 uppercase font-medium">
                <span>{anime.format || 'TV'}</span>
                <span>{anime.episodesCount || 12} eps</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
