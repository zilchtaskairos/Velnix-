import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Scissors, 
  Upload, 
  Play, 
  Pause, 
  Plus, 
  Music, 
  Sparkles, 
  Type, 
  Sliders, 
  Volume2, 
  VolumeX, 
  Layers, 
  Film, 
  Flame, 
  Share2, 
  Download, 
  Trash2, 
  RotateCcw, 
  Zap, 
  Check, 
  Camera, 
  Mic, 
  Smile, 
  Maximize2,
  Minimize2,
  FastForward,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

const SAMPLE_ANIME_CLIPS = [
  {
    id: 'clip-bleach',
    title: 'Bleach: Ichigo Bankai Sakuga',
    animeTitle: 'Bleach: Thousand-Year Blood War',
    duration: 15,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnail: 'https://cdn.myanimelist.net/images/anime/1764/126627l.jpg'
  },
  {
    id: 'clip-jjk',
    title: 'Jujutsu Kaisen: Shibuya Hollow Purple',
    animeTitle: 'Jujutsu Kaisen Season 2',
    duration: 12,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg'
  },
  {
    id: 'clip-solo',
    title: 'Solo Leveling: Arise Shadow Monarch',
    animeTitle: 'Solo Leveling',
    duration: 14,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://cdn.myanimelist.net/images/anime/1816/141049l.jpg'
  },
  {
    id: 'clip-ds',
    title: 'Demon Slayer: Sun Breathing Hinokami',
    animeTitle: 'Demon Slayer: Kimetsu no Yaiba',
    duration: 16,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg'
  }
];

const TRENDING_AUDIO_TRACKS = [
  { id: 'aud-1', title: 'SPECIALZ (Phonk Remix)', artist: 'King Gnu • JJK Shibuya', duration: '0:30', url: 'https://actions.google.com/sounds/v1/sports/skateboard_ollie.ogg' },
  { id: 'aud-2', title: 'Sawano Epic Drop (Vocal Synth)', artist: 'Hiroyuki Sawano', duration: '0:25', url: 'https://actions.google.com/sounds/v1/sports/skateboard_ollie.ogg' },
  { id: 'aud-3', title: 'Hollow Purple Bass Boost', artist: 'Satoru Gojo Theme', duration: '0:20', url: 'https://actions.google.com/sounds/v1/sports/skateboard_ollie.ogg' },
  { id: 'aud-4', title: 'Gurenge Lofi Chill Beats', artist: 'LiSA • Demon Slayer', duration: '0:35', url: 'https://actions.google.com/sounds/v1/sports/skateboard_ollie.ogg' },
  { id: 'aud-5', title: 'Shadow Monarch Awakening Phonk', artist: 'Solo Leveling OST', duration: '0:28', url: 'https://actions.google.com/sounds/v1/sports/skateboard_ollie.ogg' }
];

const ANIME_SFX = [
  { name: 'Katana Slash ⚔️', icon: '⚔️' },
  { name: 'Thunder Clap ⚡', icon: '⚡' },
  { name: 'Teleport Whoosh 🌀', icon: '🌀' },
  { name: 'Bass Drop Boom 💥', icon: '💥' },
  { name: 'Energy Charge 🔮', icon: '🔮' }
];

const SAKUGA_FILTERS = [
  { id: 'normal', name: 'Normal', css: '' },
  { id: 'cyberpunk', name: 'Cyberpunk Neon', css: 'contrast-125 saturate-150 hue-rotate-15' },
  { id: 'bleach-bleed', name: 'Crimson Bleed', css: 'contrast-150 saturate-200 sepia-[0.3]' },
  { id: 'retro-90s', name: '90s Retro Anime', css: 'contrast-110 saturate-125 brightness-95' },
  { id: 'sakuga-glow', name: 'Sakuga Flash', css: 'brightness-110 contrast-130 saturate-140' },
  { id: 'noir', name: 'Manga Monochrome', css: 'grayscale contrast-200 brightness-90' }
];

const TEXT_STYLES = [
  { id: 'anime-impact', name: 'Anime Impact', fontClass: 'font-black uppercase tracking-widest text-[#ff2e56] drop-shadow-[0_4px_12px_rgba(255,46,86,0.8)]' },
  { id: 'neon-glow', name: 'Neon Glow', fontClass: 'font-extrabold text-cyan-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.9)]' },
  { id: 'japanese-kanji', name: 'Kanji Subtitle', fontClass: 'font-bold text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]' },
  { id: 'glitch-white', name: 'Glitch White', fontClass: 'font-extrabold text-white tracking-wider drop-shadow-[0_4px_10px_rgba(0,0,0,1)]' }
];

