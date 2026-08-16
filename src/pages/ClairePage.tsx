import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Anime } from '../types/anime';
import { searchAnimeFromJikan, fetchTopAnimeFromJikan } from '../services/jikanApi';
import { 
  ArrowLeft,
  Send, 
  ArrowUp, 
  Mic, 
  Paperclip, 
  Smile, 
  Sparkles, 
  CheckCheck, 
  Star, 
  Search, 
  Dices, 
  MessageSquare, 
  Play, 
  Heart, 
  ChevronRight, 
  Flame, 
  Coffee, 
  SmilePlus, 
  Zap, 
  Phone, 
  Video, 
  MoreVertical, 
  Camera, 
  Lock, 
  Clock, 
  ChevronDown,
  Brain,
  Plus,
  Compass,
  Film,
  PhoneOff,
  Volume2,
  VolumeX,
  RefreshCw,
  VideoOff,
  MicOff,
  Wand2,
  Layers,
  Image as ImageIcon
} from 'lucide-react';

const CLAIRE_AVATAR = '/claire_avatar.jpg';

export const ClairePage: React.FC = () => {
  const { 
    claireMessages, 
    isClaireTyping, 
    askClaire, 
    currentUser, 
    navigateTo, 
    animes, 
    goToRandomAnime, 
    setIsSearchOpen, 
    addToast 
  } = useApp();

  // Mode: 'hub' (matching IMG_20260813_145521.png) or 'chat' (matching file_000000009db481f48442ef86d8dd5a44.png)
  const [viewMode, setViewMode] = useState<'hub' | 'chat'>('hub');
  const [selectedMood, setSelectedMood] = useState<'Feeling Happy' | 'Feeling Sad' | 'Need Motivation' | 'Chill & Relax' | 'Want Action'>('Feeling Happy');
  const [inputQuery, setInputQuery] = useState('');
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [showTrainModal, setShowTrainModal] = useState(false);

  // Calling system state matching clean UI concept
  const [activeCall, setActiveCall] = useState<{ type: 'voice' | 'video'; duration: number; status: 'Contacting...' | 'Ringing...' | 'Connected' } | null>(null);
  const [isCallMinimized, setIsCallMinimized] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoDisabled, setIsVideoDisabled] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);

  // Train Claire State
  const [userNickname, setUserNickname] = useState('Paul');
  const [favoriteAnime, setFavoriteAnime] = useState('Bleach: Thousand-Year Blood War');
  const [claireTone, setClaireTone] = useState<'Sweet & Cheerful' | 'Sarcastic & Witty' | 'Cool & Mysterious' | 'Supportive Sister'>('Sweet & Cheerful');
  const [customMemory, setCustomMemory] = useState('I love high-stakes battle anime, deep lore, and fast sakuga animation.');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const callTimerRef = useRef<any>(null);

  useEffect(() => {
    if (viewMode === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [claireMessages, isClaireTyping, viewMode]);

  // Call timer simulation: Contacting... -> Ringing... -> Connected
  useEffect(() => {
    if (activeCall) {
      const t1 = setTimeout(() => {
        setActiveCall(prev => prev ? { ...prev, status: 'Ringing...' } : null);
      }, 1500);

      const t2 = setTimeout(() => {
        setActiveCall(prev => prev ? { ...prev, status: 'Connected' } : null);
      }, 3000);

      callTimerRef.current = setInterval(() => {
        setActiveCall(prev => prev && prev.status === 'Connected' ? { ...prev, duration: prev.duration + 1 } : prev);
      }, 1000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        if (callTimerRef.current) clearInterval(callTimerRef.current);
      };
    }
  }, [activeCall?.type]);

  const handleStartCall = (type: 'voice' | 'video') => {
    setActiveCall({
      type,
      duration: 0,
      status: 'Contacting...'
    });
    setIsCallMinimized(false);
    setIsMicMuted(false);
    setIsVideoDisabled(type === 'voice');
  };

  const handleEndCall = () => {
    if (activeCall) {
      const durStr = formatCallDuration(activeCall.duration);
      askClaire(activeCall.type === 'video' ? `(Video call ended • ${durStr})` : `(Voice call ended • ${durStr})`);
    }
    setActiveCall(null);
    setIsCallMinimized(false);
  };

  const formatCallDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputQuery.trim()) return;
    askClaire(inputQuery.trim());
    setInputQuery('');
    setViewMode('chat');
  };

  // 1. Recommended For You (matching IMG_20260813_145521.png 1:1)
  const recommendedList = [
    {
      id: '52991',
      title: "Frieren: Beyond Journey's End",
      score: 4.9,
      poster: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg'
    },
    {
      id: '40748',
      title: 'Jujutsu Kaisen',
      score: 4.8,
      subtitle: 'Season 2',
      poster: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg'
    },
    {
      id: '33352',
      title: 'Violet Evergarden',
      score: 4.8,
      poster: 'https://cdn.myanimelist.net/images/anime/1795/95088l.jpg'
    },
    {
      id: '45576',
      title: 'Mushoku Tensei',
      score: 4.7,
      subtitle: 'Season 2',
      poster: 'https://cdn.myanimelist.net/images/anime/1758/120036l.jpg'
    },
    {
      id: '34599',
      title: 'Made in Abyss',
      score: 4.8,
      poster: 'https://cdn.myanimelist.net/images/anime/6/86733l.jpg'
    }
  ];

  // 2. What's Your Mood List (matching IMG_20260813_145521.png 1:1)
  const moodButtons = [
    { id: 'Feeling Happy', label: 'Feeling Happy', icon: '😊' },
    { id: 'Feeling Sad', label: 'Feeling Sad', icon: '😢' },
    { id: 'Need Motivation', label: 'Need Motivation', icon: '🔥' },
    { id: 'Chill & Relax', label: 'Chill & Relax', icon: '🌿' },
    { id: 'Want Action', label: 'Want Action', icon: '⚔️' }
  ];

  // 3. Recent Conversations (matching IMG_20260813_145521.png 1:1)
  const recentConversations = [
    {
      id: 'rc-1',
      title: 'Best anime with strong main character',
      time: '2h ago',
      snippet: 'Here are some anime with overpowered main characters...',
      prompt: 'Recommend me the best anime with strong and overpowered main characters'
    },
    {
      id: 'rc-2',
      title: 'Top 10 anime of 2024 to binge',
      time: '5h ago',
      snippet: 'Solo Leveling, Frieren, Dandadan, Bleach TYBW...',
      prompt: 'What are the top 10 anime of 2024 to binge watch?'
    },
    {
      id: 'rc-3',
      title: 'Anime similar to Jujutsu Kaisen',
      time: '1d ago',
      snippet: 'Bleach, Chainsaw Man, Demon Slayer, Hell\'s Paradise...',
      prompt: 'Give me anime similar to Jujutsu Kaisen with dark supernatural fights'
    }
  ];

  return (
    <div className="animate-fade-in pb-36 max-w-md md:max-w-xl mx-auto space-y-6 text-slate-100 font-sans">
      
      {/* =========================================================================
          ACTIVE CALL OVERLAY (CLEAN CONCEPT WITHOUT SCREENSHOT EMOJIS)
         ========================================================================= */}
      {activeCall && !isCallMinimized && (
        <div className="fixed inset-0 z-60 bg-black flex flex-col justify-between p-6 animate-fade-in select-none font-sans overflow-hidden">
          
          {/* Background */}
          {activeCall.type === 'video' && !isVideoDisabled ? (
            <div className="absolute inset-0 z-0">
              <img
                src={CLAIRE_AVATAR}
                alt="Claire"
                className="w-full h-full object-cover filter blur-sm scale-110 brightness-50"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-black z-0" />
          )}

          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setIsCallMinimized(true)}
              className="p-2 text-white hover:text-slate-300 transition-colors cursor-pointer"
              title="Minimize"
            >
              <ChevronDown className="w-7 h-7" />
            </button>

            <div className="flex items-center gap-3">
              {activeCall.type === 'video' && (
                <span className="w-6 h-6 rounded-full bg-[#00a884] flex items-center justify-center text-black shadow-md">
                  <Mic className="w-3.5 h-3.5 fill-current" />
                </span>
              )}
              <button
                type="button"
                onClick={() => setShowChatMenu(!showChatMenu)}
                className="p-2 text-white hover:text-slate-300 transition-colors cursor-pointer"
              >
                <MoreVertical className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Center Contact & Status */}
          <div className="relative z-10 text-center space-y-1.5 my-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Claire
            </h2>
            <p className="text-sm font-medium text-slate-300">
              {activeCall.status === 'Connected' ? formatCallDuration(activeCall.duration) : activeCall.status}
            </p>
          </div>

          {/* Left Vertical Filter/AR Toolbar */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-10 text-white/90">
            <button type="button" className="p-1 hover:text-[#ff2e56] transition-colors cursor-pointer" title="Sparkles">
              <Sparkles className="w-6 h-6" />
            </button>
            <button type="button" className="p-1 hover:text-[#ff2e56] transition-colors cursor-pointer" title="Effects">
              <Wand2 className="w-6 h-6" />
            </button>
            <button type="button" className="p-1 hover:text-[#ff2e56] transition-colors cursor-pointer" title="Masks">
              <Layers className="w-6 h-6" />
            </button>
            <button type="button" className="p-1 hover:text-[#ff2e56] transition-colors cursor-pointer" title="Gallery">
              <ImageIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Call Capsule */}
          <div className="relative z-10 flex justify-center pb-4">
            <div className="w-full max-w-sm px-6 py-3.5 rounded-full bg-[#1c1c1e]/95 backdrop-blur-2xl flex items-center justify-between shadow-2xl border border-white/10">
              <button
                type="button"
                onClick={() => setIsVideoDisabled(!isVideoDisabled)}
                className={`p-3 rounded-full transition-colors cursor-pointer ${
                  isVideoDisabled ? 'bg-white/10 text-slate-400' : 'bg-transparent text-white hover:bg-white/10'
                }`}
              >
                {isVideoDisabled ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
              </button>

              <button
                type="button"
                onClick={() => setIsMicMuted(!isMicMuted)}
                className={`p-3 rounded-full transition-colors cursor-pointer ${
                  isMicMuted ? 'bg-white/10 text-slate-400' : 'bg-transparent text-white hover:bg-white/10'
                }`}
              >
                {isMicMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>

              <button
                type="button"
                onClick={() => setIsSpeakerMuted(!isSpeakerMuted)}
                className={`p-3 rounded-full transition-colors cursor-pointer ${
                  isSpeakerMuted ? 'bg-white/10 text-slate-400' : 'bg-transparent text-white hover:bg-white/10'
                }`}
              >
                <RefreshCw className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={handleEndCall}
                className="w-13 h-13 rounded-full bg-[#ff3b30] hover:bg-[#e03126] text-white flex items-center justify-center shadow-2xl shadow-red-600/50 transition-transform active:scale-90 cursor-pointer"
              >
                <PhoneOff className="w-6 h-6 fill-current" />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Minimized Call Bar */}
      {activeCall && isCallMinimized && (
        <div 
          onClick={() => setIsCallMinimized(false)}
          className="bg-[#00a884] text-black px-4 py-2 flex items-center justify-between text-xs font-bold shadow-lg z-40 cursor-pointer animate-slide-down rounded-2xl"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black animate-ping" />
            <span>{activeCall.type === 'video' ? '📹 Video Call' : '📞 Voice Call'} with Claire ({formatCallDuration(activeCall.duration)})</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEndCall();
            }}
            className="px-2.5 py-1 rounded-lg bg-black text-white text-[10px] uppercase font-black"
          >
            End
          </button>
        </div>
      )}

      {/* =========================================================================
          VIEW MODE A: EXACT CHAT SCREEN matching file_000000009db481f48442ef86d8dd5a44.png
         ========================================================================= */}
      {viewMode === 'chat' ? (
        <div className="rounded-3xl bg-[#090912] border border-slate-800/80 shadow-2xl overflow-hidden flex flex-col h-[85vh] animate-fade-in">
          
          {/* Top Header Bar matching Screenshot */}
          <div className="px-4 py-3 bg-[#0d0d18] border-b border-slate-800 flex items-center justify-between z-30 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setViewMode('hub')}
                className="p-1 rounded-full text-slate-200 hover:text-white transition-colors cursor-pointer"
                title="Back to Claire Hub"
              >
                <ArrowLeft className="w-5 h-5 text-[#ff2e56]" />
              </button>

              <div className="relative shrink-0">
                <img
                  src={CLAIRE_AVATAR}
                  alt="Claire"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-[#ff2e56]"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-black" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="font-bold text-sm sm:text-base text-white truncate">Claire</h2>
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#ff2e56] text-white text-[8px] font-black">
                    ✓
                  </span>
                </div>
                <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online</span>
                </p>
              </div>
            </div>

            {/* Right Call & Menu Action Icons matching Screenshot */}
            <div className="flex items-center gap-3 text-slate-300 shrink-0">
              <button
                type="button"
                onClick={() => handleStartCall('voice')}
                className="p-1.5 hover:text-white transition-colors cursor-pointer"
                title="Voice Call"
              >
                <Phone className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => handleStartCall('video')}
                className="p-1.5 hover:text-white transition-colors cursor-pointer"
                title="Video Call"
              >
                <Video className="w-5 h-5" />
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowChatMenu(!showChatMenu)}
                  className="p-1.5 hover:text-white transition-colors cursor-pointer"
                  title="Options"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>

                {showChatMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#141424] border border-slate-700 shadow-2xl p-1.5 z-50 space-y-1 text-xs text-slate-200 animate-fade-in">
                    <button
                      type="button"
                      onClick={() => {
                        setShowChatMenu(false);
                        setViewMode('hub');
                      }}
                      className="w-full px-3 py-2 rounded-xl text-left hover:bg-white/10 flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#ff2e56]" />
                      <span>Claire Hub</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowChatMenu(false);
                        askClaire("Can you tell me an awesome anime story?");
                      }}
                      className="w-full px-3 py-2 rounded-xl text-left hover:bg-white/10 flex items-center gap-2 cursor-pointer"
                    >
                      <span>✨ Tell a Story</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowChatMenu(false);
                        localStorage.removeItem('velnix_claire_chat');
                        window.location.reload();
                      }}
                      className="w-full px-3 py-2 rounded-xl text-left text-rose-400 hover:bg-rose-950/30 flex items-center gap-2 cursor-pointer"
                    >
                      <span>🗑 Clear Chat</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chat Messages Feed with in-chat Header Card */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* In-Chat Hero Card matching Gojo Screenshot */}
            <div className="relative rounded-3xl overflow-hidden bg-[#0e0e1a] border border-slate-800/80 p-5 text-center space-y-2 shadow-xl">
              <div className="relative w-20 h-20 rounded-full mx-auto overflow-hidden ring-2 ring-[#ff2e56] shadow-xl bg-black">
                <img src={CLAIRE_AVATAR} alt="Claire" className="w-full h-full object-cover" />
              </div>

              <div>
                <div className="flex items-center justify-center gap-1.5">
                  <h3 className="font-bold text-base text-white">Claire</h3>
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#ff2e56] text-white text-[8px] font-black">✓</span>
                </div>
                <p className="text-xs text-slate-400 font-mono">@claire_ai</p>
                <p className="text-xs text-slate-300 max-w-xs mx-auto mt-1">
                  Your anime companion. Here to help you find, track, and enjoy anime.
                </p>
                <button
                  type="button"
                  onClick={() => setViewMode('hub')}
                  className="text-xs font-semibold text-[#ff2e56] hover:underline mt-1.5 inline-block cursor-pointer"
                >
                  View Profile & Hub
                </button>
              </div>
            </div>

            {/* Today Date Pill */}
            <div className="flex justify-center">
              <span className="px-3 py-0.5 rounded-full bg-[#141424] border border-slate-800 text-[10px] text-slate-400 font-semibold">
                Today
              </span>
            </div>

            {/* Dynamic Conversation Bubbles */}
            {claireMessages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <img src={CLAIRE_AVATAR} alt="Claire" className="w-7 h-7 rounded-full object-cover ring-1 ring-[#ff2e56] shrink-0 mb-1" />
                  )}

                  <div
                    className={`relative max-w-[80%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-md ${
                      isUser
                        ? 'bg-[#ff2e56] text-white rounded-br-none'
                        : 'bg-[#161626] text-slate-100 border border-slate-800 rounded-bl-none'
                    }`}
                  >
                    <p>{msg.text}</p>

                    <div className="flex items-center justify-end gap-1 text-[9px] opacity-75 mt-1">
                      <span>{msg.timestamp}</span>
                      {isUser && <CheckCheck className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                </div>
              );
            })}

            {isClaireTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <img src={CLAIRE_AVATAR} alt="Claire" className="w-7 h-7 rounded-full object-cover ring-1 ring-[#ff2e56]" />
                <div className="px-3 py-2 rounded-2xl bg-[#161626] border border-slate-800 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff2e56] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff2e56] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff2e56] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-slate-400 ml-1">Claire is typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Bar matching Screenshot 1 Right: [(+)] [Message... 😊] [🎙️] */}
          <div className="p-3 bg-[#0d0d18] border-t border-slate-800">
            <form onSubmit={handleSend} className="flex items-center gap-2">
              
              {/* Pink Plus Button */}
              <button
                type="button"
                onClick={() => addToast({ title: 'Attach Media', description: 'Upload screenshot or anime clip.', type: 'info' })}
                className="w-10 h-10 rounded-full bg-[#ff2e56] hover:bg-[#ff4b72] text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer shrink-0"
              >
                <Plus className="w-5 h-5" />
              </button>

              {/* Message Pill with Smiley inside */}
              <div className="flex-1 flex items-center bg-[#141424] rounded-full px-4 py-2.5 border border-slate-700/80">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Message..."
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => setInputQuery(prev => prev + ' 😊')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer ml-2"
                >
                  <Smile className="w-5 h-5" />
                </button>
              </div>

              {/* Microphone / Send Button */}
              {inputQuery.trim() ? (
                <button
                  type="submit"
                  className="w-10 h-10 rounded-full bg-[#ff2e56] hover:bg-[#ff4b72] text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4 fill-current ml-0.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    addToast({ title: 'Voice Note 🎙️', description: 'Listening to your microphone...', type: 'info' });
                    setTimeout(() => askClaire("What anime do you recommend for me today?"), 1800);
                  }}
                  className="p-2.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Voice Note"
                >
                  <Mic className="w-5 h-5" />
                </button>
              )}

            </form>
          </div>

        </div>
      ) : (
        /* =========================================================================
            VIEW MODE B: EXACT CLAIRE AI ASSISTANT HOMEPAGE matching IMG_20260813_145521.png
           ========================================================================= */
        <div className="space-y-6 animate-fade-in font-sans">
          
          {/* Header Label: CLAIRE (AI ASSISTANT) */}
          <div className="text-center">
            <span className="text-[11px] font-black tracking-widest text-[#ff2e56] uppercase">
              CLAIRE (AI ASSISTANT)
            </span>
          </div>

          {/* 1. TOP HERO CARD matching IMG_20260813_145521.png */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0b0816] via-[#120e26] to-[#1c0f33] border border-purple-900/60 p-6 shadow-2xl space-y-4">
            
            {/* Background Anime Artwork with Bokeh Glow */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-80 overflow-hidden">
              <img
                src={CLAIRE_AVATAR}
                alt="Claire Artwork"
                className="w-full h-full object-cover object-top filter contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#120e26] via-[#120e26]/60 to-transparent" />
            </div>

            {/* Left Content */}
            <div className="relative z-10 max-w-[65%] space-y-3">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-wide">
                    Claire
                  </h1>
                  <span className="text-[#ff2e56] text-lg font-bold">✦</span>
                  <span className="px-1.5 py-0.2 rounded-md bg-purple-950 text-purple-300 border border-purple-800 text-[10px] font-extrabold uppercase">
                    AI
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-snug">
                  Your anime companion. Here to help you find, track, and enjoy anime that fits you.
                </p>
              </div>

              {/* Speech Bubble Greeting */}
              <div className="p-3 rounded-2xl bg-[#1a1430]/90 border border-purple-800/60 backdrop-blur-md shadow-lg">
                <p className="text-xs font-medium text-purple-200 leading-relaxed">
                  Hello! I'm Claire. What are you in the mood for today? ✨
                </p>
              </div>
            </div>

          </div>

          {/* 2. 4 ACTION CARDS (2x2 GRID matching IMG_20260813_145521.png) */}
          <div className="grid grid-cols-2 gap-3">
            
            {/* Card 1: Chat with Claire */}
            <div
              onClick={() => setViewMode('chat')}
              className="p-4 rounded-2xl bg-[#0e0c1a] border border-slate-800 hover:border-[#ff2e56] cursor-pointer transition-all shadow-md group flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-pink-950/60 border border-pink-800/80 flex items-center justify-center text-[#ff2e56] shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#ff2e56] transition-colors truncate">
                  Chat with Claire
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Talk about anime</p>
              </div>
            </div>

            {/* Card 2: Recommendations */}
            <div
              onClick={() => {
                const el = document.getElementById('recommended-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-4 rounded-2xl bg-[#0e0c1a] border border-slate-800 hover:border-[#ff2e56] cursor-pointer transition-all shadow-md group flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-purple-950/60 border border-purple-800/80 flex items-center justify-center text-purple-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                <Star className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#ff2e56] transition-colors truncate">
                  Recommendations
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">For your taste</p>
              </div>
            </div>

            {/* Card 3: Mood-Based */}
            <div
              onClick={() => {
                const el = document.getElementById('mood-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-4 rounded-2xl bg-[#0e0c1a] border border-slate-800 hover:border-[#ff2e56] cursor-pointer transition-all shadow-md group flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-rose-950/60 border border-rose-800/80 flex items-center justify-center text-rose-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                <Smile className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#ff2e56] transition-colors truncate">
                  Mood-Based
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Find anime by mood</p>
              </div>
            </div>

            {/* Card 4: Anime Finder */}
            <div
              onClick={() => setIsSearchOpen(true)}
              className="p-4 rounded-2xl bg-[#0e0c1a] border border-slate-800 hover:border-[#ff2e56] cursor-pointer transition-all shadow-md group flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-cyan-950/60 border border-cyan-800/80 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                <Search className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#ff2e56] transition-colors truncate">
                  Anime Finder
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Search any anime</p>
              </div>
            </div>

          </div>

          {/* 3. RECOMMENDED FOR YOU SECTION matching IMG_20260813_145521.png */}
          <div id="recommended-section" className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold font-heading text-white">
                Recommended For You
              </h2>
              <button
                type="button"
                onClick={() => navigateTo('browse')}
                className="text-xs text-slate-400 hover:text-[#ff2e56] flex items-center gap-0.5 transition-colors cursor-pointer"
              >
                <span>See All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {recommendedList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigateTo('anime', { animeId: item.id })}
                  className="w-[125px] sm:w-[145px] shrink-0 group cursor-pointer space-y-1.5 text-left focus:outline-none"
                >
                  <div className="relative aspect-[3/4.4] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md group-hover:scale-103 transition-transform duration-300">
                    <img
                      src={item.poster}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-xs text-white group-hover:text-[#ff2e56] transition-colors truncate">
                      {item.title}
                    </h4>
                    {item.subtitle && (
                      <p className="text-[10px] text-slate-400 truncate">{item.subtitle}</p>
                    )}
                    <div className="flex items-center gap-1 text-[11px] text-slate-300">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="font-bold">{item.score}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. WHAT'S YOUR MOOD SECTION matching IMG_20260813_145521.png */}
          <div id="mood-section" className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-heading text-white">
              What's Your Mood?
            </h2>

            <div className="grid grid-cols-5 gap-2">
              {moodButtons.map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => {
                    setSelectedMood(btn.id as any);
                    askClaire(`I am feeling ${btn.label.toLowerCase()} today. What should I watch?`);
                    setViewMode('chat');
                  }}
                  className="p-3 rounded-2xl bg-[#0e0c1a] border border-slate-800 hover:border-[#ff2e56] flex flex-col items-center justify-center gap-1.5 transition-all shadow-md group cursor-pointer"
                >
                  <span className="text-xl group-hover:scale-125 transition-transform">{btn.icon}</span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-300 text-center leading-tight">
                    {btn.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 5. RECENT CONVERSATIONS SECTION matching IMG_20260813_145521.png */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold font-heading text-white">
                Recent Conversations
              </h2>
              <button
                type="button"
                onClick={() => setViewMode('chat')}
                className="text-xs text-slate-400 hover:text-[#ff2e56] flex items-center gap-0.5 transition-colors cursor-pointer"
              >
                <span>See All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {recentConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => {
                    askClaire(conv.prompt);
                    setViewMode('chat');
                  }}
                  className="p-3 rounded-2xl bg-[#0e0c1a] border border-slate-800/80 hover:border-[#ff2e56] flex items-center gap-3 cursor-pointer transition-all shadow-md group"
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-900 shrink-0 ring-1 ring-purple-500/50">
                    <img src={CLAIRE_AVATAR} alt="Claire" className="w-full h-full object-cover" />
                  </div>

                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#ff2e56] transition-colors truncate">
                        {conv.title}
                      </h4>
                      <span className="text-[10px] text-slate-500 shrink-0 ml-2">{conv.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">{conv.snippet}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
