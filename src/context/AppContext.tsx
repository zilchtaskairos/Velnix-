import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Anime, 
  WatchlistEntry, 
  WatchlistStatus, 
  ContinueWatchingItem, 
  UserSettings, 
  DanmakuComment, 
  EpisodeComment, 
  CommunityPoll,
  Manga,
  MangaReadingProgress,
  PulseClip,
  WatchParty,
  PartyChatMessage,
  AnimeGame,
  FestivalEvent,
  AnimeStore,
  UserAccount,
  ChatContact,
  DirectMessageItem,
  ClaireMessage,
  LinkedGamingAccount,
  CloudstreamRepo,
  ProviderPlugin,
  DownloadedEpisode
} from '../types/anime';
import { ANIMES_DATABASE, INITIAL_DANMAKU_COMMENTS, SAMPLE_EPISODE_COMMENTS, COMMUNITY_POLLS } from '../data/animeData';
import { 
  MANGA_DATABASE, 
  INITIAL_PULSE_CLIPS, 
  OFFICIAL_ANIME_GAMES, 
  ANIME_FESTIVALS, 
  ANIME_STORES, 
  INITIAL_WATCH_PARTIES, 
  INITIAL_CHAT_CONTACTS, 
  INITIAL_DIRECT_MESSAGES, 
  INITIAL_USER_ACCOUNT 
} from '../data/extendedData';
import { 
  INITIAL_REPOSITORIES, 
  REPOSITORY_PROVIDERS_MAP,
  SHORTCODE_REGISTRY 
} from '../data/extensionsData';
import { fetchAnimeByIdFromJikan } from '../services/jikanApi';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

export type PageRoute = 
  | 'home' 
  | 'browse' 
  | 'anime' 
  | 'watch' 
  | 'schedule' 
  | 'library' 
  | 'community' 
  | 'settings' 
  | 'guide' 
  | 'pulse' 
  | 'studio' 
  | 'manga' 
  | 'manga-reader' 
  | 'games' 
  | 'claire' 
  | 'profile' 
  | 'party' 
  | 'extensions';

export interface NavigationParams {
  animeId?: string;
  episodeId?: number;
  genre?: string;
  search?: string;
  mangaId?: string;
  chapterId?: number;
  gameId?: string;
  partyId?: string;
  pulseId?: string;
  userId?: string;
  repoId?: string;
}

export interface AppContextType {
  currentPage: PageRoute;
  params: NavigationParams;
  navigateTo: (page: PageRoute, params?: NavigationParams) => void;
  animes: Anime[];
  currentAnime: Anime | null;
  registerAnimes: (newAnimes: Anime[]) => void;
  
  // Watchlist & Library
  watchlist: Record<string, WatchlistEntry>;
  updateWatchlistStatus: (animeId: string, status: WatchlistStatus) => void;
  removeFromWatchlist: (animeId: string) => void;
  toggleFavorite: (animeId: string) => void;
  updateEpisodeProgress: (animeId: string, episodeNumber: number) => void;
  setUserScore: (animeId: string, score: number) => void;
  
  // Continue Watching
  continueWatching: ContinueWatchingItem[];
  saveWatchingProgress: (animeId: string, episodeId: number, currentTime: number, duration: number) => void;
  clearHistory: () => void;
  
  // Settings & Theme
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  
  // Cloudstream Repositories & Specific Downloaded Providers
  repositories: CloudstreamRepo[];
  allRepoProviders: Record<string, ProviderPlugin[]>;
  addRepository: (name: string, urlOrShortcode: string) => CloudstreamRepo;
  deleteRepository: (id: string) => void;
  toggleDownloadProvider: (repoId: string, providerId: string) => void;
  downloadedServers: ProviderPlugin[];
  
  // Cloudstream Episode Downloads (Progress & Offline Watch)
  downloadedEpisodes: DownloadedEpisode[];
  startDownloadEpisode: (animeId: string, episodeNumber: number, quality?: string) => void;
  deleteDownloadedEpisode: (id: string) => void;
  downloadProgress: Record<string, number>;
  
  // Modals & Popups
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isShortcutsOpen: boolean;
  setIsShortcutsOpen: (open: boolean) => void;
  isMessagesOpen: boolean;
  setIsMessagesOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  isPayPalOpen: boolean;
  setIsPayPalOpen: (open: boolean) => void;
  isClaireOpen: boolean;
  setIsClaireOpen: (open: boolean) => void;
  activeTrailerUrl: string | null;
  openTrailer: (youtubeId: string) => void;
  closeTrailer: () => void;
  
  // Danmaku & Comments
  danmakuList: DanmakuComment[];
  addDanmaku: (text: string, time: number, color?: string) => void;
  episodeComments: EpisodeComment[];
  addEpisodeComment: (animeId: string, episodeId: number, content: string, isSpoiler?: boolean) => void;
  toggleCommentLike: (commentId: string) => void;
  
  // Polls & Random
  polls: CommunityPoll[];
  votePoll: (pollId: string, optionId: string) => void;
  goToRandomAnime: () => void;
  
  // Manga
  mangas: Manga[];
  currentManga: Manga | null;
  mangaProgress: Record<string, MangaReadingProgress>;
  updateMangaProgress: (mangaId: string, chapterNumber: number, pageNumber?: number) => void;
  
  // Watch Party
  watchParties: WatchParty[];
  activeParty: WatchParty | null;
  joinParty: (partyId: string) => void;
  leaveParty: () => void;
  createParty: (name: string, animeId: string, episodeId: number, description?: string) => string;
  sendPartyMessage: (partyId: string, text: string) => void;
  
