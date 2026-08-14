import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Zap, 
  Check, 
  Sparkles, 
  Server, 
  ShieldCheck, 
  Download, 
  RefreshCw, 
  ExternalLink,
  Plus
} from 'lucide-react';

export const ExtensionsModal: React.FC = () => {
  const { 
    isExtensionsOpen, 
    setIsExtensionsOpen, 
    extensions, 
    toggleExtension, 
    activeExtensionId, 
    setActiveExtensionId,
    addToast 
  } = useApp();

  const [repoUrlInput, setRepoUrlInput] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'installed' | 'dub' | '4k'>('all');

  if (!isExtensionsOpen) return null;

  const handleAddRepo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrlInput.trim()) return;
    addToast({
      title: 'Anime Repository Added! ⚡',
      description: `Installed providers from "${repoUrlInput}"`,
      type: 'success'
    });
    setRepoUrlInput('');
  };

  const filteredExtensions = extensions.filter((ext) => {
    if (filterType === 'dub' && !ext.supportsDub) return false;
    if (filterType === '4k' && !ext.qualities.includes('4K')) return false;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-xl bg-black/85 animate-fade-in overflow-hidden">
      <div className="fixed inset-0" onClick={() => setIsExtensionsOpen(false)} />

      <div className="relative w-full max-w-2xl h-[85vh] bg-[#090912] border border-slate-800/80 rounded-3xl shadow-2xl overflow-hidden z-10 animate-slide-up flex flex-col">
        
        {/* Header matching Cloudstream style */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-950/60 via-[#101024] to-[#1a0c16] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#ff2e56] text-white flex items-center justify-center shadow-lg shadow-pink-600/30">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white">Anime Stream Extensions</h3>
                <span className="px-2 py-0.2 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                  {extensions.filter(e => e.isEnabled).length} ACTIVE
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Cloudstream-style modular anime scrapers & extractors</p>
            </div>
          </div>

          <button
            onClick={() => setIsExtensionsOpen(false)}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2.5 bg-[#0e0e1a] border-b border-slate-800/60 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5">
            {[
              { id: 'all', label: 'All Providers' },
              { id: '4k', label: '4K Ultra HD' },
              { id: 'dub', label: 'English Dubbed' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as any)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  filterType === tab.id
                    ? 'bg-[#ff2e56] text-white shadow'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
            Zero-Ad HLS Extraction
          </span>
        </div>

        {/* Extensions List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredExtensions.map((ext) => {
            const isPrimary = ext.id === activeExtensionId;
            return (
              <div
                key={ext.id}
                className={`p-4 rounded-2xl border transition-all ${
                  ext.isEnabled
                    ? 'bg-[#121222] border-slate-800 hover:border-[#ff2e56]/60'
                    : 'bg-[#0b0b14] border-slate-900 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={ext.icon}
                      alt={ext.name}
                      className="w-11 h-11 rounded-2xl object-cover ring-1 ring-slate-700 shrink-0 mt-0.5"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-xs sm:text-sm text-white">{ext.name}</h4>
                        <span className="px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 text-[9px] font-mono font-bold">
                          {ext.version}
                        </span>
                        {isPrimary && (
                          <span className="px-1.5 py-0.2 rounded bg-[#ff2e56] text-white text-[9px] font-bold">
                            PRIMARY STREAM
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">{ext.description}</p>

                      {/* Capabilities & Extractors */}
                      <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-300 flex-wrap">
                        <span className="text-emerald-400 font-mono font-bold">● {ext.pingMs}ms</span>
                        <span>•</span>
                        <span className="text-cyan-300">{ext.qualities.join(', ')}</span>
                        <span>•</span>
                        <span>{ext.extractors.join(' / ')}</span>
                        {ext.supportsAutoSkip && (
                          <span className="px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 text-[9px] font-bold">
                            Auto-Skip OP/ED
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => toggleExtension(ext.id)}
                      className={`w-11 h-6 rounded-full transition-colors relative ${
                        ext.isEnabled ? 'bg-[#ff2e56]' : 'bg-slate-800'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                          ext.isEnabled ? 'right-1' : 'left-1'
                        }`}
                      />
                    </button>

                    {ext.isEnabled && !isPrimary && (
                      <button
                        onClick={() => {
                          setActiveExtensionId(ext.id);
                          addToast({
                            title: 'Primary Provider Set',
                            description: `Switched default scraper to ${ext.name}`,
                            type: 'success'
                          });
                        }}
                        className="text-[10px] text-[#ff2e56] hover:underline font-semibold"
                      >
                        Set as Primary
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Custom Repository URL Bar */}
        <form onSubmit={handleAddRepo} className="p-3.5 bg-[#0d0d18] border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            placeholder="Add 3rd-party anime extension repository URL..."
            value={repoUrlInput}
            onChange={(e) => setRepoUrlInput(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 px-3.5 py-2 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff2e56]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-[#ff2e56] hover:from-purple-500 text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-md shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Install Repo</span>
          </button>
        </form>

      </div>
    </div>
  );
};
