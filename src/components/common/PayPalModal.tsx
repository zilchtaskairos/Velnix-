import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  CreditCard, 
  Globe, 
  Tv, 
  BookOpen, 
  Gamepad2, 
  Bot, 
  Video,
  Lock,
  ArrowRight
} from 'lucide-react';

export const PayPalModal: React.FC = () => {
  const { isPayPalOpen, setIsPayPalOpen, settings, updateSettings, upgradeToVipWithPayPal, addToast } = useApp();
  const [selectedTier, setSelectedTier] = useState<'ultra_vip' | 'creator_pass'>('ultra_vip');
  const [currency, setCurrency] = useState('USD ($)');
  const [paypalRecipient, setPaypalRecipient] = useState(settings.paypalEmailAddress || 'velnix.official@gmail.com');
  const [isProcessing, setIsProcessing] = useState(false);
  const [buyerEmail, setBuyerEmail] = useState('');

  if (!isPayPalOpen) return null;

  const handlePaypalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      upgradeToVipWithPayPal(selectedTier, paypalRecipient);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl bg-black/85 animate-fade-in overflow-y-auto">
      <div className="fixed inset-0" onClick={() => setIsPayPalOpen(false)} />

      <div className="relative w-full max-w-2xl bg-[#0f0f20] border border-purple-900/60 rounded-3xl shadow-2xl overflow-hidden z-10 animate-slide-up flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-purple-950/80 via-[#13132a] to-cyan-950/60 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-[2px] shadow-lg shadow-purple-600/30">
              <div className="w-full h-full bg-[#0d0d1a] rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold font-heading text-white">
                  Velnix Ultra VIP & Creator Pass
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] font-bold uppercase">
                  Global PayPal
                </span>
              </div>
              <p className="text-xs text-slate-400">Unlock 4K streaming, Manga reader, Gaming sync & 150-person Watch Parties</p>
            </div>
          </div>

          <button
            onClick={() => setIsPayPalOpen(false)}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Plan Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setSelectedTier('ultra_vip')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedTier === 'ultra_vip'
                  ? 'bg-purple-950/40 border-purple-500 shadow-lg shadow-purple-600/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-white">Ultra VIP Streamer</span>
                <span className="text-base font-extrabold text-cyan-300">$4.99 / mo</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>4K Ultra HD & 1080p 60fps Playback</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Full Manga Library & Chapter Reader</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Connect Gaming Accounts (Levels & Stats)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Host 150-Person Watch Parties</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Claire VIP Assistant & Store Guide</span>
                </li>
              </ul>
            </div>

            <div
              onClick={() => setSelectedTier('creator_pass')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedTier === 'creator_pass'
                  ? 'bg-purple-950/40 border-purple-500 shadow-lg shadow-purple-600/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-white">VIP Creator Studio Pass</span>
                <span className="text-base font-extrabold text-amber-300">$9.99 / mo</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>All Ultra VIP Streamer Features Included</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Velnix Studio VIP Editing Filters & Audio</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Upload Unlimited Pulse Anime Shorts</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Verified Creator Badge on Profile</span>
                </li>
              </ul>
            </div>
          </div>

          {/* PayPal Destination Configuration */}
          <div className="p-4 rounded-2xl bg-[#121226] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wide">
                  Global PayPal Destination & Currency
                </span>
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> All Countries Supported
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Payout PayPal Account
                </label>
                <input
                  type="email"
                  value={paypalRecipient}
                  onChange={(e) => {
                    setPaypalRecipient(e.target.value);
                    updateSettings({ paypalEmailAddress: e.target.value });
                  }}
                  placeholder="your-paypal@email.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Currency Selector
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:outline-none"
                >
                  <option value="USD ($)">USD ($) — United States Dollar</option>
                  <option value="EUR (€)">EUR (€) — Euro</option>
                  <option value="GBP (£)">GBP (£) — British Pound</option>
                  <option value="KES (KSh)">KES (KSh) — Kenyan Shilling</option>
                  <option value="JPY (¥)">JPY (¥) — Japanese Yen</option>
                  <option value="CAD ($)">CAD ($) — Canadian Dollar</option>
                  <option value="AUD ($)">AUD ($) — Australian Dollar</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Form with PayPal Button */}
          <form onSubmit={handlePaypalSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Your Email Address (For Order Receipt)
              </label>
              <input
                type="email"
                required
                placeholder="youremail@domain.com"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Official PayPal Button Style */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 rounded-2xl bg-[#ffc439] hover:bg-[#f4b92b] text-[#003087] font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20 transition-all transform active:scale-98 cursor-pointer"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2 text-slate-900">
                  <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  Connecting to PayPal Secure Checkout...
                </span>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="italic font-black text-lg">Pay<span className="text-[#0079c1]">Pal</span></span>
                  <span>Checkout — {selectedTier === 'ultra_vip' ? '$4.99' : '$9.99'}</span>
                </div>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" /> 256-Bit SSL Encrypted
              </span>
              <span>•</span>
              <span>Cancel Anytime</span>
              <span>•</span>
              <span>Instant VIP Activation</span>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};
