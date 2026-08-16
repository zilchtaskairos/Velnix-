import { Anime, ScheduleDay, CommunityPoll, NewsArticle, DiscussionThread, EpisodeComment, DanmakuComment } from '../types/anime';

export const ALL_GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Drama',
  'Fantasy',
  'Isekai',
  'Magic',
  'Mystery',
  'Psychological',
  'Romance',
  'Sci-Fi',
  'Shonen',
  'Slice of Life',
  'Sports',
  'Supernatural',
  'Suspense',
  'Thriller'
];

export const ANIMES_DATABASE: Anime[] = [
  {
    id: 'bleach-tybw',
    title: 'BLEACH: Thousand-Year Blood War',
    romajiTitle: 'Bleach: Sennen Kessen-hen',
    nativeTitle: 'BLEACH 千年血戦篇',
    banner: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1920&q=80',
    poster: '/assets/bleach_poster.jpg',
    synopsis: 'The peace is suddenly broken when warning sirens blare through the Soul Society. Residents are disappearing without a trace and nobody knows who is behind it. Meanwhile, a dark shadow is also extending itself toward Ichigo and his friends in Karakura Town. As the Quincy empire Wandenreich declares war on the Shinigami, the thousand-year conflict reaches its catastrophic climax.',
    shortSynopsis: 'The final war between Shinigami and Quincies unfolds with universe-shaking battles.',
    score: 9.12,
    ranked: 1,
    popularity: 98,
    format: 'TV',
    episodesCount: 52,
    status: 'Airing',
    season: 'Fall',
    year: 2024,
    studio: 'Studio Pierrot',
    genres: ['Action', 'Adventure', 'Supernatural', 'Shonen'],
    rating: 'R-17+',
    durationPerEp: '24m',
    subEpisodes: 26,
    dubEpisodes: 24,
    trailerYoutubeId: 'e8YBesKFq-g',
    quality: '4K Ultra',
    trendingRank: 1,
    isSpotlight: true,
    spotlightQuote: 'THE FINAL WAR. THE FINAL TRUTH. The soul society enters its darkest hour as the Quincy empire awakens.',
    episodes: [
      {
        id: 1,
        number: 1,
        title: 'The Blood Warfare',
        thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=640&q=80',
        duration: '24:15',
        durationSeconds: 1455,
        isFiller: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        introStart: 90,
        introEnd: 180,
        outroStart: 1350,
        outroEnd: 1440,
        synopsis: 'Soul Society detects the disappearance of thousands of Hollows while Karakura Town is attacked by mysterious Quincy invaders.',
        airDate: 'Oct 11, 2022'
      },
      {
        id: 2,
        number: 2,
        title: 'Foundation Stones',
        thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=640&q=80',
        duration: '24:08',
        durationSeconds: 1448,
        isFiller: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        introStart: 85,
        introEnd: 175,
        outroStart: 1340,
        outroEnd: 1435,
        synopsis: 'Ichigo, Chad, and Orihime travel to Hueco Mundo to liberate the Arrancar from the ruthless Wandenreich vanguard.',
        airDate: 'Oct 18, 2022'
      },
      {
        id: 3,
        number: 3,
        title: 'March of the Starcross',
        thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=640&q=80',
        duration: '24:12',
        durationSeconds: 1452,
        isFiller: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        introStart: 90,
        introEnd: 180,
        outroStart: 1350,
        outroEnd: 1445,
        synopsis: 'The Sternritter launch their direct lightning assault on the Seireitei, overwhelming the Gotei 13 divisions.',
        airDate: 'Oct 25, 2022'
      },
      {
        id: 4,
        number: 4,
        title: 'Kill the Shadow',
        thumbnail: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=640&q=80',
        duration: '24:20',
        durationSeconds: 1460,
        isFiller: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        introStart: 90,
        introEnd: 180,
        outroStart: 1355,
        outroEnd: 1450,
        synopsis: 'The Shinigami Captains unleash their Bankai only to discover the horrific truth: the Quincy can steal their powers.',
        airDate: 'Nov 01, 2022'
      }
    ],
    characters: [
      {
        id: 'c1',
        name: 'Ichigo Kurosaki',
        role: 'Main',
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80',
        voiceActor: {
          name: 'Masakazu Morita',
          language: 'Japanese',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
        }
      },
      {
        id: 'c2',
        name: 'Yhwach',
        role: 'Main',
        image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80',
        voiceActor: {
          name: 'Takayuki Sugo',
          language: 'Japanese',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
        }
      },
      {
        id: 'c3',
        name: 'Rukia Kuchiki',
        role: 'Supporting',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
        voiceActor: {
          name: 'Fumiko Orikasa',
          language: 'Japanese',
          image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
        }
      }
    ]
  },
  {
    id: 'demon-slayer-s4',
    title: 'Demon Slayer: Hashira Training Arc',
    romajiTitle: 'Kimetsu no Yaiba: Hashira Geiko-hen',
    nativeTitle: '鬼滅の刃 柱稽古編',
    banner: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80',
    poster: '/assets/demon_slayer_poster.jpg',
    synopsis: 'Tanjiro and the Demon Slayer Corps enter the grueling Hashira Training program to prepare for the looming battle with Muzan Kibutsuji and the Upper Rank demons in the Infinity Castle.',
    shortSynopsis: 'The Demon Slayers undergo extreme conditioning under the Hashira.',
    score: 8.85,
    ranked: 2,
    popularity: 97,
    format: 'TV',
    episodesCount: 8,
    status: 'Completed',
    season: 'Spring',
    year: 2024,
    studio: 'ufotable',
    genres: ['Action', 'Fantasy', 'Supernatural', 'Shonen'],
    rating: 'R-17+',
    durationPerEp: '24m',
    subEpisodes: 8,
    dubEpisodes: 8,
    trailerYoutubeId: 'tbe47e2qVpU',
    quality: '4K Ultra',
    trendingRank: 2,
    episodes: [
      {
        id: 1,
        number: 1,
        title: 'To Defeat Muzan Kibutsuji',
        thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=640&q=80',
        duration: '45:00',
        durationSeconds: 2700,
        isFiller: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        introStart: 120,
        introEnd: 210,
        outroStart: 2550,
        outroEnd: 2640,
        synopsis: 'In the aftermath of the Swordsmith Village battle, Kagaya Ubuyashiki calls for an emergency Hashira meeting to initiate corps-wide training.',
        airDate: 'May 12, 2024'
      }
    ],
    characters: [
      {
        id: 'ds1',
        name: 'Tanjiro Kamado',
        role: 'Main',
        image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80',
        voiceActor: {
          name: 'Natsuki Hanae',
          language: 'Japanese',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
        }
      }
    ]
  },
  {
    id: 'jujutsu-kaisen-s2',
    title: 'Jujutsu Kaisen Season 2',
    romajiTitle: 'Jujutsu Kaisen 2nd Season',
    nativeTitle: '呪術廻戦 懐玉・玉折 / 渋谷事変',
    banner: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1920&q=80',
    poster: '/assets/jjk_poster.jpg',
    synopsis: 'The past and present collide as the tragic youth of Gojo and Geto during the Hidden Inventory arc leads directly into the cataclysmic Shibuya Incident on October 31st.',
    shortSynopsis: 'The Shibuya Incident changes jujutsu society forever.',
    score: 8.98,
    ranked: 3,
    popularity: 99,
    format: 'TV',
    episodesCount: 23,
    status: 'Completed',
    season: 'Summer',
    year: 2023,
    studio: 'MAPPA',
    genres: ['Action', 'Supernatural', 'Fantasy', 'Shonen'],
    rating: 'R-17+',
    durationPerEp: '24m',
    subEpisodes: 23,
    dubEpisodes: 23,
    trailerYoutubeId: 'v8bZVjC8v60',
    quality: '4K Ultra',
    trendingRank: 3,
    episodes: [
      {
        id: 1,
        number: 1,
        title: 'Hidden Inventory',
        thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=640&q=80',
        duration: '24:00',
        durationSeconds: 1440,
        isFiller: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        introStart: 90,
        introEnd: 180,
        outroStart: 1350,
        outroEnd: 1440,
        synopsis: 'Second-year jujutsu students Satoru Gojo and Suguru Geto are given a dangerous mission to protect the Star Plasma Vessel.',
        airDate: 'Jul 06, 2023'
      }
    ],
    characters: [
      {
        id: 'jjk1',
        name: 'Satoru Gojo',
        role: 'Main',
        image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80',
        voiceActor: {
          name: 'Yuichi Nakamura',
          language: 'Japanese',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
        }
      }
    ]
  },
  {
    id: 'solo-leveling',
    title: 'Solo Leveling',
    romajiTitle: 'Ore dake Level Up na Ken',
    nativeTitle: '俺だけレベルアップな件',
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80',
    poster: '/assets/solo_leveling_poster.jpg',
    synopsis: "In a world connected to monster-infested dungeons, Sung Jinwoo awakens a game-like System after surviving a slaughter in a double dungeon, becoming humanity's only leveling hunter.",
    shortSynopsis: 'The weakest hunter rises to godhood through a mysterious leveling system.',
    score: 8.54,
    ranked: 4,
    popularity: 96,
    format: 'TV',
    episodesCount: 12,
    status: 'Completed',
    season: 'Winter',
    year: 2024,
    studio: 'A-1 Pictures',
    genres: ['Action', 'Adventure', 'Fantasy'],
    rating: 'R-17+',
    durationPerEp: '24m',
    subEpisodes: 12,
    dubEpisodes: 12,
    trailerYoutubeId: 'dgzPj28i5uA',
    quality: 'HD',
    trendingRank: 4,
    episodes: [
      {
        id: 1,
        number: 1,
        title: "I'm Used to It",
        thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=640&q=80',
        duration: '24:00',
        durationSeconds: 1440,
        isFiller: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        introStart: 90,
        introEnd: 180,
        outroStart: 1350,
        outroEnd: 1440,
        synopsis: 'Sung Jinwoo enters a low-rank dungeon with his raid party only to stumble into an ancient temple holding deadly statues.',
        airDate: 'Jan 07, 2024'
      }
    ],
    characters: [
      {
        id: 'sl1',
        name: 'Sung Jin-Woo',
        role: 'Main',
        image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80',
        voiceActor: {
          name: 'Taito Ban',
          language: 'Japanese',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
        }
      }
    ]
  },
  {
    id: 'frieren-beyond-journeys-end',
    title: "Frieren: Beyond Journey's End",
    romajiTitle: 'Sousou no Frieren',
    nativeTitle: '葬送のフリーレン',
    banner: '/assets/frieren_banner.jpg',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    synopsis: 'After defeating the Demon King alongside the Hero Party, elven mage Frieren embarks on a peaceful journey to understand human emotions and fulfill her promise to Himmel.',
    shortSynopsis: 'A touching journey about time, memories, and the beauty of human connections.',
    score: 9.35,
    ranked: 5,
    popularity: 95,
    format: 'TV',
    episodesCount: 28,
    status: 'Completed',
    season: 'Fall',
    year: 2023,
    studio: 'Madhouse',
    genres: ['Adventure', 'Drama', 'Fantasy', 'Slice of Life'],
    rating: 'PG-13',
    durationPerEp: '24m',
    subEpisodes: 28,
    dubEpisodes: 28,
    trailerYoutubeId: 'qgQunxD0qMo',
    quality: '4K Ultra',
    trendingRank: 5,
    episodes: [
      {
        id: 1,
        number: 1,
        title: "The Journey's End",
        thumbnail: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=640&q=80',
        duration: '24:00',
        durationSeconds: 1440,
        isFiller: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        introStart: 90,
        introEnd: 180,
        outroStart: 1350,
        outroEnd: 1440,
        synopsis: 'The Hero Party returns victorious after 10 years of combat, gazing together upon the meteor shower that occurs once every half-century.',
        airDate: 'Sep 29, 2023'
      }
    ],
    characters: [
      {
        id: 'f1',
        name: 'Frieren',
        role: 'Main',
        image: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=400&q=80',
        voiceActor: {
          name: 'Atsumi Tanezaki',
          language: 'Japanese',
          image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
        }
      }
    ]
  },
  {
    id: 'my-dress-up-darling',
    title: 'My Dress-Up Darling',
    romajiTitle: 'Sono Bisque Doll wa Koi wo Suru',
    nativeTitle: 'その着せ替え人形は恋をする',
    banner: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1920&q=80',
    poster: '/assets/my_dress_up_poster.jpg',
    synopsis: 'High school student Wakana Gojo spends his days perfecting the art of crafting Hina dolls. When popular girl Marin Kitagawa discovers his sewing talent, she invites him to make her cosplay outfits.',
    shortSynopsis: 'A heartwarming romantic comedy about cosplay, passion, and young love.',
    score: 8.30,
    ranked: 6,
    popularity: 92,
    format: 'TV',
    episodesCount: 12,
    status: 'Completed',
    season: 'Winter',
    year: 2022,
    studio: 'CloverWorks',
    genres: ['Comedy', 'Romance', 'Slice of Life'],
    rating: 'PG-13',
    durationPerEp: '24m',
    subEpisodes: 12,
    dubEpisodes: 12,
    trailerYoutubeId: '8ivyJBD26EY',
    quality: 'HD',
    trendingRank: 6,
    episodes: [
      {
        id: 1,
        number: 1,
        title: 'Someone Who Lives in the Opposite World as Me',
        thumbnail: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=640&q=80',
        duration: '24:00',
        durationSeconds: 1440,
        isFiller: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        introStart: 90,
        introEnd: 180,
        outroStart: 1350,
        outroEnd: 1440,
        synopsis: 'Wakana Gojo meets class gyaru Marin Kitagawa and enters the vibrant world of cosplay design.',
        airDate: 'Jan 09, 2022'
      }
    ],
    characters: []
  },
  {
    id: 'naruto-shippuden',
    title: 'Naruto: Shippuden',
    romajiTitle: 'Naruto: Shippuuden',
    nativeTitle: 'NARUTO -ナルト- 疾風伝',
    banner: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=80',
    poster: '/assets/naruto_poster.jpg',
    synopsis: 'Naruto Uzumaki returns to Konoha after two and a half years of intense training with Jiraiya, ready to face the mysterious Akatsuki organization and bring Sasuke back.',
    shortSynopsis: 'The classic journey of ninja determination and worldwide destiny.',
    score: 8.27,
    ranked: 7,
    popularity: 99,
    format: 'TV',
    episodesCount: 500,
    status: 'Completed',
    season: 'Winter',
    year: 2007,
    studio: 'Studio Pierrot',
    genres: ['Action', 'Adventure', 'Fantasy', 'Shonen'],
    rating: 'PG-13',
    durationPerEp: '23m',
    subEpisodes: 500,
    dubEpisodes: 500,
    trailerYoutubeId: '1dy2zP1BiTE',
    quality: 'HD',
    trendingRank: 7,
    episodes: [
      {
        id: 1,
        number: 1,
        title: 'Homecoming',
        thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=640&q=80',
        duration: '23:00',
        durationSeconds: 1380,
        isFiller: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        introStart: 90,
        introEnd: 180,
        outroStart: 1300,
        outroEnd: 1375,
        synopsis: 'Naruto returns to the Hidden Leaf Village older, stronger, and more determined than ever.',
        airDate: 'Feb 15, 2007'
      }
    ],
    characters: []
  }
];

