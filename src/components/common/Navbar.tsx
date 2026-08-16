import React, { useState } from 'react';
import { useApp, PageRoute } from '../../context/AppContext';
import { 
  Play, 
  Search, 
  Dices, 
  Bookmark, 
  Calendar, 
  Compass, 
  Sliders, 
  Users, 
  Sparkles, 
  Menu, 
  X, 
  Bell, 
  Film,
  Video,
  BookOpen,
  Gamepad2,
  Bot,
  MessageCircle,
  Radio,
  Download
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    navigateTo, 
    setIsSearchOpen, 
    goToRandomAnime, 
    watchlist, 
    setIsShortcutsOpen,
    setIsMessagesOpen,
    setIsPayPalOpen,
    currentUser,
    addToast 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const watchlistCount = Object.keys(watchlist).length;

  const navLinks: { page: PageRoute; label: string; icon: React.ReactNode; badge?: string }[] = [
    { page: 'home', label: 'Home', icon: <Play className="w-4 h-4" /> },
    { page: 'browse', label: 'Browse', icon: <Compass className="w-4 h-4" /> },
    { page: 'pulse', label: 'Pulse', icon: <Video className="w-4 h-4 text-pink-400" />, badge: 'HOT' },
    { page: 'studio', label: 'Studio', icon: <Sparkles className="w-4 h-4 text-purple-400" /> },
    { page: 'manga', label: 'Manga', icon: <BookOpen className="w-4 h-4 text-cyan-400" /> },
    { page: 'games', label: 'Games', icon: <Gamepad2 className="w-4 h-4 text-amber-400" /> },
    { page: 'schedule', label: 'Schedule', icon: <Calendar className="w-4 h-4" /> },
    { page: 'library', label: 'Library', icon: <Bookmark className="w-4 h-4" /> },
    { page: 'claire', label: 'Claire AI', icon: <Bot className="w-4 h-4 text-cyan-300" /> },
    { page: 'community', label: 'Community', icon: <Users className="w-4 h-4" /> },
    { page: 'settings', label: 'Settings', icon: <Sliders className="w-4 h-4" /> },
    { page: 'guide', label: 'Page Guide', icon: <Sparkles className="w-4 h-4 text-yellow-400" /> },
  ];

  const handleNav = (page: PageRoute) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  const handleWatchNow = () => {
    navigateTo('watch', { animeId: 'solo-leveling', episodeId: 1 });
    addToast({
      title: 'Streaming Live Now! 🎬',
      description: 'Playing Solo Leveling Episode 1 in 4K Ultra HD',
      type: 'success'
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#090913]/90 border-b border-purple-900/40 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand with 𝓥𝓮𝓵𝓷𝓲𝔁 .⋆♱ */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 group focus:outline-none shrink-0"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[2px] shadow-lg shadow-purple-600/30 group-hover:shadow-purple-500/50 transition-all duration-300 transform group-hover:scale-105">
                <div className="w-full h-full bg-[#0d0d1a] rounded-[14px] flex items-center justify-center">
                  <Film className="w-5 h-5 text-purple-400 group-hover:text-cyan-300 transition-colors" />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  {/* The requested stylish brand name */}
                  <span className="text-xl sm:text-2xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-cyan-300 drop-shadow-md">
                    𝓥𝓮𝓵𝓷𝓲𝔁 .⋆♱
                  </span>
                  <span className="px-1.5 py-0.2 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest bg-purple-950/80 text-purple-300 border border-purple-800/50 rounded">
                    ULTRA
                  </span>
                </div>
                <span className="text-[10px] text-purple-400/80 font-medium -mt-0.5">
                  Stream Anime & Manga
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNav(link.page)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                      isActive
                        ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40 shadow-inner'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.2 text-[9px] font-extrabold bg-pink-600 text-white rounded-full">
                        {link.badge}
                      </span>
                    )}
                    {link.page === 'library' && watchlistCount > 0 && (
                      <span className="px-1.5 py-0.2 text-[10px] font-bold bg-purple-600 text-white rounded-full">
                        {watchlistCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Watch Live Button */}
            <button
              onClick={handleWatchNow}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-purple-600/40 transition-transform hover:scale-105 active:scale-95 animate-pulse"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Watch Now</span>
            </button>

            {/* Watch Party Quick Trigger */}
            <button
              onClick={() => handleNav('home')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-700/60 text-cyan-300 text-xs font-bold transition-all shadow-sm"
              title="Watch Parties (Up to 150 participants)"
            >
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Parties (150)</span>
            </button>

            {/* Global Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-purple-500 text-slate-300 text-xs font-medium transition-all"
              title="Search Anime & Manga (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-purple-400" />
              <span className="hidden md:inline text-slate-400">Search...</span>
            </button>

            {/* Direct Messages Icon */}
            <button
              onClick={() => setIsMessagesOpen(true)}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500 text-slate-300 hover:text-white transition-all relative"
              title="Direct Messages"
            >
              <MessageCircle className="w-4 h-4 text-cyan-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-500" />
            </button>

            {/* User Profile Avatar */}
            <button 
              onClick={() => handleNav('profile')}
              className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500 transition-all group"
              title="View Dual-Picture Profile"
            >
              <img
                src={currentUser.avatar}
                alt="User Avatar"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover ring-2 ring-purple-600 group-hover:ring-cyan-400 transition-all"
              />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-slate-800 animate-slide-up">
            <div className="grid grid-cols-3 gap-2">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNav(link.page)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40'
                        : 'text-slate-300 hover:bg-slate-800 bg-slate-900/50'
                    }`}
                  >
                    {link.icon}
                    <span className="mt-1">{link.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
