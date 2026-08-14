import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Send, 
  ArrowLeft, 
  Phone, 
  Video, 
  MoreVertical, 
  Smile, 
  Mic, 
  Plus, 
  CheckCheck, 
  Search,
  SlidersHorizontal,
  Cloud,
  Edit3,
  Heart
} from 'lucide-react';

const CONTACT_AVATARS: Record<string, { name: string; avatar: string; handle: string; bio: string; initialMessage: string }> = {
  'claire': {
    name: 'Claire',
    avatar: '/claire_avatar.jpg',
    handle: '@claire_ai',
    bio: 'Your AI anime companion. Here to help you find, track, and enjoy anime.',
    initialMessage: 'What anime should we watch today? ✨'
  },
  'gojo': {
    name: 'Gojo Satoru',
    avatar: 'https://cdn.myanimelist.net/images/characters/15/422168.jpg',
    handle: '@thehonoredone',
    bio: 'The Strongest. Enjoyer of sweets and chaos.',
    initialMessage: 'Yo! 🖐️'
  },
  'hinata': {
    name: 'Hinata Hyuga',
    avatar: 'https://cdn.myanimelist.net/images/characters/10/72793.jpg',
    handle: '@hinata_hyuga',
    bio: 'Leaf Village Kunoichi 🌸',
    initialMessage: 'Thanks! 😊'
  },
  'tanjiro': {
    name: 'Tanjiro Kamado',
    avatar: 'https://cdn.myanimelist.net/images/characters/3/548235.jpg',
    handle: '@tanjiro_demon_slayer',
    bio: 'Demon Slayer Corps. Never give up!',
    initialMessage: "Let's go again sometime!"
  },
  'zerotwo': {
    name: 'Zero Two',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    handle: '@darling_002',
    bio: 'Darling in the Franxx 💕',
    initialMessage: '👀 ❤️'
  },
  'levi': {
    name: 'Levi Ackerman',
    avatar: 'https://cdn.myanimelist.net/images/characters/2/548236.jpg',
    handle: '@captain_levi',
    bio: 'Survey Corps Captain. Clean your room.',
    initialMessage: '👍'
  }
};

