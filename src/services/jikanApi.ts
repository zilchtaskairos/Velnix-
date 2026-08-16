import { Anime, Character, Episode } from '../types/anime';

const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';

const STREAMING_VIDEOS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
];

export interface JikanAnimeItem {
  mal_id: number;
  url: string;
  images: {
    jpg: { image_url: string; small_image_url: string; large_image_url: string };
    webp: { image_url: string; small_image_url: string; large_image_url: string };
  };
  trailer: { youtube_id: string; url: string; embed_url: string };
  title: string;
  title_english: string;
  title_japanese: string;
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: { from: string; to: string; string: string };
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  synopsis: string;
  season: string;
  year: number;
  studios: { mal_id: number; name: string }[];
  genres: { mal_id: number; name: string }[];
}

const jikanCache: Record<string, any> = {};

export function transformJikanAnime(item: JikanAnimeItem, index = 0): Anime {
  const poster = item.images?.webp?.large_image_url || item.images?.jpg?.large_image_url || item.images?.jpg?.image_url || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80';
  const banner = item.images?.webp?.large_image_url || poster;
  const epCount = item.episodes || 12;

  const episodes: Episode[] = Array.from({ length: Math.min(epCount, 26) }, (_, epIdx) => ({
    id: epIdx + 1,
    number: epIdx + 1,
    title: `Episode ${epIdx + 1}`,
    thumbnail: poster,
    duration: item.duration || '24m',
    durationSeconds: 1440,
    isFiller: false,
    videoUrl: STREAMING_VIDEOS[epIdx % STREAMING_VIDEOS.length],
    introStart: 85,
    introEnd: 170,
    outroStart: 1315,
    outroEnd: 1405,
    synopsis: `${item.title_english || item.title} Episode ${epIdx + 1} stream now available in 4K Ultra HD & 1080p.`,
    airDate: item.aired?.string || 'Recent'
  }));

  return {
    id: String(item.mal_id),
    title: item.title_english || item.title,
    romajiTitle: item.title,
    nativeTitle: item.title_japanese || item.title,
    banner,
    poster,
    synopsis: item.synopsis || 'An acclaimed anime series available for high-definition streaming on Velnix.',
    shortSynopsis: (item.synopsis || 'Stream now in 4K Ultra HD on Velnix.').slice(0, 140) + '...',
    score: item.score ? Number(item.score.toFixed(1)) : 8.0,
    ranked: item.rank || index + 1,
    popularity: item.popularity || (index + 1) * 1000,
    format: (item.type as any) || 'TV',
    episodesCount: epCount,
    status: item.airing ? 'Airing' : 'Completed',
    season: (item.season ? item.season.charAt(0).toUpperCase() + item.season.slice(1) : 'Fall') as any,
    year: item.year || 2024,
    studio: item.studios?.[0]?.name || 'Animation Studio',
    genres: item.genres?.map(g => g.name) || ['Action', 'Fantasy'],
    rating: (item.rating as any) || 'PG-13',
    durationPerEp: item.duration || '24 min per ep',
    subEpisodes: epCount,
    dubEpisodes: epCount,
    trailerYoutubeId: item.trailer?.youtube_id || 'e8YBesRKq_U',
    quality: '4K Ultra',
    trendingRank: index + 1,
    episodes,
    characters: []
  };
}

/**
 * Fetch a single anime by its MAL ID from Jikan API v4
 */
export async function fetchAnimeByIdFromJikan(malId: string | number): Promise<Anime | null> {
  const cleanId = String(malId).replace(/\D/g, '');
  if (!cleanId) return null;
  const cacheKey = `anime_id_${cleanId}`;
  if (jikanCache[cacheKey]) return jikanCache[cacheKey];

  try {
    const res = await fetch(`${JIKAN_BASE_URL}/anime/${cleanId}/full`);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.data) return null;

    const anime = transformJikanAnime(data.data);
    jikanCache[cacheKey] = anime;
    return anime;
  } catch (e) {
    console.warn('Jikan fetch anime by id error:', e);
    return null;
  }
}

/**
 * Live Search Anime on Jikan API v4 (client-side query)
 */
export async function searchAnimeFromJikan(query: string, page = 1): Promise<Anime[]> {
  const cleanQ = query.trim();
  if (!cleanQ) return [];
  const cacheKey = `search_${cleanQ.toLowerCase()}_${page}`;
  if (jikanCache[cacheKey]) return jikanCache[cacheKey];

  try {
    const response = await fetch(`${JIKAN_BASE_URL}/anime?q=${encodeURIComponent(cleanQ)}&page=${page}&limit=25&order_by=popularity&sfw=false`);
    if (!response.ok) throw new Error('Jikan API search failed');
    const data = await response.json();
    if (!data.data || !Array.isArray(data.data)) return [];

    const animes = data.data.map((item: JikanAnimeItem, idx: number) => transformJikanAnime(item, idx));
    jikanCache[cacheKey] = animes;
    return animes;
  } catch (error) {
    console.warn('Jikan search error:', error);
    return [];
  }
}

/**
 * Fetch Top Anime from Jikan API v4
 */
export async function fetchTopAnimeFromJikan(page = 1, filter?: string): Promise<Anime[]> {
  const cacheKey = `top_anime_${page}_${filter || 'all'}`;
  if (jikanCache[cacheKey]) return jikanCache[cacheKey];

  try {
    const filterParam = filter ? `&filter=${filter}` : '';
    const response = await fetch(`${JIKAN_BASE_URL}/top/anime?page=${page}&limit=25${filterParam}`);
    if (!response.ok) return [];
    const data = await response.json();
    if (!data.data || !Array.isArray(data.data)) return [];

    const animes = data.data.map((item: JikanAnimeItem, idx: number) => transformJikanAnime(item, idx));
    jikanCache[cacheKey] = animes;
    return animes;
  } catch (error) {
    return [];
  }
}

/**
 * Fetch Characters & Voice Actors from Jikan API v4
 */
export async function fetchAnimeCharactersAndVA(malId: string | number): Promise<Character[]> {
  const cleanId = typeof malId === 'string' ? malId.replace(/\D/g, '') || '41467' : String(malId);
  const cacheKey = `chars_${cleanId}`;
  if (jikanCache[cacheKey]) return jikanCache[cacheKey];

  try {
    const res = await fetch(`${JIKAN_BASE_URL}/anime/${cleanId}/characters`);
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.data || !Array.isArray(data.data)) return [];

    const characters: Character[] = data.data.slice(0, 12).map((item: any) => {
      const japaneseVA = item.voice_actors?.find((va: any) => va.language === 'Japanese') || item.voice_actors?.[0];
      return {
        id: String(item.character?.mal_id || Math.random()),
        name: item.character?.name || 'Character',
        role: item.role === 'Main' ? 'Main' : 'Supporting',
        image: item.character?.images?.webp?.image_url || item.character?.images?.jpg?.image_url || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&q=80',
        voiceActor: {
          name: japaneseVA?.person?.name || 'Japanese Voice Actor',
          language: japaneseVA?.language || 'Japanese',
          image: japaneseVA?.person?.images?.jpg?.image_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
        }
      };
    });

    jikanCache[cacheKey] = characters;
    return characters;
  } catch (err) {
    return [];
  }
}
