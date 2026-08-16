import React, { useState, useEffect } from 'react';
import { Anime } from '../../types/anime';
import { useApp } from '../../context/AppContext';
import { Play, Bookmark, Info, Star, Sparkles, ChevronRight, ChevronLeft, Subtitles, Mic } from 'lucide-react';
import { YoutubeIcon } from '../common/Icons';

interface SpotlightHeroProps {
  spotlightAnimes: Anime[];
}

export const SpotlightHero: React.FC<SpotlightHeroProps> = ({ spotlightAnimes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { navigateTo, openTrailer, watchlist, updateWatchlistStatus, removeFromWatchlist } = useApp();

  // Auto rotation every 7 seconds
  useEffect(() => {
    if (spotlightAnimes.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % spotlightAnimes.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [spotlightAnimes.length]);

  if (spotlightAnimes.length === 0) return null;

  const current = spotlightAnimes[currentIndex];
  const isInWatchlist = !!watchlist[current.id];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % spotlightAnimes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + spotlightAnimes.length) % spotlightAnimes.length);
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[700px] rounded-3xl overflow-hidden mb-10 shadow-2xl border border-purple-900/30 group">
      {/* Background Image with Dark Vignette Gradients */}
      <div className="absolute inset-0 bg-black">
        <img
          src={current.banner}
          alt={current.title}
          className="w-full h-full object-cover object-center transform scale-105 transition-all duration-1000 ease-out brightness-90 group-hover:scale-100"
        />
        {/* Multilayered Gradient Shading for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080811] via-[#080811]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080811] via-[#080811]/80 to-transparent md:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080811]/40 via-transparent to-[#080811]" />
      </div>

      {/* Hero Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-end pb-12 sm:pb-16 z-10">
        <div className="max-w-2xl space-y-3 sm:space-y-4">
          
          {/* Spotlight Badges */}
          <div className="flex items-center gap-2 flex-wrap animate-fade-in">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-600/90 backdrop-blur-md text-white text-xs font-bold shadow-lg shadow-purple-600/40">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              #1 SPOTLIGHT TODAY
            </span>
            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-cyan-300 border border-cyan-500/30 text-xs font-bold">
              {current.quality}
            </span>
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 backdrop-blur-md text-amber-400 border border-amber-500/30 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {current.score} Score
            </span>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-none drop-shadow-lg">
              {current.title}
            </h1>
            <p className="text-xs sm:text-sm text-purple-300/90 font-medium tracking-wide">
              {current.nativeTitle} • {current.romajiTitle}
            </p>
          </div>

          {/* Metadata Row */}
          <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300 font-medium flex-wrap">
            <span className="text-cyan-400 font-semibold">{current.studio}</span>
            <span>•</span>
            <span>{current.season} {current.year}</span>
            <span>•</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-xs">
              {current.rating}
            </span>
            <span>•</span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-cyan-300">
                <Subtitles className="w-3.5 h-3.5" /> {current.subEpisodes} Subs
              </span>
              <span className="flex items-center gap-1 text-purple-300">
                <Mic className="w-3.5 h-3.5" /> {current.dubEpisodes} Dubs
              </span>
            </div>
          </div>

          {/* Spotlight Quote & Synopsis */}
          {current.spotlightQuote && (
            <p className="hidden sm:block text-xs sm:text-sm italic font-serif text-purple-200 border-l-2 border-purple-500 pl-3">
              {current.spotlightQuote}
            </p>
          )}

          <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed max-w-xl drop-shadow">
            {current.synopsis}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2 flex-wrap">
            <button
              onClick={() => navigateTo('watch', { animeId: current.id, episodeId: 1 })}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide shadow-xl shadow-purple-600/40 flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Watch Episode 1</span>
            </button>

            <button
              onClick={() => openTrailer(current.trailerYoutubeId)}
              className="px-4 py-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-sm font-semibold flex items-center gap-2 backdrop-blur-md transition-all shadow-md"
            >
              <YoutubeIcon className="w-4 h-4 text-red-500" />
              <span>Trailer</span>
            </button>

            <button
              onClick={() => {
                if (isInWatchlist) {
                  removeFromWatchlist(current.id);
                } else {
                  updateWatchlistStatus(current.id, 'watching');
                }
              }}
              className={`px-4 py-3 rounded-2xl border text-sm font-semibold flex items-center gap-2 backdrop-blur-md transition-all ${
                isInWatchlist
                  ? 'bg-purple-900/60 border-purple-500 text-purple-200'
                  : 'bg-slate-900/80 border-slate-700 hover:border-purple-500 text-slate-200 hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>{isInWatchlist ? 'In Watchlist' : '+ Watchlist'}</span>
            </button>

            <button
              onClick={() => navigateTo('anime', { animeId: current.id })}
              className="p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-sm backdrop-blur-md transition-all"
              title="Anime Overview & Episodes"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-black/60 hover:bg-purple-600/80 border border-slate-800 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-black/60 hover:bg-purple-600/80 border border-slate-800 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom Carousel Indicator Pills */}
      <div className="absolute bottom-4 right-6 hidden md:flex items-center gap-2 z-20">
        {spotlightAnimes.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all rounded-full ${
              idx === currentIndex
                ? 'w-8 h-2 bg-gradient-to-r from-purple-500 to-cyan-400'
                : 'w-2 h-2 bg-slate-600/70 hover:bg-slate-400'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
