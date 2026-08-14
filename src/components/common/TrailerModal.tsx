import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X } from 'lucide-react';
import { YoutubeIcon } from './Icons';

export const TrailerModal: React.FC = () => {
  const { activeTrailerUrl, closeTrailer } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeTrailerUrl) {
        closeTrailer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTrailerUrl, closeTrailer]);

  if (!activeTrailerUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 backdrop-blur-xl bg-black/85 animate-fade-in">
      <div className="fixed inset-0" onClick={closeTrailer} />

      <div className="relative w-full max-w-4xl bg-[#0e0e1a] border border-purple-900/60 rounded-2xl shadow-2xl overflow-hidden z-10 animate-slide-up flex flex-col">
        <div className="p-4 bg-[#141424] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-semibold text-sm">
            <YoutubeIcon className="w-5 h-5 text-red-500" />
            <span>Official Anime Trailer / Preview</span>
          </div>
          <button
            onClick={closeTrailer}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${activeTrailerUrl}?autoplay=1&rel=0`}
            title="Anime Trailer"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
