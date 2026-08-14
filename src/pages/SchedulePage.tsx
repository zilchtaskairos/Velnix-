import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SCHEDULE_WEEK_DATA } from '../data/animeData';
import { 
  Calendar, 
  Clock, 
  Bell, 
  Subtitles, 
  Mic, 
  Check, 
  Play, 
  Globe, 
  ChevronRight,
  Info
} from 'lucide-react';

export const SchedulePage: React.FC = () => {
  const { navigateTo, addToast } = useApp();
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [timezone, setTimezone] = useState('Local Time (UTC)');
  const [reminders, setReminders] = useState<Record<string, boolean>>({});

  const daysOfWeek = SCHEDULE_WEEK_DATA.map((d) => d.day);
  const currentDayData = SCHEDULE_WEEK_DATA.find((d) => d.day === selectedDay) || SCHEDULE_WEEK_DATA[0];

  const toggleReminder = (id: string, title: string) => {
    const nextState = !reminders[id];
    setReminders((prev) => ({ ...prev, [id]: nextState }));
    addToast({
      title: nextState ? 'Reminder Set! 🔔' : 'Reminder Removed',
      description: nextState
        ? `We'll alert you when ${title} goes live on Velnix CDN.`
        : `Cancelled notification for ${title}`,
      type: nextState ? 'success' : 'info'
    });
  };

  return (
    <div className="animate-fade-in pb-20">
      
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-purple-950 text-purple-300 border border-purple-800 rounded-full flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Broadcast Calendar
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
          Weekly Anime Airing Schedule
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-xl">
          Track official Japanese television broadcasting schedules and Velnix international streaming releases.
        </p>
      </div>

      {/* Timezone & Controls Bar */}
      <div className="p-4 rounded-2xl bg-[#0f0f1e] border border-slate-800/80 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span>Broadcast Timezone:</span>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="py-1 px-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:outline-none"
          >
            <option value="Local Time (UTC)">Your Local Time (UTC)</option>
            <option value="JST (Tokyo)">JST (Tokyo Time UTC+9)</option>
            <option value="EST (New York)">EST (New York UTC-5)</option>
            <option value="PST (Los Angeles)">PST (Los Angeles UTC-8)</option>
          </select>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-purple-400" />
          <span>Episodes drop within 30 minutes of Tokyo broadcast</span>
        </div>
      </div>

      {/* Day Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 mb-8">
        {SCHEDULE_WEEK_DATA.map((dayItem) => {
          const isSelected = selectedDay === dayItem.day;
          return (
            <button
              key={dayItem.day}
              onClick={() => setSelectedDay(dayItem.day)}
              className={`p-3 rounded-2xl flex flex-col items-center justify-center transition-all border ${
                isSelected
                  ? 'bg-gradient-to-b from-purple-600 to-indigo-700 border-purple-400 text-white shadow-lg shadow-purple-600/30 font-bold scale-102'
                  : 'bg-[#101020] border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <span className="text-xs font-semibold">{dayItem.day}</span>
              <span className="text-[11px] opacity-80 mt-0.5">{dayItem.dateStr}</span>
              <span className="text-[10px] mt-1 px-1.5 py-0.2 rounded-full bg-black/40 text-slate-200">
                {dayItem.animes.length} Shows
              </span>
            </button>
          );
        })}
      </div>

      {/* Schedule Anime List for Selected Day */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span>Releasing on {selectedDay}</span>
          </h3>
          <span className="text-xs text-slate-400">{currentDayData.animes.length} episodes scheduled</span>
        </div>

        {currentDayData.animes.length === 0 ? (
          <div className="py-16 text-center text-slate-500 rounded-2xl bg-[#0f0f1d] border border-slate-800">
            No scheduled releases on this day.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentDayData.animes.map((item) => {
              const isReminded = reminders[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => navigateTo('anime', { animeId: item.animeId })}
                  className="group relative flex items-center justify-between gap-4 p-3.5 rounded-2xl bg-[#101022] border border-slate-800/80 hover:border-purple-500/60 transition-all cursor-pointer shadow-md hover:shadow-purple-600/10"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-20 rounded-xl object-cover ring-1 ring-slate-700 group-hover:ring-purple-500 transition-all shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 text-xs font-bold">
                          Episode {item.episodeNumber}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-cyan-400 font-bold">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{item.airTime}</span>
                        </div>
                      </div>
                      <h4 className="font-bold text-sm sm:text-base text-slate-100 group-hover:text-purple-300 transition-colors truncate mt-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {item.genres.join(' • ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleReminder(item.id, item.title);
                      }}
                      className={`p-2.5 rounded-xl border transition-all ${
                        isReminded
                          ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                          : 'bg-slate-900 border-slate-700 hover:border-purple-500 text-slate-400 hover:text-slate-200'
                      }`}
                      title={isReminded ? 'Reminder active' : 'Notify me when aired'}
                    >
                      <Bell className={`w-4 h-4 ${isReminded ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo('watch', { animeId: item.animeId, episodeId: 1 });
                      }}
                      className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-colors shadow-md"
                      title="Watch Latest"
                    >
                      <Play className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
