import React, { useState } from 'react';
import { 
  Search, 
  MessageSquare, 
  Bell, 
  Play, 
  Star, 
  ChevronRight, 
  Home, 
  Zap, 
  Sparkles, 
  Plus, 
  BookOpen, 
  User,
  Crown,
  Users,
  Radio
} from 'lucide-react';
import { DMsPage } from './pages/DMsPage';
import { ClairePage } from './pages/ClairePage';
import { ProfilePage } from './pages/ProfilePage';
import { WatchPage } from './pages/WatchPage';
import { WatchPartyPage } from './pages/WatchPartyPage';
import { PulsePage } from './pages/PulsePage';
import { StudioPage } from './pages/StudioPage';
import { LibraryPage } from './pages/LibraryPage';
import { BrowsePage } from './pages/BrowsePage';
import { AnimeDetailPage } from './pages/AnimeDetailPage';
import { ExtensionsPage } from './pages/ExtensionsPage';
import { AppProvider, useApp } from './context/AppContext';

export function AppContent() {
  const { currentPage, navigateTo, setIsSearchOpen, currentUser } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // 1. Trending Now Data matching Screenshot 1:1
  const trendingList = [
    {
      id: '40748',
      title: 'Jujutsu Kaisen',
      subtitle: 'TV Series • Sub | Dub',
      score: 4.8,
      poster: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg'
    },
    {
      id: '38000',
      title: 'Demon Slayer',
      subtitle: 'TV Series • Sub | Dub',
      score: 4.7,
      poster: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg'
    },
    {
      id: '16498',
      title: 'Attack on Titan',
      subtitle: 'TV Series • Sub | Dub',
      score: 4.9,
      poster: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg'
    },
    {
      id: '52299',
      title: 'Solo Leveling',
      subtitle: 'TV Series • Sub',
      score: 4.8,
      poster: 'https://cdn.myanimelist.net/images/anime/1816/141049l.jpg'
    },
    {
      id: '44511',
      title: 'Chainsaw Man',
      subtitle: 'TV Series • Sub | Dub',
      score: 4.6,
      poster: 'https://cdn.myanimelist.net/images/anime/1806/126216l.jpg'
    }
  ];

  // 2. Continue Watching Data matching Screenshot 1:1
  const continueList = [
    {
      id: '41467',
      title: 'Bleach: TYBW',
      subtitle: 'S1 E15 - The Back',
      progressPct: 65,
      thumbnail: 'https://cdn.myanimelist.net/images/anime/1764/126627l.jpg',
      episodeId: 15
    },
    {
      id: '40748',
      title: 'Jujutsu Kaisen S2',
      subtitle: 'S2 E8 - Shibuya Incident',
      progressPct: 70,
      thumbnail: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
      episodeId: 8
    },
    {
      id: '38000',
      title: 'Demon Slayer S4',
      subtitle: 'S4 E3 - Swordsmith Village',
      progressPct: 40,
      thumbnail: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
      episodeId: 3
    },
    {
      id: '52299',
      title: 'Solo Leveling',
      subtitle: "S1 E7 - Let's See",
      progressPct: 55,
      thumbnail: 'https://cdn.myanimelist.net/images/anime/1816/141049l.jpg',
      episodeId: 7
    }
  ];

  // 3. Claire Recommends Data matching Screenshot 1:1
  const claireRecommends = [
    {
      id: '52991',
      title: "Frieren: Beyond Journey's End",
      subtitle: 'TV Series • Sub',
      score: 4.9,
      thumbnail: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg'
    },
    {
      id: '33352',
      title: 'Violet Evergarden',
      subtitle: 'TV Series • Sub | Dub',
      score: 4.8,
      thumbnail: 'https://cdn.myanimelist.net/images/anime/1795/95088l.jpg'
    },
    {
      id: '23273',
      title: 'Your Lie in April',
      subtitle: 'TV Series • Sub | Dub',
      score: 4.8,
      thumbnail: 'https://cdn.myanimelist.net/images/anime/1454/139209l.jpg'
    },
    {
      id: '34599',
      title: 'Made in Abyss',
      subtitle: 'TV Series • Sub | Dub',
      score: 4.7,
      thumbnail: 'https://cdn.myanimelist.net/images/anime/6/86733l.jpg'
    }
  ];

  // 4. Recently Updated Data matching Screenshot 1:1
  const recentlyUpdated = [
    {
      id: '21',
      title: 'One Piece',
      subtitle: 'Episode 1098',
      score: 4.9,
      poster: 'https://cdn.myanimelist.net/images/anime/1244/138851l.jpg'
    },
    {
      id: '40748',
      title: 'Jujutsu Kaisen S2',
      subtitle: 'Episode 23',
      score: 4.8,
      poster: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg'
    },
    {
      id: '52299',
      title: 'Solo Leveling',
      subtitle: 'Episode 12',
      score: 4.8,
      poster: 'https://cdn.myanimelist.net/images/anime/1816/141049l.jpg'
    },
    {
      id: '52991',
      title: 'Frieren',
      subtitle: 'Episode 28',
      score: 4.9,
      poster: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg'
    },
    {
      id: '57334',
      title: 'Dandadan',
      subtitle: 'Episode 6',
      score: 4.7,
      poster: 'https://cdn.myanimelist.net/images/anime/1913/144706l.jpg'
    }
  ];

  // 5. Watch Party Data right underneath on Homepage
  const watchPartyList = [
    {
      id: 'party-bleach',
      title: 'Bleach: TYBW Watchalong',
      subtitle: 'S1 E1 • 6 Watching (Host: GojoSatoru)',
      participants: 6,
      maxParticipants: 150,
      progressPct: 60,
      thumbnail: 'https://cdn.myanimelist.net/images/anime/1764/126627l.jpg'
    },
    {
      id: 'party-jjk',
      title: 'Jujutsu Kaisen S2 Shibuya Party',
      subtitle: 'S2 E8 • 14 Watching (Host: Sukuna)',
      participants: 14,
      maxParticipants: 150,
      progressPct: 45,
      thumbnail: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg'
    },
    {
      id: 'party-solo',
      title: 'Solo Leveling Monarch Party',
      subtitle: 'S1 E10 • 28 Watching (Host: Jinwoo)',
      participants: 28,
      maxParticipants: 150,
      progressPct: 80,
      thumbnail: 'https://cdn.myanimelist.net/images/anime/1816/141049l.jpg'
    },
    {
      id: 'party-ds',
      title: 'Demon Slayer Hashira Watch',
      subtitle: 'S4 E3 • 19 Watching (Host: Tanjiro)',
      participants: 19,
      maxParticipants: 150,
      progressPct: 35,
      thumbnail: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg'
    }
  ];

  // =========================================================================
  // FULL PAGE DMS: When entering DMs, navigation disappears and DMs fills the whole page
  // =========================================================================
  if (currentPage === 'community' || (currentPage as any) === 'dms') {
    return (
      <DMsPage
        onBack={() => navigateTo('home')}
        onNavigateToProfile={() => navigateTo('profile')}
        onNavigateToExtensions={() => navigateTo('extensions')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#07070d] text-slate-100 flex flex-col font-sans selection:bg-[#ff2e56] selection:text-white">
      
      {/* =========================================================================
          1. TOP HEADER BAR matching Screenshot 1:1:
             [✦ Velnix]    [Search anime... 🔍]    [💬 dot] [🔔 dot] [Avatar]
         ========================================================================= */}
      <header className="sticky top-0 z-40 w-full bg-[#07070d]/95 backdrop-blur-xl border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2.5 sm:gap-6">
            
            {/* Left Brand: ✦ Velnix */}
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="flex items-center gap-1.5 focus:outline-none shrink-0 group cursor-pointer"
            >
              <span className="text-[#ff2e56] text-xl font-bold">✦</span>
              <span className="text-2xl sm:text-3xl font-black italic tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#ff2e56] via-[#ff5b7e] to-[#ff8da6] font-serif">
                Velnix
              </span>
            </button>

            {/* Center Search Pill Input (Search anime... 🔍) */}
            <div 
              onClick={() => setIsSearchOpen(true)}
              className="flex-1 max-w-xs sm:max-w-sm md:max-w-md mx-1 sm:mx-2 cursor-pointer"
            >
              <div className="relative flex items-center justify-between w-full px-4 py-2 rounded-full bg-[#12121e] border border-slate-800/80 hover:border-[#ff2e56]/50 transition-all shadow-inner">
                <span className="text-xs text-slate-400 select-none truncate">Search anime...</span>
                <Search className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
              </div>
            </div>

            {/* Right Action Icons: [💬 with pink dot -> Opens Fullscreen DMs] [🔔] [Avatar -> Profile] */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
              
              {/* Chat Bubble Icon with Pink Dot: Opens Full-Screen DMs */}
              <button
                type="button"
                onClick={() => navigateTo('community')}
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

              {/* Circular Profile Avatar */}
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
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                      P
                    </div>
                  )}
                </div>
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* =========================================================================
          2. MAIN PAGE ROUTER (Home, Pulse, Claire, Studio, Library, Profile, Watch, Party)
         ========================================================================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-3 pb-28">
        {currentPage === 'home' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* HERO BANNER (BLEACH: THOUSAND-YEAR BLOOD WAR) */}
            <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/5 group">
              
              {/* Background Anime Artwork: Ichigo with Fiery Lightning Aura */}
              <div className="absolute inset-0 pointer-events-none">
                <img
                  src="https://cdn.myanimelist.net/images/anime/1764/126627l.jpg"
                  alt="Bleach TYBW"
                  className="w-full h-full object-cover object-center brightness-75 group-hover:scale-103 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07070d] via-[#07070d]/50 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#07070d] via-[#07070d]/70 to-transparent w-full md:w-3/4 pointer-events-none" />
              </div>

              {/* Hero Content Overlay matching Screenshot */}
              <div className="relative h-full flex flex-col justify-end p-6 sm:p-8 z-20 space-y-3 max-w-xl pointer-events-auto">
                <div className="space-y-0.5 pointer-events-none">
                  <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-wider uppercase leading-none drop-shadow-2xl">
                    BLEACH
                  </h1>
                  <p className="text-xs sm:text-sm font-bold text-slate-200 tracking-wider uppercase drop-shadow">
                    THOUSAND-YEAR BLOOD WAR
                  </p>
                  <p className="text-[10px] sm:text-xs font-bold tracking-widest text-slate-400 uppercase pt-1">
                    THE FINAL WAR. THE FINAL TRUTH.
                  </p>
                </div>

                {/* Action Buttons: [▶ Watch Now] [More Info] */}
                <div className="flex items-center gap-3 pt-1 z-30">
                  <button
                    type="button"
                    onClick={() => navigateTo('watch', { animeId: '41467', episodeId: 1 })}
                    className="px-5 py-2 sm:py-2.5 rounded-xl bg-[#ff2e56] hover:bg-[#ff4b72] active:bg-[#d61e42] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-pink-600/40 transition-transform active:scale-95 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current pointer-events-none" />
                    <span>Watch Now</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateTo('anime', { animeId: '41467' })}
                    className="px-4 py-2 sm:py-2.5 rounded-xl bg-[#181826]/90 hover:bg-[#222234] border border-slate-700/80 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-colors cursor-pointer"
                  >
                    More Info
                  </button>
                </div>

                {/* 4 Pink Carousel Indicator Dots: [● ○ ○ ○] */}
                <div className="flex items-center justify-center gap-2 pt-2 w-full z-30">
                  {[0, 1, 2, 3].map((idx) => (
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

            {/* SECTION 1: | Trending Now matching Screenshot 1:1 */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
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

              <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2">
                {trendingList.map((anime) => (
                  <div
                    key={anime.id}
                    onClick={() => navigateTo('anime', { animeId: anime.id })}
                    className="w-[130px] sm:w-[155px] md:w-[170px] shrink-0 group cursor-pointer space-y-1.5 text-left focus:outline-none"
                  >
                    <div className="relative aspect-[3/4.4] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md group-hover:scale-103 transition-transform duration-300">
                      <img
                        src={anime.poster}
                        alt={anime.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
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

            {/* SECTION 2: | Continue Watching matching Screenshot 1:1 */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
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

              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {continueList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigateTo('watch', { animeId: item.id, episodeId: item.episodeId })}
                    className="w-[200px] sm:w-[230px] md:w-[250px] shrink-0 group cursor-pointer space-y-2 text-left focus:outline-none"
                  >
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center shadow-lg group-hover:bg-[#ff2e56] group-hover:border-[#ff2e56] transition-colors">
                        <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ml-0.5" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#ff2e56] transition-colors truncate">
                          {item.title}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">
                          {item.subtitle}
                        </p>
                      </div>

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

            {/* SECTION 3: Claire Recommends For You matching Screenshot 1:1 */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
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

              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {claireRecommends.map((anime) => (
                  <div
                    key={anime.id}
                    onClick={() => navigateTo('anime', { animeId: anime.id })}
                    className="w-[190px] sm:w-[220px] shrink-0 group cursor-pointer space-y-1.5 text-left focus:outline-none"
                  >
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md">
                      <img
                        src={anime.thumbnail}
                        alt={anime.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

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

            {/* SECTION 4: | Recently Updated matching Screenshot 1:1 */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
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

              <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2">
                {recentlyUpdated.map((anime) => (
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

            {/* SECTION 5: | Watch Party (Right Underneath with 16:9 Widescreen Cards) */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full bg-[#ff2e56]" />
                  <h2 className="text-base sm:text-lg font-bold font-heading text-white">
                    Watch Party
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => navigateTo('party')}
                  className="flex items-center gap-0.5 text-xs font-semibold text-[#ff2e56] hover:text-[#ff4b72] transition-colors cursor-pointer"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {watchPartyList.map((party) => (
                  <div
                    key={party.id}
                    onClick={() => navigateTo('party')}
                    className="w-[200px] sm:w-[230px] md:w-[250px] shrink-0 group cursor-pointer space-y-2 text-left focus:outline-none"
                  >
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md">
                      <img
                        src={party.thumbnail}
                        alt={party.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-rose-950/90 border border-rose-700 text-rose-300 text-[9px] font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff2e56] animate-ping" />
                        <span>Live</span>
                      </div>

                      <div className="absolute bottom-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center shadow-lg group-hover:bg-[#ff2e56] group-hover:border-[#ff2e56] transition-colors">
                        <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ml-0.5" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#ff2e56] transition-colors truncate">
                          {party.title}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">
                          {party.subtitle}
                        </p>
                      </div>

                      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#ff2e56] rounded-full"
                          style={{ width: `${party.progressPct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {currentPage === 'pulse' && <PulsePage />}
        {currentPage === 'claire' && <ClairePage />}
        {currentPage === 'studio' && <StudioPage />}
        {currentPage === 'library' && <LibraryPage />}
        {currentPage === 'profile' && <ProfilePage />}
        {currentPage === 'watch' && <WatchPage />}
        {currentPage === 'party' && <WatchPartyPage />}
        {currentPage === 'browse' && <BrowsePage />}
        {currentPage === 'anime' && <AnimeDetailPage />}
        {currentPage === 'extensions' && <ExtensionsPage />}
      </main>

      {/* =========================================================================
          3. CONSTANT FIXED BOTTOM NAVIGATION BAR matching Screenshot 1:1:
             [Home] [Pulse] [Claire] [Studio] [Library] [Profile]
         ========================================================================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#090912]/95 backdrop-blur-2xl border-t border-slate-800/80 transition-all pointer-events-auto">
        <div className="max-w-md md:max-w-xl mx-auto px-3 sm:px-4 py-2 flex items-center justify-between">
          {[
            { id: 'home', label: 'Home', icon: <Home className="w-5 h-5 pointer-events-none" /> },
            { id: 'pulse', label: 'Pulse', icon: <Zap className="w-5 h-5 pointer-events-none" /> },
            { id: 'claire', label: 'Claire', icon: <Sparkles className="w-5 h-5 pointer-events-none" /> },
            { id: 'studio', label: 'Studio', icon: <Plus className="w-5 h-5 pointer-events-none" /> },
            { id: 'library', label: 'Library', icon: <BookOpen className="w-5 h-5 pointer-events-none" /> },
            { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5 pointer-events-none" /> }
          ].map((tab) => {
            const isActive = currentPage === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => navigateTo(tab.id as any)}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer select-none active:scale-90 ${
                  isActive
                    ? 'text-[#ff2e56] font-bold scale-105'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className={`transition-transform duration-200 pointer-events-none ${isActive ? 'scale-110' : ''}`}>
                  {tab.icon}
                </div>
                <span className="text-[10px] font-medium mt-1 tracking-tight pointer-events-none">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

    </div>
  );
}

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
