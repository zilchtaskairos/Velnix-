import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Palette, 
  Tv, 
  HardDrive, 
  Trash2, 
  Check, 
  CreditCard, 
  Zap, 
  ShieldCheck, 
  ChevronRight,
  ExternalLink 
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    clearHistory, 
    navigateTo,
    repositories,
    extensions,
    addToast 
  } = useApp();

  const [paypalInput, setPaypalInput] = useState(settings.paypalEmailAddress || 'velnix.official@gmail.com');

  const themes = [
    { id: 'velnix-violet', label: 'Velnix Violet (Default)', color: '#8b5cf6', desc: 'Deep violet space with neon cyan accents' },
    { id: 'cyber-amber', label: 'Cyberpunk Amber', color: '#f59e0b', desc: 'High-contrast solar amber & carbon black' },
    { id: 'emerald-blade', label: 'Emerald Blade', color: '#10b981', desc: 'Sleek dark jade with cybernetic greens' },
    { id: 'crimson-blood', label: 'Crimson Blood', color: '#ef4444', desc: 'Vibrant neon red for dark fantasy' },
    { id: 'oled-midnight', label: 'Midnight OLED', color: '#6366f1', desc: 'True pitch black 0% battery saver mode' }
  ];

  const handleSavePayPal = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ paypalEmailAddress: paypalInput });
    addToast({ title: 'PayPal Configured! 💳', description: `Payouts directed to ${paypalInput}`, type: 'success' });
  };

  return (
    <div className="animate-fade-in pb-32 space-y-6 max-w-2xl mx-auto">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-purple-950 text-purple-300 border border-purple-800 rounded-full">
            Preferences & Engine
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
          Settings & Extensions
        </h1>
      </div>

      {/* 1. CLOUDSTREAM REPOSITORIES & EXTENSIONS MANAGER LINK */}
      <div 
        onClick={() => navigateTo('extensions')}
        className="p-5 rounded-3xl bg-gradient-to-r from-purple-950/60 via-[#121226] to-[#1c0c18] border border-[#ff2e56]/40 hover:border-[#ff2e56] shadow-xl flex items-center justify-between cursor-pointer group transition-all"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#ff2e56] text-white flex items-center justify-center shadow-lg shadow-pink-600/30">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-[#ff2e56] transition-colors">
                Extensions & Provider Repositories
              </h3>
              <span className="px-2 py-0.2 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                {repositories.length} Repos
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Add repositories via shortcode (kairo, anime, english) or GitHub raw JSON URLs
            </p>
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors shrink-0" />
      </div>

      {/* 2. Global App Color Scheme Customizer */}
      <div className="p-6 rounded-3xl bg-[#101022] border border-slate-800/80 space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
          <Palette className="w-5 h-5 text-purple-400" />
          <div>
            <h3 className="text-base font-bold text-white">Full Application Color Theme</h3>
            <p className="text-xs text-slate-400">Instantly changes accent glowing colors across all pages</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {themes.map((th) => {
            const isSelected = settings.theme === th.id;
            return (
              <button
                key={th.id}
                onClick={() => updateSettings({ theme: th.id as any })}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                  isSelected
                    ? 'bg-purple-950/40 border-purple-500 shadow-md shadow-purple-600/20'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div
                  className="w-6 h-6 rounded-full shrink-0 mt-0.5 ring-2 ring-white/30"
                  style={{ backgroundColor: th.color }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs sm:text-sm text-white">{th.label}</h4>
                    {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{th.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Global PayPal Payout Destination */}
      <div className="p-6 rounded-3xl bg-[#101022] border border-slate-800/80 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <CreditCard className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold text-white">PayPal Payout Destination</h3>
              <p className="text-xs text-slate-400">All VIP upgrade subscriptions route directly here</p>
            </div>
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Worldwide Available
          </span>
        </div>

        <form onSubmit={handleSavePayPal} className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="email"
            required
            value={paypalInput}
            onChange={(e) => setPaypalInput(e.target.value)}
            placeholder="your-paypal-email@domain.com"
            className="flex-1 w-full bg-slate-900 border border-slate-700 px-4 py-2.5 rounded-xl text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-colors"
          >
            Save PayPal Address
          </button>
        </form>
      </div>

      {/* 4. Playback & 4K Streaming Defaults */}
      <div className="p-6 rounded-3xl bg-[#101022] border border-slate-800/80 space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
          <Tv className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-white">Playback Defaults</h3>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div>
            <h4 className="font-semibold text-slate-200">Default Resolution</h4>
            <p className="text-slate-400">Stream will launch in this resolution by default</p>
          </div>
          <select
            value={settings.defaultQuality}
            onChange={(e) => updateSettings({ defaultQuality: e.target.value as any })}
            className="py-1.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold"
          >
            <option value="4K Ultra">4K Ultra HD (VIP)</option>
            <option value="1080p">1080p Full HD</option>
            <option value="720p">720p HD</option>
            <option value="480p">480p SD</option>
          </select>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs">
          <div>
            <h4 className="font-semibold text-slate-200">Preferred Audio Language</h4>
            <p className="text-slate-400">Choose between Japanese Subtitled or English Dubbed</p>
          </div>
          <select
            value={settings.defaultAudio}
            onChange={(e) => updateSettings({ defaultAudio: e.target.value as any })}
            className="py-1.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold"
          >
            <option value="sub">Subtitled (Japanese Original)</option>
            <option value="dub">Dubbed (English Voiceover)</option>
          </select>
        </div>
      </div>

      {/* 5. Cache & Data Storage */}
      <div className="p-6 rounded-3xl bg-[#101022] border border-slate-800/80 space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
          <HardDrive className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-white">Data & Cache Management</h3>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div>
            <h4 className="font-semibold text-slate-200">Clear Playback History</h4>
            <p className="text-slate-400">Resets timestamps and continues from episode 1</p>
          </div>
          <button
            onClick={clearHistory}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 border border-slate-700 hover:border-rose-500 text-slate-300 hover:text-rose-300 text-xs font-semibold flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        </div>
      </div>

    </div>
  );
};
