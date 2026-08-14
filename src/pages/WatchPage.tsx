import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getAnimeById, getEpisodeDetails, VelnixServer, VelnixEpisodeResponse } from '../services/velnixApi';
import Hls from 'hls.js';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Maximize, 
  Minimize, 
  FastForward, 
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
  MoreVertical, 
  Zap, 
  Sparkles, 
  MessageSquare, 
  Send, 
  ArrowLeft,
  Lock,
  Unlock,
  Sliders,
  Volume2,
  Gauge,
  SkipForward,
  Server,
  Layers,
  List
} from 'lucide-react';

export const WatchPage: React.FC = () => {
  const { 
    currentAnime, 
    animes, 
    params, 
    navigateTo, 
    saveWatchingProgress, 
    watchlist, 
    updateWatchlistStatus, 
    removeFromWatchlist, 
    downloadedServers,
    startDownloadEpisode,
    downloadProgress,
    danmakuList,
    addDanmaku,
    settings,
    addToast 
  } = useApp();

  const targetAnimeId = params.animeId || currentAnime?.id || '41467';
  const targetEpisodeNumber = Number(params.episodeId) || 1;

  // State loaded via Velnix Repository/API Pipeline
  const [episodeData, setEpisodeData] = useState<VelnixEpisodeResponse | null>(null);
  const [activeServer, setActiveServer] = useState<VelnixServer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Player state
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1477); // ~24:37
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'episodes' | 'characters' | 'voice_actors' | 'related'>('overview');
  const [autoNext, setAutoNext] = useState(true);
  const [danmakuInput, setDanmakuInput] = useState('');
  const [showDanmakuInput, setShowDanmakuInput] = useState(false);

  // Settings Modal & Dropdowns state (matching screenshot exactly)
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const [selectedServerName, setSelectedServerName] = useState('Auto');
  const [selectedQuality, setSelectedQuality] = useState('1080p');
  const [selectedSubtitles, setSelectedSubtitles] = useState('English');
  const [selectedAudio, setSelectedAudio] = useState<'Japanese' | 'English'>('Japanese');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  // Dropdown open toggles
  const [openDropdown, setOpenDropdown] = useState<'server' | 'quality' | 'subtitles' | 'audio' | 'speed' | null>(null);

  const currentAnimeData = episodeData?.anime;
  const currentEpData = episodeData?.episode;
  const serverList = episodeData?.servers || [];
  const isInLibrary = currentAnimeData ? !!watchlist[currentAnimeData.id] : false;

  // ---------------------------------------------------------------------------
  // PIPELINE STEP 1 & 2: Velnix API -> Anime Metadata -> Episode List -> Servers
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getEpisodeDetails(targetAnimeId, targetEpisodeNumber, downloadedServers)
      .then((res) => {
        if (!isMounted) return;
        setEpisodeData(res);
        if (res.servers && res.servers.length > 0) {
          setActiveServer(res.servers[0]);
          setSelectedServerName(res.servers[0].name.split(' ')[0]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load anime episode:', err);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [targetAnimeId, targetEpisodeNumber, downloadedServers]);

  // ---------------------------------------------------------------------------
  // PIPELINE STEP 3: Video Player -> Stream Playback (playServer)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (activeServer && videoRef.current && activeServer.url) {
      const streamUrl = activeServer.url;

      if (activeServer.type === 'hls' || streamUrl.includes('.m3u8')) {
        if (Hls.isSupported()) {
          if (hlsRef.current) hlsRef.current.destroy();
          const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
          hls.loadSource(streamUrl);
          hls.attachMedia(videoRef.current);
          hlsRef.current = hls;
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
          videoRef.current.src = streamUrl;
        }
      } else {
        videoRef.current.src = streamUrl;
      }

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [activeServer]);

  const playServer = (server: VelnixServer) => {
    setActiveServer(server);
    setSelectedServerName(server.name.split(' ')[0]);
    addToast({
      title: `Switched to ${server.name}`,
      description: `Quality: ${server.quality} • Audio: ${server.language.toUpperCase()}`,
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

  const handleStartDownload = (quality: string) => {
    setShowDownloadModal(false);
    if (currentAnimeData && currentEpData) {
      startDownloadEpisode(currentAnimeData.id, currentEpData.number, quality);
    }
  };

  const handleSendDanmaku = (e: React.FormEvent) => {
    e.preventDefault();
    if (!danmakuInput.trim()) return;
    addDanmaku(danmakuInput.trim(), Math.floor(currentTime));
    setDanmakuInput('');
    setShowDanmakuInput(false);
  };

  const animePoster = currentAnimeData?.poster || 'https://cdn.myanimelist.net/images/anime/1764/126627l.jpg';
  const animeBanner = currentAnimeData?.banner || animePoster;
  const animeTitle = currentAnimeData?.title || 'Bleach: Thousand-Year Blood War';

  const totalEpisodesCount = 24;
  const allEpisodeNumbers = Array.from({ length: totalEpisodesCount }, (_, i) => i + 1);

  return (
    <div className="animate-fade-in pb-36 max-w-7xl mx-auto space-y-5 text-slate-100 font-sans">
      
      {/* =========================================================================
          1. THE VIDEO PLAYER CONTAINER matching Screenshot 1:1
         ========================================================================= */}
      <div
        ref={playerContainerRef}
        className="relative aspect-video w-full rounded-3xl overflow-hidden bg-black shadow-2xl border border-slate-800 select-none group"
      >
        {/* Native HTML5 Video Element */}
        <video
          ref={videoRef}
          src={activeServer?.url}
          poster={currentEpData?.thumbnail || animePoster}
          playsInline
          onTimeUpdate={() => {
            if (videoRef.current && currentAnimeData && currentEpData) {
              setCurrentTime(videoRef.current.currentTime);
              setDuration(videoRef.current.duration || 1477);
              if (Math.floor(videoRef.current.currentTime) % 5 === 0) {
                saveWatchingProgress(currentAnimeData.id, currentEpData.number, videoRef.current.currentTime, videoRef.current.duration || 1477);
              }
            }
          }}
          onEnded={() => {
            if (autoNext && currentAnimeData) {
              const nextEpNum = targetEpisodeNumber + 1;
              if (nextEpNum <= totalEpisodesCount) {
                navigateTo('watch', { animeId: currentAnimeData.id, episodeId: nextEpNum });
                addToast({ title: 'Playing Next Episode', description: `Ep ${nextEpNum}`, type: 'info' });
              }
            }
          }}
          onClick={togglePlay}
          className="w-full h-full object-cover cursor-pointer bg-black"
        />

        {/* Danmaku Floating Comments Layer */}
        {settings.danmakuEnabled && !isLocked && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-25">
            {danmakuList
              .filter(d => Math.abs(d.time - Math.floor(currentTime)) <= 4)
              .map((d) => (
                <div
                  key={d.id}
                  className="absolute whitespace-nowrap font-bold text-sm sm:text-base drop-shadow-md animate-danmaku-fly pointer-events-none"
                  style={{
                    top: `${15 + (d.topRow % 4) * 22}%`,
                    color: d.color || '#ff2e56',
                    right: '-100%'
                  }}
                >
                  {d.text}
                </div>
              ))}
          </div>
        )}

        {/* -----------------------------------------------------------------------
            TOP BAR OVERLAY matching Screenshot (Title, Ep, [CC], Cast, Settings, Fullscreen)
           ----------------------------------------------------------------------- */}
        <div className="absolute top-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-b from-black/85 via-black/40 to-transparent flex items-center justify-between z-30 pointer-events-auto">
          {/* Top Left Title & Subtitle */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigateTo('home')}
              className="p-1 rounded-full text-white hover:text-[#c084fc] transition-colors cursor-pointer"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-white tracking-wide truncate drop-shadow">
                {animeTitle}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-300 truncate">
                S1 E{targetEpisodeNumber} - {currentEpData?.title || 'The Blood Warfare'}
              </p>
            </div>
          </div>

          {/* Top Right Actions: [CC], Cast, Settings Gear (Purple Active Glow), Fullscreen */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setSelectedSubtitles(selectedSubtitles === 'Off' ? 'English' : 'Off')}
              className="px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-bold border border-white/20 hover:border-[#c084fc] transition-colors cursor-pointer"
            >
              CC
            </button>

            <button
              onClick={() => addToast({ title: 'Cast Device', description: 'Searching for Smart TVs and Chromecast...', type: 'info' })}
              className="p-1.5 rounded-lg text-slate-200 hover:text-white transition-colors cursor-pointer"
              title="Cast to TV"
            >
              <Cast className="w-5 h-5" />
            </button>

            <button
              onClick={() => setShowSettingsModal(!showSettingsModal)}
              className={`p-2 rounded-2xl transition-all cursor-pointer shadow-lg ${
                showSettingsModal
                  ? 'bg-purple-900/80 text-purple-300 ring-2 ring-[#c084fc] shadow-purple-600/40'
                  : 'bg-black/60 text-slate-200 hover:text-white border border-white/10'
              }`}
              title="Playback Settings"
            >
              <Settings className="w-5 h-5 text-[#c084fc]" />
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg text-slate-200 hover:text-white transition-colors cursor-pointer"
              title="Fullscreen"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Lock Screen Button on Left Side matching Screenshot */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30">
          <button
            onClick={() => {
              setIsLocked(!isLocked);
              addToast({
                title: !isLocked ? 'Screen Locked 🔒' : 'Screen Unlocked 🔓',
                description: !isLocked ? 'Controls hidden.' : 'Controls restored.',
                type: 'info'
              });
            }}
            className={`p-2.5 rounded-2xl backdrop-blur-md transition-all shadow-xl cursor-pointer ${
              isLocked
                ? 'bg-[#ff2e56] text-white ring-2 ring-[#ff2e56]'
                : 'bg-black/60 text-slate-300 hover:text-white border border-white/10'
            }`}
            title={isLocked ? 'Unlock Screen' : 'Lock Screen'}
          >
            {isLocked ? <Lock className="w-5 h-5 text-white" /> : <Unlock className="w-5 h-5" />}
          </button>
        </div>

        {/* Center Controls matching Screenshot (Rewind 10, Big Center Play/Pause, Forward 10) */}
        {!isLocked && (
          <div className="absolute inset-0 flex items-center justify-center gap-10 pointer-events-none z-20">
            <button
              onClick={() => skipSeconds(-10)}
              className="pointer-events-auto w-11 h-11 rounded-full text-white/90 hover:text-white flex flex-col items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer drop-shadow-lg"
              title="Skip -10s"
            >
              <RotateCcw className="w-6 h-6" />
              <span className="text-[9px] font-black -mt-1">10</span>
            </button>

            <button
              onClick={togglePlay}
              className="pointer-events-auto w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform cursor-pointer"
            >
              {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-0.5" />}
            </button>

            <button
              onClick={() => skipSeconds(10)}
              className="pointer-events-auto w-11 h-11 rounded-full text-white/90 hover:text-white flex flex-col items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer drop-shadow-lg"
              title="Skip +10s"
            >
              <RotateCw className="w-6 h-6" />
              <span className="text-[9px] font-black -mt-1">10</span>
            </button>
          </div>
        )}

        {/* Bottom Timeline Bar matching Screenshot */}
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
                  className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#a855f7] transition-all"
                />
              </div>

              <span className="font-mono text-xs text-slate-300 font-semibold shrink-0">
                {formatTime(duration)}
              </span>

              <button
                onClick={toggleFullscreen}
                className="text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =====================================================================
            FLOATING SETTINGS MODAL matching file_00000000b12c81f48c5157eb94eb45b1.png
           ===================================================================== */}
        {showSettingsModal && (
          <div className="absolute top-14 right-4 w-80 sm:w-96 rounded-3xl bg-[#13111c]/95 backdrop-blur-2xl border border-purple-900/60 shadow-2xl z-40 p-5 space-y-4 animate-slide-up text-xs shadow-purple-950/50">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2 border-b border-purple-950/60">
              <h3 className="font-bold text-base text-white">Settings</h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 divide-y divide-purple-950/40">
              
              {/* Row 1: Server */}
              <div className="pt-2 first:pt-0 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Server className="w-5 h-5 text-[#c084fc] shrink-0" />
                  <div>
                    <h4 className="font-bold text-white text-xs">Server</h4>
                    <p className="text-[11px] text-[#c084fc] font-medium">{activeServer?.name || 'Auto (Best)'}</p>
                  </div>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'server' ? null : 'server')}
                    className="px-3 py-1.5 rounded-xl bg-purple-950/50 border border-purple-900/60 text-slate-200 hover:text-white flex items-center gap-1 font-semibold text-xs cursor-pointer"
                  >
                    <span>{selectedServerName}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-purple-400" />
                  </button>

                  {openDropdown === 'server' && (
                    <div className="absolute right-0 mt-1.5 w-48 rounded-2xl bg-[#191626] border border-purple-800/80 shadow-2xl p-1.5 z-50 space-y-1">
                      {serverList.map((srv) => (
                        <button
                          key={srv.id}
                          onClick={() => {
                            playServer(srv);
                            setOpenDropdown(null);
                          }}
                          className={`w-full px-3 py-1.5 rounded-xl text-left font-bold text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            activeServer?.id === srv.id
                              ? 'bg-[#a855f7] text-white'
                              : 'text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          <span className="truncate">{srv.name}</span>
                          <span className="text-[10px] opacity-80">{srv.quality}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Row 2: Quality */}
              <div className="pt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-5 h-5 rounded border border-[#c084fc] text-[#c084fc] flex items-center justify-center font-bold text-[9px] shrink-0">
                    HD
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Quality</h4>
                    <p className="text-[11px] text-[#c084fc] font-medium">{selectedQuality}</p>
                  </div>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'quality' ? null : 'quality')}
                    className="px-3 py-1.5 rounded-xl bg-purple-950/50 border border-purple-900/60 text-slate-200 hover:text-white flex items-center gap-1 font-semibold text-xs cursor-pointer"
                  >
                    <span>{selectedQuality}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-purple-400" />
                  </button>

                  {openDropdown === 'quality' && (
                    <div className="absolute right-0 mt-1.5 w-36 rounded-2xl bg-[#191626] border border-purple-800/80 shadow-2xl p-1.5 z-50 space-y-1">
                      {['Auto', '1080p', '720p', '480p'].map((q) => (
                        <button
                          key={q}
                          onClick={() => {
                            setSelectedQuality(q);
                            setOpenDropdown(null);
                            addToast({ title: `Quality set to ${q}`, type: 'info' });
                          }}
                          className={`w-full px-3 py-1.5 rounded-xl text-left font-bold text-xs transition-colors cursor-pointer ${
                            selectedQuality === q ? 'bg-[#a855f7] text-white' : 'text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Row 3: Subtitles */}
              <div className="pt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Subtitles className="w-5 h-5 text-[#c084fc] shrink-0" />
                  <div>
                    <h4 className="font-bold text-white text-xs">Subtitles</h4>
                    <p className="text-[11px] text-[#c084fc] font-medium">{selectedSubtitles}</p>
                  </div>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'subtitles' ? null : 'subtitles')}
                    className="px-3 py-1.5 rounded-xl bg-purple-950/50 border border-purple-900/60 text-slate-200 hover:text-white flex items-center gap-1 font-semibold text-xs cursor-pointer"
                  >
                    <span>{selectedSubtitles}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-purple-400" />
                  </button>

                  {openDropdown === 'subtitles' && (
                    <div className="absolute right-0 mt-1.5 w-40 rounded-2xl bg-[#191626] border border-purple-800/80 shadow-2xl p-1.5 z-50 space-y-1">
                      {['English', 'Spanish', 'French', 'German', 'Off'].map((sub) => (
                        <button
                          key={sub}
                          onClick={() => {
                            setSelectedSubtitles(sub);
                            setOpenDropdown(null);
                            addToast({ title: `Subtitles: ${sub}`, type: 'info' });
                          }}
                          className={`w-full px-3 py-1.5 rounded-xl text-left font-bold text-xs transition-colors cursor-pointer ${
                            selectedSubtitles === sub ? 'bg-[#a855f7] text-white' : 'text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Row 4: Audio */}
              <div className="pt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Volume2 className="w-5 h-5 text-[#c084fc] shrink-0" />
                  <div>
                    <h4 className="font-bold text-white text-xs">Audio</h4>
                    <p className="text-[11px] text-[#c084fc] font-medium">
                      {selectedAudio === 'Japanese' ? 'Japanese (Original)' : 'English (Dub)'}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'audio' ? null : 'audio')}
                    className="px-3 py-1.5 rounded-xl bg-purple-950/50 border border-purple-900/60 text-slate-200 hover:text-white flex items-center gap-1 font-semibold text-xs cursor-pointer"
                  >
                    <span>{selectedAudio}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-purple-400" />
                  </button>

                  {openDropdown === 'audio' && (
                    <div className="absolute right-0 mt-1.5 w-44 rounded-2xl bg-[#191626] border border-purple-800/80 shadow-2xl p-1.5 z-50 space-y-1">
                      {[
                        { label: 'Japanese (Original)', val: 'Japanese' },
                        { label: 'English (Dub)', val: 'English' }
                      ].map((aud) => (
                        <button
                          key={aud.val}
                          onClick={() => {
                            setSelectedAudio(aud.val as any);
                            setOpenDropdown(null);
                            addToast({ title: `Audio: ${aud.label}`, type: 'info' });
                          }}
                          className={`w-full px-3 py-1.5 rounded-xl text-left font-bold text-xs transition-colors cursor-pointer ${
                            selectedAudio === aud.val ? 'bg-[#a855f7] text-white' : 'text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          {aud.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Row 5: Playback Speed */}
              <div className="pt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Gauge className="w-5 h-5 text-[#c084fc] shrink-0" />
                  <div>
                    <h4 className="font-bold text-white text-xs">Playback Speed</h4>
                    <p className="text-[11px] text-[#c084fc] font-medium">
                      {playbackSpeed === 1 ? 'Normal' : `${playbackSpeed}x`}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'speed' ? null : 'speed')}
                    className="px-3 py-1.5 rounded-xl bg-purple-950/50 border border-purple-900/60 text-slate-200 hover:text-white flex items-center gap-1 font-semibold text-xs cursor-pointer"
                  >
                    <span>{playbackSpeed}x</span>
                    <ChevronDown className="w-3.5 h-3.5 text-purple-400" />
                  </button>

                  {openDropdown === 'speed' && (
                    <div className="absolute right-0 mt-1.5 w-32 rounded-2xl bg-[#191626] border border-purple-800/80 shadow-2xl p-1.5 z-50 space-y-1">
                      {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            setPlaybackSpeed(s);
                            if (videoRef.current) videoRef.current.playbackRate = s;
                            setOpenDropdown(null);
                            addToast({ title: `Speed: ${s}x`, type: 'info' });
                          }}
                          className={`w-full px-3 py-1.5 rounded-xl text-left font-bold text-xs transition-colors cursor-pointer ${
                            playbackSpeed === s ? 'bg-[#a855f7] text-white' : 'text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          {s}x {s === 1 ? '(Normal)' : ''}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Row 6: Auto Next Episode Switch */}
              <div className="pt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <SkipForward className="w-5 h-5 text-[#c084fc] shrink-0" />
                  <div>
                    <h4 className="font-bold text-white text-xs">Auto Next Episode</h4>
                    <p className="text-[11px] text-[#c084fc] font-medium">{autoNext ? 'On' : 'Off'}</p>
                  </div>
                </div>

                {/* Glowing Purple Toggle Switch */}
                <button
                  type="button"
                  onClick={() => setAutoNext(!autoNext)}
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer p-0.5 ${
                    autoNext ? 'bg-[#c084fc]' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
                      autoNext ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* =========================================================================
          2. BOTTOM ACTION BAR matching Screenshot:
             [📋 Episodes]  [⏭ Next Episode]  [(+) Add to List]  [🔗 Share]
         ========================================================================= */}
      <div className="flex items-center justify-around p-3.5 rounded-2xl bg-[#0c0a18] border border-slate-800/90 text-xs text-slate-300 font-semibold shadow-xl">
        <button
          onClick={() => {
            const epElem = document.getElementById('episodes-section');
            epElem?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-2 hover:text-[#c084fc] transition-colors cursor-pointer"
        >
          <List className="w-4 h-4 text-[#c084fc]" />
          <span>Episodes</span>
        </button>

        <span className="h-4 w-px bg-slate-800" />

        <button
          onClick={() => {
            if (currentAnimeData) {
              const nextEp = targetEpisodeNumber + 1;
              if (nextEp <= totalEpisodesCount) {
                navigateTo('watch', { animeId: currentAnimeData.id, episodeId: nextEp });
              }
            }
          }}
          className="flex items-center gap-2 hover:text-[#c084fc] transition-colors cursor-pointer"
        >
          <SkipForward className="w-4 h-4 text-[#c084fc]" />
          <span>Next Episode</span>
        </button>

        <span className="h-4 w-px bg-slate-800" />

        <button
          onClick={() => {
            if (currentAnimeData) {
              if (isInLibrary) removeFromWatchlist(currentAnimeData.id);
              else updateWatchlistStatus(currentAnimeData.id, 'watching');
            }
          }}
          className="flex items-center gap-2 hover:text-[#c084fc] transition-colors cursor-pointer"
        >
          {isInLibrary ? <Check className="w-4 h-4 text-emerald-400" /> : <Plus className="w-4 h-4 text-[#c084fc]" />}
          <span>{isInLibrary ? 'In List' : 'Add to List'}</span>
        </button>

        <span className="h-4 w-px bg-slate-800" />

        <button
          onClick={() => {
            navigator.clipboard?.writeText(window.location.href);
            addToast({ title: 'Link Copied! 🔗', description: 'Shared stream link.', type: 'info' });
          }}
          className="flex items-center gap-2 hover:text-[#c084fc] transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-[#c084fc]" />
          <span>Share</span>
        </button>
      </div>

      {/* =========================================================================
          3. ACTIVE SERVER BAR
         ========================================================================= */}
      <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-[#0b0b16] border border-slate-800 text-xs flex-wrap gap-2 shadow-md">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#c084fc]" />
          <span className="text-slate-300 font-semibold">Active Server:</span>
          <span className="font-bold text-white bg-[#161628] px-3 py-1 rounded-xl border border-slate-700">
            {activeServer?.name || 'Auto (Best)'}
          </span>
          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
            ({activeServer?.quality || '1080p'})
          </span>
        </div>

        <button
          onClick={() => setShowSettingsModal(true)}
          className="text-[#c084fc] hover:text-purple-300 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>Switch Server ⚙️</span>
        </button>
      </div>

      {/* =========================================================================
          4. SEASON & EPISODES SELECTOR
         ========================================================================= */}
      <div id="episodes-section" className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm font-bold text-white cursor-pointer">
            <span>Season 1</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
          <span className="text-xs text-slate-400">{totalEpisodesCount} Episodes</span>
        </div>

        {/* Horizontal Episode Thumbnails Carousel */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {allEpisodeNumbers.map((epNum) => {
            const isActive = epNum === targetEpisodeNumber;
            return (
              <div
                key={epNum}
                onClick={() => {
                  if (currentAnimeData) {
                    navigateTo('watch', { animeId: currentAnimeData.id, episodeId: epNum });
                  }
                }}
                className={`w-40 sm:w-44 shrink-0 p-2 rounded-2xl cursor-pointer transition-all border shadow-md ${
                  isActive
                    ? 'bg-[#18162c] border-[#a855f7] ring-1 ring-[#a855f7]'
                    : 'bg-[#10101f] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 mb-1.5">
                  <img src={animePoster} alt={`Ep ${epNum}`} className="w-full h-full object-cover" />
                  {isActive && (
                    <div className="absolute inset-0 bg-[#a855f7]/40 flex items-center justify-center">
                      <Play className="w-4 h-4 fill-white" />
                    </div>
                  )}
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-black/80 text-[9px] text-slate-300 font-mono">
                    24:10
                  </span>
                </div>

                <div className="text-xs">
                  <span className="font-bold text-white block truncate">{epNum}. {epNum === 1 ? 'The Blood Warfare' : epNum === 2 ? 'Foundation Stones' : `Episode ${epNum}`}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          5. DETAILS & ABOUT / CHARACTERS TABS
         ========================================================================= */}
      <div className="flex items-center gap-6 border-b border-slate-800 text-xs sm:text-sm font-semibold overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'episodes', label: 'Episodes' },
          { id: 'characters', label: 'Characters' },
          { id: 'voice_actors', label: 'Voice Actors' },
          { id: 'related', label: 'Related' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 transition-all relative cursor-pointer ${
                isActive ? 'text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#a855f7] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      <div className="p-6 rounded-3xl bg-[#0f0f1e] border border-slate-800/80 space-y-5 shadow-xl">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-sm text-white mb-2">About & Synopsis</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentAnimeData?.synopsis || 'Substitute Soul Reaper Ichigo Kurosaki faces the sudden invasion of the Wandenreich in high-definition streaming.'}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 text-xs border-t border-slate-800 pt-4">
              <div><span className="text-slate-400">Studio</span>: <strong className="text-white">Studio Pierrot</strong></div>
              <div><span className="text-slate-400">Source</span>: <strong className="text-white">Manga</strong></div>
              <div><span className="text-slate-400">Genres</span>: <strong className="text-white">Action, Supernatural</strong></div>
              <div><span className="text-slate-400">Duration</span>: <strong className="text-white">24m per ep</strong></div>
              <div><span className="text-slate-400">Rating</span>: <strong className="text-[#a855f7]">★ {currentAnimeData?.score || 8.8}</strong></div>
              <div><span className="text-slate-400">Status</span>: <strong className="text-emerald-400">Completed</strong></div>
            </div>
          </div>
        )}

        {activeTab === 'characters' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: 'Ichigo Kurosaki', photo: 'https://cdn.myanimelist.net/images/characters/3/548235.jpg' },
              { name: 'Rukia Kuchiki', photo: 'https://cdn.myanimelist.net/images/characters/2/548236.jpg' },
              { name: 'Uryu Ishida', photo: 'https://cdn.myanimelist.net/images/characters/11/496225.jpg' },
              { name: 'Yasutora Sado', photo: 'https://cdn.myanimelist.net/images/characters/10/72793.jpg' }
            ].map((char) => (
              <div key={char.name} className="flex items-center gap-2 p-2 rounded-xl bg-[#141426] border border-slate-800">
                <img src={char.photo} alt={char.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                <span className="text-[11px] font-semibold text-white truncate">{char.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CLOUDSTREAM DOWNLOAD EPISODE MODAL */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/80 animate-fade-in">
          <div className="fixed inset-0" onClick={() => setShowDownloadModal(false)} />
          <div className="relative w-full max-w-sm bg-[#111124] border border-[#a855f7]/60 rounded-3xl p-5 shadow-2xl z-10 animate-slide-up space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-[#a855f7]" />
                <span>Download Episode {targetEpisodeNumber}</span>
              </h3>
              <button onClick={() => setShowDownloadModal(false)} className="text-slate-400 hover:text-white cursor-pointer">✕</button>
            </div>

            <p className="text-xs text-slate-300">
              Select download quality for offline playback in your Downloads Library:
            </p>

            <div className="space-y-2">
              {[
                { quality: '480p SD', size: '95 MB', desc: 'Smaller file (Fastest)' },
                { quality: '720p HD', size: '190 MB', desc: 'Balanced storage' },
                { quality: '1080p Ultra HD', size: '380 MB', desc: 'Crisp high-definition' }
              ].map((opt) => (
                <button
                  key={opt.quality}
                  onClick={() => handleStartDownload(opt.quality.split(' ')[0])}
                  className="w-full p-3 rounded-2xl bg-slate-900 hover:bg-[#a855f7]/20 border border-slate-800 hover:border-[#a855f7] flex items-center justify-between text-xs transition-colors text-left group cursor-pointer"
                >
                  <div>
                    <h4 className="font-bold text-white group-hover:text-[#a855f7]">{opt.quality}</h4>
                    <p className="text-[10px] text-slate-400">{opt.desc}</p>
                  </div>
                  <span className="font-mono text-[#a855f7] font-bold text-[11px]">{opt.size}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
