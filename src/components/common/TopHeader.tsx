import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, MessageSquare, Bell } from 'lucide-react';

export const TopHeader: React.FC = () => {
  const { 
    setIsSearchOpen, 
    setIsMessagesOpen,
    navigateTo, 
    currentUser 
  } = useApp();

  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#07070d]/95 backdrop-blur-xl border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2.5 sm:gap-6">
          
          {/* Left Brand: ✦ Velnix matching screenshot 1:1 */}
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="flex items-center gap-1.5 focus:outline-none shrink-0 group cursor-pointer"
          >
            <span className="text-[#ff2e56] text-xl font-bold">✦</span>
            <span className="text-2xl sm:text-3xl font-black italic tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#ff2e56] via-[#ff5b7e] to-[#ff8da6] group-hover:brightness-125 transition-all font-serif">
              Velnix
            </span>
          </button>

          {/* Center Search Pill Input matching screenshot (Search anime... 🔍) */}
          <div 
            onClick={() => setIsSearchOpen(true)}
            className="flex-1 max-w-xs sm:max-w-sm md:max-w-md cursor-pointer group mx-1 sm:mx-2"
          >
            <div className="relative flex items-center justify-between w-full px-4 py-2 rounded-full bg-[#12121e] border border-slate-800/80 group-hover:border-[#ff2e56]/50 transition-all shadow-inner">
              <span className="text-xs text-slate-400 select-none truncate">Search anime...</span>
              <Search className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
            </div>
          </div>

          {/* Right Action Icons matching Screenshot: [💬 with pink dot] [🔔 with pink dot] [Avatar] */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            
            {/* Chat Bubble Icon with Pink Dot (DMs) */}
            <button
              type="button"
              onClick={() => setIsMessagesOpen(true)}
              className="relative p-1.5 rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Direct Messages"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ff2e56]" />
            </button>

            {/* Notification Bell with Pink Dot */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-1.5 rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ff2e56]" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-3xl bg-[#101020]/98 border border-slate-800 shadow-2xl p-4 z-50 animate-slide-up backdrop-blur-2xl space-y-3 font-sans">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-white">
                      <Bell className="w-4 h-4 text-[#ff2e56]" />
                      <span>Notifications</span>
                      <span className="px-1.5 py-0.2 rounded-full bg-[#ff2e56] text-white text-[9px] font-black">4</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNotificationsOpen(false)}
                      className="text-slate-400 hover:text-white text-xs cursor-pointer"
                    >
                      Close ✕
                    </button>
                  </div>

                  {/* Interactive Clickable Notifications List */}
                  <div className="space-y-2 text-xs">
                    {/* 1. Bleach TYBW Notification -> Navigates directly to Watch Page */}
                    <div
                      onClick={() => {
                        setNotificationsOpen(false);
                        navigateTo('watch', { animeId: '41467', episodeId: 15 });
                      }}
                      className="p-2.5 rounded-2xl bg-[#16162a] hover:bg-[#ff2e56]/20 border border-slate-800/80 hover:border-[#ff2e56] cursor-pointer transition-all flex items-start gap-2.5 group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-pink-950/80 border border-[#ff2e56]/60 flex items-center justify-center text-sm shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        🔥
                      </div>
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <p className="font-bold text-white group-hover:text-[#ff2e56] transition-colors truncate">
                          Bleach: TYBW Ep 15 is Airing!
                        </p>
                        <p className="text-[11px] text-slate-400">Tap to stream "The Back" in 1080p Ultra HD.</p>
                        <span className="text-[9px] text-slate-500 font-mono">5m ago • Watch Page</span>
                      </div>
                    </div>

                    {/* 2. Claire AI Notification -> Navigates directly to Claire */}
                    <div
                      onClick={() => {
                        setNotificationsOpen(false);
                        navigateTo('claire');
                      }}
                      className="p-2.5 rounded-2xl bg-[#16162a] hover:bg-[#ff2e56]/20 border border-slate-800/80 hover:border-[#ff2e56] cursor-pointer transition-all flex items-start gap-2.5 group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-purple-950/80 border border-purple-600/60 flex items-center justify-center text-sm shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        💬
                      </div>
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <p className="font-bold text-white group-hover:text-[#ff2e56] transition-colors truncate">
                          New Message from Claire
                        </p>
                        <p className="text-[11px] text-slate-400">"What anime should we watch today? ✨"</p>
                        <span className="text-[9px] text-purple-400 font-mono">12m ago • Claire AI</span>
                      </div>
                    </div>

                    {/* 3. Watch Party Notification -> Navigates directly to Live Watch Party */}
                    <div
                      onClick={() => {
                        setNotificationsOpen(false);
                        navigateTo('party');
                      }}
                      className="p-2.5 rounded-2xl bg-[#16162a] hover:bg-[#ff2e56]/20 border border-slate-800/80 hover:border-[#ff2e56] cursor-pointer transition-all flex items-start gap-2.5 group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-rose-950/80 border border-rose-600/60 flex items-center justify-center text-sm shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        👥
                      </div>
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <p className="font-bold text-white group-hover:text-[#ff2e56] transition-colors truncate">
                          Live Watch Party: BLEACH TYBW
                        </p>
                        <p className="text-[11px] text-slate-400">Gojo started a room! 6 members watching.</p>
                        <span className="text-[9px] text-rose-400 font-mono">25m ago • Watch Party</span>
                      </div>
                    </div>

                    {/* 4. Pulse Viral Edit -> Navigates directly to Pulse Feed */}
                    <div
                      onClick={() => {
                        setNotificationsOpen(false);
                        navigateTo('pulse');
                      }}
                      className="p-2.5 rounded-2xl bg-[#16162a] hover:bg-[#ff2e56]/20 border border-slate-800/80 hover:border-[#ff2e56] cursor-pointer transition-all flex items-start gap-2.5 group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-600/60 flex items-center justify-center text-sm shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        ⚡
                      </div>
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <p className="font-bold text-white group-hover:text-[#ff2e56] transition-colors truncate">
                          Viral Anime Sakuga on Pulse
                        </p>
                        <p className="text-[11px] text-slate-400">"Gojo vs Sukuna Hollow Purple" is trending!</p>
                        <span className="text-[9px] text-cyan-400 font-mono">1h ago • Velnix Pulse</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Circular Profile Avatar matching screenshot */}
            <button
              type="button"
              onClick={() => navigateTo('profile')}
              className="relative focus:outline-none shrink-0 cursor-pointer"
              title="Profile"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#ff2e56] bg-slate-900 flex items-center justify-center shadow-md">
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
