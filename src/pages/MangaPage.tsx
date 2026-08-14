import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  Star, 
  Search, 
  Bookmark 
} from 'lucide-react';

export const MangaPage: React.FC = () => {
  const { mangas, mangaProgress, navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const allMangaGenres: string[] = Array.from(
    new Set(mangas.flatMap((m) => m.genres))
  );

  const filteredMangas = mangas.filter((manga) => {
    const matchesSearch =
      searchQuery === '' ||
      manga.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manga.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = !selectedGenre || manga.genres.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="animate-fade-in pb-20 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-purple-950 text-purple-300 border border-purple-800 rounded-full flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              Manga & Webtoon Library
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Read Official Manga & Webtoons
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            High-definition chapters, smooth page-turning, and vertical webtoon reading modes.
          </p>
        </div>

        <button
          onClick={() => navigateTo('library')}
          className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-purple-500 text-slate-200 text-xs font-semibold flex items-center gap-2 self-start md:self-auto transition-colors"
        >
          <Bookmark className="w-4 h-4 text-purple-400" />
          <span>My Manga Reading Progress</span>
        </button>
      </div>

      {/* Search & Genre Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#0f0f1e] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
          <input
            type="text"
            placeholder="Search manga by title, author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto pb-1">
          <button
            onClick={() => setSelectedGenre(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
              selectedGenre === null
                ? 'bg-purple-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            All
          </button>
          {allMangaGenres.map((g: string) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(selectedGenre === g ? null : g)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                selectedGenre === g
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Manga Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMangas.map((manga) => {
          const progress = mangaProgress[manga.id];
          const latestChapter = manga.chapters[0];

          return (
            <div
              key={manga.id}
              className="p-4 sm:p-5 rounded-3xl bg-[#101022] border border-slate-800/80 hover:border-purple-500/60 transition-all flex flex-col sm:flex-row gap-5 group shadow-xl"
            >
              {/* Cover */}
              <div className="relative w-full sm:w-36 aspect-[3/4.2] rounded-2xl overflow-hidden bg-slate-950 shrink-0">
                <img src={manga.cover} alt={manga.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-purple-950 text-purple-300 text-[10px] font-bold">
                  Rank #{manga.ranked}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-cyan-400 tracking-wider">
                      {manga.status} • {manga.chaptersCount} Chapters
                    </span>
                    <span className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                      <Star className="w-3 h-3 fill-amber-400" /> {manga.score}
                    </span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-purple-300 transition-colors line-clamp-1 mt-1">
                    {manga.title}
                  </h3>
                  <p className="text-xs text-slate-400">By {manga.author} ({manga.artist})</p>

                  <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                    {manga.synopsis}
                  </p>
                </div>

                {/* Progress bar if reading */}
                {progress && (
                  <div className="p-2.5 rounded-xl bg-purple-950/20 border border-purple-900/40 text-[11px] text-purple-300 flex items-center justify-between">
                    <span>Reading Progress:</span>
                    <strong className="text-white">Chapter {progress.currentChapter} / {manga.chaptersCount}</strong>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => navigateTo('manga-reader', { mangaId: manga.id, chapterId: latestChapter?.id || 1 })}
                    className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/30 transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Read Latest (Ch {latestChapter?.chapterNumber || 1})</span>
                  </button>

                  <button
                    onClick={() => navigateTo('manga-reader', { mangaId: manga.id, chapterId: 1 })}
                    className="px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                    title="Read from Chapter 1"
                  >
                    Ch 1
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
