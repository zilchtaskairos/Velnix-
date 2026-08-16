-- =====================================================
-- Velnyx Database Initialization
-- PostgreSQL
-- =====================================================

-- Optional: for case-insensitive email/username if desired
-- create extension if not exists citext;

-- =====================================================
-- USERS / ACCOUNTS
-- =====================================================

create table if not exists users (
    id bigint generated always as identity primary key,

    username text not null unique,
    email text not null unique,

    -- Only null if user signs in with OAuth only
    password_hash text,

    display_name text,
    avatar_url text,
    bio text,

    role text not null default 'user',
    status text not null default 'active',

    email_verified_at timestamptz,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint users_username_length_check
        check (char_length(username) >= 3 and char_length(username) <= 30),

    constraint users_role_check
        check (role in ('user', 'moderator', 'admin')),

    constraint users_status_check
        check (status in ('active', 'suspended', 'deleted'))
);

create table if not exists auth_identities (
    id bigint generated always as identity primary key,

    user_id bigint not null references users(id) on delete cascade,

    -- Examples: google, discord, github, email
    provider text not null,
    provider_account_id text not null,

    email text,

    created_at timestamptz not null default now(),

    unique (provider, provider_account_id),
    unique (user_id, provider)
);

create table if not exists sessions (
    id text primary key,

    user_id bigint not null references users(id) on delete cascade,

    ip_address inet,
    user_agent text,

    expires_at timestamptz not null,
    revoked_at timestamptz,

    created_at timestamptz not null default now()
);

create index if not exists idx_sessions_user_id
    on sessions(user_id);

-- =====================================================
-- ANIME CORE
-- =====================================================

create table if not exists anime (
    id bigint generated always as identity primary key,

    slug text not null unique,

    title_romaji text not null,
    title_english text,
    title_native text,

    synopsis text,

    cover_image_url text,
    banner_image_url text,

    -- TV, MOVIE, OVA, ONA, SPECIAL, TV_SHORT, MUSIC, UNKNOWN
    format text not null default 'UNKNOWN',

    -- NOT_YET_RELEASED, RELEASING, FINISHED, CANCELLED, HIATUS, UNKNOWN
    status text not null default 'UNKNOWN',

    start_date date,
    end_date date,

    episode_count integer,

    -- Example: 0 to 100
    average_score numeric(5, 2),

    -- G, PG, PG-13, R, R+, UNRATED, etc.
    age_rating text,

    is_adult boolean not null default false,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint anime_episode_count_check
        check (episode_count is null or episode_count >= 0),

    constraint anime_average_score_check
        check (average_score is null or (average_score >= 0 and average_score <= 100)),

    constraint anime_format_check
        check (format in (
            'TV',
            'TV_SHORT',
            'MOVIE',
            'SPECIAL',
            'OVA',
            'ONA',
            'MUSIC',
            'UNKNOWN'
        )),

    constraint anime_status_check
        check (status in (
            'NOT_YET_RELEASED',
            'RELEASING',
            'FINISHED',
            'CANCELLED',
            'HIATUS',
            'UNKNOWN'
        ))
);

create index if not exists idx_anime_slug
    on anime(slug);

create index if not exists idx_anime_title_romaji
    on anime(title_romaji);

create index if not exists idx_anime_title_english
    on anime(title_english);

-- External IDs from AniList, MyAnimeList, Kitsu, etc.
create table if not exists anime_external_ids (
    anime_id bigint not null references anime(id) on delete cascade,

    -- anilist, myanimelist, kitsu, tmdb, imdb, ann
    source text not null,
    external_id text not null,

    created_at timestamptz not null default now(),

    primary key (anime_id, source),

    unique (source, external_id)
);

-- =====================================================
-- GENRES
-- =====================================================

create table if not exists genres (
    id bigint generated always as identity primary key,

    name text not null unique,
    slug text not null unique,

    created_at timestamptz not null default now()
);

create table if not exists anime_genres (
    anime_id bigint not null references anime(id) on delete cascade,
    genre_id bigint not null references genres(id) on delete cascade,

    primary key (anime_id, genre_id)
);

create index if not exists idx_anime_genres_genre_id
    on anime_genres(genre_id);

-- =====================================================
-- STUDIOS
-- =====================================================

