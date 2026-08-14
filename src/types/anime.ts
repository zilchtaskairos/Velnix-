export type AnimeFormat = 'TV' | 'Movie' | 'OVA' | 'ONA' | 'Special';
export type AnimeStatus = 'Airing' | 'Completed' | 'Upcoming';
export type WatchlistStatus = 'watching' | 'plan_to_watch' | 'completed' | 'on_hold' | 'dropped';

export interface CloudstreamRepo {
  id: string;
  name: string;
  shortcode: string;
  url: string;
  iconType: 'github' | 'custom';
  providersCount: number;
}

export interface ProviderPlugin {
  id: string;
  repoId: string;
  name: string;
  category: 'Anime' | 'Movies' | 'TV Series' | 'Asian Drama';
  language: string;
  version: string;
  sizeKb: number;
  description: string;
  isInstalled: boolean;
  hasSettings?: boolean;
  iconText?: string;
  iconBg?: string;
  qualities: ('4K' | '1080p' | '720p' | '480p')[];
  supportsDub: boolean;
  supportsSub: boolean;
  streamUrlTemplate: string;
}

export interface DownloadedEpisode {
  id: string;
  animeId: string;
  animeTitle: string;
  animePoster: string;
  episodeNumber: number;
  episodeTitle: string;
  quality: string;
  sizeMb: number;
  videoUrl: string;
  downloadedAt: string;
}

export interface AnimeExtension {
  id: string;
  name: string;
  version: string;
  author: string;
  icon: string;
  description: string;
  status: 'installed' | 'available';
  isEnabled: boolean;
  pingMs: number;
  qualities: ('4K' | '1080p' | '720p' | '480p')[];
  supportsDub: boolean;
  supportsSub: boolean;
  supportsAutoSkip: boolean;
  extractors: string[];
  streamBaseUrl: string;
  repoId?: string;
}

export interface VoiceActor {
  name: string;
  language: string;
  image: string;
}

export interface Character {
  id: string;
  name: string;
  role: 'Main' | 'Supporting';
  image: string;
  voiceActor: VoiceActor;
}

export interface Episode {
  id: number;
  number: number;
  title: string;
  thumbnail: string;
  duration: string;
  durationSeconds: number;
  isFiller: boolean;
  videoUrl: string;
  introStart?: number;
  introEnd?: number;
  outroStart?: number;
  outroEnd?: number;
  synopsis: string;
  airDate: string;
}

export interface Review {
  id: string;
  animeId: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  likes: number;
  isLiked?: boolean;
}

export interface EpisodeComment {
  id: string;
  episodeId: number;
  animeId: string;
  author: string;
  avatar: string;
  timestamp: string;
  content: string;
  likes: number;
  isLiked?: boolean;
  replies?: Array<{
    id: string;
    author: string;
    avatar: string;
    timestamp: string;
    content: string;
    likes: number;
  }>;
  isSpoiler?: boolean;
}

export interface DanmakuComment {
  id: string;
  episodeId: number;
  time: number;
  text: string;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  topRow?: number;
}

export interface AnimeRelation {
  id: string;
  title: string;
  relationType: 'Prequel' | 'Sequel' | 'Spin-Off' | 'Side Story' | 'Alternative Version';
  format: AnimeFormat;
  poster: string;
  year: number;
}

export interface Anime {
  id: string;
  title: string;
  romajiTitle: string;
  nativeTitle: string;
  banner: string;
  poster: string;
  synopsis: string;
  shortSynopsis: string;
  score: number;
  ranked: number;
  popularity: number;
  format: AnimeFormat;
  episodesCount: number;
  status: AnimeStatus;
  season: 'Winter' | 'Spring' | 'Summer' | 'Fall';
  year: number;
  studio: string;
  genres: string[];
  rating: 'G' | 'PG-13' | 'R-17+' | 'R+';
  durationPerEp: string;
  subEpisodes: number;
  dubEpisodes: number;
  trailerYoutubeId: string;
  quality: 'HD' | '4K Ultra' | 'FHD';
  trendingRank?: number;
  isSpotlight?: boolean;
  spotlightQuote?: string;
  episodes: Episode[];
  characters: Character[];
  relations?: AnimeRelation[];
  reviews?: Review[];
}

export interface MangaChapter {
  id: number;
  chapterNumber: number;
  title: string;
  releaseDate: string;
  pages: string[];
}

export interface Manga {
  id: string;
  title: string;
  romajiTitle: string;
  nativeTitle: string;
  cover: string;
  banner: string;
  author: string;
  artist: string;
  status: 'Publishing' | 'Completed' | 'Hiatus';
  genres: string[];
  score: number;
  ranked: number;
  chaptersCount: number;
  synopsis: string;
  chapters: MangaChapter[];
}

export interface MangaReadingProgress {
  mangaId: string;
  currentChapter: number;
  currentPage: number;
  status: 'reading' | 'plan_to_read' | 'completed' | 'dropped';
  updatedAt: string;
}

export interface PartyMember {
  id: string;
  username: string;
  avatar: string;
  isHost: boolean;
  isVip?: boolean;
  joinedAt: string;
}

export interface PartyChatMessage {
  id: string;
  senderId: string;
  username: string;
  avatar: string;
  text: string;
  timestamp: string;
  isSystem?: boolean;
  isVip?: boolean;
}

export interface WatchParty {
  id: string;
  name: string;
  animeId: string;
  animeTitle: string;
  animeBanner: string;
  episodeId: number;
  episodeNumber: number;
  hostName: string;
  hostAvatar: string;
  participantsCount: number;
  maxParticipants: number;
  isPlaying: boolean;
  currentTime: number;
  isPrivate?: boolean;
  roomCode: string;
  description: string;
  members: PartyMember[];
  messages: PartyChatMessage[];
}