export const INITIAL_DANMAKU_COMMENTS: DanmakuComment[] = [
  { id: 'd1', episodeId: 1, time: 14, text: 'BANKAI ACTIVATION LOOKS INCREDIBLE 🔥', color: '#ff2e56', size: 'large', topRow: 1 },
  { id: 'd2', episodeId: 1, time: 28, text: 'Studio Pierrot cooked with the lighting!', color: '#ffffff', size: 'medium', topRow: 2 },
  { id: 'd3', episodeId: 1, time: 52, text: 'The OST in this scene gave me goosebumps ⚡', color: '#ffd700', size: 'medium', topRow: 3 },
  { id: 'd4', episodeId: 1, time: 78, text: 'Velnix stream quality is crystal clear 4K 🌸', color: '#ff4b72', size: 'large', topRow: 2 },
  { id: 'd5', episodeId: 1, time: 120, text: 'Yhwach theme song is pure terror 👑', color: '#a855f7', size: 'medium', topRow: 1 }
];

export const SAMPLE_EPISODE_COMMENTS: EpisodeComment[] = [
  {
    id: 'c1',
    episodeId: 1,
    animeId: 'bleach-tybw',
    author: 'Paul Wachira',
    avatar: '/assets/paul_avatar.jpg',
    timestamp: '2 hours ago',
    content: 'The animation upgrade from the original 2004 series to TYBW is monumental. Studio Pierrot truly gave Kubo-sensei full creative freedom here!',
    likes: 42,
    isLiked: true,
    replies: [
      {
        id: 'r1',
        author: 'Claire ✦ AI',
        avatar: '/claire_avatar.jpg',
        timestamp: '1 hour ago',
        content: 'Agreed, Paul! Shiro Sagisu reworked all orchestral scores specifically for the Wandenreich theme ❀',
        likes: 18
      }
    ]
  }
];

