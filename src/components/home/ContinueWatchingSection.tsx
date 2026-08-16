import React from 'react';
import { useApp } from '../../context/AppContext';
import { Play, ChevronRight } from 'lucide-react';

export const ContinueWatchingSection: React.FC = () => {
  const { navigateTo } = useApp();

  const continueList = [
    {
      animeId: '41467',
      title: 'Bleach: TYBW',
      subtitle: 'S1 E15 - The Back',
      thumbnail: 'https://cdn.myanimelist.net/images/anime/1764/126627l.jpg',
      episodeId: 15,
      progressPct: 65
    },
    {
      animeId: '40748',
      title: 'Jujutsu Kaisen S2',
      subtitle: 'S2 E8 - Shibuya Incident',
      thumbnail: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
      episodeId: 8,
      progressPct: 70
    },
    {
      animeId: '38000',
      title: 'Demon Slayer S4',
      subtitle: 'S4 E3 - Swordsmith Village',
      thumbnail: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
      episodeId: 3,
      progressPct: 40
    },
    {
      animeId: '52299',
      title: 'Solo Leveling',
      subtitle: 'S1 E7 - Let\'s See',
      thumbnail: 'https://cdn.myanimelist.net/images/anime/1816/141049l.jpg',
      episodeId: 7,
      progressPct: 55
    }
  ];

  const handleWatchClick = (animeId: string, episodeId: number) => {
    navigateTo('watch', { animeId, episodeId });
  };

  return (
    <section className="my-6">
      {/* Header matching Screenshot 1:1 */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-[#ff2e56]" />
          <h2 className="text-base sm:text-lg font-bold font-heading text-white">
            Continue Watching
          </h2>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('library')}
          className="flex items-center gap-0.5 text-xs font-semibold text-[#ff2e56] hover:text-[#ff4b72] transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Horizontal 16:9 Cards Row matching Screenshot 1:1 */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {continueList.map((item) => (
          <div
            key={item.animeId}
            onClick={() => handleWatchClick(item.animeId, item.episodeId)}
            className="w-[200px] sm:w-[230px] md:w-[250px] shrink-0 group cursor-pointer space-y-2 text-left focus:outline-none"
          >
            {/* 16:9 Thumbnail with Circular Play Icon Overlay matching Screenshot */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Bottom Right Play Circle Button */}
              <div className="absolute bottom-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center shadow-lg group-hover:bg-[#ff2e56] group-hover:border-[#ff2e56] transition-colors">
                <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ml-0.5" />
              </div>
            </div>

            {/* Title, Subtitle, & Pink Progress Line matching Screenshot */}
            <div className="space-y-1">
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#ff2e56] transition-colors truncate">
                  {item.title}
                </h4>
                <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">
                  {item.subtitle}
                </p>
              </div>

              {/* Pink Progress Line */}
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#ff2e56] rounded-full"
                  style={{ width: `${item.progressPct}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
