import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  Search, 
  SlidersHorizontal, 
  Cloud, 
  Edit3, 
  Phone, 
  Video, 
  MoreVertical, 
  Plus, 
  Smile, 
  Mic, 
  Send, 
  CheckCheck,
  Heart,
  PhoneOff,
  Volume2,
  VolumeX,
  Camera,
  Paperclip,
  Image as ImageIcon,
  Film,
  Dices,
  Radio,
  X,
  User,
  Sparkles,
  Trash2,
  Check,
  ChevronDown,
  ChevronUp,
  Wand2,
  Layers,
  RefreshCw,
  VideoOff,
  MicOff
} from 'lucide-react';

interface DMsPageProps {
  onBack: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToExtensions?: () => void;
}

interface ContactData {
  key: string;
  name: string;
  avatar: string;
  handle: string;
  bio: string;
  initialMessage: string;
  reply1?: string;
  reply2?: string;
}

const CONTACTS: Record<string, ContactData> = {
  'gojo': {
    key: 'gojo',
    name: 'Gojo Satoru',
    avatar: 'https://cdn.myanimelist.net/images/characters/15/422168.jpg',
    handle: '@thehonoredone',
    bio: 'The Strongest. Enjoyer of sweets and chaos.',
    initialMessage: 'Yo! 🖐️',
    reply1: 'Just finished a mission. How about you?',
    reply2: 'Peak choice. 😎 See you tomorrow 🤞'
  },
  'hinata': {
    key: 'hinata',
    name: 'Hinata Hyuga',
    avatar: 'https://cdn.myanimelist.net/images/characters/13/284143.jpg',
    handle: '@hinata_hyuga',
    bio: 'Leaf Village Kunoichi 🌸',
    initialMessage: 'Thanks! 😊',
    reply1: 'I was practicing gentle fist with Naruto-kun.',
    reply2: 'Have a wonderful day!'
  },
  'tanjiro': {
    key: 'tanjiro',
    name: 'Tanjiro Kamado',
    avatar: 'https://cdn.myanimelist.net/images/characters/11/384249.jpg',
    handle: '@tanjiro_demon_slayer',
    bio: 'Demon Slayer Corps. Never give up!',
    initialMessage: "Let's go again sometime!",
    reply1: 'Nezuko and I just got back from Mt. Sagiri!',
    reply2: 'Keep training hard! 🔥'
  },
  'zerotwo': {
    key: 'zerotwo',
    name: 'Zero Two',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    handle: '@darling_002',
    bio: 'Darling in the Franxx 💕',
    initialMessage: '👀 ❤️',
    reply1: 'Are you going to be my darling today?',
    reply2: 'Sweet dreams! 🌸'
  },
  'levi': {
    key: 'levi',
    name: 'Levi Ackerman',
    avatar: 'https://cdn.myanimelist.net/images/characters/2/241413.jpg',
    handle: '@captain_levi',
    bio: 'Survey Corps Captain. Clean your room.',
    initialMessage: '👍',
    reply1: 'No titans in sight. Clean the mess.',
    reply2: 'Understood.'
  },
  'sasuke': {
    key: 'sasuke',
    name: 'Sasuke Uchiha',
    avatar: 'https://cdn.myanimelist.net/images/characters/9/131317.jpg',
    handle: '@sasuke_uchiha',
    bio: 'Shadow Hokage. Chidori.',
    initialMessage: "I'll handle it.",
    reply1: 'The dimensional rift is stable.',
    reply2: 'Hmph.'
  },
  'claire': {
    key: 'claire',
    name: 'Claire',
    avatar: '/claire_avatar.jpg',
    handle: '@claire_ai',
    bio: 'Your anime companion. Here to help you find, track, and enjoy anime.',
    initialMessage: 'What anime should we watch today? ✨',
    reply1: 'Bleach TYBW and Solo Leveling are peak right now!',
    reply2: 'Let me know if you want me to recommend anything else! 💖'
  },
  'kakashi': {
    key: 'kakashi',
    name: 'Kakashi Hatake',
    avatar: 'https://cdn.myanimelist.net/images/characters/7/284129.jpg',
    handle: '@copy_ninja',
    bio: 'Sixth Hokage. Make-out tactics.',
    initialMessage: 'Copy that.',
    reply1: 'Sorry I was late, I got lost on the path of life.',
    reply2: 'See you around.'
  }
};

