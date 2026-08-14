import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, Play, Bell } from 'lucide-react';
import { SCHEDULE_WEEK_DATA } from '../../data/animeData';

export const AiringTodayBanner: React.FC = () => {
  const { navigateTo, addToast } = useApp();

  const todayData = SCHEDULE_WEEK_DATA[0]; // Monday / Today items

  const handleNotify = (e: React.MouseEvent, title: string) => {
    e.stopPropagation();
    addToast({
      title: 'Airing Reminder Set! 🔔',
      description: `We'll alert you when ${title} goes live on Velnix CDN.`,
      type: 'info'
    });
  };

  return (
    <section className="my-10 p-5 rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#101024] to-cyan-950/30 border border-purple-900/40 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-600/30 border border-purple-500/40 text-purple-400 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold font-heading text-white">
                Airing Today & Upcoming Drops
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-full animate-pulse">
                LIVE JST
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Fresh episodes synchronized straight from Japanese television broadcast
            </p>
          </div>
        </div>

        <button
          onClick={() => navigateTo('schedule')}
          className="px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 hover:text-white text-xs font-semibold self-start md:self-auto transition-all"
        >
          View Full Weekly Schedule →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
        {todayData.animes.map((item) => (
          <div
            key={item.id}
            onClick={() => navigateTo('anime', { animeId: item.animeId })}
            className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#0b0b18]/80 hover:bg-purple-950/30 border border-slate-800/80 hover:border-purple-500/50 transition-all cursor-pointer group"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-14 h-18 rounded-xl object-cover ring-1 ring-slate-700 group-hover:ring-purple-500 transition-all shrink-0"
            />
            <div className="min-w-0 flex-1">
              <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 text-[10px] font-bold">
                Ep {item.episodeNumber}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-purple-300 truncate mt-1">
                {item.title}
              </h4>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-cyan-400 font-semibold">
                  <Clock className="w-3 h-3" /> {item.airTime}
                </span>
                <span>•</span>
                <span>{item.genres[0]}</span>
              </div>
            </div>

            <button
              onClick={(e) => handleNotify(e, item.title)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-purple-600/50 text-slate-400 hover:text-purple-300 border border-slate-800 transition-colors"
              title="Set Notification Alert"
            >
              <Bell className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
