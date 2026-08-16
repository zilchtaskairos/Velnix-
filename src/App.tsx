import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MessageSquare, 
  Bell, 
  Play, 
  Star, 
  ChevronRight, 
  ChevronLeft,
  Home, 
  Tv, 
  Sparkles, 
  Server, 
  BookOpen, 
  User,
  Zap,
  Activity,
  CheckCircle2,
  Info,
  ShieldCheck
} from 'lucide-react';
import { DMsPage } from './pages/DMsPage';
import { ClairePage } from './pages/ClairePage';
import { ProfilePage } from './pages/ProfilePage';
import { WatchPage } from './pages/WatchPage';
import { LibraryPage } from './pages/LibraryPage';
import { BrowsePage } from './pages/BrowsePage';
import { SearchModal } from './components/common/SearchModal';
import { AppProvider, useApp } from './context/AppContext';
import { getProviderHealthStatus } from './services/velnixBackend';

// -----------------------------------------------------------------------------
// SPOTLIGHT HERO SLIDES DATA (4 Flagship Shows with High-Res Backdrops)
// -----------------------------------------------------------------------------
const HERO_SLIDES = [
  {
    id: 'bleach-tybw',
    title: 'BLEACH',
    subtitle: 'THOUSAND-YEAR BLOOD WAR',
    tagline: 'THE FINAL WAR. THE FINAL TRUTH.',
    description: 'The peace is suddenly broken when warning sirens blare through the Soul Society. Residents are disappearing without a trace as the Quincy empire awakens.',
    backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1920&q=80',
    poster: '/assets/bleach_poster.jpg',
    score: 9.12,
    rating: 'R-17+',
    quality: '4K Ultra',
    format: 'TV Series • Sub | Dub',
    studio: 'Studio Pierrot',
    genres: ['Action', 'Supernatural', 'Shonen'],
    episodeId: 1,
    provider: 'AnimePahe + AnimeKai'
  },
  {
    id: 'solo-leveling',
    title: 'SOLO LEVELING',
    subtitle: 'ARISE FROM THE SHADOWS',
    tagline: 'THE WEAKEST HUNTER RISES TO GODHOOD.',
    description: 'In a world connected to deadly monster dungeons, the weakest E-rank hunter Sung Jinwoo awakens a mysterious leveling system that changes everything.',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80',
    poster: '/assets/solo_leveling_poster.jpg',
    score: 8.54,
    rating: 'R-17+',
    quality: '4K Ultra',
    format: 'TV Series • Sub | Dub',
    studio: 'A-1 Pictures',
    genres: ['Action', 'Adventure', 'Fantasy'],
    episodeId: 1,
    provider: 'Pewe + HiAnime'
  },
  {
    id: 'jujutsu-kaisen-s2',
    title: 'JUJUTSU KAISEN',
    subtitle: 'SEASON 2: SHIBUYA INCIDENT',
    tagline: 'THE CURSE COLLIDES ON OCTOBER 31ST.',
    description: 'The past and present collide as the hidden inventory arc leads directly into the catastrophic battle for Shibuya against disaster curses.',
    backdrop: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1920&q=80',
    poster: '/assets/jjk_poster.jpg',
    score: 8.98,
    rating: 'R-17+',
    quality: '4K Ultra',
    format: 'TV Series • Sub | Dub',
    studio: 'MAPPA',
    genres: ['Action', 'Dark Fantasy', 'Shonen'],
    episodeId: 1,
    provider: 'AnimeKai + GogoAnime'
  },
  {
    id: 'demon-slayer-s4',
    title: 'DEMON SLAYER',
    subtitle: 'HASHIRA TRAINING ARC',
    tagline: 'THE HIGHEST BLADES UNITE BEFORE THE INFINITY CASTLE.',
    description: 'Tanjiro and the Demon Slayer Corps undergo grueling conditioning under the Hashira to prepare for the final war against Muzan Kibutsuji.',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80',
    poster: '/assets/demon_slayer_poster.jpg',
    score: 8.85,
    rating: 'R-17+',
    quality: '4K Ultra',
    format: 'TV Series • Sub | Dub',
    studio: 'ufotable',
    genres: ['Action', 'Fantasy', 'Historical'],
    episodeId: 1,
    provider: 'Velnix Ultra CDN'
  }
];

