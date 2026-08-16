import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Play } from 'lucide-react';

export const BleachHeroBanner: React.FC = () => {
  const { navigateTo } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: '41467',
      tagline: 'THE FINAL WAR. THE FINAL TRUTH.',
      titleLine1: 'BLEACH',
      titleLine2: 'THOUSAND-YEAR BLOOD WAR',
      banner: 'https://cdn.myanimelist.net/images/anime/1764/126627l.jpg',
      episodeId: 1
    },
    {
      id: '52299',
      tagline: 'ARISE FROM THE SHADOWS. BECOME THE MONARCH.',
      titleLine1: 'SOLO LEVELING',
      titleLine2: 'SHADOW MONARCH AWAKENING',
      banner: 'https://cdn.myanimelist.net/images/anime/1816/141049l.jpg',
      episodeId: 1
    },
    {
      id: '40748',
      tagline: 'SHIBUYA INCIDENT. THE CURSE HAS AWAKENED.',
      titleLine1: 'JUJUTSU KAISEN',
      titleLine2: 'SHIBUYA INCIDENT ARC',
      banner: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
      episodeId: 1
    },
    {
      id: '38000',
      tagline: 'HASHIRA TRAINING ARC. DEFY DEMON MOONS.',
      titleLine1: 'DEMON SLAYER',
      titleLine2: 'KIMETSU NO YAIBA',
      banner: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
      episodeId: 1
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const active = heroSlides[currentSlide];

  const handleWatchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigateTo('watch', { animeId: active.id, episodeId: active.episodeId });
  };

  const handleMoreInfoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigateTo('anime', { animeId: active.id });
  };

  return (
    <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] rounded-3xl overflow-hidden mb-6 shadow-2xl bg-black border border-white/5 group">
      
      {/* Background Anime Artwork with Vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={active.banner}
          alt={active.titleLine1}
          className="w-full h-full object-cover object-center transform transition-all duration-1000 brightness-75 group-hover:scale-103"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070d] via-[#07070d]/50 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07070d] via-[#07070d]/70 to-transparent w-full md:w-3/4 pointer-events-none" />
      </div>

      {/* Hero Content Overlay matching Screenshot */}
      <div className="relative h-full flex flex-col justify-end p-6 sm:p-8 z-20 space-y-3 max-w-xl pointer-events-auto">
        
        {/* Title Graphics matching Screenshot */}
        <div className="space-y-0.5 pointer-events-none">
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-wider uppercase leading-none drop-shadow-2xl">
            {active.titleLine1}
          </h1>
          <p className="text-xs sm:text-sm font-bold text-slate-200 tracking-wider uppercase drop-shadow">
            {active.titleLine2}
          </p>
          <p className="text-[10px] sm:text-xs font-bold tracking-widest text-slate-400 uppercase pt-1">
            {active.tagline}
          </p>
        </div>

        {/* Action Buttons matching Screenshot: [▶ Watch Now] [More Info] */}
        <div className="flex items-center gap-3 pt-1 z-30">
          <button
            type="button"
            onClick={handleWatchClick}
            className="px-5 py-2 sm:py-2.5 rounded-xl bg-[#ff2e56] hover:bg-[#ff4b72] active:bg-[#d61e42] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-pink-600/40 transition-transform active:scale-95 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current pointer-events-none" />
            <span className="pointer-events-none">Watch Now</span>
          </button>

          <button
            type="button"
            onClick={handleMoreInfoClick}
            className="px-4 py-2 sm:py-2.5 rounded-xl bg-[#181826]/90 hover:bg-[#222234] border border-slate-700/80 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-colors cursor-pointer"
          >
            <span className="pointer-events-none">More Info</span>
          </button>
        </div>

        {/* 4 Pink Carousel Indicator Dots matching Screenshot */}
        <div className="flex items-center justify-center gap-2 pt-2 w-full z-30">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all rounded-full cursor-pointer ${
                idx === currentSlide
                  ? 'w-4 h-1.5 bg-[#ff2e56]'
                  : 'w-1.5 h-1.5 bg-slate-600 hover:bg-slate-400'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

    </div>
  );
};
