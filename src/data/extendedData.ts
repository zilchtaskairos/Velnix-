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
// MANGA DATABASE
// ---------------------------------------------------------
export const MANGA_DATABASE: Manga[] = [
  {
    id: 'manga-bleach',
    title: 'BLEACH',
    romajiTitle: 'Bleach',
    nativeTitle: 'BLEACH',
    cover: '/assets/bleach_poster.jpg',
    banner: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1920&q=80',
    author: 'Tite Kubo',
    artist: 'Tite Kubo',
    status: 'Completed',
    genres: ['Action', 'Supernatural', 'Shonen'],
    score: 8.78,
    ranked: 12,
    chaptersCount: 686,
    synopsis: "Ichigo Kurosaki has always been able to see ghosts, but this ability doesn't change his life until he meets Rukia Kuchiki, a Shinigami and member of the Soul Society.",
    chapters: [
      {
        id: 1,
        chapterNumber: 1,
        title: 'Death & Strawberry',
        releaseDate: 'Aug 07, 2001',
        pages: [
          'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80'
        ]
      },
      {
        id: 2,
        chapterNumber: 2,
        title: 'Starter',
        releaseDate: 'Aug 14, 2001',
        pages: [
          'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
        ]
      }
    ]
  },
  {
    id: 'manga-solo-leveling',
    title: 'Solo Leveling',
    romajiTitle: 'Na Honjaman Rebeleop',
    nativeTitle: '나 혼자만 레벨업',
    cover: '/assets/solo_leveling_poster.jpg',
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80',
    author: 'Chugong',
    artist: 'DUBU (REDICE Studio)',
    status: 'Completed',
    genres: ['Action', 'Adventure', 'Fantasy'],
    score: 8.92,
    ranked: 5,
    chaptersCount: 200,
    synopsis: 'Known as the Weakest Hunter of All Mankind, E-rank hunter Sung Jinwoo is barely clinging to survival until a mysterious Quest log opens before him.',
    chapters: [
      {
        id: 1,
        chapterNumber: 1,
        title: 'Prologue & The Double Dungeon',
        releaseDate: 'Mar 04, 2018',
        pages: [
          'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
        ]
      }
    ]
  },
  {
    id: 'manga-frieren',
    title: "Frieren: Beyond Journey's End",
    romajiTitle: 'Sousou no Frieren',
    nativeTitle: '葬送のフリーレン',
    cover: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    banner: '/assets/frieren_banner.jpg',
    author: 'Kanehito Yamada',
    artist: 'Tsukasa Abe',
    status: 'Publishing',
    genres: ['Adventure', 'Drama', 'Fantasy'],
    score: 9.15,
    ranked: 3,
    chaptersCount: 130,
    synopsis: 'The adventure is over, but life goes on for an elf mage just beginning to learn what living is all about.',
    chapters: [
      {
        id: 1,
        chapterNumber: 1,
        title: 'The End of the Adventure',
        releaseDate: 'Apr 28, 2020',
        pages: [
          'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80'
        ]
      }
    ]
  }
];