const EMOJIS = ['😊', '🔥', '💖', '😎', '😭', '⚡', '🌸', '👑', '🍙', '⚔️', '🍿', '🎬', '✨', '👍', '🤞'];

export const DMsPage: React.FC<DMsPageProps> = ({ onBack, onNavigateToProfile }) => {
  const [selectedContactKey, setSelectedContactKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'primary' | 'requests'>('primary');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');

  // Call System state matching Screenshot 1 & 2 1:1
  const [activeCall, setActiveCall] = useState<{ type: 'voice' | 'video'; contact: ContactData; duration: number; status: 'Contacting...' | 'Ringing...' | 'Connected' } | null>(null);
  const [isCallMinimized, setIsCallMinimized] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoDisabled, setIsVideoDisabled] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);

  // Drawers state
  const [showMenu, setShowMenu] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);

  // Dynamic message history for active chat
  const [chatHistory, setChatHistory] = useState<Record<string, { id: string; sender: 'user' | 'contact'; text: string; time: string; isVoice?: boolean; voiceDuration?: string; isLiked?: boolean }[]>>({
    'gojo': [
      { id: '1', sender: 'contact', text: 'Yo! 🖐️', time: '01:32 PM' },
      { id: '2', sender: 'user', text: 'Hey Gojo! What\'s up?', time: '01:33 PM' },
      { id: '3', sender: 'contact', text: 'Just finished a mission. How about you?', time: '01:34 PM' },
      { id: '4', sender: 'user', text: 'Watching some anime 🎬', time: '01:34 PM' },
      { id: '5', sender: 'contact', text: 'Nice! Which one?', time: '01:35 PM' },
      { id: '6', sender: 'user', text: 'Jujutsu Kaisen S2 🔥', time: '01:35 PM' },
      { id: '7', sender: 'contact', text: 'Peak choice. 😎 See you tomorrow 🤞', time: '01:35 PM', isLiked: true }
    ],
    'claire': [
      { id: 'c1', sender: 'contact', text: 'What anime should we watch today? ✨', time: 'Just now' }
    ]
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const voiceTimerRef = useRef<any>(null);
  const callTimerRef = useRef<any>(null);

  const selectedContact = selectedContactKey ? CONTACTS[selectedContactKey] || CONTACTS.gojo : null;
  const currentMessages = selectedContactKey ? chatHistory[selectedContactKey] || [
    { id: 'init', sender: 'contact', text: selectedContact?.initialMessage || 'Hey there! 😊', time: 'Just now' }
  ] : [];

  useEffect(() => {
    if (selectedContactKey) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedContactKey, chatHistory]);

  // Call timer simulation: Contacting... -> Ringing... -> Connected
  useEffect(() => {
    if (activeCall) {
      const statusTimeout1 = setTimeout(() => {
        setActiveCall(prev => prev ? { ...prev, status: 'Ringing...' } : null);
      }, 1500);

      const statusTimeout2 = setTimeout(() => {
        setActiveCall(prev => prev ? { ...prev, status: 'Connected' } : null);
      }, 3000);

      callTimerRef.current = setInterval(() => {
        setActiveCall(prev => prev && prev.status === 'Connected' ? { ...prev, duration: prev.duration + 1 } : prev);
      }, 1000);

      return () => {
        clearTimeout(statusTimeout1);
        clearTimeout(statusTimeout2);
        if (callTimerRef.current) clearInterval(callTimerRef.current);
      };
    }
  }, [activeCall?.contact?.key, activeCall?.type]);

  const handleStartCall = (type: 'voice' | 'video') => {
    if (!selectedContact) return;
    setActiveCall({
      type,
      contact: selectedContact,
      duration: 0,
      status: 'Contacting...'
    });
    setIsCallMinimized(false);
    setIsMicMuted(false);
    setIsVideoDisabled(type === 'voice');
  };

  const handleEndCall = () => {
    if (activeCall && selectedContactKey) {
      const durStr = formatCallDuration(activeCall.duration);
      const callEndMsg = {
        id: 'call-end-' + Date.now(),
        sender: 'contact' as const,
        text: activeCall.type === 'video' ? `📹 Video Call ended • ${durStr}` : `📞 Voice Call ended • ${durStr}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => ({
        ...prev,
        [selectedContactKey]: [...(prev[selectedContactKey] || []), callEndMsg]
      }));
    }
    setActiveCall(null);
    setIsCallMinimized(false);
  };

  const handleSendMessage = (textToSend?: string) => {
    const content = (textToSend || inputText).trim();
    if (!content || !selectedContactKey) return;

    const userMsg = {
      id: 'msg-' + Date.now(),
      sender: 'user' as const,
      text: content,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => ({
      ...prev,
      [selectedContactKey]: [...(prev[selectedContactKey] || []), userMsg]
    }));

    setInputText('');
    setShowEmojiPicker(false);
    setShowAttachments(false);

    // Character reply
    setTimeout(() => {
      let replyContent = "That sounds awesome! Let me know when you watch the next episode!";
      if (selectedContactKey === 'gojo') {
        replyContent = content.toLowerCase().includes('sukuna') 
          ? "Sukuna? Nah, I'd win. 😎" 
          : "Don't worry, I'm the strongest! Let's get some mochi later 🍡";
      } else if (selectedContactKey === 'claire') {
        replyContent = `I love that! Whether you want to talk about that or find more anime recommendations, I'm right here with you! 💖`;
      } else if (selectedContact?.reply1) {
        replyContent = selectedContact.reply1;
      }

      const contactMsg = {
        id: 'msg-reply-' + Date.now(),
        sender: 'contact' as const,
        text: replyContent,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory(prev => ({
        ...prev,
        [selectedContactKey]: [...(prev[selectedContactKey] || []), contactMsg]
      }));
    }, 850);
  };

  // Voice Note Recording
  const startRecordingVoice = () => {
    setIsRecordingVoice(true);
    setRecordSeconds(0);
    voiceTimerRef.current = setInterval(() => {
      setRecordSeconds(prev => prev + 1);
    }, 1000);
  };

  const stopAndSendVoiceNote = () => {
    if (voiceTimerRef.current) clearInterval(voiceTimerRef.current);
    setIsRecordingVoice(false);
    if (!selectedContactKey) return;

    const durStr = `0:0${Math.max(2, recordSeconds)}`;
    const voiceMsg = {
      id: 'voice-' + Date.now(),
      sender: 'user' as const,
      text: `🎤 Voice Note (${durStr})`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isVoice: true,
      voiceDuration: durStr
    };

    setChatHistory(prev => ({
      ...prev,
      [selectedContactKey]: [...(prev[selectedContactKey] || []), voiceMsg]
    }));

    setTimeout(() => {
      const replyMsg = {
        id: 'voice-reply-' + Date.now(),
        sender: 'contact' as const,
        text: 'Heard your voice note! Love the energy! 🎧',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => ({
        ...prev,
        [selectedContactKey]: [...(prev[selectedContactKey] || []), replyMsg]
      }));
    }, 1200);
  };

  const cancelVoiceRecording = () => {
    if (voiceTimerRef.current) clearInterval(voiceTimerRef.current);
    setIsRecordingVoice(false);
    setRecordSeconds(0);
  };

  const formatCallDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const storyBubbles = [
    { key: 'gojo', name: 'Gojo', avatar: CONTACTS.gojo.avatar },
    { key: 'hinata', name: 'Hinata', avatar: CONTACTS.hinata.avatar },
    { key: 'tanjiro', name: 'Tanjiro', avatar: CONTACTS.tanjiro.avatar },
    { key: 'zerotwo', name: 'Zero Two', avatar: CONTACTS.zerotwo.avatar },
    { key: 'levi', name: 'Levi', avatar: CONTACTS.levi.avatar }
  ];

  const threadItems = [
    { key: 'gojo', name: 'Gojo Satoru', snippet: 'See you tomorrow 🤞', time: '2m', unread: 2, verified: true },
    { key: 'hinata', name: 'Hinata Hyuga', snippet: 'Thanks! 😊', time: '15m', unread: 1, verified: false },
    { key: 'tanjiro', name: 'Tanjiro Kamado', snippet: "Let's go again sometime!", time: '1h', unread: 0, verified: false },
    { key: 'zerotwo', name: 'Zero Two', snippet: '👀 ❤️', time: '2h', unread: 0, verified: false },
    { key: 'levi', name: 'Levi Ackerman', snippet: '👍', time: '3h', unread: 0, verified: false },
    { key: 'sasuke', name: 'Sasuke Uchiha', snippet: "I'll handle it.", time: '5h', unread: 0, verified: false },
    { key: 'claire', name: 'Claire', snippet: 'What anime should we watch today? ✨', time: '1d', unread: 0, verified: true },
    { key: 'kakashi', name: 'Kakashi Hatake', snippet: 'Copy that.', time: '1d', unread: 0, verified: false }
  ];

  return (
    <div className="fixed inset-0 z-50 w-full h-full bg-[#07070d] flex flex-col font-sans select-none animate-fade-in text-slate-100 overflow-hidden">
      
      {/* =========================================================================
          EXACT FULL-SCREEN CALL OVERLAY matching Screenshot 1 & 2 1:1
          Opens IMMEDIATELY right inside the active chat!
         ========================================================================= */}
      {activeCall && !isCallMinimized && (
        <div className="fixed inset-0 z-60 bg-black flex flex-col justify-between p-6 animate-fade-in select-none font-sans overflow-hidden">
          
          {/* Background: Video Stream or Deep Solid Black */}
          {activeCall.type === 'video' && !isVideoDisabled ? (
            <div className="absolute inset-0 z-0">
              <img
                src={activeCall.contact.avatar}
                alt="Video Stream"
                className="w-full h-full object-cover filter blur-sm scale-110 brightness-50"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-black z-0" />
          )}

          {/* Top Bar: [⌵ Minimize] [🟢 Mic Active] [••• Menu] */}
          <div className="relative z-10 flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setIsCallMinimized(true)}
              className="p-2 text-white hover:text-slate-300 transition-colors cursor-pointer"
              title="Minimize Call to Chat"
            >
              <ChevronDown className="w-7 h-7" />
            </button>

            {/* Top Right Green Active Mic Badge for Video Call matching Screenshot 2 */}
            <div className="flex items-center gap-3">
              {activeCall.type === 'video' && (
                <span className="w-6 h-6 rounded-full bg-[#00a884] flex items-center justify-center text-black shadow-md">
                  <Mic className="w-3.5 h-3.5 fill-current" />
                </span>
              )}

              <button
                type="button"
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 text-white hover:text-slate-300 transition-colors cursor-pointer"
              >
                <MoreVertical className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Center Content: Contact Name + Status ('Contacting...' / Timer) matching Screenshot 1:1 */}
          <div className="relative z-10 text-center space-y-1.5 my-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
              {activeCall.contact.name}
            </h2>

            <p className="text-sm font-medium text-slate-300 font-sans tracking-wide">
              {activeCall.status === 'Connected' ? formatCallDuration(activeCall.duration) : activeCall.status}
            </p>
          </div>

          {/* Left Vertical Filter/AR Toolbar matching Screenshot 1 (for Voice/Video Call) */}
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

          {/* Bottom Floating Call Action Capsule Bar matching Screenshot 1 & 2 1:1:
              [📹 Video Toggle] [🎙️ Mic Toggle] [🔄 Speaker/Flip] [🔴 End Call] */}
          <div className="relative z-10 flex justify-center pb-4">
            <div className="w-full max-w-sm px-6 py-3.5 rounded-full bg-[#1c1c1e]/95 backdrop-blur-2xl flex items-center justify-between shadow-2xl border border-white/10">
              
              {/* 1. Video Toggle */}
              <button
                type="button"
                onClick={() => setIsVideoDisabled(!isVideoDisabled)}
                className={`p-3 rounded-full transition-colors cursor-pointer ${
                  isVideoDisabled ? 'bg-white/10 text-slate-400' : 'bg-transparent text-white hover:bg-white/10'
                }`}
                title="Toggle Camera"
              >
                {isVideoDisabled ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
              </button>

              {/* 2. Microphone Mute Toggle */}
              <button
                type="button"
                onClick={() => setIsMicMuted(!isMicMuted)}
                className={`p-3 rounded-full transition-colors cursor-pointer ${
                  isMicMuted ? 'bg-white/10 text-slate-400' : 'bg-transparent text-white hover:bg-white/10'
                }`}
                title="Mute Microphone"
              >
                {isMicMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>

              {/* 3. Speaker / Flip Camera */}
              <button
                type="button"
                onClick={() => setIsSpeakerMuted(!isSpeakerMuted)}
                className={`p-3 rounded-full transition-colors cursor-pointer ${
                  isSpeakerMuted ? 'bg-white/10 text-slate-400' : 'bg-transparent text-white hover:bg-white/10'
                }`}
                title="Speaker / Flip"
              >
                <RefreshCw className="w-6 h-6" />
              </button>

              {/* 4. Red Circular End Call Pill matching Screenshot */}
              <button
                type="button"
                onClick={handleEndCall}
                className="w-13 h-13 rounded-full bg-[#ff3b30] hover:bg-[#e03126] text-white flex items-center justify-center shadow-2xl shadow-red-600/50 transition-transform active:scale-90 cursor-pointer"
                title="End Call"
              >
                <PhoneOff className="w-6 h-6 fill-current" />
              </button>

            </div>
          </div>

        </div>
      )}

      {/* Minimized Call Floating Bar at top of Chat */}
      {activeCall && isCallMinimized && (
        <div 
          onClick={() => setIsCallMinimized(false)}
          className="bg-[#00a884] text-black px-4 py-2 flex items-center justify-between text-xs font-bold shadow-lg z-40 cursor-pointer animate-slide-down"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black animate-ping" />
            <span>{activeCall.type === 'video' ? '📹 Video Call' : '📞 Voice Call'} with {activeCall.contact.name} ({formatCallDuration(activeCall.duration)})</span>
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
          SCREEN 2: ACTIVE CHAT SCREEN matching Screenshot 1 Right (Gojo Satoru Chat)
         ========================================================================= */}
      {selectedContact ? (
        <div className="w-full h-full flex flex-col bg-[#07070d] max-w-2xl mx-auto animate-fade-in relative">
          
          {/* Top Header matching Right Screenshot 1:1:
              [← Back] [Avatar + Green Dot] [Gojo Satoru ✓ / Online]   [📞] [📹] [⋮] */}
          <div className="px-4 py-3 bg-[#07070d] border-b border-slate-800/80 flex items-center justify-between z-30 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setSelectedContactKey(null)}
                className="p-1 rounded-full text-slate-200 hover:text-white transition-colors cursor-pointer"
                title="Back to DMs List"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff2e56]" />
              </button>

              <div className="relative w-10 h-10 shrink-0 rounded-full">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#ff2e56] bg-slate-900">
                  <img
                    src={selectedContact.avatar}
                    alt={selectedContact.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-black" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="font-bold text-sm sm:text-base text-white truncate">{selectedContact.name}</h2>
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#ff2e56] text-white text-[8px] font-black">✓</span>
                </div>
                <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online</span>
                </p>
              </div>
            </div>

            {/* Right Action Icons: [📞 Voice Call] [📹 Video Call] [⋮ Three-Dots Menu] */}
            <div className="flex items-center gap-3.5 text-slate-300 shrink-0">
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
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-1.5 hover:text-white transition-colors cursor-pointer"
                  title="More Options"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#141424] border border-slate-700 shadow-2xl p-1.5 z-50 space-y-1 text-xs text-slate-200 animate-fade-in">
                    <button
                      type="button"
                      onClick={() => {
                        setShowMenu(false);
                        onNavigateToProfile?.();
                      }}
                      className="w-full px-3 py-2 rounded-xl text-left hover:bg-white/10 flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-4 h-4 text-purple-400" />
                      <span>👤 View Profile</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowMenu(false);
                        handleSendMessage(`What anime do you recommend for me?`);
                      }}
                      className="w-full px-3 py-2 rounded-xl text-left hover:bg-white/10 flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#ff2e56]" />
                      <span>✨ Recommendations</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowMenu(false);
                        setChatHistory(prev => ({ ...prev, [selectedContactKey]: [] }));
                      }}
                      className="w-full px-3 py-2 rounded-xl text-left text-rose-400 hover:bg-rose-950/30 flex items-center gap-2 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>🗑 Clear Chat</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chat Messages Stream with In-Chat Profile Hero Header */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* In-Chat Hero Card matching Gojo Satoru Profile Header in Screenshot */}
            <div className="relative rounded-3xl overflow-hidden bg-slate-900/40 border border-slate-800/80 p-5 text-center space-y-2 shadow-xl">
              <div className="relative w-20 h-20 rounded-full mx-auto overflow-hidden ring-2 ring-[#ff2e56] shadow-xl bg-black">
                <img src={selectedContact.avatar} alt={selectedContact.name} className="w-full h-full object-cover" />
              </div>

              <div>
                <div className="flex items-center justify-center gap-1.5">
                  <h3 className="font-bold text-base text-white">{selectedContact.name}</h3>
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#ff2e56] text-white text-[8px] font-black">✓</span>
                </div>
                <p className="text-xs text-slate-400 font-mono">{selectedContact.handle}</p>
                <p className="text-xs text-slate-300 max-w-xs mx-auto mt-1 leading-snug">
                  {selectedContact.bio}
                </p>
                <button
                  type="button"
                  onClick={onNavigateToProfile}
                  className="text-xs font-semibold text-[#ff2e56] hover:underline mt-1.5 inline-block cursor-pointer"
                >
                  View Profile
                </button>
              </div>
            </div>

            {/* Today Date Pill matching Screenshot */}
            <div className="flex justify-center">
              <span className="px-3.5 py-0.5 rounded-full bg-[#141424] border border-slate-800 text-[10px] text-slate-400 font-semibold shadow">
                Today
              </span>
            </div>

            {/* Message Feed matching Screenshot 1:1 */}
            {currentMessages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 shrink-0 rounded-full overflow-hidden ring-1 ring-[#ff2e56] mb-1 bg-slate-900">
                      <img src={selectedContact.avatar} alt={selectedContact.name} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="space-y-1 max-w-[80%]">
                    <div
                      className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-md ${
                        isUser
                          ? 'bg-[#ff2e56] text-white rounded-br-none'
                          : 'bg-[#161626] text-slate-100 border border-slate-800 rounded-bl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <div className="flex items-center justify-end gap-1 text-[9px] opacity-75 mt-1">
                        <span>{msg.time}</span>
                        {isUser && <CheckCheck className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </div>

                    {/* Reaction Badge if present matching Screenshot */}
                    {msg.isLiked && !isUser && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#181828] border border-slate-700 text-[10px] text-white shadow">
                        ❤️ 1
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {/* Emoji Picker Tray */}
          {showEmojiPicker && (
            <div className="p-3 bg-[#121220] border-t border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {EMOJIS.map(em => (
                <button
                  key={em}
                  onClick={() => setInputText(prev => prev + ' ' + em)}
                  className="text-xl p-1.5 rounded-xl hover:bg-white/10 transition-transform active:scale-125 cursor-pointer shrink-0"
                >
                  {em}
                </button>
              ))}
            </div>
          )}

          {/* Attachment Options Tray */}
          {showAttachments && (
            <div className="grid grid-cols-4 gap-2 p-3 bg-[#10101f] border-t border-slate-800 text-center text-xs">
              <button
                onClick={() => handleSendMessage('🖼️ Shared an anime screenshot!')}
                className="p-2.5 rounded-2xl bg-slate-900 hover:bg-[#ff2e56]/20 flex flex-col items-center gap-1 cursor-pointer"
              >
                <ImageIcon className="w-5 h-5 text-[#ff2e56]" />
                <span className="text-[10px]">Photo</span>
              </button>
              <button
                onClick={() => handleSendMessage('🎬 Shared an anime fight clip!')}
                className="p-2.5 rounded-2xl bg-slate-900 hover:bg-purple-950/40 flex flex-col items-center gap-1 cursor-pointer"
              >
                <Film className="w-5 h-5 text-purple-400" />
                <span className="text-[10px]">Clip</span>
              </button>
              <button
                onClick={() => handleSendMessage('🎲 Rolled an Anime Gacha: SSR Satoru Gojo!')}
                className="p-2.5 rounded-2xl bg-slate-900 hover:bg-amber-950/40 flex flex-col items-center gap-1 cursor-pointer"
              >
                <Dices className="w-5 h-5 text-amber-400" />
                <span className="text-[10px]">Gacha</span>
              </button>
              <button
                onClick={() => handleSendMessage('🍿 Join my Watch Party room: VELNIX-7731')}
                className="p-2.5 rounded-2xl bg-slate-900 hover:bg-cyan-950/40 flex flex-col items-center gap-1 cursor-pointer"
              >
                <Radio className="w-5 h-5 text-cyan-400" />
                <span className="text-[10px]">Party Link</span>
              </button>
            </div>
          )}

          {/* Recording Audio Indicator */}
          {isRecordingVoice && (
            <div className="p-3 bg-rose-950/80 border-t border-rose-800 flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="font-bold">Recording Voice Note... 0:0{recordSeconds}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={cancelVoiceRecording}
                  className="px-3 py-1 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={stopAndSendVoiceNote}
                  className="px-3.5 py-1 rounded-xl bg-[#ff2e56] text-white text-xs font-bold cursor-pointer"
                >
                  Send 🎤
                </button>
              </div>
            </div>
          )}

          {/* Bottom Chat Input Bar matching Screenshot 1 Right: [(+)] [Message... 😊] [🎙️] */}
          <div className="p-3 bg-[#0d0d18] border-t border-slate-800/90 shrink-0">
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2">
              
              {/* Pink Plus Button on left */}
              <button
                type="button"
                onClick={() => setShowAttachments(!showAttachments)}
                className="w-10 h-10 rounded-full bg-[#ff2e56] hover:bg-[#ff4b72] text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer shrink-0"
              >
                <Plus className="w-5 h-5" />
              </button>

              {/* Message Pill with Smiley inside */}
              <div className="flex-1 flex items-center bg-[#141424] rounded-full px-4 py-2.5 border border-slate-700/80">
                <input
                  type="text"
                  placeholder="Message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer ml-2"
                >
                  <Smile className="w-5 h-5" />
                </button>
              </div>

              {/* Send or Microphone Button */}
              {inputText.trim() ? (
                <button
                  type="submit"
                  className="w-10 h-10 rounded-full bg-[#ff2e56] hover:bg-[#ff4b72] text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4 fill-current ml-0.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onMouseDown={startRecordingVoice}
                  onClick={startRecordingVoice}
                  className="p-2.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Record Voice Note"
                >
                  <Mic className="w-5 h-5" />
                </button>
              )}
            </form>
          </div>

        </div>
      ) : (
        /* =========================================================================
            SCREEN 1: DMs LIST SCREEN matching Screenshot 1 Left 1:1
           ========================================================================= */
        <div className="w-full h-full flex flex-col bg-[#07070d] max-w-md md:max-w-xl mx-auto animate-fade-in font-sans">
          
          {/* Top Header with Back Button on top left corner: [← Back] [Velnix]   [📝] */}
          <div className="p-4 bg-[#07070d] border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Back button on top left corner to go back to Home */}
              <button
                type="button"
                onClick={onBack}
                className="p-1 rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Back to Home"
              >
                <ArrowLeft className="w-6 h-6 text-[#ff2e56]" />
              </button>

              <span className="text-2xl font-black italic tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#ff2e56] via-[#ff5b7e] to-white font-serif">
                Velnix
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <button
                type="button"
                onClick={() => setSelectedContactKey('claire')}
                className="hover:text-white transition-colors cursor-pointer p-1"
                title="Compose Message"
              >
                <Edit3 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* DMs Title with Pink Underline matching Screenshot 1 Left */}
          <div className="px-5 pt-3">
            <h1 className="text-xl font-black font-heading text-white">DMs</h1>
            <div className="w-8 h-0.5 bg-[#ff2e56] rounded-full mt-1" />
          </div>

          {/* Search Messages Input matching Screenshot */}
          <div className="p-4">
            <div className="flex items-center justify-between px-3.5 py-2 rounded-2xl bg-[#121220] border border-slate-800 text-xs">
              <div className="flex items-center gap-2 flex-1">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white placeholder-slate-400 focus:outline-none w-full"
                />
              </div>
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
            </div>
          </div>

          {/* Story / Contact Bubbles Row with Exact Fixed Sizing matching Screenshot 1 Left */}
          <div className="px-4 pb-3 flex items-center gap-4 overflow-x-auto no-scrollbar border-b border-slate-800/60">
            {storyBubbles.map((contact) => (
              <div
                key={contact.key}
                onClick={() => setSelectedContactKey(contact.key)}
                className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group"
              >
                <div className="relative w-14 h-14 shrink-0 rounded-full">
                  <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#ff2e56] bg-slate-900 shadow-md">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-[#07070d]" />
                </div>
                <span className="text-[10px] text-slate-300 font-medium">{contact.name}</span>
              </div>
            ))}
          </div>

          {/* Tabs: Primary (with pink underline) | Requests (2) matching Screenshot */}
          <div className="flex items-center px-5 pt-2 border-b border-slate-800/60 text-xs font-bold">
            <button
              onClick={() => setActiveTab('primary')}
              className={`pb-2.5 transition-all relative cursor-pointer ${
                activeTab === 'primary' ? 'text-white' : 'text-slate-400'
              }`}
            >
              Primary
              {activeTab === 'primary' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff2e56] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('requests')}
              className="ml-6 pb-2.5 text-slate-400 flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors"
            >
              <span>Requests</span>
              <span className="px-1.5 py-0.2 rounded-full bg-[#ff2e56] text-white text-[9px] font-bold">
                2
              </span>
            </button>
          </div>

          {/* Conversation Threads List with Exact Sizing matching Screenshot 1 Left */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
            {threadItems
              .filter(item => !searchQuery.trim() || item.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((thread) => (
                <div
                  key={thread.key}
                  onClick={() => setSelectedContactKey(thread.key)}
                  className={`p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-white/5 transition-colors group ${
                    thread.unread > 0 ? 'bg-[#0e0c18]/60' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-12 h-12 shrink-0 rounded-full">
                      <div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-[#ff2e56] bg-slate-900 shadow">
                        <img 
                          src={CONTACTS[thread.key]?.avatar || CONTACTS.gojo.avatar} 
                          alt={thread.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex items-center gap-1">
                        <h4 className="font-bold text-sm text-white group-hover:text-[#ff2e56] transition-colors truncate">
                          {thread.name}
                        </h4>
                        {thread.verified && (
                          <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#ff2e56] text-white text-[8px] font-black">✓</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 truncate">{thread.snippet}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-500 block">{thread.time}</span>
                    {thread.unread > 0 && (
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#ff2e56] text-white text-[9px] font-bold mt-1 shadow-md">
                        {thread.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </div>

        </div>
      )}

    </div>
  );
};