export const SCHEDULE_WEEK_DATA: ScheduleDay[] = [
  {
    day: 'Monday',
    dateStr: 'Aug 14',
    animes: [
      {
        id: 'sch-1',
        animeId: 'bleach-tybw',
        title: 'BLEACH: Thousand-Year Blood War',
        episodeNumber: 27,
        airTime: '23:00 JST',
        timestamp: Date.now() + 3600000,
        image: '/assets/bleach_poster.jpg',
        genres: ['Action', 'Supernatural'],
        sub: true,
        dub: true,
        isAiringToday: true
      }
    ]
  },
  {
    day: 'Tuesday',
    dateStr: 'Aug 15',
    animes: [
      {
        id: 'sch-2',
        animeId: 'frieren-beyond-journeys-end',
        title: "Frieren: Beyond Journey's End Special",
        episodeNumber: 29,
        airTime: '22:30 JST',
        timestamp: Date.now() + 86400000,
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
        genres: ['Fantasy', 'Adventure'],
        sub: true,
        dub: false
      }
    ]
  },
  {
    day: 'Wednesday',
    dateStr: 'Aug 16',
    animes: [
      {
        id: 'sch-3',
        animeId: 'jujutsu-kaisen-s2',
        title: 'Jujutsu Kaisen Season 2',
        episodeNumber: 24,
        airTime: '23:56 JST',
        timestamp: Date.now() + 172800000,
        image: '/assets/jjk_poster.jpg',
        genres: ['Action', 'Dark Fantasy'],
        sub: true,
        dub: true
      }
    ]
  },
  {
    day: 'Thursday',
    dateStr: 'Aug 17',
    animes: []
  },
  {
    day: 'Friday',
    dateStr: 'Aug 18',
    animes: [
      {
        id: 'sch-4',
        animeId: 'solo-leveling',
        title: 'Solo Leveling: Arise',
        episodeNumber: 13,
        airTime: '24:00 JST',
        timestamp: Date.now() + 345600000,
        image: '/assets/solo_leveling_poster.jpg',
        genres: ['Action', 'Fantasy'],
        sub: true,
        dub: true
      }
    ]
  },
  {
    day: 'Saturday',
    dateStr: 'Aug 19',
    animes: [
      {
        id: 'sch-5',
        animeId: 'demon-slayer-s4',
        title: 'Demon Slayer Hashira Movie Preview',
        episodeNumber: 1,
        airTime: '23:15 JST',
        timestamp: Date.now() + 432000000,
        image: '/assets/demon_slayer_poster.jpg',
        genres: ['Action', 'Historical'],
        sub: true,
        dub: true
      }
    ]
  },
  {
    day: 'Sunday',
    dateStr: 'Aug 20',
    animes: [
      {
        id: 'sch-6',
        animeId: 'my-dress-up-darling',
        title: 'My Dress-Up Darling Season 2 Teaser',
        episodeNumber: 1,
        airTime: '21:00 JST',
        timestamp: Date.now() + 518400000,
        image: '/assets/my_dress_up_poster.jpg',
        genres: ['Romance', 'Comedy'],
        sub: true,
        dub: true
      }
    ]
  }
];