// ---------------------------------------------------------
// PULSE SHORT CLIPS (TikTok-style Feed)
// ---------------------------------------------------------
export const INITIAL_PULSE_CLIPS: PulseClip[] = [
  {
    id: 'pulse-1',
    animeId: 'bleach-tybw',
    animeTitle: 'BLEACH: Thousand-Year Blood War',
    creatorName: 'Paul Wachira',
    creatorAvatar: '/assets/paul_avatar.jpg',
    creatorHandle: '@paul_velnix',
    isVerified: true,
    isVipCreator: true,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    caption: 'Ichigo bankai transition with 4K HDR mastering hits differently 🔥⚔️ #BleachTYBW #AnimeEdit #Bankai',
    tags: ['Bleach', 'AnimeEdit', 'Bankai', '4K'],
    songTitle: 'Number One (Bankai Vocal Remix)',
    songArtist: 'Shiro Sagisu x Hazel Fernandes',
    likesCount: 18420,
    isLiked: true,
    commentsCount: 642,
    sharesCount: 1280,
    isBookmarked: true,
    comments: [
      {
        id: 'pc-1',
        author: 'Claire ✦ AI',
        avatar: '/claire_avatar.jpg',
        text: 'The frame sync at 0:14 with the Getsuga Jujisho is immaculate! ❀',
        timestamp: '1h ago',
        likes: 89,
        isLiked: true
      },
      {
        id: 'pc-2',
        author: 'Ren Kageyama',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        text: 'Best anime edit on Velnix Pulse hands down!',
        timestamp: '3h ago',
        likes: 34
      }
    ]
  },
  {
    id: 'pulse-2',
    animeId: 'jujutsu-kaisen-s2',
    animeTitle: 'Jujutsu Kaisen Season 2',
    creatorName: 'Aiko Tanaka',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    creatorHandle: '@aiko_amv',
    isVerified: true,
    isVipCreator: false,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    caption: 'Gojo Satoru Domain Expansion: Infinite Void 🤞⚡ #JJK #Gojo #UnlimitedVoid',
    tags: ['JJK', 'GojoSatoru', 'DomainExpansion'],
    songTitle: 'SPECIALZ (Phonk Remix)',
    songArtist: 'King Gnu',
    likesCount: 24500,
    isLiked: false,
    commentsCount: 912,
    sharesCount: 3100,
    isBookmarked: false,
    comments: []
  },
  {
    id: 'pulse-3',
    animeId: 'frieren-beyond-journeys-end',
    animeTitle: "Frieren: Beyond Journey's End",
    creatorName: 'Kenji Sato',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    creatorHandle: '@kenji_cinematic',
    isVerified: false,
    isVipCreator: false,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=800&q=80',
    caption: 'Frieren Zoltraak vs Aura the Guillotine 🪄✨ Pure art in motion #Frieren #Madhouse',
    tags: ['Frieren', 'Zoltraak', 'Madhouse'],
    songTitle: 'Anytime Anywhere',
    songArtist: 'milet',
    likesCount: 15300,
    isLiked: false,
    commentsCount: 420,
    sharesCount: 890,
    isBookmarked: false,
    comments: []
  }
];

