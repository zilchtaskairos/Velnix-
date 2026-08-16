import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Keyboard, Play, Search, Volume2, Maximize, FastForward } from 'lucide-react';

export const ShortcutsModal: React.FC = () => {
  const { isShortcutsOpen, setIsShortcutsOpen } = useApp();

  if (!isShortcutsOpen) return null;

  const shortcuts = [
    { key: 'Space / K', description: 'Play / Pause video streaming', icon: <Play className="w-4 h-4 text-purple-400" /> },
    { key: '← / →', description: 'Seek Backward / Forward 5 seconds', icon: <FastForward className="w-4 h-4 text-cyan-400" /> },
    { key: 'F', description: 'Toggle Fullscreen Player', icon: <Maximize className="w-4 h-4 text-yellow-400" /> },
    { key: 'M', description: 'Mute / Unmute Audio', icon: <Volume2 className="w-4 h-4 text-pink-400" /> },
    { key: 'Ctrl + K / ⌘ + K', description: 'Open Global Search Bar', icon: <Search className="w-4 h-4 text-purple-400" /> },
    { key: '?', description: 'Toggle Keyboard Shortcuts Sheet', icon: <Keyboard className="w-4 h-4 text-emerald-400" /> },
    { key: 'S', description: 'Skip Intro / Outro (when active)', icon: <FastForward className="w-4 h-4 text-amber-400" /> },
    { key: 'D', description: 'Toggle Live Danmaku Bullet Comments', icon: <Keyboard className="w-4 h-4 text-blue-400" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/80 animate-fade-in">
      <div className="fixed inset-0" onClick={() => setIsShortcutsOpen(false)} />

      <div className="relative w-full max-w-lg bg-[#111120] border border-purple-900/50 rounded-2xl shadow-2xl overflow-hidden z-10 animate-slide-up p-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5 text-white font-bold">
            <div className="p-2 rounded-lg bg-purple-600/20 text-purple-400">
              <Keyboard className="w-5 h-5" />
            </div>
            <span>Velnix Keyboard Shortcuts</span>
          </div>
          <button
            onClick={() => setIsShortcutsOpen(false)}
            className="p-1 text-slate-400 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-3">
          {shortcuts.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-slate-800/40">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                {item.icon}
                <span>{item.description}</span>
              </div>
              <kbd className="px-2.5 py-1 text-xs font-mono font-bold text-purple-300 bg-purple-950/60 border border-purple-800/60 rounded-md shadow-sm">
                {item.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-800 text-center">
          <button
            onClick={() => setIsShortcutsOpen(false)}
            className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium text-xs transition-colors"
          >
            Got it, Let's Stream!
          </button>
        </div>
      </div>
    </div>
  );
};
