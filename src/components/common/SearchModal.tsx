import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { searchAnimeFromJikan } from '../../services/jikanApi';
import { Anime } from '../../types/anime';
import { Search, X, Star, ArrowLeft, Play, Zap } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, animes, navigateTo, registerAnimes, downloadedServers } = useApp();
  const [query, setQuery] = useState('');
  const [jikanResults, setJikanResults] = useState<Anime[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setJikanResults([]);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setJikanResults([]);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      const results = await searchAnimeFromJikan(query);
      if (results && results.length > 0) {
        setJikanResults(results);
        registerAnimes(results);
      } else {
        const local = animes.filter(a => a.title.toLowerCase().includes(query.toLowerCase()));
        setJikanResults(local);
      }
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, animes]);

  if (!isSearchOpen) return null;

  const displayList = jikanResults.length > 0 ? jikanResults : animes.slice(0, 10);

  const handleSelectAnime = (anime: Anime) => {
    registerAnimes([anime]);
    setIsSearchOpen(false);
    navigateTo('anime', { animeId: anime.id });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 backdrop-blur-xl bg-black/90 animate-fade-in overflow-y-auto">
      <div className="fixed inset-0" onClick={() => setIsSearchOpen(false)} />

      <div className="relative w-full max-w-md md:max-w-2xl bg-[#090912] border border-slate-800 rounded-3xl p-5 shadow-2xl z-10 space-y-4 animate-slide-up my-auto max-h-[90vh] flex flex-col">
        
        {/* Top Search Bar */}
        <div className="flex items-center gap-3">
          <button onClick={() => setIsSearchOpen(false)} className="p-1 text-slate-300 hover:text-white cursor-pointer">
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="relative flex-1 flex items-center px-4 py-2 rounded-full bg-[#121220] border-2 border-[#ff2e56] shadow-lg shadow-pink-600/20">
            <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search anime (e.g. Naruto, Bleach, One Piece, Dress-Up, DanDaDan)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {isSearching && (
          <div className="text-center text-xs text-[#ff2e56] animate-pulse">
            Searching CloudStream providers & MAL database...
          </div>
        )}

        {/* 2-Column Anime Cards Grid */}
        <div className="grid grid-cols-2 gap-3.5 overflow-y-auto pr-1 flex-1 max-h-[60vh]">
          {displayList.map((anime, idx) => {
            const providerTag = downloadedServers.length > 0
              ? downloadedServers[idx % downloadedServers.length]?.name.split(' ')[0]
              : ['HiAnime', 'AnimePahe', 'GogoAnime', 'AllWish'][idx % 4];

            return (
              <div
                key={anime.id + '-modal-' + idx}
                onClick={() => handleSelectAnime(anime)}
                className="group cursor-pointer space-y-1"
              >
                <div className="relative aspect-[3/4.4] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80 group-hover:border-[#ff2e56] transition-all shadow-md">
                  <img src={anime.poster} alt={anime.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  
                  {/* Star Rating Badge */}
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-xl bg-black/80 backdrop-blur-md text-white font-bold text-xs flex items-center gap-1 shadow-md">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{anime.score}</span>
                  </div>

                  {/* Provider Tag */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-black/80 backdrop-blur-md text-[#ff2e56] font-bold text-[9px] border border-[#ff2e56]/40">
                    {providerTag}
                  </div>

                  {/* Bottom Overlay Title */}
                  <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <h4 className="font-bold text-xs text-white line-clamp-2 leading-tight group-hover:text-[#ff4b72] transition-colors">
                      {anime.title}
                    </h4>
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
    </div>
  );
};
