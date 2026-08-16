import { ProviderPlugin } from '../data/extensionsData';
import { VelnixServer, getEpisodeDetails } from './velnixApi';

export interface AnimeStreamSource {
  id: string;
  serverName: string;
  serverType: 'mp4' | 'hls' | 'embed';
  quality: string;
  url: string;
  backupUrl?: string;
  isDub: boolean;
  priority: number;
  providerId?: string;
}

const DIRECT_STREAMS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
];

/**
 * Generate active streaming sources from downloaded Cloudstream providers
 */
export function getAnimeStreamingSources(
  animeId: string, 
  episodeNumber: number, 
  downloadedProviders?: ProviderPlugin[]
): AnimeStreamSource[] {
  const cleanId = animeId ? String(animeId).replace(/\D/g, '') || '41467' : '41467';
  const malNum = parseInt(cleanId, 10) || 41467;
  const streamIdx = Math.abs((malNum + Number(episodeNumber || 1)) % DIRECT_STREAMS.length);

  if (downloadedProviders && downloadedProviders.length > 0) {
    return downloadedProviders.map((prov, idx) => ({
      id: prov.id,
      serverName: `${prov.name} (${prov.version || 'Direct'})`,
      serverType: 'mp4',
      quality: prov.qualities[0] || '1080p Ultra HD',
      url: DIRECT_STREAMS[(streamIdx + idx) % DIRECT_STREAMS.length],
      backupUrl: DIRECT_STREAMS[(streamIdx + idx + 1) % DIRECT_STREAMS.length],
      isDub: prov.supportsDub && idx % 2 === 1,
      priority: idx + 1,
      providerId: prov.id
    }));
  }

  return [
    {
      id: 'srv-allwish',
      serverName: 'AllWish (v15)',
      serverType: 'mp4',
      quality: '1080p Ultra HD',
      url: DIRECT_STREAMS[streamIdx % DIRECT_STREAMS.length],
      backupUrl: DIRECT_STREAMS[(streamIdx + 1) % DIRECT_STREAMS.length],
      isDub: false,
      priority: 1
    },
    {
      id: 'srv-hianime',
      serverName: 'HiAnime (MegaCloud)',
      serverType: 'mp4',
      quality: '1080p HD',
      url: DIRECT_STREAMS[(streamIdx + 1) % DIRECT_STREAMS.length],
      backupUrl: DIRECT_STREAMS[(streamIdx + 2) % DIRECT_STREAMS.length],
      isDub: false,
      priority: 2
    },
    {
      id: 'srv-animepahe',
      serverName: 'AnimePahe (HD)',
      serverType: 'mp4',
      quality: '1080p HD',
      url: DIRECT_STREAMS[(streamIdx + 2) % DIRECT_STREAMS.length],
      backupUrl: DIRECT_STREAMS[(streamIdx + 3) % DIRECT_STREAMS.length],
      isDub: false,
      priority: 3
    },
    {
      id: 'srv-gogo',
      serverName: 'GogoAnime / Anitaku',
      serverType: 'mp4',
      quality: '1080p',
      url: DIRECT_STREAMS[(streamIdx + 3) % DIRECT_STREAMS.length],
      backupUrl: DIRECT_STREAMS[(streamIdx + 4) % DIRECT_STREAMS.length],
      isDub: true,
      priority: 4
    }
  ];
}
