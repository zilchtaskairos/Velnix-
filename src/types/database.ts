/**
 * PostgreSQL Database Schema Types for Velnix
 * Corresponds to db/migrations/001_init.sql
 */

export interface DbUser {
  id: number;
  username: string;
  email: string;
  password_hash: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: 'user' | 'moderator' | 'admin';
  status: 'active' | 'suspended' | 'deleted';
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbAuthIdentity {
  id: number;
  user_id: number;
  provider: string; // e.g. google, discord, github, email
  provider_account_id: string;
  email: string | null;
  created_at: string;
}

export interface DbSession {
  id: string;
  user_id: number;
  ip_address: string | null;
  user_agent: string | null;
  expires_at: string;
  revoked_at: string | null;
  created_at: string;
}

export type DbAnimeFormat = 'TV' | 'TV_SHORT' | 'MOVIE' | 'SPECIAL' | 'OVA' | 'ONA' | 'MUSIC' | 'UNKNOWN';
export type DbAnimeStatus = 'NOT_YET_RELEASED' | 'RELEASING' | 'FINISHED' | 'CANCELLED' | 'HIATUS' | 'UNKNOWN';

export interface DbAnime {
  id: number;
  slug: string;
  title_romaji: string;
  title_english: string | null;
  title_native: string | null;
  synopsis: string | null;
  cover_image_url: string | null;
  banner_image_url: string | null;
  format: DbAnimeFormat;
  status: DbAnimeStatus;
  start_date: string | null;
  end_date: string | null;
  episode_count: number | null;
  average_score: number | null;
  age_rating: string | null;
  is_adult: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbAnimeExternalId {
  anime_id: number;
  source: 'anilist' | 'myanimelist' | 'kitsu' | 'tmdb' | 'imdb' | 'ann' | string;
  external_id: string;
  created_at: string;
}

export interface DbGenre {
  id: number;
  name: string;
  slug: string;
  created_at: string;
}

export interface DbAnimeGenre {
  anime_id: number;
  genre_id: number;
}

export interface DbStudio {
  id: number;
  name: string;
  slug: string;
  website_url: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbAnimeStudio {
  anime_id: number;
  studio_id: number;
  is_main_studio: boolean;
}

export interface DbCharacter {
  id: number;
  name: string;
  native_name: string | null;
  image_url: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbAnimeCharacter {
  anime_id: number;
  character_id: number;
  role: 'MAIN' | 'SUPPORTING' | 'BACKGROUND';
}

export interface DbEpisode {
  id: number;
  anime_id: number;
  episode_number: number;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  release_date: string | null;
  duration_seconds: number | null;
  created_at: string;
  updated_at: string;
}

export interface DbStreamingProvider {
  id: number;
  name: string;
  slug: string;
  website_url: string | null;
  logo_url: string | null;
  is_official: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbAnimeStreamingLink {
  id: number;
  anime_id: number;
  provider_id: number;
  region: string;
  audio_type: 'sub' | 'dub' | 'raw' | string;
  url: string;
  is_free: boolean;
  requires_subscription: boolean;
  available_from: string | null;
  available_until: string | null;
  created_at: string;
  updated_at: string;
}

export type DbWatchlistStatus = 'watching' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_watch';

export interface DbWatchlist {
  user_id: number;
  anime_id: number;
  status: DbWatchlistStatus;
  progress_episodes: number;
  score: number | null;
  notes: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbFavorite {
  user_id: number;
  anime_id: number;
  created_at: string;
}

export interface DbReview {
  id: number;
  user_id: number;
  anime_id: number;
  rating: number | null;
  title: string | null;
  body: string | null;
  status: 'draft' | 'published' | 'hidden' | 'removed';
  created_at: string;
  updated_at: string;
}

export interface DbWatchHistory {
  user_id: number;
  episode_id: number;
  playback_position_seconds: number;
  completed: boolean;
  watched_at: string;
  updated_at: string;
}
