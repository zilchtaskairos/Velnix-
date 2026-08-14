# Velnix — Next-Generation Anime Streaming Platform 🚀

**Velnix** is an ultra-fast, feature-packed modern anime streaming web application engineered for anime fans. It includes high-definition video streaming, interactive live Danmaku (bullet comments), multi-server switching, custom speed and audio settings, episode progress tracking, weekly airing calendars, and seasonal community award voting.

---

## 🌟 Key Pages Overview & Architectural Breakdown

### 1. **Home / Explore Page (`/`)**
- **Spotlight Hero Carousel**: Auto-cycling hero banner featuring top seasonal anime (Solo Leveling, Jujutsu Kaisen, Frieren, Demon Slayer) with direct "Watch Episode 1", "+ Watchlist", "Official Trailer", and metadata badges.
- **Continue Watching Section**: Real-time progress cards that remember where you paused, with 1-click resume and progress bars.
- **Airing Today Live Ticker**: Synced broadcast ticker showing upcoming episode drops with countdowns and "Remind Me" alert toggles.
- **Top 10 Today Leaderboard**: Ranked #1 to #10 numbered cards highlighting trending popularity.
- **Thematic Anime Carousels**: Smooth horizontal scrolling rows for Trending Anime, All-Time Critically Acclaimed, High-Octane Action, Fantasy & Magic, and Comfort/Slice of Life.

### 2. **Browse & Advanced Filter Catalog (`/browse`)**
- **Instant Search**: Real-time keyword filter across titles, studios, and genres.
- **Multi-Facet Filters**: Filter simultaneously by Genre, Format (TV, Movie, OVA, ONA, Special), Airing Status (Airing, Completed, Upcoming), and Audio Track (Subbed vs Dubbed).
- **Sorting Options**: Sort by Most Popular, Highest Rated, Trending Now, Newest, or A-Z.
- **Grid vs List Toggle**: Switch between visual poster grid view and compact detailed list view.

### 3. **Anime Detail & Overview Page (`/anime/:id`)**
- **Cinematic Header & Artwork**: High-res backdrop banner, poster, score, rank, studio, season, and content rating tags.
- **Watchlist Status Selector**: Quick dropdown to assign anime to *Watching*, *Plan to Watch*, *Completed*, *On Hold*, or *Dropped*.
- **Interactive User Score Widget**: 1-10 Star rating selector that updates personal library stats.
- **Episode Directory (Grid & Compact Modes)**: Full episode list with thumbnails, duration, episode title, synopsis, and filler badges.
- **Characters & Cast Roster**: Character artwork paired with Japanese & English Voice Actor credits.
- **Franchise Relations & Recommendations**: Direct links to prequels, sequels, and recommended similar titles.
- **Community Reviews**: User reviews with upvote buttons and an interactive review submission form.

### 4. **Streaming Video Player Page (`/watch/:id/:episodeId`)**
- **Custom HTML5 Player Controls**: Custom Play/Pause, Seek Bar with hover timestamps, Volume slider with mute toggle, Time display.
- **Live Danmaku Bullet Comments**: Real-time bullet comments flowing across the video stream with color selector and live broadcast input bar.
- **Skip Intro (85s) & Skip Outro Buttons**: Instantly jump past opening themes.
- **Multi-Server Edge Switcher**: Switch between *Velnix Ultra CDN*, *Kyoto FastStream*, *Tokyo Mirror*, and *Alpha Stream*.
- **Dual Audio & Quality Control**: Seamless Sub/Dub switching and 1080p Ultra HD / 720p / 480p / Auto resolution switcher.
- **Interactive Episode Drawer**: Browse and switch episodes without leaving playback.
- **Episode Discussion & Spoiler Masking**: Interactive comment feed with reply threads and spoiler click-to-reveal protection.
- **Keyboard Shortcuts**: `Space` (Play/Pause), `← / →` (Seek 5s), `F` (Fullscreen), `M` (Mute), `S` (Skip Intro), `D` (Danmaku Toggle).

### 5. **Weekly Airing Release Schedule (`/schedule`)**
- **7-Day Interactive Calendar**: Monday through Sunday daily release timetable.
- **Timezone Selector**: Switch between Local UTC, JST Tokyo, EST New York, and PST Los Angeles.
- **Airing Alert Reminders**: Click the notification bell to set streaming alerts for upcoming episodes.

### 6. **Watchlist & User Library (`/library`)**
- **Profile Overview & VIP Badge**: User avatar, bio, and VIP membership card.
- **Anime Statistics Grid**: Total anime count, episodes streamed, estimated hours watched, and mean score.
- **Categorized Tabs**: Filter library by *All*, *Watching*, *Plan to Watch*, *Completed*, *Favorites*, and *Watch History*.
- **One-Click Episode Counter (+1 Ep)**: Quick increment button to track watched episodes on the go.

### 7. **Community, News & Polls (`/community`)**
- **Seasonal Award Polls**: Live community voting (e.g. *Anime of the Year*, *Best Fight Scene*) with live percentage bars.
- **Discussion Boards**: Create custom discussion threads, upvote topics, and join anime debates.
- **Anime News & Industry Deep Dives**: Production interviews, animation breakdowns, and studio announcements.

### 8. **Settings & Themes Customizer (`/settings`)**
- **5 Sleek Themes**: Velnix Violet, Cyberpunk Amber, Emerald Blade, Crimson Blood, and OLED Midnight.
- **Streaming Defaults**: Configure default resolution, preferred audio track (Sub vs Dub), and auto-play next episode.
- **Danmaku Tuning**: Customize opacity and speed sliders.
- **Data Management**: Clear playback history or reset settings.

### 9. **Page Guide & Explanation (`/guide`)**
- Built-in interactive visual guide detailing every page, component, and feature.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism and Danmaku keyframe animations
- **Iconography**: Lucide React + Custom SVG components
- **Bundler & Dev Server**: Vite 6 (host `0.0.0.0`, port `5173`)
- **State Management & Persistence**: React Context API with LocalStorage synchronization
- **Video Engine**: HTML5 Media Player with custom HUD, CDN server switching, and responsive controls

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build
```