export interface PulseComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
}

export interface PulseClip {
  id: string;
  animeId?: string;
  animeTitle: string;
  creatorName: string;
  creatorAvatar: string;
  creatorHandle: string;
  isVerified?: boolean;
  isVipCreator?: boolean;
  videoUrl: string;
  posterUrl: string;
  caption: string;
  tags: string[];
  songTitle: string;
  songArtist: string;
  likesCount: number;
  isLiked?: boolean;
  commentsCount: number;
  sharesCount: number;
  isBookmarked?: boolean;
  comments: PulseComment[];
}

export interface LinkedGamingAccount {
  gameId: string;
  gameName: string;
  gameIcon: string;
  inGameName: string;
  playerId: string;
  level: number;
  rankTitle: string;
  server: string;
  playtimeHours: number;
  trophiesCount: number;
  syncedAt: string;
}

export interface AnimeGame {
  id: string;
  title: string;
  developer: string;
  publisher: string;
  icon: string;
  banner: string;
  rating: number;
  reviewsCount: string;
  downloads: string;
  category: 'Action RPG' | 'Turn-Based RPG' | 'Fighting' | 'Gacha Strategy' | 'Card Battle';
  platforms: ('Android' | 'iOS' | 'PC' | 'Console')[];
  playStoreUrl: string;
  appStoreUrl: string;
  officialSiteUrl: string;
  shortDescription: string;
  fullDescription: string;
  screenshots: string[];
  videoTrailerId?: string;
}

export interface FestivalEvent {
  id: string;
  name: string;
  country: string;
  city: string;
  venue: string;
  dates: string;
  image: string;
  description: string;
  websiteUrl: string;
  attendeesExpected: string;
  highlights: string[];
  ticketStatus: 'Tickets Available' | 'Selling Fast' | 'Sold Out';
}

export interface AnimeStore {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  image: string;
  category: 'Figures & Gunpla' | 'Manga & Light Novels' | 'Cosplay & Apparel' | 'Official Merchandise' | 'Cafe & Collectibles';
  rating: number;
  hours: string;
  description: string;
  websiteUrl: string;
}

export interface ClaireMessage {
  id: string;
  sender: 'user' | 'claire';
  text: string;
  timestamp: string;
  suggestedAnimeIds?: string[];
  suggestedMangaIds?: string[];
  festivalData?: FestivalEvent;
  storeData?: AnimeStore;
}

export interface DirectMessageItem {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  sharedPulseId?: string;
  sharedAnimeId?: string;
}

export interface ChatContact {
  id: string;
  username: string;
  handle: string;
  avatar: string;
  bannerUrl: string;
  bio: string;
  isOnline: boolean;
  isFollowing: boolean;
  unreadCount?: number;
  lastMessage?: string;
  lastMessageTime?: string;
}

export interface UserAccount {
  id: string;
  username: string;
  handle: string;
  email: string;
  avatar: string;
  bannerUrl: string;
  bio: string;
  isVip: boolean;
  vipTier?: 'ultra_vip' | 'creator_pass';
  paypalEmail?: string;
  followersCount: number;
  followingCount: number;
  linkedGames: LinkedGamingAccount[];
}

export interface ScheduleItem {
  id: string;
  animeId: string;
  title: string;
  episodeNumber: number;
  airTime: string;
  timestamp: number;
  image: string;
  genres: string[];
  sub: boolean;
  dub: boolean;
  isAiringToday?: boolean;
}

export interface ScheduleDay {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  dateStr: string;
  animes: ScheduleItem[];
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
  image?: string;
}

export interface CommunityPoll {
  id: string;
  title: string;
  category: string;
  deadline: string;
  totalVotes: number;
  options: PollOption[];
  userVotedOptionId?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: 'Industry' | 'Release' | 'Interview' | 'Recommendation' | 'Feature';
  image: string;
  readTime: string;
  tags: string[];
  commentsCount: number;
}

export interface DiscussionThread {
  id: string;
  title: string;
  author: string;
  avatar: string;
  animeTag?: string;
  category: 'General' | 'Episode Discussion' | 'Theory' | 'Manga vs Anime' | 'Recommendation';
  createdAt: string;
  content: string;
  upvotes: number;
  isUpvoted?: boolean;
  repliesCount: number;
  tags: string[];
}

export interface WatchlistEntry {
  animeId: string;
  status: WatchlistStatus;
  progressEpisode: number;
  userScore?: number;
  updatedAt: string;
  isFavorite?: boolean;
  customList?: string;
}

export interface ContinueWatchingItem {
  animeId: string;
  episodeId: number;
  episodeNumber: number;
  episodeTitle: string;
  currentTime: number;
  duration: number;
  updatedAt: string;
}

export interface UserSettings {
  theme: 'velnix-violet' | 'cyber-amber' | 'emerald-blade' | 'crimson-blood' | 'oled-midnight' | 'sakura-pink' | 'electric-cyan';
  defaultQuality: '4K Ultra' | '1080p' | '720p' | '480p' | 'auto';
  defaultAudio: 'sub' | 'dub';
  autoSkipIntro: boolean;
  autoPlayNext: boolean;
  danmakuEnabled: boolean;
  danmakuOpacity: number;
  danmakuSpeed: number;
  serverPreference: 'velnix-ultra' | 'kyoto-cdn' | 'tokyo-fast' | 'alpha-stream';
  paypalEmailAddress: string;
}
