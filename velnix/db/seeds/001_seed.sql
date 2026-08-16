-- =====================================================
-- Velnyx Database Initial Seeds
-- PostgreSQL
-- =====================================================

-- =====================================================
-- 1. USERS & PROFILES
-- =====================================================

insert into users (username, email, password_hash, display_name, avatar_url, bio, role, status, email_verified_at)
values
(
    'paul_velnix',
    'paul@velnix.app',
    '$2a$12$e8Y7uE4Z10kK8D93jL20YeHq7UuXj6o9uA7F7d4E9K9W3s7Y5yO.e',
    'Paul Wachira',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    'Anime connoisseur, Web3 pioneer & creator of Velnix. 🌸 Exploring Bleach TYBW & the frontiers of anime streaming.',
    'admin',
    'active',
    now()
),
(
    'claire_ai',
    'claire@velnix.app',
    null,
    'Claire ✦ AI',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    'Your hyper-intelligent anime concierge, streaming guide, and friendly companion ❀',
    'moderator',
    'active',
    now()
),
(
    'sakura_blade',
    'sakura@velnix.app',
    '$2a$12$e8Y7uE4Z10kK8D93jL20YeHq7UuXj6o9uA7F7d4E9K9W3s7Y5yO.e',
    'Sakura Miyawaki',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    'Studio Ghibli & Shonen enthusiast ⚔️ Live watch party host.',
    'user',
    'active',
    now()
)
on conflict (username) do nothing;

-- =====================================================
-- 2. GENRES
-- =====================================================

insert into genres (name, slug) values
('Action', 'action'),
('Adventure', 'adventure'),
('Animation', 'animation'),
('Comedy', 'comedy'),
('Drama', 'drama'),
('Fantasy', 'fantasy'),
('Isekai', 'isekai'),
('Magic', 'magic'),
('Mystery', 'mystery'),
('Psychological', 'psychological'),
('Romance', 'romance'),
('Sci-Fi', 'sci-fi'),
('Shonen', 'shonen'),
('Slice of Life', 'slice-of-life'),
('Sports', 'sports'),
('Supernatural', 'supernatural'),
('Suspense', 'suspense'),
('Thriller', 'thriller')
on conflict (slug) do nothing;

-- =====================================================
-- 3. STUDIOS
-- =====================================================

