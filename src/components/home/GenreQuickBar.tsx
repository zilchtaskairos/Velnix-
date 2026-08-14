import React from 'react';
import { ALL_GENRES } from '../../data/animeData';
import { useApp } from '../../context/AppContext';
import { Sparkles, Layers } from 'lucide-react';

export const GenreQuickBar: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="my-8 p-4 rounded-2xl bg-[#0e0e1c] border border-purple-900/30">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Explore By Genres
          </h3>
        </div>
        <button
          onClick={() => navigateTo('browse')}
          className="text-xs text-purple-400 hover:text-cyan-300 font-semibold transition-colors"
        >
          View All Genres →
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {ALL_GENRES.map((genre) => (
          <button
            key={genre}
            onClick={() => navigateTo('browse', { genre })}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-purple-600/30 border border-slate-800 hover:border-purple-500/50 text-slate-300 hover:text-white text-xs font-semibold shrink-0 transition-all active:scale-95 shadow-sm"
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};
