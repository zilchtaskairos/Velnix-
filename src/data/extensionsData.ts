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

// Every provider plugin starts NOT DOWNLOADED (isInstalled: false) by default!
// User can browse repos and download only the specific servers they choose.
export const CLOUDSTREAM_PROVIDERS_LIST: ProviderPlugin[] = [
  {
    id: 'phisher-allwish',
    repoId: 'repo-phisher',
    name: 'AllWish',
    category: 'Anime',
    language: 'English',
    version: 'v15',
    sizeKb: 43,
    description: 'Anime from all-wish.me',
    isInstalled: false,
    hasSettings: false,
    iconText: 'ALLWISH',
    iconBg: '#111827',
    qualities: ['1080p', '720p'],
    supportsDub: true,
    supportsSub: true,
    streamUrlTemplate: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  },
  {
    id: 'phisher-anidb',
    repoId: 'repo-phisher',
    name: 'AniDb',
    category: 'Anime',
    language: 'English',
    version: 'v12',
    sizeKb: 56,
    description: 'Animes & OVA catalog',
    isInstalled: false,
    hasSettings: true,
    iconText: 'AniDb',
    iconBg: '#1e1b4b',
    qualities: ['1080p', '720p'],
    supportsDub: true,
    supportsSub: true,
    streamUrlTemplate: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: 'phisher-anichi',
    repoId: 'repo-phisher',
    name: 'Anichi',
    category: 'Anime',
    language: 'English',
    version: 'v24',
    sizeKb: 138,
    description: 'Anime stream aggregator',
    isInstalled: false,
    hasSettings: false,
    iconText: 'Anichi',
    iconBg: '#3b0764',
    qualities: ['1080p', '720p'],
    supportsDub: false,
    supportsSub: true,
    streamUrlTemplate: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  {
    id: 'phisher-anikage',
    repoId: 'repo-phisher',
    name: 'Anikage',
    category: 'Anime',
    language: 'English',
    version: 'v4',
    sizeKb: 33,
    description: 'Direct anime sources',
    isInstalled: false,
    hasSettings: false,
    iconText: 'A',
    iconBg: '#0f172a',
    qualities: ['1080p', '720p'],
    supportsDub: false,
    supportsSub: true,
    streamUrlTemplate: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  },
  {
    id: 'phisher-animepahe',
    repoId: 'repo-phisher',
    name: 'AnimePahe',
    category: 'Anime',
    language: 'English',
    version: 'v33',
    sizeKb: 79,
    description: 'Animes (SUB/DUB, 1080p/720p)',
    isInstalled: false,
    hasSettings: true,
    iconText: 'Pahe',
    iconBg: '#1e293b',
    qualities: ['1080p', '720p', '480p'],
    supportsDub: true,
    supportsSub: true,
    streamUrlTemplate: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
  {
    id: 'phisher-animenosub',
    repoId: 'repo-phisher',
    name: 'Animenosub',
    category: 'Anime',
    language: 'English',
    version: 'v9',
    sizeKb: 18,
    description: 'Anime and Raw streams',
    isInstalled: false,
    hasSettings: false,
    iconText: '▶',
    iconBg: '#0284c7',
    qualities: ['720p', '480p'],
    supportsDub: false,
    supportsSub: true,
    streamUrlTemplate: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  },
  {
    id: 'phisher-animexin',
    repoId: 'repo-phisher',
    name: 'Animexin',
    category: 'Anime',
    language: 'English',
    version: 'v11',
    sizeKb: 15,
    description: 'Anime and Movies provider',
    isInstalled: false,
    hasSettings: false,
    iconText: '🪷',
    iconBg: '#14532d',
    qualities: ['1080p', '720p'],
    supportsDub: false,
    supportsSub: true,
    streamUrlTemplate: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  },
  {
    id: 'phisher-anineko',
    repoId: 'repo-phisher',
    name: 'Anineko',
    category: 'Anime',
    language: 'English',
    version: 'v3',
    sizeKb: 32,
    description: 'Direct anime high-speed player',
    isInstalled: false,
    hasSettings: false,
    iconText: 'Neko',
    iconBg: '#701a75',
    qualities: ['1080p', '720p'],
    supportsDub: false,
    supportsSub: true,
    streamUrlTemplate: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: 'phisher-hianime',
    repoId: 'repo-phisher',
    name: 'HiAnime (MegaCloud)',
    category: 'Anime',
    language: 'English',
    version: 'v38',
    sizeKb: 84,
    description: 'Animes (SUB/DUB, 4K/1080p, Auto-Skip)',
    isInstalled: false,
    hasSettings: true,
    iconText: 'Hi',
    iconBg: '#ff2e56',
    qualities: ['4K', '1080p', '720p'],
    supportsDub: true,
    supportsSub: true,
    streamUrlTemplate: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  {
    id: 'phisher-gogo',
    repoId: 'repo-phisher',
    name: 'GogoAnime / Anitaku',
    category: 'Anime',
    language: 'English',
    version: 'v45',
    sizeKb: 92,
    description: 'Animes (SUB/DUB 25k+ Catalog)',
    isInstalled: false,
    hasSettings: false,
    iconText: 'Gogo',
    iconBg: '#c2410c',
    qualities: ['1080p', '720p', '480p'],
    supportsDub: true,
    supportsSub: true,
    streamUrlTemplate: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  }
];

export const INITIAL_ANIME_EXTENSIONS: AnimeExtension[] = CLOUDSTREAM_PROVIDERS_LIST.map((p) => ({
  id: p.id,
  name: p.name,
  version: p.version,
  author: 'Cloudstream Repo',
  icon: 'https://cdn.myanimelist.net/images/anime/1764/126627l.jpg',
  description: p.description,
  status: 'available',
  isEnabled: false,
  pingMs: Math.floor(Math.random() * 25) + 20,
  qualities: p.qualities,
  supportsDub: p.supportsDub,
  supportsSub: p.supportsSub,
  supportsAutoSkip: true,
  extractors: [p.name],
  streamBaseUrl: p.streamUrlTemplate,
  repoId: p.repoId
}));

export const REPOSITORY_PROVIDERS_MAP: Record<string, ProviderPlugin[]> = {
  'repo-phisher': CLOUDSTREAM_PROVIDERS_LIST.map(p => ({ ...p, isInstalled: false })),
  'repo-kairo': [
    {
      id: 'kairo-hianime',
      repoId: 'repo-kairo',
      name: 'HiAnime Ultra',
      category: 'Anime',
      language: 'English',
      version: 'v32',
      sizeKb: 88,
      description: 'HiAnime 4K Stream Provider',
      isInstalled: false,
      hasSettings: true,
      iconText: 'Hi',
      iconBg: '#ff2e56',
      qualities: ['4K', '1080p', '720p'],
      supportsDub: true,
      supportsSub: true,
      streamUrlTemplate: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
    },
    {
      id: 'kairo-zoro',
      repoId: 'repo-kairo',
      name: 'Zoro Stream',
      category: 'Anime',
      language: 'English',
      version: 'v18',
      sizeKb: 65,
      description: 'MegaCloud Scraper',
      isInstalled: false,
      hasSettings: false,
      iconText: 'Zoro',
      iconBg: '#059669',
      qualities: ['1080p', '720p'],
      supportsDub: true,
      supportsSub: true,
      streamUrlTemplate: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    }
  ]
};

export const INITIAL_REPOSITORIES: CloudstreamRepo[] = [
  {
    id: 'repo-phisher',
    name: 'Phisher Repo',
    shortcode: 'phisher',
    url: 'https://raw.githubusercontent.com/self-signed/phisher/master/repo.json',
    iconType: 'github',
    providersCount: 10
  },
  {
    id: 'repo-kairo',
    name: 'kairo',
    shortcode: 'kairo',
    url: 'https://raw.githubusercontent.com/self-signed/kairo/master/repo.json',
    iconType: 'github',
    providersCount: 8
  },
  {
    id: 'repo-cloudstream',
    name: 'Cloudstream providers repository',
    shortcode: 'cloudstream',
    url: 'https://raw.githubusercontent.com/recloudstream/cloudstream-extensions/master/repo.json',
    iconType: 'github',
    providersCount: 14
  },
  {
    id: 'repo-aniyomi',
    name: 'Aniyomi Compat',
    shortcode: 'aniyomi',
    url: 'https://raw.githubusercontent.com/Cranberry/Aniyomi-Compat/master/repo.json',
    iconType: 'github',
    providersCount: 6
  }
];

export const SHORTCODE_REGISTRY: Record<string, { name: string; url: string; providers: ProviderPlugin[] }> = {
  'phisher': {
    name: 'Phisher Repo',
    url: 'https://raw.githubusercontent.com/self-signed/phisher/master/repo.json',
    providers: CLOUDSTREAM_PROVIDERS_LIST.map(p => ({ ...p, isInstalled: false }))
  },
  'phisherrepo': {
    name: 'Phisher Repo',
    url: 'https://raw.githubusercontent.com/self-signed/phisher/master/repo.json',
    providers: CLOUDSTREAM_PROVIDERS_LIST.map(p => ({ ...p, isInstalled: false }))
  },
  'phisher repo': {
    name: 'Phisher Repo',
    url: 'https://raw.githubusercontent.com/self-signed/phisher/master/repo.json',
    providers: CLOUDSTREAM_PROVIDERS_LIST.map(p => ({ ...p, isInstalled: false }))
  },
  'phisher-repo': {
    name: 'Phisher Repo',
    url: 'https://raw.githubusercontent.com/self-signed/phisher/master/repo.json',
    providers: CLOUDSTREAM_PROVIDERS_LIST.map(p => ({ ...p, isInstalled: false }))
  },
  'kairo': {
    name: 'kairo',
    url: 'https://raw.githubusercontent.com/self-signed/kairo/master/repo.json',
    providers: REPOSITORY_PROVIDERS_MAP['repo-kairo'].map(p => ({ ...p, isInstalled: false }))
  },
  'kairorepo': {
    name: 'kairo',
    url: 'https://raw.githubusercontent.com/self-signed/kairo/master/repo.json',
    providers: REPOSITORY_PROVIDERS_MAP['repo-kairo'].map(p => ({ ...p, isInstalled: false }))
  },
  'cloudstream': {
    name: 'Cloudstream providers repository',
    url: 'https://raw.githubusercontent.com/recloudstream/cloudstream-extensions/master/repo.json',
    providers: CLOUDSTREAM_PROVIDERS_LIST.map(p => ({ ...p, isInstalled: false }))
  },
  'cloudstreamrepo': {
    name: 'Cloudstream providers repository',
    url: 'https://raw.githubusercontent.com/recloudstream/cloudstream-extensions/master/repo.json',
    providers: CLOUDSTREAM_PROVIDERS_LIST.map(p => ({ ...p, isInstalled: false }))
  },
  'anime': {
    name: 'Cloudstream Anime Master Repo',
    url: 'https://raw.githubusercontent.com/LagradOst/CloudStream-3-Anime-Repo/master/repo.json',
    providers: CLOUDSTREAM_PROVIDERS_LIST.map(p => ({ ...p, isInstalled: false }))
  },
  'aniyomi': {
    name: 'Aniyomi Compat',
    url: 'https://raw.githubusercontent.com/Cranberry/Aniyomi-Compat/master/repo.json',
    providers: CLOUDSTREAM_PROVIDERS_LIST.map(p => ({ ...p, isInstalled: false }))
  },
  'aniyomirepo': {
    name: 'Aniyomi Compat',
    url: 'https://raw.githubusercontent.com/Cranberry/Aniyomi-Compat/master/repo.json',
    providers: CLOUDSTREAM_PROVIDERS_LIST.map(p => ({ ...p, isInstalled: false }))
  },
  'hianime': {
    name: 'HiAnime Stream Provider Repo',
    url: 'https://raw.githubusercontent.com/recloudstream/hianime-repo/master/repo.json',
    providers: CLOUDSTREAM_PROVIDERS_LIST.filter(p => p.name.includes('HiAnime')).map(p => ({ ...p, isInstalled: false }))
  },
  'animepahe': {
    name: 'AnimePahe HD Repo',
    url: 'https://raw.githubusercontent.com/recloudstream/animepahe-repo/master/repo.json',
    providers: CLOUDSTREAM_PROVIDERS_LIST.filter(p => p.name.includes('AnimePahe')).map(p => ({ ...p, isInstalled: false }))
  },
  'gogoanime': {
    name: 'GogoAnime Master Repo',
    url: 'https://raw.githubusercontent.com/recloudstream/gogoanime-repo/master/repo.json',
    providers: CLOUDSTREAM_PROVIDERS_LIST.filter(p => p.name.includes('Gogo')).map(p => ({ ...p, isInstalled: false }))
  }
};
