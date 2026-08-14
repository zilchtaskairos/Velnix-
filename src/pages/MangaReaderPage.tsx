import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Maximize2, 
  Minimize2, 
  ChevronLeft, 
  ChevronRight, 
  Sliders, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const MangaReaderPage: React.FC = () => {
  const { currentManga, params, navigateTo, updateMangaProgress, addToast } = useApp();

  const chapterId = params.chapterId || currentManga?.chapters[0]?.id || 1;
  const chapter = currentManga?.chapters.find((c) => c.id === chapterId) || currentManga?.chapters[0];

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [readingMode, setReadingMode] = useState<'webtoon' | 'single'>('webtoon');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (currentManga && chapter) {
      updateMangaProgress(currentManga.id, chapter.chapterNumber, currentPageIndex + 1);
    }
  }, [currentManga?.id, chapter?.chapterNumber, currentPageIndex]);

  if (!currentManga || !chapter) {
    return (
      <div className="py-20 text-center text-slate-400">
        <p>No manga selected.</p>
        <button onClick={() => navigateTo('manga')} className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl">
          Browse Manga
        </button>
      </div>
    );
  }

  const pages = chapter.pages;

  const handleNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleNextChapter();
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextChapter = () => {
    const nextChap = currentManga.chapters.find((c) => c.chapterNumber === chapter.chapterNumber + 1);
    if (nextChap) {
      navigateTo('manga-reader', { mangaId: currentManga.id, chapterId: nextChap.id });
      setCurrentPageIndex(0);
      addToast({ title: `Chapter ${nextChap.chapterNumber}`, description: nextChap.title, type: 'info' });
    } else {
      addToast({ title: 'Latest Chapter Reached', description: 'You have caught up with this manga!', type: 'success' });
    }
  };

  const handlePrevChapter = () => {
    const prevChap = currentManga.chapters.find((c) => c.chapterNumber === chapter.chapterNumber - 1);
    if (prevChap) {
      navigateTo('manga-reader', { mangaId: currentManga.id, chapterId: prevChap.id });
      setCurrentPageIndex(0);
    }
  };

  return (
    <div className="animate-fade-in pb-24 max-w-4xl mx-auto space-y-6">
      
      {/* Top Reader Navigation Bar */}
      <div className="sticky top-20 z-30 p-4 rounded-2xl bg-[#0e0e1e]/95 backdrop-blur-xl border border-purple-900/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => navigateTo('manga')}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="font-bold text-sm text-white truncate max-w-xs">{currentManga.title}</h2>
            <p className="text-xs text-purple-300 font-semibold">
              Chapter {chapter.chapterNumber} — {chapter.title}
            </p>
          </div>
        </div>

        {/* Center Controls: Reading Mode & Chapter Select */}
        <div className="flex items-center gap-2">
          {/* Chapter Selector Dropdown */}
          <select
            value={chapter.id}
            onChange={(e) => {
              navigateTo('manga-reader', { mangaId: currentManga.id, chapterId: Number(e.target.value) });
              setCurrentPageIndex(0);
            }}
            className="py-1.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold"
          >
            {currentManga.chapters.map((c) => (
              <option key={c.id} value={c.id}>
                Chapter {c.chapterNumber}: {c.title}
              </option>
            ))}
          </select>

          {/* Reading Mode Switcher */}
          <button
            onClick={() => setReadingMode(readingMode === 'webtoon' ? 'single' : 'webtoon')}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-cyan-300 hover:bg-slate-800 transition-colors"
          >
            {readingMode === 'webtoon' ? '📜 Webtoon Strip' : '📖 Single Page'}
          </button>
        </div>
      </div>

      {/* Manga Pages Viewer Area */}
      {readingMode === 'webtoon' ? (
        /* Webtoon Vertical Infinite Strip Mode */
        <div className="space-y-3 flex flex-col items-center">
          {pages.map((imgUrl, idx) => (
            <div key={idx} className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-slate-950 shadow-2xl border border-slate-800">
              <img
                src={imgUrl}
                alt={`Page ${idx + 1}`}
                className="w-full h-auto object-contain select-none"
              />
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-slate-300">
                Page {idx + 1} / {pages.length}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Single Page Flipping Mode */
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden bg-slate-950 shadow-2xl border border-purple-900/50">
            <img
              src={pages[currentPageIndex]}
              alt={`Page ${currentPageIndex + 1}`}
              className="w-full h-auto object-contain select-none max-h-[85vh]"
            />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-xs font-bold text-white border border-white/10">
              Page {currentPageIndex + 1} of {pages.length}
            </div>
          </div>

          {/* Page Turn Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevPage}
              disabled={currentPageIndex === 0}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold disabled:opacity-30 hover:bg-purple-600 transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Page
            </button>
            <button
              onClick={handleNextPage}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md flex items-center gap-1"
            >
              <span>Next Page</span> <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Chapter End Navigation Footer */}
      <div className="p-6 rounded-3xl bg-[#0f0f20] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-white text-sm">Finished Chapter {chapter.chapterNumber}?</h4>
          <p className="text-xs text-slate-400">Jump to the next official chapter or return to manga catalog.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevChapter}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-colors"
          >
            ← Prev Chapter
          </button>
          <button
            onClick={handleNextChapter}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-transform hover:scale-105"
          >
            Next Chapter →
          </button>
        </div>
      </div>

    </div>
  );
};
