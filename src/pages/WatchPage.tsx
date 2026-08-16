import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  resolveVelnixOneForAll, 
  ProviderServerDetail, 
  VelnixAggregatedEpisode,
  getProviderHealthStatus
} from '../services/velnixBackend';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Maximize, 
  Minimize, 
  Settings, 
  Subtitles, 
  Share2, 
  Plus, 
  Check, 
  Cast, 
  X, 
  ChevronDown, 
  Tv, 
  Download, 
  Zap, 
  Sparkles, 
  ArrowLeft,
  Lock,
  Unlock,
  Volume2,
  VolumeX,
  Gauge,
  SkipForward,
  Server,
  Layers,
  List,
  Activity,
  CheckCircle2,
  Radio
} from 'lucide-react';

export const WatchPage: React.FC = () => {
  const { 
    currentAnime, 
    params, 
    navigateTo, 
    watchlist, 
    updateWatchlistStatus, 
    removeFromWatchlist, 
    danmakuList,
    addDanmaku,
    settings,
    addToast 
  } = useApp();

  const targetAnimeId = params.animeId || currentAnime?.id || 'bleach-tybw';
  const targetEpisodeNumber = Number(params.episodeId) || 1;

  // Velnix One-For-All Aggregated Data
  const [data, setData] = useState<VelnixAggregatedEpisode | null>(null);
  const [activeProvider, setActiveProvider] = useState<ProviderServerDetail | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'sub' | 'dub'>('sub');
  const [selectedQuality, setSelectedQuality] = useState<string>('1080p');
  const [isLoading, setIsLoading] = useState(true);

  // Player state
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1455);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [autoNext, setAutoNext] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showProviderMatrix, setShowProviderMatrix] = useState(false);
  const [activeTab, setActiveTab] = useState<'servers' | 'episodes' | 'details'>('servers');

  // Load from Velnix One-For-All Backend
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    resolveVelnixOneForAll(targetAnimeId, targetEpisodeNumber, selectedLanguage)
      .then((res) => {
        if (!isMounted) return;
        setData(res);
        if (res.availableProviders.length > 0) {
          setActiveProvider(res.availableProviders[0]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to resolve from Velnix One-For-All backend:', err);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [targetAnimeId, targetEpisodeNumber, selectedLanguage]);

  // Handle stream source update
  useEffect(() => {
    if (activeProvider && videoRef.current) {
      videoRef.current.src = activeProvider.streamUrl;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [activeProvider]);

  const handleSwitchProvider = (provider: ProviderServerDetail) => {
    setActiveProvider(provider);
    addToast({
      title: `Switched to ${provider.providerName}`,
      description: `${provider.serverName} • Latency: ${provider.pingMs}ms (${provider.quality})`,
      type: 'success'
    });
  };

  const togglePlay = () => {
    if (!videoRef.current || isLocked) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLocked) return;
    const val = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const skipSeconds = (sec: number) => {
    if (isLocked) return;
    if (videoRef.current) {
      videoRef.current.currentTime += sec;
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const isInLibrary = data?.animeId ? !!watchlist[data.animeId] : false;
  const totalEps = data?.totalEpisodes || 24;
  const episodeList = Array.from({ length: totalEps }, (_, i) => i + 1);

  return (
    <div className="animate-fade-in pb-32 max-w-7xl mx-auto space-y-4 text-slate-100 font-sans">
      
      {/* 1. TOP BREADCRUMB & BACK BUTTON */}
      <div className="flex items-center justify-between px-1">
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#121220] border border-slate-800 text-slate-200 hover:text-white hover:border-[#ff2e56] transition-all text-xs font-bold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#ff2e56]" />
          <span>Back to Home</span>
        </button>

        {/* Server Engine Live Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/50 text-emerald-400 text-[11px] font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>One-For-All Server Engine Active</span>
          </span>
        </div>
      </div>

      {/* =========================================================================
          2. THE VELNIX PLAYER
         ========================================================================= */}
      <div
        ref={playerContainerRef}
        className="relative aspect-video w-full rounded-3xl overflow-hidden bg-black shadow-2xl border border-slate-800 select-none group"
      >
        <video
          ref={videoRef}
          src={activeProvider?.streamUrl}
          poster={data?.episodeThumbnail || data?.animePoster}
          playsInline
          onTimeUpdate={() => {
            if (videoRef.current) {
              setCurrentTime(videoRef.current.currentTime);
              setDuration(videoRef.current.duration || 1455);
            }
          }}
          onEnded={() => {
            if (autoNext && data) {
              const nextEp = targetEpisodeNumber + 1;
              if (nextEp <= totalEps) {
                navigateTo('watch', { animeId: data.animeId, episodeId: nextEp });
                addToast({ title: 'Playing Next Episode', description: `Ep ${nextEp}`, type: 'info' });
              }
            }
          }}
          onClick={togglePlay}
          className="w-full h-full object-cover cursor-pointer bg-black"
        />

        {/* Top Overlay Bar */}
        <div className="absolute top-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-b from-black/90 via-black/50 to-transparent flex items-center justify-between z-30 pointer-events-auto">
          <div className="flex items-center gap-3 min-w-0">
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-bold text-white tracking-wide truncate drop-shadow">
                {data?.animeTitle || 'BLEACH: Thousand-Year Blood War'}
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-300 truncate">
                Episode {targetEpisodeNumber}: {data?.episodeTitle || 'The Blood Warfare'} • <span className="text-[#ff2e56] font-bold">{activeProvider?.providerName || 'AnimePahe'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* Audio Toggle (Sub vs Dub) */}
            <button
              onClick={() => {
                const nextLang = selectedLanguage === 'sub' ? 'dub' : 'sub';
                setSelectedLanguage(nextLang);
                addToast({ title: `Audio: ${nextLang.toUpperCase()}`, type: 'info' });
              }}
              className="px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 hover:border-[#ff2e56] text-white text-xs font-extrabold uppercase transition-colors cursor-pointer"
            >
              {selectedLanguage}
            </button>

            {/* Quality Pill */}
            <span className="px-2 py-1 rounded-xl bg-[#ff2e56] text-white text-[10px] font-black uppercase shadow-md">
              {activeProvider?.quality || '1080p'}
            </span>

            {/* Settings Gear */}
            <button
              onClick={() => setShowSettingsModal(!showSettingsModal)}
              className="p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer"
              title="Playback Settings"
            >
              <Settings className="w-4 h-4 text-[#ff2e56]" />
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer"
              title="Fullscreen"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Center Controls (Rewind 10s, Big Center Play, Forward 10s) */}
        {!isLocked && (
          <div className="absolute inset-0 flex items-center justify-center gap-10 pointer-events-none z-20">
            <button
              onClick={() => skipSeconds(-10)}
              className="pointer-events-auto w-11 h-11 rounded-full text-white/90 hover:text-white flex flex-col items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer drop-shadow-lg"
              title="Rewind 10s"
            >
              <RotateCcw className="w-6 h-6" />
              <span className="text-[9px] font-black -mt-1">10</span>
            </button>

            <button
              onClick={togglePlay}
              className="pointer-events-auto w-14 h-14 rounded-full bg-[#ff2e56] hover:bg-[#ff4b72] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform cursor-pointer"
            >
              {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-0.5" />}
            </button>

            <button
              onClick={() => skipSeconds(10)}
              className="pointer-events-auto w-11 h-11 rounded-full text-white/90 hover:text-white flex flex-col items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer drop-shadow-lg"
              title="Forward 10s"
            >
              <RotateCw className="w-6 h-6" />
              <span className="text-[9px] font-black -mt-1">10</span>
            </button>
          </div>
        )}

        {/* Bottom Timeline & Controls Bar */}
        {!isLocked && (
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-t from-black/95 via-black/70 to-transparent z-20 space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-slate-300 font-semibold shrink-0">
                {formatTime(currentTime)}
              </span>

              <div className="relative flex-1 flex items-center">
                <input
                  type="range"
                  min={0}
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#ff2e56] transition-all"
                />
              </div>

              <span className="font-mono text-xs text-slate-300 font-semibold shrink-0">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        )}

        {/* Floating Settings Modal */}
        {showSettingsModal && (
          <div className="absolute top-14 right-4 w-72 sm:w-80 rounded-3xl bg-[#111122]/95 backdrop-blur-2xl border border-slate-700 shadow-2xl z-40 p-4 space-y-3.5 animate-slide-up text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                <Settings className="w-4 h-4 text-[#ff2e56]" />
                <span>Player Settings</span>
              </h3>
              <button onClick={() => setShowSettingsModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Playback Speed */}
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-medium">Playback Speed</span>
                <div className="flex items-center gap-1">
                  {[0.75, 1.0, 1.25, 1.5, 2.0].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setPlaybackSpeed(s);
                        if (videoRef.current) videoRef.current.playbackRate = s;
                      }}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                        playbackSpeed === s ? 'bg-[#ff2e56] text-white' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Auto Next Episode */}
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-medium">Auto Play Next Episode</span>
                <button
                  type="button"
                  onClick={() => setAutoNext(!autoNext)}
                  className={`w-10 h-5 rounded-full transition-colors cursor-pointer p-0.5 ${
                    autoNext ? 'bg-[#ff2e56]' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                      autoNext ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* =========================================================================
          3. LIVE PROVIDER AGGREGATION SELECTOR (ONE FOR ALL SERVER BAR)
          Shows: AnimePahe, Pewe, AnimeKai, HiAnime, GogoAnime, Velnix Ultra
         ========================================================================= */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-[#ff2e56]" />
            <h2 className="text-xs sm:text-sm font-bold text-white">
              Aggregated Stream Servers (One-For-All Engine):
            </h2>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Active: <strong className="text-[#ff2e56]">{activeProvider?.providerName}</strong> ({activeProvider?.pingMs}ms)
          </span>
        </div>

        {/* Server Switcher Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {data?.availableProviders.map((prov) => {
            const isActive = activeProvider?.providerId === prov.providerId;
            return (
              <button
                key={prov.providerId}
                onClick={() => handleSwitchProvider(prov)}
                className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between shadow-md ${
                  isActive
                    ? 'bg-[#ff2e56]/20 border-[#ff2e56] ring-1 ring-[#ff2e56]'
                    : 'bg-[#10101f] border-slate-800 hover:border-slate-700 hover:bg-[#151528]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-white truncate">{prov.providerName}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-mono">{prov.quality}</span>
                  <span className="text-emerald-400 font-mono font-bold">{prov.pingMs}ms</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          4. ACTION BAR (Episodes, Next Ep, Add to List, Share)
         ========================================================================= */}
      <div className="flex items-center justify-around p-3.5 rounded-2xl bg-[#0c0a18] border border-slate-800 text-xs text-slate-300 font-semibold shadow-xl">
        <button
          onClick={() => {
            const epElem = document.getElementById('episodes-section');
            epElem?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-2 hover:text-[#ff2e56] transition-colors cursor-pointer"
        >
          <List className="w-4 h-4 text-[#ff2e56]" />
          <span>Episodes ({totalEps})</span>
        </button>

        <span className="h-4 w-px bg-slate-800" />

        <button
          onClick={() => {
            if (data) {
              const nextEp = targetEpisodeNumber + 1;
              if (nextEp <= totalEps) {
                navigateTo('watch', { animeId: data.animeId, episodeId: nextEp });
              }
            }
          }}
          className="flex items-center gap-2 hover:text-[#ff2e56] transition-colors cursor-pointer"
        >
          <SkipForward className="w-4 h-4 text-[#ff2e56]" />
          <span>Next Episode</span>
        </button>

        <span className="h-4 w-px bg-slate-800" />

        <button
          onClick={() => {
            if (data) {
              if (isInLibrary) removeFromWatchlist(data.animeId);
              else updateWatchlistStatus(data.animeId, 'watching');
            }
          }}
          className="flex items-center gap-2 hover:text-[#ff2e56] transition-colors cursor-pointer"
        >
          {isInLibrary ? <Check className="w-4 h-4 text-emerald-400" /> : <Plus className="w-4 h-4 text-[#ff2e56]" />}
          <span>{isInLibrary ? 'In List' : 'Add to List'}</span>
        </button>

        <span className="h-4 w-px bg-slate-800" />

        <button
          onClick={() => {
            navigator.clipboard?.writeText(window.location.href);
            addToast({ title: 'Stream Link Copied! 🔗', type: 'info' });
          }}
          className="flex items-center gap-2 hover:text-[#ff2e56] transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-[#ff2e56]" />
          <span>Share</span>
        </button>
      </div>

      {/* =========================================================================
          5. EPISODES CAROUSEL SELECTOR
         ========================================================================= */}
      <div id="episodes-section" className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>Season 1 Episodes</span>
            <span className="text-xs text-slate-400">({totalEps} Total)</span>
          </h3>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {episodeList.map((epNum) => {
            const isActive = epNum === targetEpisodeNumber;
            return (
              <div
                key={epNum}
                onClick={() => {
                  if (data) {
                    navigateTo('watch', { animeId: data.animeId, episodeId: epNum });
                  }
                }}
                className={`w-36 sm:w-44 shrink-0 p-2 rounded-2xl cursor-pointer transition-all border shadow-md ${
                  isActive
                    ? 'bg-[#1e1020] border-[#ff2e56] ring-1 ring-[#ff2e56]'
                    : 'bg-[#10101f] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 mb-1.5">
                  <img src={data?.episodeThumbnail || data?.animePoster} alt={`Ep ${epNum}`} className="w-full h-full object-cover" />
                  {isActive && (
                    <div className="absolute inset-0 bg-[#ff2e56]/40 flex items-center justify-center">
                      <Play className="w-5 h-5 fill-white" />
                    </div>
                  )}
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-black/80 text-[9px] text-slate-300 font-mono">
                    24:15
                  </span>
                </div>

                <div className="text-xs">
                  <span className="font-bold text-white block truncate">Ep {epNum}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          6. ANIME SYNOPSIS & SERVER ENGINE STATS
         ========================================================================= */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0e0e1a] border border-slate-800/80 space-y-4 shadow-xl">
        <div className="space-y-2">
          <h3 className="font-bold text-sm text-white">About & Synopsis</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {data?.synopsis || 'High-definition streaming powered by the Velnix One-For-All backend aggregator.'}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-800">
          {data?.genres.map((g) => (
            <span key={g} className="px-2.5 py-1 rounded-xl bg-[#141424] border border-slate-700/60 text-[11px] font-semibold text-slate-300">
              {g}
            </span>
          ))}
          <span className="px-2.5 py-1 rounded-xl bg-pink-950/40 border border-[#ff2e56]/40 text-[11px] font-bold text-[#ff2e56]">
            ★ {data?.score || 9.1} Rating
          </span>
        </div>
      </div>

    </div>
  );
};
