import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Play, 
  Tv, 
  Compass, 
  Calendar, 
  Bookmark, 
  Users, 
  Sliders, 
  Film, 
  Zap, 
  CheckCircle, 
  Layers, 
  Code, 
  Database,
  ArrowRight,
  Shield,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

export const AboutExplainPage: React.FC = () => {
  const { navigateTo } = useApp();

  const pagesGuide = [
    {
      route: 'home',
      name: 'Home / Explore Page',
      icon: <Play className="w-5 h-5 text-purple-400" />,
      tag: 'Primary Discovery Hub',
      summary: 'The main landing experience featuring the auto-cycling Spotlight Hero carousel, Continue Watching progress bars, Airing Today ticker, Top 10 Today leaderboard, and genre exploration rows.',
      features: [
        'Cinematic Spotlight Banner: Auto-rotates top anime (Solo Leveling, JJK, Frieren, Demon Slayer) with direct "Watch Ep 1", "+ Watchlist", and Trailer triggers.',
        'Continue Watching Bar: Automatically pulls saved video timestamps from LocalStorage so users can resume episodes with 1 click.',
        'Airing Today Live Strip: Shows what anime is broadcasting right now with countdown timers and "Remind Me" alert toggles.',
        'Top 10 Today: Custom numbered badges (01-10) with ratings, sub/dub counts, and studio info.',
        'Thematic Carousels: Horizontal smooth scrolling for Trending, Top Rated, Action Block, and Comfort Anime.'
      ]
    },
    {
      route: 'browse',
      name: 'Browse & Advanced Filter Catalog',
      icon: <Compass className="w-5 h-5 text-cyan-400" />,
      tag: 'High-Precision Directory',
      summary: 'A multi-facet search and filter catalog allowing users to discover anime by combined criteria.',
      features: [
        'Instant Real-Time Search: Query filter matching titles, Japanese romaji, studios, and synopsis.',
        'Multi-Select Genre Filter: Select multiple genres simultaneously (e.g. Action + Supernatural).',
        'Format & Status Selectors: Filter by TV, Movie, OVA, ONA, Special and Airing vs Completed.',
        'Audio Track Filter: Filter by Subbed, Dubbed, or Dual Audio support.',
        'Sorting Options: Sort by Popularity, Highest Rated Score, Trending Rank, Release Date, or A-Z.',
        'Grid vs Compact List Switcher: Toggle between visual poster cards and compact information rows.'
      ]
    },
    {
      route: 'anime',
      name: 'Anime Detail & Overview Page',
      icon: <Film className="w-5 h-5 text-amber-400" />,
      tag: 'Full Franchise Breakdown',
      summary: 'Detailed showcase for each anime series with metadata, episode selector, character voice actors, related titles, and community reviews.',
      features: [
        'Hero Backdrop & Poster: High-resolution visual artwork with score, ranking, format, and studio tags.',
        'Watchlist Status Dropdown: Quickly switch status between Watching, Plan to Watch, Completed, On Hold, and Dropped.',
        'User Rating Widget: 1-10 Star rating selector that updates personal library and calculates mean scores.',
        'Episode Picker (Grid & List modes): Episode cards with thumbnails, duration, synopsis, and filler indicator.',
        'Characters & Voice Actors: Japanese & English VA roster pairing character artwork with voice artist credits.',
        'Franchise Relations & Recommendations: Prequels, sequels, spin-offs, and similar anime suggestions.',
        'Community Reviews: Full user reviews with upvote buttons and an interactive review submission form.'
      ]
    },
    {
      route: 'watch',
      name: 'Watch / Streaming Video Player Page',
      icon: <Tv className="w-5 h-5 text-pink-400" />,
      tag: 'Core Anime Player Experience',
      summary: 'High-performance custom video player loaded with anime-specific features like Danmaku comments, Skip Intro, server switching, and speed controls.',
      features: [
        'Custom Video Player Controls: HTML5 responsive player with play/pause, seek bar, time display, volume slider, and theater/fullscreen toggles.',
        'Live Danmaku Bullet Comments: Real-time floating bullet comments across the video stream with color selector and instant send form.',
        'Skip Intro (85s) & Skip Outro: One-click button to fast-forward past opening and ending theme songs.',
        'Multi-Server CDN Switcher: Switch between Velnix Ultra CDN, Kyoto FastStream, Tokyo Mirror, and Alpha Stream.',
        'Dual Audio (Sub/Dub) & Resolution (1080p, 720p, 480p, Auto) Switching.',
        'Interactive Episode Drawer: Switch episodes on the fly without refreshing the page.',
        'Episode Discussion & Spoiler Masking: Episode comment section with reply threads and spoiler click-to-reveal protection.',
        'Keyboard Shortcuts Support: Space for play/pause, Left/Right arrows for 5s seek, F for fullscreen, M for mute, S to skip intro, D for Danmaku.'
      ]
    },
    {
      route: 'schedule',
      name: 'Weekly Airing Release Schedule',
      icon: <Calendar className="w-5 h-5 text-emerald-400" />,
      tag: 'Broadcast Timetable',
      summary: 'Interactive Monday-to-Sunday calendar showing broadcast release times synchronized with Japanese television.',
      features: [
        '7-Day Interactive Selector: Tab between Monday through Sunday to inspect daily scheduled episode releases.',
        'Timezone Switcher: Switch between Local UTC, JST Tokyo, EST New York, and PST Los Angeles.',
        'Notification Reminder Toggles: Click the bell icon on any upcoming show to set real-time streaming alerts.'
      ]
    },
    {
      route: 'library',
      name: 'My Watchlist & Library Page',
      icon: <Bookmark className="w-5 h-5 text-indigo-400" />,
      tag: 'Personal Profile & Tracking',
      summary: 'Personalized anime hub tracking watched episodes, watch time stats, custom lists, and watch history.',
      features: [
        'User Profile & Stats Overview: Shows total anime count, total episodes watched, total hours spent, and mean rating.',
        'Status Tabs: Filter your library by All, Watching, Plan to Watch, Completed, Favorites, and Watch History.',
        'One-Click Episode Progress (+1 Ep): Rapidly update your watched episode count.',
        'Resume Playback & Clear History: Visual progress bars with direct resume buttons.'
      ]
    },
    {
      route: 'community',
      name: 'Community, Polls & News Page',
      icon: <Users className="w-5 h-5 text-yellow-400" />,
      tag: 'Interactive Fandom Hub',
      summary: 'Engage with anime fans worldwide through discussions, seasonal voting awards, and production news.',
      features: [
        'Seasonal Award Polls: Vote in polls like "Anime of the Year" with live percentage bars and instant results.',
        'Discussion Boards: Create new threads, upvote topics, filter by category (General, Theory, Episode Breakdown).',
        'Anime News & Industry Articles: Editorial write-ups, animation production deep dives, and studio updates.'
      ]
    },
    {
      route: 'settings',
      name: 'Settings & Theme Customizer',
      icon: <Sliders className="w-5 h-5 text-rose-400" />,
      tag: 'Preferences & Storage',
      summary: 'Customize the streaming experience, Danmaku speed, visual color theme, and local cache.',
      features: [
        '5 Visual Themes: Velnix Violet, Cyberpunk Amber, Emerald Blade, Crimson Blood, and OLED Midnight.',
        'Playback Defaults: Set default resolution, default audio (Sub vs Dub), auto-skip intro, and autoplay next episode.',
        'Danmaku Engine Tuning: Adjust opacity slider and bullet speed from 4s to 14s.',
        'Storage Reset: Clear cache or reset to factory defaults.'
      ]
    }
  ];

  return (
    <div className="animate-fade-in pb-24 space-y-12 max-w-5xl mx-auto">
      
      {/* 1. Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-950/60 via-[#101024] to-cyan-950/40 border border-purple-900/50 shadow-2xl space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-600/30 text-purple-400">
            <Sparkles className="w-6 h-6 text-cyan-400" />
          </div>
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-purple-950 text-purple-300 border border-purple-800 rounded-full">
            Complete Architecture & Page Documentation
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
          Velnix Anime Streaming Platform
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          Welcome to <strong className="text-white">Velnix</strong> — a modern, responsive, full-featured anime streaming platform. Below is an in-depth explanation of every single page, feature, and user workflow built into the application.
        </p>

        <div className="flex items-center gap-3 pt-2 flex-wrap">
          <button
            onClick={() => navigateTo('home')}
            className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Home Stream</span>
          </button>
          <button
            onClick={() => navigateTo('watch', { animeId: 'solo-leveling', episodeId: 1 })}
            className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2"
          >
            <Tv className="w-4 h-4 text-cyan-400" />
            <span>Open Custom Video Player</span>
          </button>
        </div>
      </div>

      {/* 2. Global Architectural Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#101022] border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Full State Persistence</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            All user actions (watchlist updates, resume timestamps, score ratings, theme choices, comments, and votes) are automatically synced and persisted via LocalStorage.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#101022] border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
            <Code className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Global Quick Search (Ctrl+K)</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-[10px]">Ctrl+K</kbd> anywhere on Velnix to bring up the instant search modal with real-time filters and direct watch shortcuts.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#101022] border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Keyboard Navigation (?)</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-[10px]">?</kbd> on your keyboard to reveal all media player and site shortcuts for lightning-fast power user browsing.
          </p>
        </div>
      </div>

      {/* 3. Detailed Page-by-Page Explanation Breakdown */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <Layers className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold font-heading text-white">
            Comprehensive Page-by-Page Breakdown
          </h2>
        </div>

        <div className="space-y-6">
          {pagesGuide.map((pageItem, index) => (
            <div
              key={pageItem.route}
              className="p-6 sm:p-8 rounded-3xl bg-[#101022] border border-slate-800/80 hover:border-purple-500/50 transition-all space-y-4 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-2xl bg-[#14142a] border border-purple-900/40">
                    {pageItem.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-purple-400">0{index + 1}.</span>
                      <h3 className="text-lg sm:text-xl font-bold text-white">{pageItem.name}</h3>
                    </div>
                    <span className="text-xs text-cyan-400 font-semibold">{pageItem.tag}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigateTo(pageItem.route as any, { animeId: 'solo-leveling', episodeId: 1 })}
                  className="px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all self-start sm:self-auto"
                >
                  <span>Open This Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {pageItem.summary}
              </p>

              <div className="bg-[#0b0b16] p-4 rounded-2xl border border-slate-800/60 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Key Features & Enhancements Implemented
                </h4>
                <ul className="space-y-1.5">
                  {pageItem.features.map((feat, fIdx) => (
                    <li key={fIdx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-purple-400 mt-0.5">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Bottom Launch CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border border-purple-500/30 text-center space-y-4 shadow-2xl">
        <h2 className="text-2xl font-bold text-white">Ready to explore Velnix?</h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Start streaming now, build your custom watchlist, cast live Danmaku comments, and enjoy uninterrupted HD anime entertainment.
        </p>
        <button
          onClick={() => navigateTo('home')}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-extrabold text-sm tracking-wide shadow-xl shadow-purple-600/50 transition-all transform hover:scale-105"
        >
          Return to Velnix Home Stream
        </button>
      </div>

    </div>
  );
};
