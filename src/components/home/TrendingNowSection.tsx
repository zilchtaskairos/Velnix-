import React from 'react';
import { Anime } from '../../types/anime';
import { useApp } from '../../context/AppContext';
import { Star, ChevronRight } from 'lucide-react';

interface TrendingNowSectionProps {
  animes: Anime[];
}

export const TrendingNowSection: React.FC<TrendingNowSectionProps> = ({ animes }) => {
  const { navigateTo } = useApp();

  const trendingList = [
    {
      id: '40748',
      title: 'Jujutsu Kaisen',
      subtitle: 'TV Series • Sub | Dub',
      poster: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
      score: 4.8
    },
    {
      id: '38000',
      title: 'Demon Slayer',
      subtitle: 'TV Series • Sub | Dub',
      poster: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
      score: 4.7
    },
    {
      id: '16498',
      title: 'Attack on Titan',
      subtitle: 'TV Series • Sub | Dub',
      poster: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
      score: 4.9
    },
    {
      id: '52299',
      title: 'Solo Leveling',
      subtitle: 'TV Series • Sub',
      poster: 'https://cdn.myanimelist.net/images/anime/1816/141049l.jpg',
      score: 4.8
    },
    {
      id: '44511',
      title: 'Chainsaw Man',
      subtitle: 'TV Series • Sub | Dub',
      poster: 'https://cdn.myanimelist.net/images/anime/1806/126216l.jpg',
      score: 4.6
    }
  ];

  const handleCardClick = (id: string) => {
    navigateTo('anime', { animeId: id });
  };

  return (
    <section className="my-6">
      {/* Header with Pink Indicator Bar matching Screenshot 1:1 */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-[#ff2e56]" />
          <h2 className="text-base sm:text-lg font-bold font-heading text-white">
            Trending Now
          </h2>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('browse')}
          className="flex items-center gap-0.5 text-xs font-semibold text-[#ff2e56] hover:text-[#ff4b72] transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 5 Cards Row matching Screenshot 1:1 */}
      <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2">
        {trendingList.map((anime) => (
          <div
            key={anime.id}
            onClick={() => handleCardClick(anime.id)}
            className="w-[130px] sm:w-[155px] md:w-[170px] shrink-0 group cursor-pointer space-y-1.5 text-left focus:outline-none"
          >
            {/* Poster Card */}
            <div className="relative aspect-[3/4.4] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md group-hover:scale-103 transition-transform duration-300">
              <img
                src={anime.poster}
                alt={anime.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Title & Info matching Screenshot */}
            <div className="space-y-0.5">
              <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#ff2e56] transition-colors truncate">
                {anime.title}
              </h4>
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400">
                <span className="truncate max-w-[90px]">{anime.subtitle}</span>
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
