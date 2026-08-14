import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Maximize2,
  ArrowUp,
  Mic,
  Paperclip
} from 'lucide-react';

export const ClaireWidget: React.FC = () => {
  const { 
    isClaireOpen, 
    setIsClaireOpen, 
    claireMessages, 
    askClaire, 
    navigateTo,
    animes,
    addToast 
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isClaireOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [claireMessages, isClaireOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    askClaire(inputVal);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const quickPrompts = [
    '⚔️ Hype Action Anime',
    '🎌 Anime Conventions 2026',
    '🛍️ Tokyo Figure Stores',
    '📖 Manga Recommendations'
  ];

  return (
    <>
      {/* Floating Action Button */}
      {!isClaireOpen && (
        <div className="fixed bottom-16 right-4 sm:bottom-6 sm:left-6 z-40 animate-bounce">
          <button
            onClick={() => setIsClaireOpen(true)}
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#ff2e56] via-purple-600 to-cyan-500 text-white font-bold text-xs shadow-2xl shadow-pink-600/50 hover:shadow-cyan-500/50 transition-all transform hover:scale-105 active:scale-95"
            title="Ask Claire (AI Anime Assistant)"
          >
            <div className="w-7 h-7 rounded-full bg-black/40 p-0.5 overflow-hidden ring-1 ring-white/50">
              <img
                src="/claire_avatar.jpg"
                alt="Claire"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span>Ask Claire AI</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </button>
        </div>
      )}

      {/* Expandable Chat Dialog */}
      {isClaireOpen && (
        <div className="fixed bottom-16 right-4 sm:bottom-6 sm:left-6 z-50 w-full max-w-sm sm:max-w-md h-[560px] bg-[#0f0f22] border border-purple-900/70 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-slide-up backdrop-blur-2xl">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-purple-950 via-[#13132c] to-[#1f0d1a] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src="/claire_avatar.jpg"
                  alt="Claire"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-[#ff2e56]"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-black" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-white">Claire</h4>
                  <span className="px-1.5 py-0.2 rounded bg-[#ff2e56] text-white text-[9px] font-black uppercase">
                    AI
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">Recommendations • Conventions • Stores</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setIsClaireOpen(false);
                  navigateTo('claire');
                }}
                className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white text-xs"
                title="Full Page Experience"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsClaireOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Strip */}
          <div className="px-3 py-2 bg-[#0b0b18] border-b border-slate-800/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => askClaire(prompt)}
                className="px-2.5 py-1 rounded-full bg-slate-900/90 hover:bg-[#ff2e56]/30 border border-slate-800 hover:border-[#ff2e56] text-slate-300 hover:text-white text-[11px] font-medium whitespace-nowrap transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 bg-[#0d0d1e]">
            {claireMessages.map((msg) => {
              const isClaire = msg.sender === 'claire';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isClaire ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`p-3 rounded-2xl text-xs space-y-2 max-w-[90%] ${
                      isClaire
                        ? 'bg-[#15152c] text-slate-200 border border-purple-900/40 rounded-tl-none'
                        : 'bg-[#ff2e56] text-white rounded-br-none'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Huge Spacious Input Area */}
          <form onSubmit={handleSubmit} className="p-3 bg-[#111124] border-t border-slate-800 space-y-2">
            <textarea
              rows={2}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Claire anything about anime, conventions, shops..."
              className="w-full bg-[#16162a] border border-slate-700 px-3.5 py-2 rounded-2xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#ff2e56] resize-none"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400">
                <button
                  type="button"
                  onClick={() => addToast({ title: 'Voice Input', description: 'Listening to your voice prompt...', type: 'info' })}
                  className="p-1 hover:text-white"
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => addToast({ title: 'Attach Media', description: 'Upload screenshot or character art.', type: 'info' })}
                  className="p-1 hover:text-white"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
              </div>
              <button
                type="submit"
                disabled={!inputVal.trim()}
                className="px-4 py-1.5 rounded-xl bg-[#ff2e56] hover:bg-[#ff4b72] disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1 shadow-md"
              >
                <span>Send</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

        </div>
      )}
    </>
  );
};