export const COMMUNITY_POLLS: CommunityPoll[] = [
  {
    id: 'poll-1',
    title: 'Which anime has the best opening theme song of the year?',
    category: 'Music & OST',
    deadline: 'In 3 days',
    totalVotes: 14820,
    options: [
      { id: 'op-1', label: 'Bleach TYBW — "Scar" by Tatsuya Kitani', votes: 6420 },
      { id: 'op-2', label: 'Jujutsu Kaisen — "Specialz" by King Gnu', votes: 5310 },
      { id: 'op-3', label: 'Solo Leveling — "LEveL" by SawanoHiroyuki', votes: 1980 },
      { id: 'op-4', label: 'Frieren — "Yuusha" by YOASOBI', votes: 1110 }
    ],
    userVotedOptionId: 'op-1'
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'BLEACH TYBW Part 3 "The Conflict" Broadcast Date Confirmed',
    excerpt: 'Studio Pierrot and Tite Kubo reveal new key visual and extended fight scenes added exclusively for the anime adaptation.',
    content: 'Bleach fans worldwide are celebrating as Pierrot studio announced the exact premiere date with original Kubo storyboards.',
    date: 'Today, 2:30 PM',
    author: 'Velnix Editorial',
    category: 'Release',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    readTime: '3 min read',
    tags: ['Bleach', 'AnimeNews', 'Pierrot'],
    commentsCount: 84
  }
];

export const DISCUSSION_THREADS: DiscussionThread[] = [
  {
    id: 'disc-1',
    title: 'What was your favorite Bankai reveal in the Thousand-Year Blood War arc so far?',
    author: 'Paul Wachira',
    avatar: '/assets/paul_avatar.jpg',
    animeTag: 'BLEACH: Thousand-Year Blood War',
    category: 'Episode Discussion',
    createdAt: '3 hours ago',
    content: 'Senbonzakura Kageyoshi and Katen Kyokotsu Karamatsu Shinju were masterfully adapted. Which one hit the hardest for you?',
    upvotes: 156,
    isUpvoted: true,
    repliesCount: 38,
    tags: ['Bankai', 'BleachTYBW', 'Animation']
  }
];