export const StudioPage: React.FC = () => {
  const { uploadPulseClip, currentUser, navigateTo, addToast } = useApp();

  // Active Video Track State
  const [selectedClip, setSelectedClip] = useState(SAMPLE_ANIME_CLIPS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(selectedClip.duration);
  const [clipSpeed, setClipSpeed] = useState<number>(1.0);
  const [selectedFilter, setSelectedFilter] = useState(SAKUGA_FILTERS[0]);

  // Audio / Sound Track State
  const [selectedAudio, setSelectedAudio] = useState(TRENDING_AUDIO_TRACKS[0]);
  const [audioVolume, setAudioVolume] = useState<number>(80);
  const [isMuted, setIsMuted] = useState(false);

  // Text / Caption Overlays on Video Canvas
  const [overlayText, setOverlayText] = useState('THE FINAL WAR. THE FINAL TRUTH.');
  const [selectedTextStyle, setSelectedTextStyle] = useState(TEXT_STYLES[0]);
  const [textPosition, setTextPosition] = useState<'top' | 'center' | 'bottom'>('bottom');
  const [showSpeedLines, setShowSpeedLines] = useState(true);

  // Editing Tool Tabs: 'clips' | 'audio' | 'text' | 'filters' | 'speed' | 'sfx'
  const [activeTool, setActiveTool] = useState<'clips' | 'audio' | 'text' | 'filters' | 'speed' | 'sfx'>('clips');

  // Export / Publish State
  const [isPublishing, setIsPublishing] = useState(false);
  const [postCaption, setPostCaption] = useState('Bleach TYBW Bankai Sakuga Edit 🔥 #bleach #ichigo #anime #velnix');

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = clipSpeed;
    }
  }, [clipSpeed, selectedClip]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const customUrl = URL.createObjectURL(file);
      const newCustomClip = {
        id: 'clip-custom-' + Date.now(),
        title: file.name.replace(/\.[^/.]+$/, ''),
        animeTitle: 'Custom Import',
        duration: 15,
        videoUrl: customUrl,
        thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80'
      };
      setSelectedClip(newCustomClip);
      addToast({ title: 'Anime Video Imported! 🎬', description: file.name, type: 'success' });
    }
  };

  const handlePublishToPulse = () => {
    setIsPublishing(true);
    addToast({ title: 'Rendering Video Short... ⚡', description: 'Applying effects, speed curves & music.', type: 'info' });

    setTimeout(() => {
      uploadPulseClip({
        animeTitle: selectedClip.animeTitle,
        creatorName: currentUser.username,
        creatorAvatar: currentUser.avatar,
        creatorHandle: currentUser.handle,
        isVerified: true,
        isVipCreator: true,
        videoUrl: selectedClip.videoUrl,
        posterUrl: selectedClip.thumbnail,
        caption: `${postCaption} • [Music: ${selectedAudio.title}]`,
        tags: ['anime', 'sakuga', 'edit', 'velnix', 'amv'],
        songTitle: selectedAudio.title,
        songArtist: selectedAudio.artist,
        isLiked: false
      });

      setIsPublishing(false);
      addToast({
        title: '🎉 Published to Velnix Pulse!',
        description: 'Your anime edit is live for the community to watch and like!',
        type: 'success'
      });
      navigateTo('pulse');
    }, 1500);
  };

  return (
    <div className="animate-fade-in pb-36 max-w-4xl mx-auto space-y-5 text-slate-100 font-sans">
      
      {/* 1. STUDIO HEADER */}
      <div className="flex items-center justify-between p-4 rounded-3xl bg-[#0d0d18] border border-slate-800/80 shadow-xl flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ff2e56] to-pink-600 flex items-center justify-center text-white shadow-lg shadow-pink-600/40">
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black font-heading text-white flex items-center gap-2">
              <span>Anime Creator Studio</span>
              <span className="px-2 py-0.5 rounded-full bg-[#ff2e56]/20 border border-[#ff2e56]/40 text-[#ff2e56] text-[10px] font-bold uppercase">
                PRO EDITOR
              </span>
            </h1>
            <p className="text-xs text-slate-400">Edit, add music, sakuga filters, and publish anime shorts.</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleCustomFileUpload}
            accept="video/*"
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-2 rounded-2xl bg-[#181828] hover:bg-[#222234] border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4 text-[#ff2e56]" />
            <span>Import Video</span>
          </button>

          <button
            type="button"
            disabled={isPublishing}
            onClick={handlePublishToPulse}
            className="px-5 py-2 rounded-2xl bg-gradient-to-r from-[#ff2e56] to-pink-600 hover:from-[#ff4b72] hover:to-pink-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-pink-600/40 transition-transform active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <Share2 className="w-4 h-4" />
            <span>{isPublishing ? 'Rendering...' : 'Publish Short'}</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN TIKTOK EDITOR WORKSPACE (9:16 Preview Canvas + Multi-Track Timeline) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 5 cols: 9:16 Vertical Video Preview Screen */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] rounded-3xl overflow-hidden bg-black shadow-2xl border-2 border-slate-800 relative group select-none">
            
            {/* Active Video Element with Filter Applied */}
            <video
              ref={videoRef}
              src={selectedClip.videoUrl}
              poster={selectedClip.thumbnail}
              loop
              playsInline
              onTimeUpdate={() => {
                if (videoRef.current) {
                  setCurrentTime(videoRef.current.currentTime);
                  setDuration(videoRef.current.duration || selectedClip.duration);
                }
              }}
              onClick={togglePlay}
              className={`w-full h-full object-cover cursor-pointer transition-all duration-300 ${selectedFilter.css}`}
            />

            {/* Optional Sakuga Speedlines Overlay */}
            {showSpeedLines && (
              <div 
                className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen bg-repeat animate-pulse"
                style={{
                  backgroundImage: `radial-gradient(circle at center, transparent 30%, rgba(255,46,86,0.3) 100%)`
                }}
              />
            )}

            {/* Interactive Text Overlay on Video Canvas */}
            {overlayText && (
              <div
                className={`absolute inset-x-4 p-2 text-center pointer-events-none z-20 transition-all ${
                  textPosition === 'top' ? 'top-10' : textPosition === 'center' ? 'top-1/2 -translate-y-1/2' : 'bottom-16'
                }`}
              >
                <span className={`text-sm sm:text-base ${selectedTextStyle.fontClass}`}>
                  {overlayText}
                </span>
              </div>
            )}

            {/* Play/Pause Overlay Indicator */}
            {!isPlaying && (
              <div 
                onClick={togglePlay}
                className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center cursor-pointer z-30"
              >
                <div className="w-14 h-14 rounded-full bg-[#ff2e56] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
              </div>
            )}

            {/* Canvas Header Tag */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between z-30 pointer-events-none">
              <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-white border border-white/20">
                9:16 SHORT
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#ff2e56]/90 text-[10px] font-mono font-bold text-white shadow">
                {clipSpeed}x SPEED
              </span>
            </div>

            {/* Canvas Bottom Music Tag */}
            <div className="absolute bottom-3 inset-x-3 p-2 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs text-white z-30 pointer-events-none">
              <div className="flex items-center gap-2 min-w-0">
                <Music className="w-3.5 h-3.5 text-[#ff2e56] shrink-0 animate-spin [animation-duration:4s]" />
                <span className="text-[11px] font-bold truncate">{selectedAudio.title}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">00:{Math.floor(currentTime) < 10 ? '0' : ''}{Math.floor(currentTime)}</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-2 text-center">
            Tap canvas to play/pause • Draggable timeline below
          </p>
        </div>

        {/* Right 7 cols: Multi-Track Timeline & TikTok Creative Tools */}
        <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
          
          {/* -------------------------------------------------------------------
              MULTI-TRACK TIMELINE
             ------------------------------------------------------------------- */}
          <div className="p-4 rounded-3xl bg-[#0d0d18] border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Film className="w-4 h-4 text-[#ff2e56]" />
                <span>Multi-Track Timeline</span>
              </span>
              <span className="font-mono text-slate-300 font-bold">
                00:{Math.floor(currentTime) < 10 ? '0' : ''}{Math.floor(currentTime)} / 00:{Math.floor(duration)}
              </span>
            </div>

            {/* Playhead Scrub Slider */}
            <div className="relative">
              <input
                type="range"
                min={0}
                max={duration || 15}
                step={0.1}
                value={currentTime}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (videoRef.current) {
                    videoRef.current.currentTime = val;
                    setCurrentTime(val);
                  }
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#ff2e56]"
              />
            </div>

            {/* Track 1: Video Track */}
            <div className="p-2 rounded-2xl bg-[#141424] border border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <img src={selectedClip.thumbnail} alt={selectedClip.title} className="w-10 h-8 rounded-lg object-cover shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{selectedClip.title}</p>
                  <p className="text-[10px] text-slate-400">{selectedClip.animeTitle} • Track 1</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-[#ff2e56] font-mono font-bold shrink-0">
                {selectedClip.duration}s
              </span>
            </div>

            {/* Track 2: Audio Track */}
            <div className="p-2 rounded-2xl bg-[#141424] border border-purple-900/60 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-800/80 flex items-center justify-center text-purple-300 shrink-0">
                  <Music className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{selectedAudio.title}</p>
                  <p className="text-[10px] text-purple-300">{selectedAudio.artist} • BGM</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-mono shrink-0">
                {selectedAudio.duration}
              </span>
            </div>

            {/* Track 3: Text & Filter Track */}
            <div className="p-2 rounded-2xl bg-[#141424] border border-cyan-900/60 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/80 flex items-center justify-center text-cyan-300 shrink-0">
                  <Type className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">"{overlayText}"</p>
                  <p className="text-[10px] text-cyan-300">Filter: {selectedFilter.name} • {selectedTextStyle.name}</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-bold shrink-0">
                OVERLAY
              </span>
            </div>
          </div>

          {/* -------------------------------------------------------------------
              TIKTOK CREATIVE TOOLBAR BUTTONS
             ------------------------------------------------------------------- */}
          <div className="grid grid-cols-6 gap-2 text-center">
            {[
              { id: 'clips', label: 'Clips', icon: <Film className="w-4 h-4" /> },
              { id: 'audio', label: 'Audio', icon: <Music className="w-4 h-4" /> },
              { id: 'text', label: 'Text', icon: <Type className="w-4 h-4" /> },
              { id: 'filters', label: 'Filters', icon: <Sparkles className="w-4 h-4" /> },
              { id: 'speed', label: 'Speed', icon: <Zap className="w-4 h-4" /> },
              { id: 'sfx', label: 'SFX', icon: <Volume2 className="w-4 h-4" /> }
            ].map((tool) => {
              const isActive = activeTool === tool.id;
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => setActiveTool(tool.id as any)}
                  className={`p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#ff2e56] text-white shadow-lg shadow-pink-600/30'
                      : 'bg-[#101020] text-slate-300 hover:bg-[#181828] border border-slate-800'
                  }`}
                >
                  {tool.icon}
                  <span className="text-[10px] font-bold">{tool.label}</span>
                </button>
              );
            })}
          </div>

          {/* -------------------------------------------------------------------
              TOOL PANEL CONTENT
             ------------------------------------------------------------------- */}
          <div className="p-4 rounded-3xl bg-[#0d0d18] border border-slate-800 space-y-3 min-h-[160px]">
            
            {/* Tool 1: Anime Source Clips Library */}
            {activeTool === 'clips' && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-white">Select Anime Fight & Sakuga Clip</h4>
                  <span className="text-[10px] text-[#ff2e56] cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    + Import Custom MP4
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2.5 max-h-48 overflow-y-auto pr-1">
                  {SAMPLE_ANIME_CLIPS.map((clip) => (
                    <div
                      key={clip.id}
                      onClick={() => {
                        setSelectedClip(clip);
                        addToast({ title: 'Switched Clip', description: clip.title, type: 'success' });
                      }}
                      className={`p-2 rounded-2xl border flex items-center gap-2 cursor-pointer transition-all ${
                        selectedClip.id === clip.id
                          ? 'bg-[#18162c] border-[#ff2e56] ring-1 ring-[#ff2e56]'
                          : 'bg-[#121222] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <img src={clip.thumbnail} alt={clip.title} className="w-12 h-9 rounded-lg object-cover shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-[11px] text-white truncate">{clip.title}</p>
                        <p className="text-[9px] text-slate-400">{clip.duration}s</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tool 2: Trending Audio Track Picker */}
            {activeTool === 'audio' && (
              <div className="space-y-2.5">
                <h4 className="font-bold text-xs text-white">Select Trending Anime Phonk & OST Track</h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {TRENDING_AUDIO_TRACKS.map((aud) => (
                    <div
                      key={aud.id}
                      onClick={() => {
                        setSelectedAudio(aud);
                        addToast({ title: 'Audio Added', description: aud.title, type: 'info' });
                      }}
                      className={`p-2.5 rounded-2xl border flex items-center justify-between gap-2 cursor-pointer transition-all ${
                        selectedAudio.id === aud.id
                          ? 'bg-purple-950/60 border-purple-600 ring-1 ring-purple-500'
                          : 'bg-[#121222] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Music className="w-4 h-4 text-[#ff2e56] shrink-0" />
                        <div className="min-w-0">
                          <p className="font-bold text-xs text-white truncate">{aud.title}</p>
                          <p className="text-[10px] text-slate-400">{aud.artist}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{aud.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tool 3: Text & Caption Editor */}
            {activeTool === 'text' && (
              <div className="space-y-3">
                <h4 className="font-bold text-xs text-white">Custom Subtitle & Quote Overlay</h4>
                <input
                  type="text"
                  value={overlayText}
                  onChange={(e) => setOverlayText(e.target.value)}
                  placeholder="Enter anime quote or caption..."
                  className="w-full bg-[#141424] border border-slate-700 px-3 py-2 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#ff2e56]"
                />

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                    {TEXT_STYLES.map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setSelectedTextStyle(st)}
                        className={`px-3 py-1 rounded-xl text-[10px] font-bold whitespace-nowrap cursor-pointer ${
                          selectedTextStyle.id === st.id
                            ? 'bg-[#ff2e56] text-white'
                            : 'bg-slate-900 text-slate-300'
                        }`}
                      >
                        {st.name}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {(['top', 'center', 'bottom'] as const).map((pos) => (
                      <button
                        key={pos}
                        type="button"
                        onClick={() => setTextPosition(pos)}
                        className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase ${
                          textPosition === pos ? 'bg-white text-black' : 'bg-slate-900 text-slate-400'
                        }`}
                      >
                        {pos}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tool 4: Sakuga Filters & Color Grading */}
            {activeTool === 'filters' && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-white">Sakuga Visual Filter Preset</h4>
                  <label className="flex items-center gap-1.5 text-[10px] text-slate-300 cursor-pointer">
                    <span>Speedlines</span>
                    <input
                      type="checkbox"
                      checked={showSpeedLines}
                      onChange={(e) => setShowSpeedLines(e.target.checked)}
                      className="rounded bg-slate-800 text-[#ff2e56] focus:ring-0"
                    />
                  </label>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {SAKUGA_FILTERS.map((filt) => (
                    <button
                      key={filt.id}
                      type="button"
                      onClick={() => {
                        setSelectedFilter(filt);
                        addToast({ title: `Filter: ${filt.name}`, type: 'info' });
                      }}
                      className={`p-2 rounded-xl text-xs font-bold text-center truncate cursor-pointer transition-all ${
                        selectedFilter.id === filt.id
                          ? 'bg-[#ff2e56] text-white shadow-md'
                          : 'bg-[#121222] text-slate-300 hover:bg-[#181828] border border-slate-800'
                      }`}
                    >
                      {filt.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tool 5: Speed Ramp & Slow-Motion */}
            {activeTool === 'speed' && (
              <div className="space-y-3">
                <h4 className="font-bold text-xs text-white">Clip Playback Speed Curve</h4>
                <div className="flex items-center gap-2">
                  {[0.25, 0.5, 0.75, 1.0, 1.5, 2.0, 3.0].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setClipSpeed(s);
                        if (videoRef.current) videoRef.current.playbackRate = s;
                        addToast({ title: `Speed set to ${s}x`, type: 'info' });
                      }}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                        clipSpeed === s
                          ? 'bg-[#ff2e56] text-white shadow-md'
                          : 'bg-[#121222] text-slate-300 hover:bg-[#181828] border border-slate-800'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 text-center">
                  Use 0.25x for intense sakuga slow-motion impact frames or 2.0x for rapid cuts.
                </p>
              </div>
            )}

            {/* Tool 6: Anime Sound Effects */}
            {activeTool === 'sfx' && (
              <div className="space-y-2.5">
                <h4 className="font-bold text-xs text-white">Instant Anime Action SFX</h4>
                <div className="grid grid-cols-2 gap-2">
                  {ANIME_SFX.map((sfx) => (
                    <button
                      key={sfx.name}
                      type="button"
                      onClick={() => addToast({ title: `Played ${sfx.name}`, description: 'Audio layer mixed.', type: 'success' })}
                      className="p-2.5 rounded-2xl bg-[#121222] border border-slate-800 hover:border-[#ff2e56] text-xs font-bold text-slate-200 hover:text-white flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <span>{sfx.icon}</span>
                      <span className="truncate">{sfx.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Caption & Post Details */}
          <div className="p-3.5 rounded-2xl bg-[#0d0d18] border border-slate-800 space-y-2">
            <label className="text-[11px] font-semibold text-slate-400 block">Pulse Caption & Hashtags</label>
            <input
              type="text"
              value={postCaption}
              onChange={(e) => setPostCaption(e.target.value)}
              className="w-full bg-[#141424] border border-slate-700 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff2e56]"
            />
          </div>

        </div>

      </div>

    </div>
  );
};