  // Pulse
  pulseClips: PulseClip[];
  likePulseClip: (clipId: string) => void;
  addPulseComment: (clipId: string, text: string) => void;
  bookmarkPulseClip: (clipId: string) => void;
  uploadPulseClip: (clip: Omit<PulseClip, 'id' | 'likesCount' | 'commentsCount' | 'sharesCount' | 'comments'>) => void;
  
  // Direct Messages & Chat
  contacts: ChatContact[];
  directMessages: DirectMessageItem[];
  activeChatUserId: string;
  setActiveChatUserId: (userId: string) => void;
  sendDirectMessage: (receiverId: string, text: string, sharedPulseId?: string, sharedAnimeId?: string) => void;
  shareToChat: (contactId: string, message: string, sharedPulseId?: string, sharedAnimeId?: string) => void;
  
  // Anime Games
  animeGames: AnimeGame[];
  linkedGames: LinkedGamingAccount[];
  linkGameAccount: (gameId: string, inGameName: string, playerId: string, server: string) => void;
  unlinkGameAccount: (gameId: string) => void;
  
  // Claire AI Assistant Engine
  claireMessages: ClaireMessage[];
  isClaireTyping: boolean;
  askClaire: (query: string) => void;
  festivals: FestivalEvent[];
  animeStores: AnimeStore[];
  
  // User Account & Dual Profile Pictures
  currentUser: UserAccount;
  updateProfilePics: (avatarUrl: string, bannerUrl: string) => void;
  updateProfileBio: (bio: string, username: string, handle: string) => void;
  toggleFollowUser: (contactId: string) => void;
  upgradeToVipWithPayPal: (tier: 'ultra_vip' | 'creator_pass', paypalEmail: string) => void;
  
  // Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const DEFAULT_SETTINGS: UserSettings = {
  theme: 'velnix-violet',
  defaultQuality: '1080p',
  defaultAudio: 'sub',
  autoSkipIntro: true,
  autoPlayNext: true,
  danmakuEnabled: true,
  danmakuOpacity: 0.85,
  danmakuSpeed: 8,
  serverPreference: 'velnix-ultra',
  paypalEmailAddress: 'velnix.official@gmail.com'
};