insert into studios (name, slug, website_url, image_url) values
('Studio Pierrot', 'studio-pierrot', 'https://pierrot.jp', 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80'),
('MAPPA', 'mappa', 'http://www.mappa.co.jp', 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80'),
('ufotable', 'ufotable', 'http://www.ufotable.com', 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80'),
('Bones', 'bones', 'https://www.bones.co.jp', 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80'),
('Wit Studio', 'wit-studio', 'https://www.witstudio.co.jp', 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80'),
('Madhouse', 'madhouse', 'https://www.madhouse.co.jp', 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80'),
('CloverWorks', 'cloverworks', 'https://cloverworks.co.jp', 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80'),
('A-1 Pictures', 'a-1-pictures', 'https://a1p.jp', 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80'),
('Kyoto Animation', 'kyoto-animation', 'https://www.kyotoanimation.co.jp', 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80'),
('Toei Animation', 'toei-animation', 'https://www.toei-anim.co.jp', 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80')
on conflict (slug) do nothing;

-- =====================================================
-- 4. STREAMING PROVIDERS
-- =====================================================

insert into streaming_providers (name, slug, website_url, logo_url, is_official) values
('Crunchyroll', 'crunchyroll', 'https://www.crunchyroll.com', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', true),
('Hulu / Disney+', 'hulu-disney', 'https://www.hulu.com', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', true),
('Netflix', 'netflix', 'https://www.netflix.com', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', true),
('HIDIVE', 'hidive', 'https://www.hidive.com', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', true),
('Prime Video', 'prime-video', 'https://www.primevideo.com', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', true),
('Velnix Ultra CDN', 'velnix-cdn', 'https://velnix.app', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', true)
on conflict (slug) do nothing;

-- =====================================================
-- 5. ANIME
-- =====================================================

insert into anime (
    slug, title_romaji, title_english, title_native, synopsis,
    cover_image_url, banner_image_url, format, status, start_date,
    episode_count, average_score, age_rating, is_adult
) values
(
    'bleach-thousand-year-blood-war',
    'Bleach: Sennen Kessen-hen',
    'BLEACH: Thousand-Year Blood War',
    'BLEACH 千年血戦篇',
    'The peace is suddenly broken when warning sirens blare through the Soul Society. Residents are disappearing without a trace and nobody knows who is behind it. Meanwhile, a dark shadow is also extending itself toward Ichigo and his friends in Karakura Town...',
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1920&q=80',
    'TV',
    'RELEASING',
    '2022-10-11',
    52,
    91.20,
    'R-17+',
    false
),
(
    'demon-slayer-kimetsu-no-yaiba',
    'Kimetsu no Yaiba: Hashira Geiko-hen',
    'Demon Slayer: Kimetsu no Yaiba Hashira Training Arc',
    '鬼滅の刃 柱稽古編',
    'Tanjiro and the Demon Slayer Corps prepare for the upcoming battle against Muzan Kibutsuji by undergoing rigorous training under the highest-ranking swordsmen, the Hashira.',
    'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80',
    'TV',
    'FINISHED',
    '2024-05-12',
    8,
    86.50,
    'R-17+',
    false
),
(
    'jujutsu-kaisen-season-2',
    'Jujutsu Kaisen 2nd Season',
    'Jujutsu Kaisen Season 2',
    '呪術廻戦 懐玉・玉折 / 渋谷事変',
    'The past comes back to haunt the strongest sorcerers as Gojo and Geto take on a mission that will reshape the jujutsu world forever, leading directly into the devastating Shibuya Incident.',
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1920&q=80',
    'TV',
    'FINISHED',
    '2023-07-06',
    23,
    89.80,
    'R-17+',
    false
),
(
    'solo-leveling',
    'Ore dake Level Up na Ken',
    'Solo Leveling',
    '俺だけレベルアップな件',
    'In a world where hunters must battle deadly monsters to protect humanity, Sung Jinwoo, the weakest hunter in all of mankind, finds himself in a mysterious double dungeon that changes his destiny forever.',
    'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80',
    'TV',
    'FINISHED',
    '2024-01-07',
    12,
    85.40,
    'R-17+',
    false
),
(
    'frieren-beyond-journeys-end',
    'Sousou no Frieren',
    'Frieren: Beyond Journey''s End',
    '葬送のフリーレン',
    'After the party of heroes defeated the Demon King, elven mage Frieren embarks on a new quest to understand humanity and honor the memories of her fallen companions.',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=1920&q=80',
    'TV',
    'FINISHED',
    '2023-09-29',
    28,
    93.50,
    'PG-13',
    false
)
on conflict (slug) do nothing;

-- =====================================================
-- 6. ANIME EXTERNAL IDS
-- =====================================================

insert into anime_external_ids (anime_id, source, external_id)
select a.id, 'anilist', '114446' from anime a where a.slug = 'bleach-thousand-year-blood-war'
union all
select a.id, 'myanimelist', '41467' from anime a where a.slug = 'bleach-thousand-year-blood-war'
union all
select a.id, 'anilist', '166240' from anime a where a.slug = 'demon-slayer-kimetsu-no-yaiba'
union all
select a.id, 'anilist', '145064' from anime a where a.slug = 'jujutsu-kaisen-season-2'
union all
select a.id, 'anilist', '151807' from anime a where a.slug = 'solo-leveling'
union all
select a.id, 'anilist', '154587' from anime a where a.slug = 'frieren-beyond-journeys-end'
on conflict (anime_id, source) do nothing;

-- =====================================================
-- 7. ANIME GENRES
-- =====================================================

insert into anime_genres (anime_id, genre_id)
select a.id, g.id from anime a, genres g
where a.slug = 'bleach-thousand-year-blood-war' and g.slug in ('action', 'adventure', 'supernatural', 'shonen')
union all
select a.id, g.id from anime a, genres g
where a.slug = 'demon-slayer-kimetsu-no-yaiba' and g.slug in ('action', 'fantasy', 'supernatural', 'shonen')
union all
select a.id, g.id from anime a, genres g
where a.slug = 'jujutsu-kaisen-season-2' and g.slug in ('action', 'supernatural', 'shonen', 'fantasy')
union all
select a.id, g.id from anime a, genres g
where a.slug = 'solo-leveling' and g.slug in ('action', 'adventure', 'fantasy')
union all
select a.id, g.id from anime a, genres g
where a.slug = 'frieren-beyond-journeys-end' and g.slug in ('adventure', 'drama', 'fantasy', 'slice-of-life')
on conflict (anime_id, genre_id) do nothing;

-- =====================================================
-- 8. ANIME STUDIOS
-- =====================================================

insert into anime_studios (anime_id, studio_id, is_main_studio)
select a.id, s.id, true from anime a, studios s
where a.slug = 'bleach-thousand-year-blood-war' and s.slug = 'studio-pierrot'
union all
select a.id, s.id, true from anime a, studios s
where a.slug = 'demon-slayer-kimetsu-no-yaiba' and s.slug = 'ufotable'
union all
select a.id, s.id, true from anime a, studios s
where a.slug = 'jujutsu-kaisen-season-2' and s.slug = 'mappa'
union all
select a.id, s.id, true from anime a, studios s
where a.slug = 'solo-leveling' and s.slug = 'a-1-pictures'
union all
select a.id, s.id, true from anime a, studios s
where a.slug = 'frieren-beyond-journeys-end' and s.slug = 'madhouse'
on conflict (anime_id, studio_id) do nothing;

-- =====================================================
-- 9. CHARACTERS
-- =====================================================

insert into characters (name, native_name, image_url, description) values
('Ichigo Kurosaki', '黒崎 一護', 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80', 'Substitute Shinigami who protects Karakura Town and the Soul Society with the power of Tensa Zangetsu.'),
('Yhwach', 'ユーハバッハ', 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80', 'The Father of the Quincy and Emperor of the Wandenreich who awakens after 990 years.'),
('Tanjiro Kamado', '竈門 炭治郎', 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80', 'Kindhearted Demon Slayer who masters Sun Breathing and fights to cure his demon sister Nezuko.'),
('Satoru Gojo', '五条 悟', 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80', 'The strongest Jujutsu Sorcerer in history, wielding the Six Eyes and Limitless cursed technique.'),
('Sung Jin-Woo', '성진우', 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80', 'The Shadow Monarch who rose from the Weakest E-Rank hunter to the strongest being in existence.'),
('Frieren', 'フリーレン', 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=400&q=80', 'Mage of the Hero Party whose thousand-year lifespan gives her a unique perspective on human memories.')
on conflict do nothing;

-- =====================================================
-- 10. ANIME CHARACTERS
-- =====================================================

insert into anime_characters (anime_id, character_id, role)
select a.id, c.id, 'MAIN' from anime a, characters c where a.slug = 'bleach-thousand-year-blood-war' and c.name in ('Ichigo Kurosaki', 'Yhwach')
union all
select a.id, c.id, 'MAIN' from anime a, characters c where a.slug = 'demon-slayer-kimetsu-no-yaiba' and c.name = 'Tanjiro Kamado'
union all
select a.id, c.id, 'MAIN' from anime a, characters c where a.slug = 'jujutsu-kaisen-season-2' and c.name = 'Satoru Gojo'
union all
select a.id, c.id, 'MAIN' from anime a, characters c where a.slug = 'solo-leveling' and c.name = 'Sung Jin-Woo'
union all
select a.id, c.id, 'MAIN' from anime a, characters c where a.slug = 'frieren-beyond-journeys-end' and c.name = 'Frieren'
on conflict (anime_id, character_id) do nothing;

-- =====================================================
-- 11. EPISODES
-- =====================================================

insert into episodes (anime_id, episode_number, title, description, thumbnail_url, release_date, duration_seconds)
select a.id, 1, 'The Blood Warfare', 'Soul Society detects the disappearance of thousands of Hollows while Karakura Town is attacked by mysterious invaders.', 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=640&q=80', '2022-10-11', 1440
from anime a where a.slug = 'bleach-thousand-year-blood-war'
union all
select a.id, 2, 'Foundation Stones', 'Ichigo and his allies travel to Hueco Mundo to rescue the Arrancar from the invading Wandenreich.', 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=640&q=80', '2022-10-18', 1440
from anime a where a.slug = 'bleach-thousand-year-blood-war'
union all
select a.id, 3, 'March of the Starcross', 'The Sternritter launch their direct assault on the Seireitei, leaving widespread destruction in their wake.', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=640&q=80', '2022-10-25', 1440
from anime a where a.slug = 'bleach-thousand-year-blood-war'
union all
select a.id, 4, 'Kill the Shadow', 'The Captains of the Gotei 13 discover that their Bankai can be stolen by the Quincy medallion.', 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=640&q=80', '2022-11-01', 1440
from anime a where a.slug = 'bleach-thousand-year-blood-war'
union all
select a.id, 1, 'To Defeat Muzan Kibutsuji', 'In the aftermath of the Swordsmith Village battle, Kagaya Ubuyashiki calls for a special Hashira meeting to initiate training.', 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=640&q=80', '2024-05-12', 2700
from anime a where a.slug = 'demon-slayer-kimetsu-no-yaiba'
union all
select a.id, 1, 'Hidden Inventory', 'In 2006, second-year jujutsu students Satoru Gojo and Suguru Geto are assigned an escort mission of the Star Plasma Vessel.', 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=640&q=80', '2023-07-06', 1440
from anime a where a.slug = 'jujutsu-kaisen-season-2'
union all
select a.id, 1, 'I''m Used to It', 'Sung Jinwoo faces deadly odds in a low-rank dungeon to pay for his mother''s hospital bills and sister''s education.', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=640&q=80', '2024-01-07', 1440
from anime a where a.slug = 'solo-leveling'
union all
select a.id, 1, 'The Journey''s End', 'Following a decade-long quest, the Hero Party vanquishes the Demon King and returns triumphantly to the royal capital.', 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=640&q=80', '2023-09-29', 1440
from anime a where a.slug = 'frieren-beyond-journeys-end'
on conflict (anime_id, episode_number) do nothing;

-- =====================================================
-- 12. STREAMING LINKS
-- =====================================================

insert into anime_streaming_links (anime_id, provider_id, region, audio_type, url, is_free, requires_subscription)
select a.id, p.id, 'GLOBAL', 'sub', 'https://www.hulu.com/series/bleach-thousand-year-blood-war', false, true
from anime a, streaming_providers p where a.slug = 'bleach-thousand-year-blood-war' and p.slug = 'hulu-disney'
union all
select a.id, p.id, 'GLOBAL', 'dub', 'https://www.hulu.com/series/bleach-thousand-year-blood-war', false, true
from anime a, streaming_providers p where a.slug = 'bleach-thousand-year-blood-war' and p.slug = 'hulu-disney'
union all
select a.id, p.id, 'GLOBAL', 'sub', 'https://www.crunchyroll.com/series/GY5P48XEY/demon-slayer-kimetsu-no-yaiba', false, true
from anime a, streaming_providers p where a.slug = 'demon-slayer-kimetsu-no-yaiba' and p.slug = 'crunchyroll'
union all
select a.id, p.id, 'GLOBAL', 'sub', 'https://www.crunchyroll.com/series/GRDV0019R/jujutsu-kaisen', false, true
from anime a, streaming_providers p where a.slug = 'jujutsu-kaisen-season-2' and p.slug = 'crunchyroll'
union all
select a.id, p.id, 'GLOBAL', 'sub', 'https://www.crunchyroll.com/series/GEXH3W2W7/solo-leveling', false, true
from anime a, streaming_providers p where a.slug = 'solo-leveling' and p.slug = 'crunchyroll'
union all
select a.id, p.id, 'GLOBAL', 'sub', 'https://www.crunchyroll.com/series/GG5H5XQX4/frieren-beyond-journeys-end', false, true
from anime a, streaming_providers p where a.slug = 'frieren-beyond-journeys-end' and p.slug = 'crunchyroll'
on conflict (anime_id, provider_id, region, url) do nothing;

-- =====================================================
-- 13. USER WATCHLIST & FAVORITES
-- =====================================================

insert into watchlist (user_id, anime_id, status, progress_episodes, score, notes)
select u.id, a.id, 'watching', 24, 10, 'Peak animation and bankai sequences!'
from users u, anime a where u.username = 'paul_velnix' and a.slug = 'bleach-thousand-year-blood-war'
union all
select u.id, a.id, 'completed', 28, 10, 'Masterpiece of storytelling and character depth.'
from users u, anime a where u.username = 'paul_velnix' and a.slug = 'frieren-beyond-journeys-end'
on conflict (user_id, anime_id) do nothing;

insert into favorites (user_id, anime_id)
select u.id, a.id from users u, anime a where u.username = 'paul_velnix' and a.slug in ('bleach-thousand-year-blood-war', 'frieren-beyond-journeys-end')
on conflict (user_id, anime_id) do nothing;

-- =====================================================
-- 14. REVIEWS
-- =====================================================

insert into reviews (user_id, anime_id, rating, title, body, status)
select u.id, a.id, 10, 'A Masterpiece of Shonen Return', 'The Thousand-Year Blood War arc elevates Bleach to unimaginable heights. Pierrot studio delivers cinematic animation with stunning sound design and emotional gravity.', 'published'
from users u, anime a where u.username = 'paul_velnix' and a.slug = 'bleach-thousand-year-blood-war'
on conflict (user_id, anime_id) do nothing;
