import React from 'react';
import { Anime } from '../../types/anime';
import { useApp } from '../../context/AppContext';
import { Star, ChevronRight } from 'lucide-react';

interface ClaireRecommendsSectionProps {
  animes: Anime[];
}

export const ClaireRecommendsSection: React.FC<ClaireRecommendsSectionProps> = ({ animes }) => {
  const { navigateTo } = useApp();

  const recommendsList = [
    {
      id: '52991',
      title: 'Frieren: Beyond Journey\'s End',
      subtitle: 'TV Series • Sub',
      banner: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg',
      score: 4.9
    },
    {
      id: '33352',
      title: 'Violet Evergarden',
      subtitle: 'TV Series • Sub | Dub',
      banner: 'https://cdn.myanimelist.net/images/anime/1795/95088l.jpg',
      score: 4.8
    },
    {
      id: '23273',
      title: 'Your Lie in April',
      subtitle: 'TV Series • Sub | Dub',
      banner: 'https://cdn.myanimelist.net/images/anime/1454/139209l.jpg',
      score: 4.8
    },
    {
      id: '34599',
      title: 'Made in Abyss',
      subtitle: 'TV Series • Sub | Dub',
      banner: 'https://cdn.myanimelist.net/images/anime/6/86733l.jpg',
      score: 4.7
    }
  ];

  return (
    <section className="my-6">
      {/* Header with Circular Claire Avatar matching Screenshot 1:1 */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <img
            src="/claire_avatar.jpg"
            alt="Claire"
            className="w-7 h-7 rounded-full object-cover ring-2 ring-[#ff2e56]"
          />
          <h2 className="text-base sm:text-lg font-bold font-heading text-white">
            Claire Recommends For You
          </h2>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('claire')}
          className="flex items-center gap-0.5 text-xs font-semibold text-[#ff2e56] hover:text-[#ff4b72] transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Horizontal Cards Row matching Screenshot 1:1 */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {recommendsList.map((anime) => (
          <div
            key={anime.id}
            onClick={() => navigateTo('anime', { animeId: anime.id })}
            className="w-[190px] sm:w-[220px] shrink-0 group cursor-pointer space-y-1.5 text-left focus:outline-none"
          >
            {/* 16:9 Widescreen Card */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md">
              <img
                src={anime.banner}
                alt={anime.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Title & Subtitle + Pink Star Rating matching Screenshot */}
            <div className="space-y-0.5">
              <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#ff2e56] transition-colors truncate">
                {anime.title}
              </h4>
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400">
                <span className="truncate max-w-[130px]">{anime.subtitle}</span>
                <span className="flex items-center gap-0.5 text-[#ff2e56] font-bold shrink-0 ml-1">
                  <Star className="w-3 h-3 fill-[#ff2e56] text-[#ff2e56]" />
                  <span>{anime.score}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
