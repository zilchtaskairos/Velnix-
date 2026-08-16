import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Music, 
  Plus, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Sparkles, 
  Send, 
  Check,
  CheckCircle,
  Video,
  X,
  ChevronUp,
  ChevronDown,
  Search,
  ArrowLeft,
  Radio,
  Copy
} from 'lucide-react';

export const PulsePage: React.FC = () => {
  const { 
    pulseClips, 
    likePulseClip, 
    bookmarkPulseClip, 
    addPulseComment, 
    shareToChat, 
    contacts, 
    navigateTo,
    addToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'foryou' | 'following'>('foryou');
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showCommentsDrawer, setShowCommentsDrawer] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [followedCreators, setFollowedCreators] = useState<Record<string, boolean>>({});

  // Floating Pop Hearts for Double-Tap to Like (TikTok style)
  const [popHearts, setPopHearts] = useState<{ id: string; x: number; y: number }[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const lastTapRef = useRef<number>(0);

  const clip = pulseClips[currentClipIndex] || pulseClips[0];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [currentClipIndex]);

  const handleNextClip = () => {
    if (currentClipIndex < pulseClips.length - 1) {
      setCurrentClipIndex((prev) => prev + 1);
    } else {
      setCurrentClipIndex(0); // loop
    }
  };

  const handlePrevClip = () => {
    if (currentClipIndex > 0) {
      setCurrentClipIndex((prev) => prev - 1);
    }
  };

  // Double Tap to Like (TikTok style)
  const handleVideoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      // Double tap detected!
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const heartId = 'heart-' + Date.now() + Math.random();
      setPopHearts(prev => [...prev, { id: heartId, x, y }]);
      setTimeout(() => {
        setPopHearts(prev => prev.filter(h => h.id !== heartId));
      }, 1000);

      if (!clip.isLiked) {
        likePulseClip(clip.id);
      }
    } else {
      // Single tap: toggle play/pause
      togglePlay();
    }
    lastTapRef.current = now;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleToggleFollow = (creatorName: string) => {
    const nextState = !followedCreators[creatorName];
    setFollowedCreators(prev => ({ ...prev, [creatorName]: nextState }));
    addToast({
      title: nextState ? `Following ${creatorName} ❤️` : `Unfollowed ${creatorName}`,
      type: nextState ? 'success' : 'info'
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addPulseComment(clip.id, commentInput.trim());
    setCommentInput('');
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 50) {
      handleNextClip();
    } else if (e.deltaY < -50) {
      handlePrevClip();
    }
  };

  return (
    <div 
      onWheel={handleWheel}
      className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center select-none font-sans overflow-hidden animate-fade-in"
    >
      
      {/* 1. TOP TIKTOK HEADER: [Live / Studio]  [Following | For You]  [Search] */}
      <div className="absolute top-0 inset-x-0 p-4 pt-3 flex items-center justify-between z-30 pointer-events-auto bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <button
          type="button"
          onClick={() => navigateTo('studio')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 text-xs font-bold hover:bg-[#ff2e56] transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create</span>
        </button>

        {/* Following | For You Tabs */}
        <div className="flex items-center gap-6 text-sm font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('following')}
            className={`transition-all relative cursor-pointer pb-1 ${
              activeTab === 'following' ? 'text-white scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Following
            {activeTab === 'following' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-white rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('foryou')}
            className={`transition-all relative cursor-pointer pb-1 ${
              activeTab === 'foryou' ? 'text-white scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            For You
            {activeTab === 'foryou' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-white rounded-full" />
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          title="Back to Home"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* 2. FULL 9:16 VERTICAL VIDEO FEED CONTAINER (TIKTOK 1:1) */}
      <div 
        onClick={handleVideoClick}
        className="relative w-full h-full max-w-md aspect-[9/16] bg-black flex items-center justify-center overflow-hidden cursor-pointer"
      >
        {/* Active HTML5 Video Player */}
        <video
          ref={videoRef}
          src={clip.videoUrl}
          poster={clip.posterUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Double-Tap Pop Hearts Animation Layer */}
        {popHearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute pointer-events-none z-35 animate-pop-heart"
            style={{ left: `${heart.x - 40}px`, top: `${heart.y - 40}px` }}
          >
            <Heart className="w-20 h-20 fill-[#ff2e56] text-[#ff2e56] drop-shadow-[0_0_20px_rgba(255,46,86,0.9)]" />
          </div>
        ))}

        {/* Center Pause Indicator */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px] pointer-events-none z-20">
            <div className="w-16 h-16 rounded-full bg-black/60 text-white flex items-center justify-center shadow-2xl">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>
          </div>
        )}

        {/* Sound Toggle Button on Top Left */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsMuted(!isMuted);
          }}
          className="absolute top-16 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 hover:bg-black/80 transition-colors z-30 cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-[#ff2e56]" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* ---------------------------------------------------------------------
            RIGHT VERTICAL ACTION BAR (TIKTOK 1:1)
            [Avatar + Follow] [Like Heart] [Comment] [Bookmark] [Share] [Vinyl]
           --------------------------------------------------------------------- */}
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute right-3 bottom-20 flex flex-col items-center gap-4 z-30"
        >
          {/* Creator Avatar with Follow Plus Badge */}
          <div className="relative mb-1">
            <img
              src={clip.creatorAvatar}
              alt={clip.creatorName}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-xl"
            />
            <button
              type="button"
              onClick={() => handleToggleFollow(clip.creatorName)}
              className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg transition-transform active:scale-125 cursor-pointer ${
                followedCreators[clip.creatorName]
                  ? 'bg-emerald-500 text-black'
                  : 'bg-[#ff2e56] text-white hover:scale-110'
              }`}
            >
              {followedCreators[clip.creatorName] ? <Check className="w-3 h-3" /> : '+'}
            </button>
          </div>

          {/* Like Heart Button */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => likePulseClip(clip.id)}
              className={`p-2.5 rounded-full transition-transform active:scale-150 cursor-pointer ${
                clip.isLiked
                  ? 'text-[#ff2e56]'
                  : 'text-white hover:text-rose-300'
              }`}
            >
              <Heart className={`w-8 h-8 drop-shadow-md ${clip.isLiked ? 'fill-[#ff2e56]' : 'fill-white/10'}`} />
            </button>
            <span className="text-xs font-bold text-white drop-shadow-md -mt-1">
              {(clip.likesCount / 1000).toFixed(1)}k
            </span>
          </div>

          {/* Comments Button */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => setShowCommentsDrawer(true)}
              className="p-2.5 text-white hover:text-cyan-300 transition-transform active:scale-125 cursor-pointer"
            >
              <MessageCircle className="w-8 h-8 fill-white/10 drop-shadow-md" />
            </button>
            <span className="text-xs font-bold text-white drop-shadow-md -mt-1">
              {clip.commentsCount}
            </span>
          </div>

          {/* Bookmark / Save Button */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => bookmarkPulseClip(clip.id)}
              className={`p-2.5 transition-transform active:scale-125 cursor-pointer ${
                clip.isBookmarked
                  ? 'text-amber-400'
                  : 'text-white hover:text-amber-300'
              }`}
            >
              <Bookmark className={`w-8 h-8 drop-shadow-md ${clip.isBookmarked ? 'fill-amber-400' : 'fill-white/10'}`} />
            </button>
            <span className="text-xs font-bold text-white drop-shadow-md -mt-1">Save</span>
          </div>

          {/* Share Button */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => setShowShareModal(true)}
              className="p-2.5 text-white hover:text-[#ff2e56] transition-transform active:scale-125 cursor-pointer"
            >
              <Share2 className="w-8 h-8 drop-shadow-md" />
            </button>
            <span className="text-xs font-bold text-white drop-shadow-md -mt-1">Share</span>
          </div>

          {/* Rotating Vinyl Record Album Art matching TikTok */}
          <div className="relative mt-2">
            <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-slate-700 p-1 flex items-center justify-center animate-spin [animation-duration:5s] shadow-2xl">
              <img
                src={clip.posterUrl}
                alt="Vinyl"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <Music className="w-3.5 h-3.5 text-[#ff2e56] absolute -top-2 -left-2 animate-bounce" />
          </div>
        </div>

        {/* ---------------------------------------------------------------------
            BOTTOM CREATOR OVERLAY & CAPTION (TIKTOK 1:1)
           --------------------------------------------------------------------- */}
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-4 left-4 right-20 z-30 space-y-2 text-left pointer-events-auto"
        >
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm sm:text-base text-white drop-shadow-md flex items-center gap-1">
                <span>@{clip.creatorName.toLowerCase().replace(/\s+/g, '_')}</span>
                {clip.isVerified && <CheckCircle className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />}
              </h3>
            </div>
            <p className="text-xs text-slate-200 line-clamp-2 leading-snug drop-shadow-md mt-1">
              {clip.caption}
            </p>
          </div>

          {/* Music Marquee Ticker */}
          <div className="flex items-center gap-2 text-xs text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-full w-fit">
            <Music className="w-3 h-3 text-[#ff2e56] shrink-0" />
            <span className="font-semibold truncate max-w-[200px]">{clip.songTitle}</span>
          </div>
        </div>

        {/* Swipe Up/Down Indicator Buttons for Desktop/Mobile */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30 pointer-events-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevClip();
            }}
            disabled={currentClipIndex === 0}
            className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white disabled:opacity-20 hover:bg-[#ff2e56] transition-all cursor-pointer shadow-lg"
          >
            <ChevronUp className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNextClip();
            }}
            className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-[#ff2e56] transition-all cursor-pointer shadow-lg"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* =========================================================================
          TIKTOK COMMENTS BOTTOM SHEET DRAWER
         ========================================================================= */}
      {showCommentsDrawer && (
        <div className="fixed inset-0 z-50 flex items-end justify-center backdrop-blur-md bg-black/75 animate-fade-in font-sans">
          <div className="fixed inset-0" onClick={() => setShowCommentsDrawer(false)} />
          <div className="relative w-full max-w-md bg-[#121224] border-t border-slate-700 rounded-t-3xl p-5 shadow-2xl z-10 animate-slide-up flex flex-col max-h-[70vh]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="font-bold text-sm text-white">{clip.commentsCount} comments</span>
              <button onClick={() => setShowCommentsDrawer(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-3.5">
              {clip.comments.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-8">No comments yet. Be the first to comment!</p>
              ) : (
                clip.comments.map((com) => (
                  <div key={com.id} className="flex items-start gap-2.5 text-xs">
                    <img src={com.avatar} alt={com.author} className="w-8 h-8 rounded-full object-cover shrink-0" />
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">{com.author}</span>
                        <span className="text-[10px] text-slate-500">{com.timestamp}</span>
                      </div>
                      <p className="text-slate-300 leading-snug">{com.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleCommentSubmit} className="pt-2 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="Add comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 px-3.5 py-2.5 rounded-full text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#ff2e56]"
              />
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="p-2.5 rounded-full bg-[#ff2e56] hover:bg-[#ff4b72] disabled:opacity-40 text-white cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SHARE MODAL */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/80 animate-fade-in font-sans">
          <div className="fixed inset-0" onClick={() => setShowShareModal(false)} />
          <div className="relative w-full max-w-sm bg-[#121224] border border-slate-700 rounded-3xl p-5 shadow-2xl z-10 animate-slide-up space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-bold text-sm text-white">Share to</span>
              <button onClick={() => setShowShareModal(false)} className="text-slate-400 hover:text-white cursor-pointer">✕</button>
            </div>

            <div className="grid grid-cols-4 gap-3 text-center text-xs">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  addToast({ title: 'Link Copied! 📋', type: 'success' });
                  setShowShareModal(false);
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white">
                  <Copy className="w-4 h-4" />
                </div>
                <span className="text-[10px]">Copy Link</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('community');
                  setShowShareModal(false);
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-[#ff2e56] flex items-center justify-center text-white">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span className="text-[10px]">DMs</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('party');
                  setShowShareModal(false);
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white">
                  <Radio className="w-4 h-4" />
                </div>
                <span className="text-[10px]">Watch Party</span>
              </button>

              <button
                onClick={() => {
                  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(clip.caption)}`, '_blank');
                  setShowShareModal(false);
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center text-white">
                  <Share2 className="w-4 h-4" />
                </div>
                <span className="text-[10px]">Twitter/X</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
