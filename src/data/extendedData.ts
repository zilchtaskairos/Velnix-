import { 
  Manga, 
  PulseClip, 
  AnimeGame, 
  FestivalEvent, 
  AnimeStore, 
  WatchParty, 
  ChatContact, 
  DirectMessageItem,
  UserAccount
} from '../types/anime';

export const CLAIRE_AVATAR_IMAGE = '/claire_avatar.jpg';

// ---------------------------------------------------------
// CLEARED DATABASES — Ready for user's personal codes
// ---------------------------------------------------------
export const MANGA_DATABASE: Manga[] = [];

export const INITIAL_PULSE_CLIPS: PulseClip[] = [];

export const OFFICIAL_ANIME_GAMES: AnimeGame[] = [];

export const ANIME_FESTIVALS: FestivalEvent[] = [];

export const ANIME_STORES: AnimeStore[] = [];

export const INITIAL_WATCH_PARTIES: WatchParty[] = [];

// ---------------------------------------------------------
// INITIAL CHAT CONTACTS (Only Claire initially)
// ---------------------------------------------------------
export const INITIAL_CHAT_CONTACTS: ChatContact[] = [
  {
    id: 'claire',
    username: 'Claire',
    handle: '@claire_ai',
    avatar: '/claire_avatar.jpg',
    bannerUrl: '',
    bio: 'Velnix AI Concierge & Anime Companion',
    isOnline: true,
    isFollowing: true,
    lastMessage: 'What anime should we watch today? ✨',
    lastMessageTime: 'Just now'
  }
];

export const INITIAL_DIRECT_MESSAGES: DirectMessageItem[] = [
  {
    id: 'dm-1',
    senderId: 'claire',
    receiverId: 'me',
    text: 'What anime should we watch today? ✨',
    timestamp: 'Just now'
  }
];

// ---------------------------------------------------------
// USER ACCOUNT: PAUL WACHIRA (@paul_velnix)
// ---------------------------------------------------------
export const INITIAL_USER_ACCOUNT: UserAccount = {
  id: 'me',
  username: 'Paul Wachira',
  handle: '@paul_velnix',
  email: 'paul.wachira@velnix.stream',
  avatar: '',
  bannerUrl: '',
  bio: 'Anime & Manga streamer on Velnix',
  isVip: false,
  paypalEmail: 'velnix.official@gmail.com',
  followersCount: 0,
  followingCount: 0,
  linkedGames: []
};
