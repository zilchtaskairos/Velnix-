import React, { useRef } from 'react';
import { Anime } from '../../types/anime';
import { AnimeCard } from './AnimeCard';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AnimeRowProps {
  title: string;
  subtitle?: string;
  animes: Anime[];
  showRanking?: boolean;
  viewAllGenre?: string;
  badge?: string;
}

export const AnimeRow: React.FC<AnimeRowProps> = ({
  title,
  subtitle,
  animes,
  showRanking = false,
  viewAllGenre,
  badge
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const { navigateTo } = useApp();

  const handleScroll = (direction: 'left' | 'right') => {
    if (!rowRef.current) return;
    const scrollAmount = direction === 'left' ? -600 : 600;
    rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleViewAll = () => {
    navigateTo('browse', { genre: viewAllGenre });
  };

  return (
    <section className="my-8 sm:my-12">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-4 sm:mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-tight">
              {title}
            </h2>
            {badge && (
              <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-purple-950 text-purple-300 border border-purple-800/60 rounded-full">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleViewAll}
            className="flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-cyan-300 transition-colors mr-2 group"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => handleScroll('left')}
            className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 text-slate-300 hover:text-white transition-all shadow-sm active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 text-slate-300 hover:text-white transition-all shadow-sm active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={rowRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 px-1 no-scrollbar scroll-smooth snap-x snap-mandatory"
      >
        {animes.map((anime, index) => (
          <div
            key={anime.id}
            className="w-[165px] sm:w-[210px] md:w-[230px] shrink-0 snap-start"
          >
            <AnimeCard
              anime={anime}
              ranking={showRanking ? index + 1 : undefined}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