export const DirectMessagesModal: React.FC = () => {
  const { 
    isMessagesOpen, 
    setIsMessagesOpen, 
    claireMessages, 
    isClaireTyping, 
    askClaire,
    currentUser,
    navigateTo,
    addToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'primary' | 'requests'>('primary');
  const [selectedContactKey, setSelectedContactKey] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Story contact bubbles list matching Screenshot 1 Left
  const storyContacts = [
    { key: 'gojo', label: 'Gojo', avatar: CONTACT_AVATARS.gojo.avatar },
    { key: 'hinata', label: 'Hinata', avatar: CONTACT_AVATARS.hinata.avatar },
    { key: 'tanjiro', label: 'Tanjiro', avatar: CONTACT_AVATARS.tanjiro.avatar },
    { key: 'zerotwo', label: 'Zero Two', avatar: CONTACT_AVATARS.zerotwo.avatar },
    { key: 'levi', label: 'Levi', avatar: CONTACT_AVATARS.levi.avatar },
    { key: 'claire', label: 'Claire', avatar: CONTACT_AVATARS.claire.avatar }
  ];

  // Active threads list: starts with ONLY Claire as requested!
  const activeThreads = [
    {
      key: 'claire',
      name: 'Claire',
      avatar: CONTACT_AVATARS.claire.avatar,
      lastMessage: 'What anime should we watch today? ✨',
      time: 'Just now',
      unread: 1
    }
  ];

  const selectedContact = selectedContactKey ? CONTACT_AVATARS[selectedContactKey] : null;

  useEffect(() => {
    if (selectedContactKey) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [claireMessages, isClaireTyping, selectedContactKey]);

  if (!isMessagesOpen) return null;

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    askClaire(inputText.trim());
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 w-full h-full bg-[#07070d] flex flex-col font-sans select-none animate-fade-in">
      
      {/* =========================================================================
          SCREEN 2: ACTIVE CONVERSATION SCREEN (When a contact is opened)
          Matches Right Screenshot (Gojo Satoru / Claire Chat Screen)
         ========================================================================= */}
      {selectedContact ? (
        <div className="w-full h-full flex flex-col bg-[#07070d] max-w-2xl mx-auto border-x border-slate-800/60 shadow-2xl animate-fade-in">
          
          {/* Top Header matching Right Screenshot */}
          <div className="px-4 py-3 bg-[#0d0d18] border-b border-slate-800/90 flex items-center justify-between z-30 shadow-md shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setSelectedContactKey(null)}
                className="p-1 rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Back to DMs"
              >
                <ArrowLeft className="w-6 h-6 text-[#ff2e56]" />
              </button>

              <div className="relative shrink-0">
                <img
                  src={selectedContact.avatar}
                  alt={selectedContact.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-[#ff2e56]"
                />
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

            {/* Right Header Icons matching Screenshot: [📞] [📹] [⋮] */}
            <div className="flex items-center gap-3.5 text-slate-300 shrink-0">
              <button
                type="button"
                onClick={() => addToast({ title: `Voice Call 📞`, description: `Calling ${selectedContact.name}...`, type: 'info' })}
                className="p-1 hover:text-white transition-colors cursor-pointer"
              >
                <Phone className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => addToast({ title: `Video Call 📹`, description: `Starting video stream with ${selectedContact.name}...`, type: 'info' })}
                className="p-1 hover:text-white transition-colors cursor-pointer"
              >
                <Video className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setShowOptions(!showOptions)}
                className="p-1 hover:text-white transition-colors cursor-pointer"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Stream with In-Chat Profile Hero matching Right Screenshot */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* In-Chat Hero Card matching Gojo Satoru Profile Header in Screenshot */}
            <div className="relative rounded-3xl overflow-hidden bg-[#0e0e1a] border border-slate-800/80 p-5 text-center space-y-2 shadow-xl">
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
                  onClick={() => {
                    setIsMessagesOpen(false);
                    navigateTo('profile');
                  }}
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

            {/* Message Stream matching Right Screenshot */}
            {selectedContactKey === 'claire' ? (
              claireMessages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <img src={selectedContact.avatar} alt={selectedContact.name} className="w-7 h-7 rounded-full object-cover ring-1 ring-[#ff2e56] shrink-0 mb-1" />
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
              })
            ) : (
              /* Contact Messages Feed matching Right Screenshot */
              <div className="space-y-3">
                <div className="flex items-end gap-2 justify-start">
                  <img src={selectedContact.avatar} alt={selectedContact.name} className="w-7 h-7 rounded-full object-cover ring-1 ring-[#ff2e56] shrink-0 mb-1" />
                  <div className="bg-[#161626] text-slate-100 p-3 rounded-2xl rounded-bl-none border border-slate-800 text-xs sm:text-sm">
                    <p>{selectedContact.initialMessage}</p>
                    <span className="text-[9px] opacity-75 mt-1 block text-right">01:32 PM</span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-[#ff2e56] text-white p-3 rounded-2xl rounded-br-none text-xs sm:text-sm shadow-md">
                    <p>Hey! What's up?</p>
                    <div className="flex items-center justify-end gap-1 text-[9px] opacity-75 mt-1">
                      <span>01:33 PM</span>
                      <CheckCheck className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="flex items-end gap-2 justify-start">
                  <img src={selectedContact.avatar} alt={selectedContact.name} className="w-7 h-7 rounded-full object-cover ring-1 ring-[#ff2e56] shrink-0 mb-1" />
                  <div className="bg-[#161626] text-slate-100 p-3 rounded-2xl rounded-bl-none border border-slate-800 text-xs sm:text-sm">
                    <p>Watching anime on Velnix. How about you?</p>
                    <span className="text-[9px] opacity-75 mt-1 block text-right">01:34 PM</span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-[#ff2e56] text-white p-3 rounded-2xl rounded-br-none text-xs sm:text-sm shadow-md">
                    <p>Bleach TYBW & Solo Leveling! 🔥</p>
                    <div className="flex items-center justify-end gap-1 text-[9px] opacity-75 mt-1">
                      <span>01:35 PM</span>
                      <CheckCheck className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="flex items-end gap-2 justify-start">
                  <img src={selectedContact.avatar} alt={selectedContact.name} className="w-7 h-7 rounded-full object-cover ring-1 ring-[#ff2e56] shrink-0 mb-1" />
                  <div className="space-y-1">
                    <div className="bg-[#161626] text-slate-100 p-3 rounded-2xl rounded-bl-none border border-slate-800 text-xs sm:text-sm">
                      <p>Peak choice. 😎 See you tomorrow 🤞</p>
                      <span className="text-[9px] opacity-75 mt-1 block text-right">01:35 PM</span>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#181828] border border-slate-700 text-[10px] text-white shadow">
                      ❤️ 1
                    </span>
                  </div>
                </div>
              </div>
            )}

            {isClaireTyping && selectedContactKey === 'claire' && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <img src={selectedContact.avatar} alt="Claire" className="w-7 h-7 rounded-full object-cover ring-1 ring-[#ff2e56]" />
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
          <div className="p-3 bg-[#0d0d18] border-t border-slate-800/90 shrink-0">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => addToast({ title: 'Attach Media', description: 'Upload image or pulse clip.', type: 'info' })}
                className="w-10 h-10 rounded-full bg-[#ff2e56] hover:bg-[#ff4b72] text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer shrink-0"
              >
                <Plus className="w-5 h-5" />
              </button>

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
                  onClick={() => setInputText(prev => prev + ' 😊')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer ml-2"
                >
                  <Smile className="w-5 h-5" />
                </button>
              </div>

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
            SCREEN 1: DMs LIST SCREEN matching Screenshot 1 Left 1:1
           ========================================================================= */
        <div className="w-full h-full flex flex-col bg-[#07070d] max-w-md md:max-w-xl mx-auto border-x border-slate-800/60 shadow-2xl animate-fade-in font-sans">
          
          {/* Top Header matching Left Screenshot: [Velnix] [☁️] [📝] [✕] */}
          <div className="p-4 bg-[#07070d] border-b border-slate-800/80 flex items-center justify-between">
            <span className="text-2xl font-black italic tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#ff2e56] via-[#ff5b7e] to-white font-serif">
              Velnix
            </span>

            <div className="flex items-center gap-4 text-slate-300">
              <button
                type="button"
                onClick={() => {
                  setIsMessagesOpen(false);
                  navigateTo('extensions');
                }}
                className="hover:text-white transition-colors cursor-pointer"
                title="Extensions"
              >
                <Cloud className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => addToast({ title: 'New Message', description: 'Select a contact to message.', type: 'info' })}
                className="hover:text-white transition-colors cursor-pointer"
                title="Compose Message"
              >
                <Edit3 className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setIsMessagesOpen(false)}
                className="hover:text-white transition-colors cursor-pointer ml-1"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* DMs Title matching Screenshot */}
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
                  className="bg-transparent text-white placeholder-slate-400 focus:outline-none w-full"
                />
              </div>
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
            </div>
          </div>

          {/* Story / Contact Bubbles Row matching Screenshot (Gojo, Hinata, Tanjiro, Zero Two, Levi, Claire) */}
          <div className="px-4 pb-3 flex items-center gap-4 overflow-x-auto no-scrollbar border-b border-slate-800/60">
            {storyContacts.map((contact) => (
              <div
                key={contact.key}
                onClick={() => setSelectedContactKey(contact.key)}
                className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group"
              >
                <div className="relative">
                  <img
                    src={contact.avatar}
                    alt={contact.label}
                    className="w-13 h-13 rounded-full object-cover ring-2 ring-[#ff2e56] group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#07070d]" />
                </div>
                <span className="text-[10px] text-slate-300 font-medium">{contact.label}</span>
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

          {/* Active Conversation Threads List: starts with ONLY Claire as requested! */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
            {activeThreads.map((thread) => (
              <div
                key={thread.key}
                onClick={() => setSelectedContactKey(thread.key)}
                className="p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <img src={thread.avatar} alt={thread.name} className="w-12 h-12 rounded-full object-cover ring-1 ring-[#ff2e56]" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-1 ring-[#07070d]" />
                  </div>

                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex items-center gap-1">
                      <h4 className="font-bold text-sm text-white group-hover:text-[#ff2e56] transition-colors truncate">
                        {thread.name}
                      </h4>
                      <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#ff2e56] text-white text-[8px] font-black">✓</span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">{thread.lastMessage}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-500 block">{thread.time}</span>
                  {thread.unread && (
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