create table if not exists studios (
    id bigint generated always as identity primary key,

    name text not null unique,
    slug text not null unique,

    website_url text,
    image_url text,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists anime_studios (
    anime_id bigint not null references anime(id) on delete cascade,
    studio_id bigint not null references studios(id) on delete cascade,

    is_main_studio boolean not null default false,

    primary key (anime_id, studio_id)
);

create index if not exists idx_anime_studios_studio_id
    on anime_studios(studio_id);

-- =====================================================
-- CHARACTERS
-- =====================================================

create table if not exists characters (
    id bigint generated always as identity primary key,

    name text not null,
    native_name text,

    image_url text,
    description text,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists anime_characters (
    anime_id bigint not null references anime(id) on delete cascade,
    character_id bigint not null references characters(id) on delete cascade,

    role text not null default 'SUPPORTING',

    constraint anime_characters_role_check
        check (role in ('MAIN', 'SUPPORTING', 'BACKGROUND')),

    primary key (anime_id, character_id)
);

create index if not exists idx_anime_characters_character_id
    on anime_characters(character_id);

-- =====================================================
-- EPISODES
-- =====================================================

create table if not exists episodes (
    id bigint generated always as identity primary key,

    anime_id bigint not null references anime(id) on delete cascade,

    episode_number integer not null,

    title text,
    description text,
    thumbnail_url text,

    release_date date,
    duration_seconds integer,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    unique (anime_id, episode_number),

    constraint episodes_episode_number_check
        check (episode_number >= 0),

    constraint episodes_duration_check
        check (duration_seconds is null or duration_seconds >= 0)
);

create index if not exists idx_episodes_anime_id
    on episodes(anime_id);

-- =====================================================
-- STREAMING PROVIDERS
-- Use only official/legal providers.
-- =====================================================

create table if not exists streaming_providers (
    id bigint generated always as identity primary key,

    name text not null,
    slug text not null unique,

    website_url text,
    logo_url text,

    is_official boolean not null default true,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- =====================================================
-- ANIME STREAMING AVAILABILITY
-- Store official streaming links only.
-- =====================================================

create table if not exists anime_streaming_links (
    id bigint generated always as identity primary key,

    anime_id bigint not null references anime(id) on delete cascade,
    provider_id bigint not null references streaming_providers(id) on delete cascade,

    -- Examples: GLOBAL, US, JP, EU
    region text not null default 'GLOBAL',

    -- Examples: sub, dub, raw
    audio_type text not null default 'sub',

    url text not null,

    is_free boolean not null default false,
    requires_subscription boolean not null default false,

    available_from date,
    available_until date,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    unique (anime_id, provider_id, region, url)
);

create index if not exists idx_anime_streaming_links_anime_id
    on anime_streaming_links(anime_id);

create index if not exists idx_anime_streaming_links_provider_id
    on anime_streaming_links(provider_id);

-- =====================================================
-- USER LIBRARY / WATCHLIST
-- =====================================================

create table if not exists watchlist (
    user_id bigint not null references users(id) on delete cascade,
    anime_id bigint not null references anime(id) on delete cascade,

    status text not null default 'plan_to_watch',

    progress_episodes integer not null default 0,

    score integer,

    notes text,

    started_at date,
    completed_at date,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    primary key (user_id, anime_id),

    constraint watchlist_status_check
        check (status in (
            'watching',
            'completed',
            'on_hold',
            'dropped',
            'plan_to_watch'
        )),

    constraint watchlist_progress_check
        check (progress_episodes >= 0),

    constraint watchlist_score_check
        check (score is null or (score >= 1 and score <= 10))
);

create index if not exists idx_watchlist_user_id
    on watchlist(user_id);

create index if not exists idx_watchlist_anime_id
    on watchlist(anime_id);

-- =====================================================
-- FAVORITES
-- =====================================================

create table if not exists favorites (
    user_id bigint not null references users(id) on delete cascade,
    anime_id bigint not null references anime(id) on delete cascade,

    created_at timestamptz not null default now(),

    primary key (user_id, anime_id)
);

create index if not exists idx_favorites_user_id
    on favorites(user_id);

create index if not exists idx_favorites_anime_id
    on favorites(anime_id);

-- =====================================================
-- REVIEWS / RATINGS
-- =====================================================

create table if not exists reviews (
    id bigint generated always as identity primary key,

    user_id bigint not null references users(id) on delete cascade,
    anime_id bigint not null references anime(id) on delete cascade,

    rating integer,

    title text,
    body text,

    status text not null default 'published',

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    unique (user_id, anime_id),

    constraint reviews_rating_check
        check (rating is null or (rating >= 1 and rating <= 10)),

    constraint reviews_status_check
        check (status in ('draft', 'published', 'hidden', 'removed'))
);

create index if not exists idx_reviews_anime_id
    on reviews(anime_id);

create index if not exists idx_reviews_user_id
    on reviews(user_id);

-- =====================================================
-- WATCH HISTORY / PROGRESS
-- =====================================================

create table if not exists watch_history (
    user_id bigint not null references users(id) on delete cascade,
    episode_id bigint not null references episodes(id) on delete cascade,

    playback_position_seconds integer not null default 0,

    completed boolean not null default false,

    watched_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    primary key (user_id, episode_id),

    constraint watch_history_position_check
        check (playback_position_seconds >= 0)
);

create index if not exists idx_watch_history_user_id
    on watch_history(user_id);

create index if not exists idx_watch_history_episode_id
    on watch_history(episode_id);

-- =====================================================
-- UPDATED_AT TRIGGER
-- =====================================================

create or replace function set_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger trg_users_updated_at
before update on users
for each row
execute function set_updated_at();

create trigger trg_anime_updated_at
before update on anime
for each row
execute function set_updated_at();

create trigger trg_studios_updated_at
before update on studios
for each row
execute function set_updated_at();

create trigger trg_characters_updated_at
before update on characters
for each row
execute function set_updated_at();

create trigger trg_episodes_updated_at
before update on episodes
for each row
execute function set_updated_at();

create trigger trg_streaming_providers_updated_at
before update on streaming_providers
for each row
execute function set_updated_at();

create trigger trg_anime_streaming_links_updated_at
before update on anime_streaming_links
for each row
execute function set_updated_at();

create trigger trg_watchlist_updated_at
before update on watchlist
for each row
execute function set_updated_at();

create trigger trg_reviews_updated_at
before update on reviews
for each row
execute function set_updated_at();

create trigger trg_watch_history_updated_at
before update on watch_history
for each row
execute function set_updated_at();
