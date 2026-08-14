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

// -----------------------------------------------------------------------------
// DATABASE CLEARED — Ready for user's personal database codes
// -----------------------------------------------------------------------------

export const ANIMES_DATABASE: Anime[] = [];

export const INITIAL_DANMAKU_COMMENTS: DanmakuComment[] = [];

export const SAMPLE_EPISODE_COMMENTS: EpisodeComment[] = [];

export const SCHEDULE_WEEK_DATA: ScheduleDay[] = [];

export const COMMUNITY_POLLS: CommunityPoll[] = [];

export const NEWS_ARTICLES: NewsArticle[] = [];

export const DISCUSSION_THREADS: DiscussionThread[] = [];