const INITIAL_CLAIRE_MESSAGES: ClaireMessage[] = [
  {
    id: 'cm-1',
    sender: 'claire',
    text: "Hello Paul! ✨ I'm Claire, your personal AI anime companion. How are you feeling today? We can chat, I can tell you stories, find anime conventions, or recommend shows based on your mood!",
    timestamp: 'Just now'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [params, setParams] = useState<NavigationParams>({});
  
  const [animes, setAnimes] = useState<Anime[]>(ANIMES_DATABASE);
  const [mangas] = useState<Manga[]>(MANGA_DATABASE);
  const [pulseClips, setPulseClips] = useState<PulseClip[]>(INITIAL_PULSE_CLIPS);
  const [watchParties, setWatchParties] = useState<WatchParty[]>(INITIAL_WATCH_PARTIES);
  const [animeGames] = useState<AnimeGame[]>(OFFICIAL_ANIME_GAMES);
  const [festivals] = useState<FestivalEvent[]>(ANIME_FESTIVALS);
  const [animeStores] = useState<AnimeStore[]>(ANIME_STORES);

  // Dynamically register animes from live searches or API lookups
  const registerAnimes = (newAnimes: Anime[]) => {
    if (!newAnimes || newAnimes.length === 0) return;
    setAnimes(prev => {
      const existingIds = new Set(prev.map(a => a.id));
      const toAdd = newAnimes.filter(a => a && a.id && !existingIds.has(a.id));
      if (toAdd.length === 0) return prev;
      return [...toAdd, ...prev];
    });
  };

  // If navigating to an anime not yet in memory, fetch it live from Jikan API!
  useEffect(() => {
    if (params.animeId) {
      const found = animes.find(a => a.id === params.animeId);
      if (!found) {
        fetchAnimeByIdFromJikan(params.animeId).then(fetched => {
          if (fetched) {
            registerAnimes([fetched]);
          }
        });
      }
    }
  }, [params.animeId]);
  
  // Cloudstream Repositories & Provider Plugins State
  const [repositories, setRepositories] = useState<CloudstreamRepo[]>(() => {
    try {
      const saved = localStorage.getItem('velnix_cloudstream_repos');
      return saved ? JSON.parse(saved) : INITIAL_REPOSITORIES;
    } catch {
      return INITIAL_REPOSITORIES;
    }
  });

  const [allRepoProviders, setAllRepoProviders] = useState<Record<string, ProviderPlugin[]>>(() => {
    try {
      const saved = localStorage.getItem('velnix_repo_providers');
      return saved ? JSON.parse(saved) : REPOSITORY_PROVIDERS_MAP;
    } catch {
      return REPOSITORY_PROVIDERS_MAP;
    }
  });

  // Offline Downloaded Episodes State (Cloudstream Download Manager)
  const [downloadedEpisodes, setDownloadedEpisodes] = useState<DownloadedEpisode[]>(() => {
    try {
      const saved = localStorage.getItem('velnix_downloaded_episodes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>({});

  // User Account State
  const [currentUser, setCurrentUser] = useState<UserAccount>(() => {
    try {
      const saved = localStorage.getItem('velnix_user_account');
      return saved ? JSON.parse(saved) : INITIAL_USER_ACCOUNT;
    } catch {
      return INITIAL_USER_ACCOUNT;
    }
  });

  const [contacts, setContacts] = useState<ChatContact[]>(INITIAL_CHAT_CONTACTS);
  const [directMessages, setDirectMessages] = useState<DirectMessageItem[]>(INITIAL_DIRECT_MESSAGES);
  const [activeChatUserId, setActiveChatUserId] = useState<string>('claire');
  const [activePartyId, setActivePartyId] = useState<string | null>(null);

  // Manga Progress State
  const [mangaProgress, setMangaProgress] = useState<Record<string, MangaReadingProgress>>(() => {
    try {
      const saved = localStorage.getItem('velnix_manga_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Watchlist & History
  const [watchlist, setWatchlist] = useState<Record<string, WatchlistEntry>>(() => {
    try {
      const saved = localStorage.getItem('velnix_watchlist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [continueWatching, setContinueWatching] = useState<ContinueWatchingItem[]>(() => {
    try {
      const saved = localStorage.getItem('velnix_continue_watching');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const saved = localStorage.getItem('velnix_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [danmakuList, setDanmakuList] = useState<DanmakuComment[]>(INITIAL_DANMAKU_COMMENTS);
  const [episodeComments, setEpisodeComments] = useState<EpisodeComment[]>(SAMPLE_EPISODE_COMMENTS);
  const [polls, setPolls] = useState<CommunityPoll[]>(COMMUNITY_POLLS);
  
  // Claire Conversational State
  const [claireMessages, setClaireMessages] = useState<ClaireMessage[]>(() => {
    try {
      const saved = localStorage.getItem('velnix_claire_chat');
      return saved ? JSON.parse(saved) : INITIAL_CLAIRE_MESSAGES;
    } catch {
      return INITIAL_CLAIRE_MESSAGES;
    }
  });
  const [isClaireTyping, setIsClaireTyping] = useState(false);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPayPalOpen, setIsPayPalOpen] = useState(false);
  const [isClaireOpen, setIsClaireOpen] = useState(false);
  const [activeTrailerUrl, setActiveTrailerUrl] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem('velnix_user_account', JSON.stringify(currentUser));
      localStorage.setItem('velnix_watchlist', JSON.stringify(watchlist));
      localStorage.setItem('velnix_continue_watching', JSON.stringify(continueWatching));
      localStorage.setItem('velnix_settings', JSON.stringify(settings));
      localStorage.setItem('velnix_manga_progress', JSON.stringify(mangaProgress));
      localStorage.setItem('velnix_claire_chat', JSON.stringify(claireMessages));
      localStorage.setItem('velnix_cloudstream_repos', JSON.stringify(repositories));
      localStorage.setItem('velnix_repo_providers', JSON.stringify(allRepoProviders));
      localStorage.setItem('velnix_downloaded_episodes', JSON.stringify(downloadedEpisodes));
    } catch (e) {
      console.error(e);
    }
  }, [currentUser, watchlist, continueWatching, settings, mangaProgress, claireMessages, repositories, allRepoProviders, downloadedEpisodes]);

  // Cloudstream Add Repository via Shortcode or URL (starts clean with 0 downloaded)
  const addRepository = (name: string, urlOrShortcode: string): CloudstreamRepo => {
    const cleanInput = urlOrShortcode.trim().toLowerCase();
    const normalizedKey = cleanInput.replace(/[\s\-_]/g, '');
    const shortcodeMatch = SHORTCODE_REGISTRY[cleanInput] || 
                           SHORTCODE_REGISTRY[normalizedKey] || 
                           SHORTCODE_REGISTRY['phisher'];

    const repoTitle = name.trim() || shortcodeMatch?.name || cleanInput;
    const resolvedUrl = shortcodeMatch?.url || (cleanInput.startsWith('http') ? cleanInput : `https://raw.githubusercontent.com/${cleanInput}/master/repo.json`);
    const newRepoId = 'repo-' + Date.now();

    const newRepo: CloudstreamRepo = {
      id: newRepoId,
      name: repoTitle,
      shortcode: cleanInput,
      url: resolvedUrl,
      iconType: 'github',
      providersCount: shortcodeMatch?.providers.length || 10
    };

    setRepositories(prev => [newRepo, ...prev]);

    const defaultProviders = shortcodeMatch?.providers || REPOSITORY_PROVIDERS_MAP['repo-phisher'] || [];
    const newRepoProviders = defaultProviders.map((p, idx) => ({
      ...p,
      id: `${newRepoId}-${idx}`,
      repoId: newRepoId,
      isInstalled: false // Every provider starts NOT downloaded as requested!
    }));

    setAllRepoProviders(prev => ({
      ...prev,
      [newRepoId]: newRepoProviders
    }));

    addToast({
      title: 'Repository Installed! ⚡',
      description: `Tap "${repoTitle}" to download specific anime servers.`,
      type: 'success'
    });

    return newRepo;
  };

  const deleteRepository = (id: string) => {
    const repo = repositories.find(r => r.id === id);
    setRepositories(prev => prev.filter(r => r.id !== id));
    setAllRepoProviders(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    addToast({
      title: 'Repository Removed',
      description: `Uninstalled "${repo?.name || 'repository'}"`,
      type: 'info'
    });
  };

  // Download specific server from a repo
  const toggleDownloadProvider = (repoId: string, providerId: string) => {
    setAllRepoProviders(prev => {
      const currentList = prev[repoId] || [];
      const updated = currentList.map(p => {
        if (p.id === providerId) {
          const nextState = !p.isInstalled;
          addToast({
            title: nextState ? 'Server Downloaded ⬇️' : 'Server Removed 🗑️',
            description: `${p.name} (${p.version}) is ${nextState ? 'now active in player' : 'uninstalled'}`,
            type: nextState ? 'success' : 'info'
          });
          return { ...p, isInstalled: nextState };
        }
        return p;
      });
      return { ...prev, [repoId]: updated };
    });
  };

  // Cloudstream Episode Download Workflow (Download -> Downloads Library -> Watch)
  const startDownloadEpisode = (animeId: string, episodeNumber: number, quality = '1080p') => {
    const anime = animes.find(a => a.id === animeId) || animes[0];
    const ep = anime?.episodes.find(e => e.number === episodeNumber) || anime?.episodes[0];
    if (!anime || !ep) return;

    const downloadKey = `${animeId}-${episodeNumber}`;
    const sizeMap: Record<string, number> = { '4K': 750, '1080p': 380, '720p': 190, '480p': 95 };
    const sizeMb = sizeMap[quality] || 380;

    // Simulate animated download progress
    setDownloadProgress(prev => ({ ...prev, [downloadKey]: 15 }));
    addToast({ title: 'Download Started ⬇️', description: `Downloading ${anime.title} Ep ${episodeNumber} (${quality})`, type: 'info' });

    let currentPct = 15;
    const progressInterval = setInterval(() => {
      currentPct += 25;
      setDownloadProgress(prev => ({ ...prev, [downloadKey]: currentPct }));

      if (currentPct >= 100) {
        clearInterval(progressInterval);
        const newDownloaded: DownloadedEpisode = {
          id: 'dl-' + Date.now(),
          animeId: anime.id,
          animeTitle: anime.title,
          animePoster: anime.poster,
          episodeNumber: ep.number,
          episodeTitle: ep.title,
          quality,
          sizeMb,
          videoUrl: ep.videoUrl,
          downloadedAt: 'Just now'
        };

        setDownloadedEpisodes(prev => [newDownloaded, ...prev.filter(d => !(d.animeId === animeId && d.episodeNumber === episodeNumber))]);
        setDownloadProgress(prev => {
          const next = { ...prev };
          delete next[downloadKey];
          return next;
        });

        addToast({
          title: 'Download Complete! 🎉',
          description: `${anime.title} Ep ${episodeNumber} saved to Downloads Library!`,
          type: 'success'
        });
      }
    }, 600);
  };

  const deleteDownloadedEpisode = (id: string) => {
    const target = downloadedEpisodes.find(d => d.id === id);
    setDownloadedEpisodes(prev => prev.filter(d => d.id !== id));
    addToast({
      title: 'Episode Deleted',
      description: `Removed ${target?.animeTitle} Ep ${target?.episodeNumber} from storage.`,
      type: 'info'
    });
  };

  const downloadedServers = Object.values(allRepoProviders)
    .flatMap(list => list)
    .filter(p => p.isInstalled);

  const navigateTo = (page: PageRoute, newParams: NavigationParams = {}) => {
    setCurrentPage(page);
    setParams(newParams);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Watchlist Actions
  const updateWatchlistStatus = (animeId: string, status: WatchlistStatus) => {
    const currentAnimeData = animes.find(a => a.id === animeId);
    setWatchlist(prev => ({
      ...prev,
      [animeId]: {
        animeId,
        status,
        progressEpisode: prev[animeId]?.progressEpisode || 0,
        userScore: prev[animeId]?.userScore,
        isFavorite: prev[animeId]?.isFavorite,
        updatedAt: new Date().toISOString()
      }
    }));
    addToast({
      title: 'Watchlist Updated',
      description: `Added "${currentAnimeData?.title || animeId}" to ${status.replace('_', ' ')}`,
      type: 'success'
    });
  };

  const removeFromWatchlist = (animeId: string) => {
    setWatchlist(prev => {
      const next = { ...prev };
      delete next[animeId];
      return next;
    });
    addToast({ title: 'Removed from Library', description: 'Item removed.', type: 'info' });
  };

  const toggleFavorite = (animeId: string) => {
    const currentAnimeData = animes.find(a => a.id === animeId);
    setWatchlist(prev => {
      const existing = prev[animeId] || {
        animeId,
        status: 'plan_to_watch',
        progressEpisode: 0,
        updatedAt: new Date().toISOString()
      };
      const isFav = !existing.isFavorite;
      addToast({
        title: isFav ? 'Added to Favorites ❤️' : 'Removed from Favorites',
        description: currentAnimeData?.title,
        type: isFav ? 'success' : 'info'
      });
      return {
        ...prev,
        [animeId]: { ...existing, isFavorite: isFav, updatedAt: new Date().toISOString() }
      };
    });
  };

  const updateEpisodeProgress = (animeId: string, episodeNumber: number) => {
    setWatchlist(prev => {
      const existing = prev[animeId] || {
        animeId,
        status: 'watching',
        progressEpisode: episodeNumber,
        updatedAt: new Date().toISOString()
      };
      return {
        ...prev,
        [animeId]: { ...existing, progressEpisode: episodeNumber, updatedAt: new Date().toISOString() }
      };
    });
  };

  const setUserScore = (animeId: string, score: number) => {
    setWatchlist(prev => {
      const existing = prev[animeId] || {
        animeId,
        status: 'watching',
        progressEpisode: 1,
        updatedAt: new Date().toISOString()
      };
      addToast({ title: `Rated ${score}/10 ⭐`, description: 'Saved to profile.', type: 'success' });
      return {
        ...prev,
        [animeId]: { ...existing, userScore: score, updatedAt: new Date().toISOString() }
      };
    });
  };

  const saveWatchingProgress = (animeId: string, episodeId: number, currentTime: number, duration: number) => {
    const anime = animes.find(a => a.id === animeId);
    const ep = anime?.episodes.find(e => e.id === episodeId);
    if (!anime || !ep) return;

    setContinueWatching(prev => {
      const filtered = prev.filter(item => item.animeId !== animeId);
      return [
        {
          animeId,
          episodeId,
          episodeNumber: ep.number,
          episodeTitle: ep.title,
          currentTime,
          duration: duration || ep.durationSeconds,
          updatedAt: new Date().toISOString()
        },
        ...filtered
      ].slice(0, 10);
    });

    updateEpisodeProgress(animeId, ep.number);
  };

  const clearHistory = () => {
    setContinueWatching([]);
    addToast({ title: 'History Cleared', description: 'Playback progress wiped.', type: 'info' });
  };

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    addToast({ title: 'Settings Saved', description: 'Preferences updated.', type: 'success' });
  };

  const openTrailer = (youtubeId: string) => setActiveTrailerUrl(youtubeId);
  const closeTrailer = () => setActiveTrailerUrl(null);

  const addDanmaku = (text: string, time: number, color = '#ff2e56') => {
    const newDanmaku: DanmakuComment = {
      id: 'd-' + Date.now(),
      episodeId: params.episodeId || 1,
      time,
      text,
      color,
      topRow: Math.floor(Math.random() * 4)
    };
    setDanmakuList(prev => [...prev, newDanmaku]);
    addToast({ title: 'Danmaku Sent! 🚀', description: `"${text}"`, type: 'info' });
  };

  const addEpisodeComment = (animeId: string, episodeId: number, content: string, isSpoiler = false) => {
    const newComment: EpisodeComment = {
      id: 'c-' + Date.now(),
      animeId,
      episodeId,
      author: currentUser.username,
      avatar: currentUser.avatar,
      timestamp: 'Just now',
      content,
      likes: 0,
      isLiked: false,
      isSpoiler
    };
    setEpisodeComments(prev => [newComment, ...prev]);
    addToast({ title: 'Comment Posted', description: 'Added to episode discussion!', type: 'success' });
  };

  const toggleCommentLike = (commentId: string) => {
    setEpisodeComments(prev =>
      prev.map(c => {
        if (c.id === commentId) {
          const isLiked = !c.isLiked;
          return {
            ...c,
            isLiked,
            likes: isLiked ? c.likes + 1 : Math.max(0, c.likes - 1)
          };
        }
        return c;
      })
    );
  };

  const votePoll = (pollId: string, optionId: string) => {
    setPolls(prev =>
      prev.map(poll => {
        if (poll.id === pollId) {
          if (poll.userVotedOptionId === optionId) return poll;
          const options = poll.options.map(opt => {
            if (opt.id === optionId) return { ...opt, votes: opt.votes + 1 };
            if (poll.userVotedOptionId === opt.id) return { ...opt, votes: Math.max(0, opt.votes - 1) };
            return opt;
          });
          return {
            ...poll,
            totalVotes: poll.userVotedOptionId ? poll.totalVotes : poll.totalVotes + 1,
            userVotedOptionId: optionId,
            options
          };
        }
        return poll;
      })
    );
    addToast({ title: 'Vote Counted! 🗳️', description: 'Thank you for voting.', type: 'success' });
  };

  const goToRandomAnime = () => {
    const randomIndex = Math.floor(Math.random() * animes.length);
    const randomAnime = animes[randomIndex];
    navigateTo('anime', { animeId: randomAnime.id });
    addToast({ title: 'Surprise Pick! 🎲', description: `Discovered "${randomAnime.title}"`, type: 'info' });
  };

  const updateMangaProgress = (mangaId: string, chapterNumber: number, pageNumber = 1) => {
    setMangaProgress(prev => ({
      ...prev,
      [mangaId]: {
        mangaId,
        currentChapter: chapterNumber,
        currentPage: pageNumber,
        status: 'reading',
        updatedAt: new Date().toISOString()
      }
    }));
  };

  const joinParty = (partyId: string) => {
    setActivePartyId(partyId);
    setWatchParties(prev =>
      prev.map(p => {
        if (p.id === partyId) {
          const isAlreadyMember = p.members.some(m => m.id === currentUser.id);
          const updatedMembers = isAlreadyMember
            ? p.members
            : [
                ...p.members,
                {
                  id: currentUser.id,
                  username: currentUser.username,
                  avatar: currentUser.avatar,
                  isHost: false,
                  isVip: currentUser.isVip,
                  joinedAt: 'Just now'
                }
              ];
          return {
            ...p,
            participantsCount: Math.min(150, updatedMembers.length),
            members: updatedMembers
          };
        }
        return p;
      })
    );
    const party = watchParties.find(p => p.id === partyId);
    if (party) {
      navigateTo('watch', { animeId: party.animeId, episodeId: party.episodeId, partyId: party.id });
    }
  };

  const leaveParty = () => {
    setActivePartyId(null);
    addToast({ title: 'Left Watch Party', description: 'Switched back to solo stream.', type: 'info' });
  };

  const createParty = (name: string, animeId: string, episodeId: number, description = '') => {
    const partyId = 'party-' + Date.now();
    const anime = animes.find(a => a.id === animeId) || animes[0];
    const newParty: WatchParty = {
      id: partyId,
      name,
      animeId,
      animeTitle: anime.title,
      animeBanner: anime.banner,
      episodeId,
      episodeNumber: episodeId,
      hostName: currentUser.username,
      hostAvatar: currentUser.avatar,
      participantsCount: 1,
      maxParticipants: 150,
      isPlaying: true,
      currentTime: 0,
      roomCode: 'VELNIX-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
      description: description || `Streaming ${anime.title} together with up to 150 friends!`,
      members: [
        {
          id: currentUser.id,
          username: currentUser.username,
          avatar: currentUser.avatar,
          isHost: true,
          isVip: currentUser.isVip,
          joinedAt: 'Just now'
        }
      ],
      messages: [
        {
          id: 'm-init',
          senderId: currentUser.id,
          username: currentUser.username,
          avatar: currentUser.avatar,
          text: `🎉 Welcome to ${name}! Up to 150 members can watch together with live synced audio.`,
          timestamp: 'Just now',
          isSystem: true
        }
      ]
    };
    setWatchParties(prev => [newParty, ...prev]);
    setActivePartyId(partyId);
    navigateTo('watch', { animeId, episodeId, partyId });
    return partyId;
  };

  const sendPartyMessage = (partyId: string, text: string) => {
    const newMsg: PartyChatMessage = {
      id: 'pmsg-' + Date.now(),
      senderId: currentUser.id,
      username: currentUser.username,
      avatar: currentUser.avatar,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isVip: currentUser.isVip
    };
    setWatchParties(prev =>
      prev.map(p => {
        if (p.id === partyId) {
          return { ...p, messages: [...p.messages, newMsg] };
        }
        return p;
      })
    );
  };

  const likePulseClip = (clipId: string) => {
    setPulseClips(prev =>
      prev.map(clip => {
        if (clip.id === clipId) {
          const isLiked = !clip.isLiked;
          return {
            ...clip,
            isLiked,
            likesCount: isLiked ? clip.likesCount + 1 : Math.max(0, clip.likesCount - 1)
          };
        }
        return clip;
      })
    );
  };

  const addPulseComment = (clipId: string, text: string) => {
    const newComment = {
      id: 'pcom-' + Date.now(),
      author: currentUser.username,
      avatar: currentUser.avatar,
      text,
      timestamp: 'Just now',
      likes: 0,
      isLiked: false
    };
    setPulseClips(prev =>
      prev.map(clip => {
        if (clip.id === clipId) {
          return {
            ...clip,
            commentsCount: clip.commentsCount + 1,
            comments: [newComment, ...clip.comments]
          };
        }
        return clip;
      })
    );
  };

  const bookmarkPulseClip = (clipId: string) => {
    setPulseClips(prev =>
      prev.map(clip => {
        if (clip.id === clipId) {
          return { ...clip, isBookmarked: !clip.isBookmarked };
        }
        return clip;
      })
    );
  };

  const uploadPulseClip = (clipData: Omit<PulseClip, 'id' | 'likesCount' | 'commentsCount' | 'sharesCount' | 'comments'>) => {
    const newClip: PulseClip = {
      ...clipData,
      id: 'pulse-' + Date.now(),
      likesCount: 1,
      commentsCount: 0,
      sharesCount: 0,
      isLiked: true,
      comments: []
    };
    setPulseClips(prev => [newClip, ...prev]);
    navigateTo('pulse');
    addToast({
      title: 'Published to Velnix Pulse! 🚀',
      description: 'Your anime short is live for the community to watch and share.',
      type: 'success'
    });
  };

  const sendDirectMessage = (receiverId: string, text: string, sharedPulseId?: string, sharedAnimeId?: string) => {
    const newMsg: DirectMessageItem = {
      id: 'dm-' + Date.now(),
      senderId: currentUser.id,
      receiverId,
      text,
      timestamp: 'Just now',
      sharedPulseId,
      sharedAnimeId
    };
    setDirectMessages(prev => [...prev, newMsg]);
    if (receiverId === 'claire') {
      askClaire(text);
    }
  };

  const shareToChat = (contactId: string, message: string, sharedPulseId?: string, sharedAnimeId?: string) => {
    sendDirectMessage(contactId, message, sharedPulseId, sharedAnimeId);
    setIsMessagesOpen(true);
    setActiveChatUserId(contactId);
  };

  const linkGameAccount = (gameId: string, inGameName: string, playerId: string, server: string) => {
    const game = animeGames.find(g => g.id === gameId);
    if (!game) return;
    const newAccount: LinkedGamingAccount = {
      gameId,
      gameName: game.title,
      gameIcon: game.icon,
      inGameName,
      playerId,
      level: Math.floor(Math.random() * 40) + 50,
      rankTitle: 'Elite Summoner',
      server,
      playtimeHours: Math.floor(Math.random() * 150) + 80,
      trophiesCount: Math.floor(Math.random() * 30) + 15,
      syncedAt: 'Just now'
    };
    setCurrentUser(prev => ({
      ...prev,
      linkedGames: [...prev.linkedGames.filter(g => g.gameId !== gameId), newAccount]
    }));
    addToast({ title: 'Game Linked! 🎮', description: `Connected "${game.title}"`, type: 'success' });
  };

  const unlinkGameAccount = (gameId: string) => {
    setCurrentUser(prev => ({
      ...prev,
      linkedGames: prev.linkedGames.filter(g => g.gameId !== gameId)
    }));
  };

  const updateProfilePics = (avatarUrl: string, bannerUrl: string) => {
    setCurrentUser(prev => ({
      ...prev,
      avatar: avatarUrl || prev.avatar,
      bannerUrl: bannerUrl || prev.bannerUrl
    }));
  };

  const updateProfileBio = (bio: string, username: string, handle: string) => {
    setCurrentUser(prev => ({
      ...prev,
      bio,
      username,
      handle
    }));
  };

  const toggleFollowUser = (contactId: string) => {
    setContacts(prev =>
      prev.map(c => {
        if (c.id === contactId) return { ...c, isFollowing: !c.isFollowing };
        return c;
      })
    );
  };

  const askClaire = (query: string) => {
    const userMsg: ClaireMessage = {
      id: 'cm-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setClaireMessages(prev => [...prev, userMsg]);
    setIsClaireTyping(true);

    const q = query.trim().toLowerCase();

    setTimeout(() => {
      setIsClaireTyping(false);
      let replyText = "";
      let suggestedAnimeIds: string[] | undefined = undefined;
      let festivalData: FestivalEvent | undefined = undefined;
      let storeData: AnimeStore | undefined = undefined;

      // 1. GREETINGS & CASUAL CHECK-INS
      if (/^(hi|hello|hey|yo|sup|hiya|konnichiwa|heyy+|hii+|morning|good morning|evening|good evening)\b/i.test(q)) {
        const greetings = [
          "Hey Paul! ✨ It's so nice to hear from you! How's your day treating you so far?",
          "Konnichiwa Paul! 😊 I was just daydreaming about some new anime. How are you feeling today?",
          "Hey there! ✨ Always a pleasure chatting with you. What's on your mind today — anime, life, or just chilling?",
          "Hello Paul! 🌸 Hope you're having a wonderful day! What are we getting into today?"
        ];
        replyText = greetings[Math.floor(Math.random() * greetings.length)];
      } 
      // 2. "HOW ARE YOU / WHAT ARE YOU DOING"
      else if (q.includes('how are you') || q.includes('how r u') || q.includes('how you doing') || q.includes('how have you been')) {
        replyText = "I'm doing amazing, thank you for asking! 🥰 Right now I'm browsing through seasonal anime releases and keeping the Velnix servers nice and fast for you. How about you, Paul? How's your mood today?";
      }
      else if (q.includes('what are you doing') || q.includes('what r u doing') || q.includes('wyd')) {
        replyText = "Just hanging out in the Velnix studio, listening to some lofi anime beats and waiting to see what you wanted to watch or chat about! 🎧 What about you? Working on anything cool or relaxing?";
      }
      // 3. TIRED / SLEEPY / GOODNIGHT
      else if (q.includes('tired') || q.includes('sleepy') || q.includes('exhausted') || q.includes('bed') || q.includes('goodnight') || q.includes('good night') || q.includes('going to sleep')) {
        replyText = "Aww, you've worked hard today! 🌙 Rest up well, get cozy, and have the sweetest dreams. If you want something calming before bed, a gentle episode of *Frieren* or *Laid-Back Camp* is pure medicine. Sleep well, Paul! ✨";
        suggestedAnimeIds = ['52991', '33352'];
      }
      // 4. BORED / LONELY / JUST WANT TO TALK
      else if (q.includes('bored') || q.includes('talk to someone') || q.includes('just chat') || q.includes('chill with you') || q.includes('lonely') || q.includes('talk to you')) {
        replyText = "I'm right here with you, Paul! 🥰 You never have to feel alone when we're hanging out. We can talk about whatever you want — tell me about what's going on in your life, we can debate wild anime theories, or I can tell you an exclusive story! What sounds fun right now?";
      }
      // 5. SAD / BAD DAY / HEARTBREAK / ANXIOUS
      else if (q.includes('sad') || q.includes('bad day') || q.includes('depressed') || q.includes('rough day') || q.includes('cry') || q.includes('breakup') || q.includes('heartbreak') || q.includes('anxious') || q.includes('stress')) {
        replyText = "I'm so sorry you're going through a tough time. 🫂 Take a deep breath — remember that it's completely okay to not feel 100% all the time. You are strong, and tomorrow is a fresh worldline. If you need a comforting show to let those feelings out, *Your Lie in April* or *Violet Evergarden* are here for you. I'm right by your side! 🌸";
        suggestedAnimeIds = ['23273', '33352'];
      }
      // 6. HAPPY / EXCITED
      else if (q.includes('happy') || q.includes('excited') || q.includes('great day') || q.includes('hyped') || q.includes('awesome')) {
        replyText = "Yay! Your good energy is contagious! 🎉 What got you so hyped today? Let's celebrate with something lively and legendary like *Spy x Family* or *My Dress-Up Darling*!";
        suggestedAnimeIds = ['50265', '48736'];
      }
      // 7. WHO ARE YOU / TELL ME ABOUT YOURSELF
      else if (q.includes('who are you') || q.includes('about yourself') || q.includes('are you real') || q.includes('your favorite')) {
        replyText = "I'm Claire! ✨ Your personal anime companion, guide, and fellow otaku inside Velnix. I love lavender hair, good tea, dark fantasy lore, and hype sakuga fights. I might be AI, but my care for you and our anime chats is 100% genuine! 💖";
      }
      // 8. STORIES
      else if (q.includes('story') || q.includes('tale') || q.includes('tell me something')) {
        if (q.includes('shonen') || q.includes('action') || q.includes('fight') || q.includes('battle')) {
          replyText = "⚔️ **The Shadow Seal of Neo-Tokyo:**\n\nRain drummed against the neon skyscrapers as Kael stood atop the Shibuya tower. A violet rift tore the sky in half: *'The Seal of the Shadow Monarch is broken.'* Thousands of obsidian knights poured into the streets.\n\nKael unsheathed his twin gravity blades, their crimson runes igniting into white fire. *'If the Monarch wants this city, he has to go through me first.'*\n\nShould Kael activate his Domain Expansion or summon his dragon summon?";
        } else if (q.includes('romance') || q.includes('cozy') || q.includes('love')) {
          replyText = "🌸 **The Kyoto Rain Melody:**\n\nBeneath blooming sakura trees in Kyoto, Ren sat in an old wooden tea shop listening to the gentle drizzle. Suddenly, a girl with lavender hair and a violin case dashed under the awning, laughing out of breath: *'Looks like the universe decided we should share a cup of matcha.'*\n\nShe offered half of her dango skewer, and for the first time in months, Ren smiled.";
        } else if (q.includes('dark fantasy') || q.includes('isekai')) {
          replyText = "👑 **The Obsidian Throne of Eldoria:**\n\nReincarnated not as a hero, but as the cursed soul inside an ancient artifact sword, Arthur waited 10,000 years in the dungeon depths. Until one day, an exiled elven princess grabbed his hilt and whispered: *'Teach me how to dethrone the false gods.'*";
        } else {
          replyText = "Ooh, I love stories! What type of story are you in the mood for? ✨\n\n1. ⚔️ **Shonen Action & Dungeon Battle**\n2. 👑 **Dark Fantasy & Isekai Monarch**\n3. 🌸 **Cozy Slice-of-Life Romance**\n4. 🔮 **Supernatural Mystery & Detective Case**\n\nTell me which one you want to hear!";
        }
      }
      // 9. SPECIFIC ANIME LORE (BLEACH, JJK, SOLO LEVELING, DEMON SLAYER)
      else if (q.includes('bleach') || q.includes('ichigo') || q.includes('tybw') || q.includes('yhwach')) {
        replyText = "Bleach TYBW is peak fiction! Studio Pierrot really outdid themselves with the animation and the expanded fight choreography. Ichigo's dual Zangetsu and the Quincy invasion pacing are unmatched. Have you watched Episode 15 yet? 🔥";
        suggestedAnimeIds = ['41467'];
      }
      else if (q.includes('jjk') || q.includes('jujutsu') || q.includes('gojo') || q.includes('sukuna')) {
        replyText = "The Shibuya Incident arc was pure chaos! Satoru Gojo's 0.2 second Unlimited Void and Sukuna's Malevolent Shrine in Shibuya were cinematic masterclasses. Who's your favorite character in JJK?";
        suggestedAnimeIds = ['40748'];
      }
      else if (q.includes('solo leveling') || q.includes('jinwoo') || q.includes('monarch') || q.includes('arise')) {
        replyText = "Sung Jinwoo saying *'Arise'* still gives me absolute chills! Seeing him go from the E-Rank 'Weakest Hunter' to the supreme Shadow Monarch commanding thousands of shadow soldiers is so satisfying. Season 2 is going to be even crazier!";
        suggestedAnimeIds = ['52299'];
      }
      // 10. RECOMMENDATIONS
      else if (q.includes('recommend') || q.includes('what should i watch') || q.includes('suggest') || q.includes('top anime')) {
        replyText = "Here are some of my all-time absolute favorites streaming on Velnix! *Frieren* for deep storytelling, *Solo Leveling* for pure hype, and *Bleach TYBW* for breathtaking animation. Which genre are you craving today?";
        suggestedAnimeIds = ['52991', '52299', '41467', '40748'];
      }
      // 11. NATURAL FALLBACK
      else {
        replyText = `I totally hear you! Whether you want to talk about that, hear more stories, or find something awesome to stream on Velnix, I'm right here with you. What do you want to explore next, Paul? ✨`;
      }

      const claireReply: ClaireMessage = {
        id: 'cm-' + (Date.now() + 1),
        sender: 'claire',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedAnimeIds,
        festivalData,
        storeData
      };
      setClaireMessages(prev => [...prev, claireReply]);
    }, 450);
  };

  const upgradeToVipWithPayPal = (tier: 'ultra_vip' | 'creator_pass', paypalEmail: string) => {
    setCurrentUser(prev => ({
      ...prev,
      isVip: true,
      vipTier: tier,
      paypalEmail: paypalEmail || prev.paypalEmail
    }));
    setIsPayPalOpen(false);
    addToast({
      title: '🎉 Velnix VIP Activated via PayPal!',
      description: `Payment received to ${paypalEmail || settings.paypalEmailAddress}. 4K Ultra streaming, Manga reader & 150-person Watch Parties unlocked!`,
      type: 'success'
    });
  };

  const currentAnime = animes.find(a => a.id === params.animeId) || animes[0];
  const currentManga = mangas.find(m => m.id === params.mangaId) || mangas[0];
  const activeParty = watchParties.find(p => p.id === (activePartyId || params.partyId)) || null;

  return (
    <AppContext.Provider
      value={{
        currentPage,
        params,
        navigateTo,
        animes,
        currentAnime,
        registerAnimes,
        watchlist,
        updateWatchlistStatus,
        removeFromWatchlist,
        toggleFavorite,
        updateEpisodeProgress,
        setUserScore,
        continueWatching,
        saveWatchingProgress,
        clearHistory,
        settings,
        updateSettings,
        repositories,
        allRepoProviders,
        addRepository,
        deleteRepository,
        toggleDownloadProvider,
        downloadedServers,
        downloadedEpisodes,
        startDownloadEpisode,
        deleteDownloadedEpisode,
        downloadProgress,
        isSearchOpen,
        setIsSearchOpen,
        isShortcutsOpen,
        setIsShortcutsOpen,
        isMessagesOpen,
        setIsMessagesOpen,
        isAuthOpen,
        setIsAuthOpen,
        isPayPalOpen,
        setIsPayPalOpen,
        isClaireOpen,
        setIsClaireOpen,
        activeTrailerUrl,
        openTrailer,
        closeTrailer,
        danmakuList,
        addDanmaku,
        episodeComments,
        addEpisodeComment,
        toggleCommentLike,
        polls,
        votePoll,
        goToRandomAnime,
        mangas,
        currentManga,
        mangaProgress,
        updateMangaProgress,
        watchParties,
        activeParty,
        joinParty,
        leaveParty,
        createParty,
        sendPartyMessage,
        pulseClips,
        likePulseClip,
        addPulseComment,
        bookmarkPulseClip,
        uploadPulseClip,
        contacts,
        directMessages,
        activeChatUserId,
        setActiveChatUserId,
        sendDirectMessage,
        shareToChat,
        animeGames,
        linkedGames: currentUser.linkedGames,
        linkGameAccount,
        unlinkGameAccount,
        claireMessages,
        isClaireTyping,
        askClaire,
        festivals,
        animeStores,
        currentUser,
        updateProfilePics,
        updateProfileBio,
        toggleFollowUser,
        upgradeToVipWithPayPal,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
