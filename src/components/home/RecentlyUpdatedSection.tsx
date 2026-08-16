import React from 'react';
import { Anime } from '../../types/anime';
import { useApp } from '../../context/AppContext';
import { ChevronRight, Star } from 'lucide-react';

interface RecentlyUpdatedSectionProps {
  animes: Anime[];
}

export const RecentlyUpdatedSection: React.FC<RecentlyUpdatedSectionProps> = ({ animes }) => {
  const { navigateTo } = useApp();

  const recentList = [
    {
      id: '21',
      title: 'One Piece',
      subtitle: 'Episode 1098',
      poster: 'https://cdn.myanimelist.net/images/anime/1244/138851l.jpg',
      score: 4.9
    },
    {
      id: '40748',
      title: 'Jujutsu Kaisen S2',
      subtitle: 'Episode 23',
      poster: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
      score: 4.8
    },
    {
      id: '52299',
      title: 'Solo Leveling',
      subtitle: 'Episode 12',
      poster: 'https://cdn.myanimelist.net/images/anime/1816/141049l.jpg',
      score: 4.8
    },
    {
      id: '52991',
      title: 'Frieren',
      subtitle: 'Episode 28',
      poster: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg',
      score: 4.9
    },
    {
      id: '57334',
      title: 'Dandadan',
      subtitle: 'Episode 6',
      poster: 'https://cdn.myanimelist.net/images/anime/1913/144706l.jpg',
      score: 4.7
    }
  ];

  return (
    <section className="my-6">
      {/* Header with Pink Indicator Bar matching Screenshot 1:1 */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-[#ff2e56]" />
          <h2 className="text-base sm:text-lg font-bold font-heading text-white">
            Recently Updated
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

      {/* Horizontal Cards matching Screenshot 1:1 */}
      <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2">
        {recentList.map((anime) => (
          <div
            key={anime.id}
            onClick={() => navigateTo('anime', { animeId: anime.id })}
            className="w-[130px] sm:w-[155px] md:w-[170px] shrink-0 group cursor-pointer space-y-1.5 text-left focus:outline-none"
          >
            <div className="relative aspect-[3/4.4] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md group-hover:scale-103 transition-transform duration-300">
              <img src={anime.poster} alt={anime.title} className="w-full h-full object-cover" loading="lazy" />
            </div>

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
