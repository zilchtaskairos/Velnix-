import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Search, 
  Trash2, 
  Plus, 
  Globe, 
  Download, 
  Check, 
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  Zap,
  Play
} from 'lucide-react';
import { 
  CloudstreamRepo, 
  ProviderPlugin,
  SHORTCODE_REGISTRY,
  CLOUDSTREAM_PROVIDERS_LIST 
} from '../data/extensionsData';

export const ExtensionsPage: React.FC = () => {
  const { 
    navigateTo, 
    repositories, 
    allRepoProviders,
    addRepository, 
    deleteRepository, 
    toggleDownloadProvider,
    addToast 
  } = useApp();

  // Active Selected Repository (null = Repositories list screen, object = Inside repository provider store)
  const [selectedRepo, setSelectedRepo] = useState<CloudstreamRepo | null>(null);
  const [activeCategory, setActiveCategory] = useState<'Anime' | 'Movies' | 'TV Series' | 'Asian Drama'>('Anime');
  const [searchQuery, setSearchQuery] = useState('');

  // Add Repository Input Form
  const [repoNameInput, setRepoNameInput] = useState('');
  const [repoUrlOrShortcodeInput, setRepoUrlOrShortcodeInput] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = repoUrlOrShortcodeInput.trim();
    if (!cleanInput) return;

    const normalizedKey = cleanInput.toLowerCase().replace(/[\s\-_]/g, '');
    const matched = SHORTCODE_REGISTRY[cleanInput.toLowerCase()] || 
                   SHORTCODE_REGISTRY[normalizedKey] || 
                   SHORTCODE_REGISTRY['phisher'];

    const repoTitle = repoNameInput.trim() || matched?.name || cleanInput;
    const resolvedUrl = matched?.url || (cleanInput.startsWith('http') ? cleanInput : `https://raw.githubusercontent.com/${cleanInput}/master/repo.json`);
    const newRepoId = 'repo-' + Date.now();

    const createdRepo: CloudstreamRepo = {
      id: newRepoId,
      name: repoTitle,
      shortcode: cleanInput,
      url: resolvedUrl,
      iconType: 'github',
      providersCount: matched?.providers.length || 10
    };

    addRepository(repoNameInput, cleanInput);
    
    // Automatically open the newly added repo so the user can download specific servers immediately!
    setSelectedRepo(createdRepo);
    setRepoNameInput('');
    setRepoUrlOrShortcodeInput('');
  };

  // Get providers for the currently opened repository (all start uninstalled with Download buttons)
  const currentRepoProviders: ProviderPlugin[] = selectedRepo
    ? (allRepoProviders[selectedRepo.id] || CLOUDSTREAM_PROVIDERS_LIST.map(p => ({ ...p, isInstalled: false })))
    : [];

  const categories: ('Anime' | 'Movies' | 'TV Series' | 'Asian Drama')[] = ['Anime', 'Movies', 'TV Series', 'Asian Drama'];

  const filteredProviders = currentRepoProviders.filter((p) => {
    if (searchQuery.trim()) {
      return p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return p.category === activeCategory || activeCategory === 'Anime';
  });

  // Calculate real dynamic download stats
  const allProvidersFlat = Object.values(allRepoProviders).flatMap(l => l);
  const downloadedCount = allProvidersFlat.filter(p => p.isInstalled).length;
  const totalProvidersCount = Math.max(allProvidersFlat.length, 28);
  const progressPercent = totalProvidersCount > 0 ? Math.round((downloadedCount / totalProvidersCount) * 100) : 0;

  return (
    <div className="animate-fade-in pb-32 max-w-md md:max-w-xl mx-auto space-y-4 text-slate-100 font-sans">
      
      {/* =========================================================================
          SCREEN 2: INSIDE THE REPOSITORY (Browsing & Downloading Specific Servers)
          Nothing downloaded initially -> User clicks Download on what they want!
         ========================================================================= */}
      {selectedRepo ? (
        <div className="space-y-4 animate-fade-in">
          
          {/* Top Bar matching CloudStream Repo View */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setSelectedRepo(null)}
                className="text-slate-300 hover:text-white p-1 cursor-pointer transition-colors"
                title="Back to Repositories"
              >
                <ArrowLeft className="w-6 h-6 pointer-events-none" />
              </button>
              <h1 className="text-lg sm:text-xl font-bold font-heading text-white truncate max-w-[220px]">
                {selectedRepo.name}
              </h1>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <button
                type="button"
                onClick={() => setSearchQuery(searchQuery ? '' : 'Anime')}
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                title="Search Extension"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => addToast({ title: 'Repository Link', description: selectedRepo.url, type: 'info' })}
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                title="Open Web Repository"
              >
                <Globe className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Box if active */}
          {searchQuery && (
            <div className="relative flex items-center px-3.5 py-2 rounded-2xl bg-[#121220] border border-[#ff2e56] text-xs shadow-lg">
              <Search className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search server (HiAnime, AnimePahe, GogoAnime, AllWish, AniDb)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white focus:outline-none"
              />
              <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-white ml-2">✕</button>
            </div>
          )}

          {/* Category Tabs: Anime, Movies, TV Series, Asian Drama */}
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2 text-xs font-semibold border-b border-slate-800/60">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => { setActiveCategory(cat); setSearchQuery(''); }}
                  className={`whitespace-nowrap pb-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'text-white font-bold border-b-2 border-[#ff2e56]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* CloudStream Prompt Banner */}
          <div className="p-3 rounded-2xl bg-[#121224] border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ff2e56] shrink-0" />
              <span>Tap <strong>⬇️ Download</strong> to install servers. Installed servers activate the anime stream!</span>
            </div>
            {downloadedCount > 0 && (
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className="px-3 py-1 rounded-xl bg-[#ff2e56] hover:bg-[#ff4b72] text-white font-bold text-[10px] shrink-0 flex items-center gap-1 shadow-md cursor-pointer transition-transform active:scale-95"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Watch ({downloadedCount})</span>
              </button>
            )}
          </div>

          {/* List of Specific Servers inside this Repository */}
          <div className="space-y-3 divide-y divide-slate-800/40">
            {filteredProviders.map((prov) => (
              <div
                key={prov.id}
                className="pt-3 first:pt-0 flex items-center justify-between gap-3 group"
              >
                {/* Left: Provider Icon + Name + Version + Description */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-md border border-white/10"
                    style={{ backgroundColor: prov.iconBg || '#1e293b' }}
                  >
                    {prov.iconText || prov.name.slice(0, 2)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-white truncate">{prov.name}</h3>
                      {prov.isInstalled && (
                        <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 text-[9px] font-bold border border-emerald-800">
                          INSTALLED
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <span>🇬🇧</span>
                      <span>{prov.language} {prov.version}</span>
                      <span>{prov.sizeKb} kB</span>
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">{prov.description}</p>
                  </div>
                </div>

                {/* Right: Download Button OR Settings + Trash Icon */}
                <div className="flex items-center gap-2 shrink-0">
                  {prov.isInstalled ? (
                    <>
                      {prov.hasSettings && (
                        <button
                          type="button"
                          onClick={() => addToast({ title: `${prov.name} Config`, description: 'Custom scraping parameters active.', type: 'info' })}
                          className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                          title="Provider Settings"
                        >
                          <SlidersHorizontal className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => toggleDownloadProvider(selectedRepo.id, prov.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Uninstall Server"
                      >
                        <Trash2 className="w-5 h-5 text-slate-300 hover:text-rose-400" />
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => toggleDownloadProvider(selectedRepo.id, prov.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#ff2e56] hover:bg-[#ff4b72] active:bg-[#d61e42] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-pink-600/30 transition-transform active:scale-95 cursor-pointer"
                      title="Download and Install Server"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick jump to watch if at least 1 provider is downloaded */}
          {downloadedCount > 0 && (
            <div className="pt-4">
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#ff2e56] to-pink-600 hover:from-[#ff4b72] hover:to-pink-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-600/40 transition-transform active:scale-98 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Servers Downloaded! Start Streaming Anime</span>
              </button>
            </div>
          )}

        </div>
      ) : (
        /* =========================================================================
            SCREEN 1: REPOSITORIES LIST & ADD REPOSITORY FORM
            Tap any repository to open it and download servers
           ========================================================================= */
        <div className="space-y-5 animate-fade-in">
          
          {/* Top Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigateTo('settings')}
                className="text-slate-300 hover:text-white p-1 cursor-pointer transition-colors"
                title="Settings"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold font-heading text-white">Extensions</h1>
            </div>

            <button
              type="button"
              onClick={() => {}}
              className="p-2 text-slate-300 hover:text-white"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Repositories List (Tap to OPEN the repo!) */}
          <div className="space-y-3">
            {repositories.map((repo) => (
              <div
                key={repo.id}
                onClick={() => setSelectedRepo(repo)}
                className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#0c0c16] border border-slate-800/60 hover:border-[#ff2e56] cursor-pointer group transition-all shadow-md"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* GitHub Octocat Icon */}
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#ff2e56]/40 transition-colors">
                    <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-white group-hover:text-[#ff2e56] transition-colors truncate">
                      {repo.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono truncate max-w-[200px] sm:max-w-xs">
                      {repo.url}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteRepository(repo.id);
                    }}
                    className="p-2 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Delete Repository"
                  >
                    <Trash2 className="w-5 h-5 pointer-events-none" />
                  </button>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>

          {/* Add repository Section */}
          <div className="p-5 rounded-3xl bg-[#090912] border border-slate-800 space-y-4 shadow-xl">
            <h2 className="text-lg font-bold text-white">Add repository</h2>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Repository name (Optional)"
                  value={repoNameInput}
                  onChange={(e) => setRepoNameInput(e.target.value)}
                  className="w-full bg-transparent border-b border-slate-600 focus:border-[#ff2e56] py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <input
                  type="text"
                  required
                  placeholder="Repository URL or Shortcode"
                  value={repoUrlOrShortcodeInput}
                  onChange={(e) => setRepoUrlOrShortcodeInput(e.target.value)}
                  className="w-full bg-transparent border-b border-slate-600 focus:border-[#ff2e56] py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none font-mono transition-colors"
                />
                <div className="flex items-center gap-1.5 flex-wrap text-[10px] text-slate-400 mt-2">
                  <span>Quick shortcodes:</span>
                  {[
                    { label: 'phisherrepo', val: 'phisherrepo' },
                    { label: 'kairo', val: 'kairo' },
                    { label: 'anime', val: 'anime' },
                    { label: 'cloudstream', val: 'cloudstream' },
                    { label: 'aniyomi', val: 'aniyomi' }
                  ].map(sc => (
                    <button
                      key={sc.val}
                      type="button"
                      onClick={() => setRepoUrlOrShortcodeInput(sc.val)}
                      className="px-2 py-0.5 rounded-md bg-[#181826] hover:bg-[#ff2e56]/20 border border-slate-700 text-[#ff2e56] font-semibold transition-colors cursor-pointer"
                    >
                      {sc.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs sm:text-sm shadow-md hover:bg-slate-200 transition-transform active:scale-95 cursor-pointer"
                >
                  Add repository
                </button>

                <button
                  type="button"
                  onClick={() => { setRepoNameInput(''); setRepoUrlOrShortcodeInput(''); }}
                  className="px-4 py-2.5 text-slate-300 hover:text-white font-semibold text-xs sm:text-sm cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Bottom Progress Bar: Real Dynamic Counts */}
          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300 font-semibold">
              <span>Extensions</span>
              <span className="text-slate-400">{progressPercent}%</span>
            </div>

            <div className="w-full h-2 bg-[#1a1a2e] rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-[#ff2e56] to-pink-500 transition-all duration-500 rounded-full" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-400 flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#ff2e56] inline-block" />
                <span>Downloaded: {downloadedCount}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-600 inline-block" />
                <span>Disabled: 0</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-800 inline-block" />
                <span>Not downloaded: {Math.max(0, totalProvidersCount - downloadedCount)}</span>
              </span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