// ---------------------------------------------------------
// OFFICIAL ANIME GAMES
// ---------------------------------------------------------
export const OFFICIAL_ANIME_GAMES: AnimeGame[] = [
  {
    id: 'game-bleach-brave-souls',
    title: 'BLEACH: Brave Souls',
    developer: 'KLab Inc.',
    publisher: 'KLab Inc.',
    icon: '/assets/bleach_poster.jpg',
    banner: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    reviewsCount: '480K',
    downloads: '80M+',
    category: 'Action RPG',
    platforms: ['Android', 'iOS', 'PC', 'Console'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.klab.bleach',
    appStoreUrl: 'https://apps.apple.com/app/bleach-brave-souls/id1003168863',
    officialSiteUrl: 'https://www.bleach-bravesouls.com/en/',
    shortDescription: '3D Action Hack and Slash based on the hit anime and manga BLEACH.',
    fullDescription: 'Build teams with your favorite BLEACH characters, experience the story, and unleash special moves in 3D action battles.',
    screenshots: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'game-solo-leveling-arise',
    title: 'Solo Leveling: ARISE',
    developer: 'Netmarble',
    publisher: 'Netmarble Neo',
    icon: '/assets/solo_leveling_poster.jpg',
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    reviewsCount: '620K',
    downloads: '50M+',
    category: 'Action RPG',
    platforms: ['Android', 'iOS', 'PC'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.netmarble.sololv',
    appStoreUrl: 'https://apps.apple.com/app/solo-leveling-arise/id1662708264',
    officialSiteUrl: 'https://sololeveling.netmarble.com',
    shortDescription: 'Level up Sung Jinwoo and command the shadow army in cinematic real-time combat.',
    fullDescription: 'Experience the webtoon and anime story firsthand, recruit iconic hunters, and battle dungeon bosses.',
    screenshots: [
      'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

// ---------------------------------------------------------
// ANIME FESTIVALS & EVENTS
// ---------------------------------------------------------
export const ANIME_FESTIVALS: FestivalEvent[] = [
  {
    id: 'fest-animejapan',
    name: 'AnimeJapan 2027',
    country: 'Japan',
    city: 'Tokyo',
    venue: 'Tokyo Big Sight',
    dates: 'March 27 - 29, 2027',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    description: "The world's largest anime consumer convention featuring global stage premieres, voice actor panels, and exclusive exhibitions.",
    websiteUrl: 'https://www.anime-japan.jp',
    attendeesExpected: '150,000+',
    highlights: ['Bleach TYBW Part 4 Stage', 'Jujutsu Kaisen Season 3 Reveal', 'Studio MAPPA 15th Anniversary'],
    ticketStatus: 'Selling Fast'
  },
  {
    id: 'fest-anime-expo',
    name: 'Anime Expo (AX)',
    country: 'United States',
    city: 'Los Angeles, CA',
    venue: 'Los Angeles Convention Center',
    dates: 'July 1 - 4, 2027',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    description: "North America's biggest celebration of Japanese pop culture, anime, manga, gaming, and cosplay.",
    websiteUrl: 'https://www.anime-expo.org',
    attendeesExpected: '115,000+',
    highlights: ['Anisong World Matsuri Concert', 'Masquerade Cosplay Finals', 'Industry Premieres'],
    ticketStatus: 'Tickets Available'
  }
];

// ---------------------------------------------------------
// ANIME STORES
// ---------------------------------------------------------
export const ANIME_STORES: AnimeStore[] = [
  {
    id: 'store-animate-ikebukuro',
    name: 'Animate Ikebukuro Main Flagship',
    country: 'Japan',
    city: 'Tokyo',
    address: '1 Chome-20-7 Higashiikebukuro, Toshima City, Tokyo',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    category: 'Official Merchandise',
    rating: 4.9,
    hours: '11:00 AM - 9:00 PM',
    description: "The world's largest anime store spanning 9 full floors of manga, character goods, collaboration cafe, and theater.",
    websiteUrl: 'https://www.animate.co.jp/shop/ikebukuro/'
  }
];

// ---------------------------------------------------------
// LIVE WATCH PARTIES
// ---------------------------------------------------------
export const INITIAL_WATCH_PARTIES: WatchParty[] = [
  {
    id: 'party-bleach-premiere',
    name: '✦ Bleach TYBW Episode 1-4 Mega Watch',
    animeId: 'bleach-tybw',
    animeTitle: 'BLEACH: Thousand-Year Blood War',
    animeBanner: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1920&q=80',
    episodeId: 1,
    episodeNumber: 1,
    hostName: 'Paul Wachira',
    hostAvatar: '/assets/paul_avatar.jpg',
    participantsCount: 842,
    maxParticipants: 1000,
    isPlaying: true,
    currentTime: 420,
    isPrivate: false,
    roomCode: 'BLEACH-4K',
    description: 'Live synchronised viewing with live chat, 4K HDR playback, and community commentary!',
    members: [
      {
        id: 'u-1',
        username: 'Paul Wachira',
        avatar: '/assets/paul_avatar.jpg',
        isHost: true,
        isVip: true,
        joinedAt: '10m ago'
      },
      {
        id: 'u-2',
        username: 'Claire ✦ AI',
        avatar: '/claire_avatar.jpg',
        isHost: false,
        isVip: true,
        joinedAt: '10m ago'
      }
    ],
    messages: [
      {
        id: 'msg-1',
        senderId: 'u-1',
        username: 'Paul Wachira',
        avatar: '/assets/paul_avatar.jpg',
        text: 'Welcome to the Velnix premiere party! Get ready for this Bankai scene ⚔️',
        timestamp: '2m ago',
        isVip: true
      },
      {
        id: 'msg-2',
        senderId: 'u-2',
        username: 'Claire ✦ AI',
        avatar: '/claire_avatar.jpg',
        text: 'Synchronized stream buffer stable at 4K 60fps ❀ Enjoy the show!',
        timestamp: '1m ago',
        isSystem: false,
        isVip: true
      }
    ]
  },
  {
    id: 'party-jjk-shibuya',
    name: 'Jujutsu Kaisen Shibuya Incident Marathon',
    animeId: 'jujutsu-kaisen-s2',
    animeTitle: 'Jujutsu Kaisen Season 2',
    animeBanner: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1920&q=80',
    episodeId: 1,
    episodeNumber: 1,
    hostName: 'Aiko Tanaka',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    participantsCount: 512,
    maxParticipants: 800,
    isPlaying: true,
    currentTime: 180,
    isPrivate: false,
    roomCode: 'JJK-SHIBUYA',
    description: 'Watching Gojo vs Disaster Curses in Shibuya!',
    members: [],
    messages: []
  }
];

// ---------------------------------------------------------
// INITIAL CHAT CONTACTS
// ---------------------------------------------------------
export const INITIAL_CHAT_CONTACTS: ChatContact[] = [
  {
    id: 'claire',
    username: 'Claire ✦ AI',
    handle: '@claire_ai',
    avatar: '/claire_avatar.jpg',
    bannerUrl: '',
    bio: 'Velnix AI Concierge & Anime Companion ❀',
    isOnline: true,
    isFollowing: true,
    unreadCount: 1,
    lastMessage: 'Ready to stream Bleach TYBW in 4K? ✨',
    lastMessageTime: 'Just now'
  },
  {
    id: 'kenji',
    username: 'Kenji Sato',
    handle: '@kenji_cinematic',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    bannerUrl: '',
    bio: 'AMV Creator & Video Editor',
    isOnline: true,
    isFollowing: true,
    lastMessage: 'Check out my new Pulse clip edit! 🔥',
    lastMessageTime: '12m ago'
  },
  {
    id: 'aiko',
    username: 'Aiko Tanaka',
    handle: '@aiko_amv',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    bannerUrl: '',
    bio: 'Jujutsu Kaisen & Shonen Fanatic',
    isOnline: false,
    isFollowing: true,
    lastMessage: 'The watch party room is live!',
    lastMessageTime: '2h ago'
  }
];

export const INITIAL_DIRECT_MESSAGES: DirectMessageItem[] = [
  {
    id: 'dm-1',
    senderId: 'claire',
    receiverId: 'me',
    text: 'Hello Paul! Ready to stream Bleach TYBW or explore the new Pulse video clips? ✨',
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
  email: 'paul@velnix.app',
  avatar: '/assets/paul_avatar.jpg',
  bannerUrl: '/assets/paul_banner.jpg',
  bio: 'Creator of Velnix. 🌸 Exploring Bleach TYBW & the frontiers of anime streaming.',
  isVip: true,
  vipTier: 'ultra_vip',
  paypalEmail: 'velnix.official@gmail.com',
  followersCount: 1420,
  followingCount: 38,
  linkedGames: [
    {
      gameId: 'game-bleach-brave-souls',
      gameName: 'BLEACH: Brave Souls',
      gameIcon: '/assets/bleach_poster.jpg',
      inGameName: 'Ichigo_Velnix',
      playerId: 'BS-8849201',
      level: 150,
      rankTitle: 'Captain Commander',
      server: 'Global Server 1',
      playtimeHours: 240,
      trophiesCount: 48,
      syncedAt: 'Today'
    }
  ]
};