export function AppContent() {
  const { 
    currentPage, 
    navigateTo, 
    setIsSearchOpen, 
    currentUser
  } = useApp();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [providersHealth] = useState(getProviderHealthStatus());

  // Auto-advance spotlight banner
  useEffect(() => {
    if (currentPage !== 'home') return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [currentPage]);

  // 1. Trending Anime (One click to Watch in Velnix Player)
  const trendingList = [
    {
      id: 'bleach-tybw',
      title: 'Bleach: TYBW',
      subtitle: 'TV Series • Sub | Dub',
      score: 9.1,
      poster: '/assets/bleach_poster.jpg',
      server: 'AnimePahe (1080p)'
    },
    {
      id: 'jujutsu-kaisen-s2',
      title: 'Jujutsu Kaisen S2',
      subtitle: 'TV Series • Sub | Dub',
      score: 9.0,
      poster: '/assets/jjk_poster.jpg',
      server: 'AnimeKai (4K)'
    },
    {
      id: 'demon-slayer-s4',
      title: 'Demon Slayer S4',
      subtitle: 'TV Series • Sub | Dub',
      score: 8.9,
      poster: '/assets/demon_slayer_poster.jpg',
      server: 'Pewe (1080p)'
    },
    {
      id: 'solo-leveling',
      title: 'Solo Leveling',
      subtitle: 'TV Series • Sub | Dub',
      score: 8.5,
      poster: '/assets/solo_leveling_poster.jpg',
      server: 'HiAnime (HD)'
    },
    {
      id: 'frieren-beyond-journeys-end',
      title: 'Frieren: Beyond',
      subtitle: 'TV Series • Sub | Dub',
      score: 9.4,
      poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      server: 'Velnix Ultra (4K)'
    },
    {
      id: 'my-dress-up-darling',
      title: 'My Dress-Up Darling',
      subtitle: 'TV Series • Sub | Dub',
      score: 8.3,
      poster: '/assets/my_dress_up_poster.jpg',
      server: 'GogoAnime (720p)'
    }
  ];

  // 2. Continue Watching (16:9 Widescreen Landscape Cards)
  const continueList = [
    {
      id: 'bleach-tybw',
      title: 'Bleach: TYBW',
      subtitle: 'S1 E4 - Kill the Shadow',
      progressPct: 65,
      thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      episodeId: 4
    },
    {
      id: 'jujutsu-kaisen-s2',
      title: 'Jujutsu Kaisen S2',
      subtitle: 'S2 E1 - Hidden Inventory',
      progressPct: 75,
      thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      episodeId: 1
    },
    {
      id: 'solo-leveling',
      title: 'Solo Leveling',
      subtitle: "S1 E1 - I'm Used to It",
      progressPct: 45,
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      episodeId: 1
    },
    {
      id: 'frieren-beyond-journeys-end',
      title: 'Frieren: Beyond Journey',
      subtitle: "S1 E1 - The Journey's End",
      progressPct: 90,
      thumbnail: '/assets/frieren_banner.jpg',
      episodeId: 1
    }
  ];

  // Active Hero Slide
  const currentHero = HERO_SLIDES[currentSlide] || HERO_SLIDES[0];

  // If in DMs full-screen mode
  if (currentPage === 'community' || (currentPage as any) === 'dms') {
    return (
      <DMsPage
        onBack={() => navigateTo('home')}
        onNavigateToProfile={() => navigateTo('profile')}
        onNavigateToExtensions={() => navigateTo('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#07070d] text-slate-100 flex flex-col font-sans selection:bg-[#ff2e56] selection:text-white">
      
      {/* =========================================================================
          1. TOP HEADER (Brand, Search Pill, Server Aggregation Status, Profile)
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
              <span className="text-2xl sm:text-3xl font-black italic tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#ff2e56] via-[#ff5b7e] to-[#ffffff] font-serif">
                Velnix
              </span>
            </button>

            {/* Center Search Pill Input */}
            <div 
              onClick={() => setIsSearchOpen(true)}
              className="flex-1 max-w-xs sm:max-w-sm md:max-w-md mx-1 sm:mx-2 cursor-pointer"
            >
              <div className="relative flex items-center justify-between w-full px-4 py-2 rounded-full bg-[#12121e] border border-slate-800/80 hover:border-[#ff2e56]/50 transition-all shadow-inner">
                <span className="text-xs text-slate-400 select-none truncate">Search anime on all servers...</span>
                <Search className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
              </div>
            </div>

            {/* Right Action Icons: One-For-All Status + DMs + Profile */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Server Engine Badge */}
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-600/40 text-emerald-400 text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>One-For-All Server (6 Providers)</span>
              </div>

              {/* Chat Bubble Icon */}
              <button
                type="button"
                onClick={() => navigateTo('community')}
                className="relative p-1.5 rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Direct Messages"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ff2e56]" />
              </button>

              {/* Notification Bell */}
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
                      </div>
                      <button
                        type="button"
                        onClick={() => setNotificationsOpen(false)}
                        className="text-slate-400 hover:text-white text-xs cursor-pointer"
                      >
                        Close ✕
                      </button>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div
                        onClick={() => {
                          setNotificationsOpen(false);
                          navigateTo('watch', { animeId: 'bleach-tybw', episodeId: 1 });
                        }}
                        className="p-2.5 rounded-2xl bg-[#16162a] hover:bg-[#ff2e56]/20 border border-slate-800/80 hover:border-[#ff2e56] cursor-pointer transition-all flex items-start gap-2.5 group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-pink-950/80 border border-[#ff2e56]/60 flex items-center justify-center text-sm shrink-0 mt-0.5">
                          🔥
                        </div>
                        <div className="min-w-0 flex-1 space-y-0.5">
                          <p className="font-bold text-white group-hover:text-[#ff2e56] transition-colors truncate">
                            Bleach: TYBW Season 1 Ready!
                          </p>
                          <p className="text-[11px] text-slate-400">Streamed from AnimePahe & AnimeKai 4K.</p>
                          <span className="text-[9px] text-slate-500 font-mono">Just now • Watch Page</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Avatar */}
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
          2. MAIN VIEW ROUTER (Home & Watch)
         ========================================================================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-3 pb-28">
        {currentPage === 'home' && (
          <div className="space-y-7 animate-fade-in">
            
            {/* 1. INTERACTIVE SPOTLIGHT HERO BANNER */}
            <div className="relative w-full h-[340px] sm:h-[400px] md:h-[460px] rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/10 group">
              
              <div className="absolute inset-0 pointer-events-none">
                <img
                  key={currentHero.id}
                  src={currentHero.backdrop}
                  alt={currentHero.title}
                  className="w-full h-full object-cover object-center brightness-75 transition-all duration-700 scale-100 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07070d] via-[#07070d]/60 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#07070d] via-[#07070d]/80 to-transparent w-full md:w-3/4 pointer-events-none" />
              </div>

              {/* Top Badges */}
              <div className="absolute top-4 left-4 sm:left-6 z-20 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#ff2e56] text-white text-[10px] font-black uppercase tracking-wider shadow-lg">
                  {currentHero.quality}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-slate-200 text-[10px] font-bold">
                  {currentHero.studio}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-950/70 border border-emerald-600/40 text-emerald-300 text-[10px] font-bold flex items-center gap-1">
                  <Zap className="w-3 h-3 text-emerald-400" />
                  <span>{currentHero.provider}</span>
                </span>
              </div>

              {/* Arrows */}
              <button
                type="button"
                onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-[#ff2e56] text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-all opacity-0 group-hover:opacity-100 z-30 cursor-pointer shadow-xl"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-[#ff2e56] text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-all opacity-0 group-hover:opacity-100 z-30 cursor-pointer shadow-xl"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Hero Content */}
              <div className="relative h-full flex flex-col justify-end p-5 sm:p-8 z-20 space-y-3 max-w-xl pointer-events-auto">
                
                <div className="space-y-1">
                  <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-wider uppercase leading-none drop-shadow-2xl">
                    {currentHero.title}
                  </h1>
                  <p className="text-xs sm:text-sm font-bold text-slate-200 tracking-wider uppercase drop-shadow">
                    {currentHero.subtitle}
                  </p>
                  <p className="text-[10px] sm:text-xs font-bold tracking-widest text-[#ff2e56] uppercase pt-0.5">
                    {currentHero.tagline}
                  </p>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed hidden sm:block pt-1">
                    {currentHero.description}
                  </p>
                </div>

                {/* Direct Watch Now Button */}
                <div className="flex items-center gap-3 pt-1 z-30">
                  <button
                    type="button"
                    onClick={() => navigateTo('watch', { animeId: currentHero.id, episodeId: currentHero.episodeId })}
                    className="px-6 py-2.5 rounded-xl bg-[#ff2e56] hover:bg-[#ff4b72] active:bg-[#d61e42] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-pink-600/40 transition-transform active:scale-95 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current pointer-events-none" />
                    <span>Watch Now (One-For-All Stream)</span>
                  </button>
                </div>

                {/* Carousel Indicator Dots */}
                <div className="flex items-center justify-center gap-2 pt-2 w-full z-30">
                  {HERO_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      className={`transition-all rounded-full cursor-pointer ${
                        idx === currentSlide
                          ? 'w-5 h-1.5 bg-[#ff2e56]'
                          : 'w-1.5 h-1.5 bg-slate-600 hover:bg-slate-400'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 2. ONE-FOR-ALL SERVER STATUS MATRIX */}
            <section className="p-4 rounded-3xl bg-[#0c0a18] border border-slate-800 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-[#ff2e56]" />
                  <h2 className="text-xs sm:text-sm font-bold text-white">
                    ✦ Velnix Backend: One-For-All Server Engine Matrix
                  </h2>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">
                  All 6 Providers Aggregated & Synced
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {providersHealth.map((prov) => (
                  <div key={prov.name} className="p-2.5 rounded-2xl bg-[#121222] border border-slate-800/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{prov.name}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono">{prov.streams}</p>
                    <div className="flex items-center justify-between text-[9px] text-slate-500 pt-0.5">
                      <span>{prov.region}</span>
                      <span className="text-emerald-400 font-bold">{prov.latency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. TRENDING NOW (Direct click to Watch Page) */}
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
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-0.5 text-xs font-semibold text-[#ff2e56] hover:text-[#ff4b72] transition-colors cursor-pointer"
                >
                  <span>Search All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2">
                {trendingList.map((anime) => (
                  <div
                    key={anime.id}
                    onClick={() => navigateTo('watch', { animeId: anime.id, episodeId: 1 })}
                    className="w-[130px] sm:w-[155px] md:w-[170px] shrink-0 group cursor-pointer space-y-1.5 text-left focus:outline-none"
                  >
                    <div className="relative aspect-[3/4.4] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md group-hover:scale-103 transition-transform duration-300">
                      <img
                        src={anime.poster}
                        alt={anime.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-[9px] font-bold text-white">
                        HD
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-[#ff2e56] text-white flex items-center justify-center shadow-lg">
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#ff2e56] transition-colors truncate">
                        {anime.title}
                      </h4>
                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400">
                        <span className="truncate max-w-[90px] text-slate-400">{anime.server}</span>
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

            {/* 4. CONTINUE WATCHING (16:9 Cards with direct resume) */}
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
                  onClick={() => navigateTo('watch', { animeId: 'bleach-tybw', episodeId: 4 })}
                  className="flex items-center gap-0.5 text-xs font-semibold text-[#ff2e56] hover:text-[#ff4b72] transition-colors cursor-pointer"
                >
                  <span>Resume Latest</span>
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

          </div>
        )}

        {currentPage === 'watch' && <WatchPage />}
        {currentPage === 'profile' && <ProfilePage />}
        {currentPage === 'library' && <LibraryPage />}
        {currentPage === 'browse' && <BrowsePage />}
        {currentPage === 'claire' && <ClairePage />}
      </main>

      {/* SEARCH MODAL */}
      <SearchModal />

      {/* =========================================================================
          3. CONSTANT 2-MAIN-TAB FOCUSED BOTTOM BAR: [Home] [Watch]
         ========================================================================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#090912]/95 backdrop-blur-2xl border-t border-slate-800/80 transition-all pointer-events-auto">
        <div className="max-w-md mx-auto px-6 py-2 flex items-center justify-around">
          
          {/* 1. Home Tab */}
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-all cursor-pointer select-none ${
              currentPage === 'home'
                ? 'text-[#ff2e56] font-bold scale-110'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-6 h-6 pointer-events-none" />
            <span className="text-[11px] font-semibold mt-1 tracking-tight">Home</span>
          </button>

          {/* 2. Watch Player Tab */}
          <button
            type="button"
            onClick={() => navigateTo('watch', { animeId: 'bleach-tybw', episodeId: 1 })}
            className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-all cursor-pointer select-none ${
              currentPage === 'watch'
                ? 'text-[#ff2e56] font-bold scale-110'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tv className="w-6 h-6 pointer-events-none" />
            <span className="text-[11px] font-semibold mt-1 tracking-tight">Watch Player</span>
          </button>

          {/* 3. Search Shortcut */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-all cursor-pointer select-none text-slate-400 hover:text-slate-200"
          >
            <Search className="w-6 h-6 pointer-events-none" />
            <span className="text-[11px] font-semibold mt-1 tracking-tight">Search</span>
          </button>

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
