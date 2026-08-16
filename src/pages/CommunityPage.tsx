import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NEWS_ARTICLES, DISCUSSION_THREADS } from '../data/animeData';
import { 
  Users, 
  MessageSquare, 
  Vote, 
  Newspaper, 
  ThumbsUp, 
  Send, 
  Sparkles, 
  Clock, 
  CheckCircle,
  Plus
} from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const { polls, votePoll, addToast } = useApp();
  const [activeSection, setActiveSection] = useState<'discussions' | 'polls' | 'news'>('discussions');
  const [threads, setThreads] = useState(DISCUSSION_THREADS);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const [newThreadCategory, setNewThreadCategory] = useState('General');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleVote = (pollId: string, optionId: string) => {
    votePoll(pollId, optionId);
  };

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThreadTitle.trim() || !newThreadContent.trim()) return;

    const newPost = {
      id: 'disc-' + Date.now(),
      title: newThreadTitle,
      author: 'ShadowKing',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      category: newThreadCategory as any,
      createdAt: 'Just now',
      content: newThreadContent,
      upvotes: 1,
      isUpvoted: true,
      repliesCount: 0,
      tags: ['Community', newThreadCategory]
    };

    setThreads([newPost, ...threads]);
    setNewThreadTitle('');
    setNewThreadContent('');
    setShowCreateModal(false);
    addToast({
      title: 'Thread Created! 💬',
      description: 'Your discussion is now visible to the Velnix community.',
      type: 'success'
    });
  };

  const toggleThreadUpvote = (id: string) => {
    setThreads(prev =>
      prev.map(t => {
        if (t.id === id) {
          const isUpvoted = !t.isUpvoted;
          return {
            ...t,
            isUpvoted,
            upvotes: isUpvoted ? t.upvotes + 1 : t.upvotes - 1
          };
        }
        return t;
      })
    );
  };

  return (
    <div className="animate-fade-in pb-20 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-purple-950 text-purple-300 border border-purple-800 rounded-full">
              Global Anime Hub
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Velnix Community & News
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Join thousands of anime fans in daily debates, seasonal poll votes, and production news.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs tracking-wide shadow-lg shadow-purple-600/30 flex items-center gap-2 self-start md:self-auto transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>New Discussion Post</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'discussions', label: 'Discussion Threads', icon: <MessageSquare className="w-4 h-4" /> },
          { id: 'polls', label: 'Seasonal Awards & Polls', icon: <Vote className="w-4 h-4" /> },
          { id: 'news', label: 'Anime News & Industry', icon: <Newspaper className="w-4 h-4" /> },
        ].map((tab) => {
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-[#101020] text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Section 1: Discussions */}
      {activeSection === 'discussions' && (
        <div className="space-y-4">
          {threads.map((thread) => (
            <div
              key={thread.id}
              className="p-5 rounded-3xl bg-[#101022] border border-slate-800/80 hover:border-purple-500/50 space-y-3 transition-all shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={thread.avatar} alt={thread.author} className="w-9 h-9 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-200">{thread.author}</h4>
                    <span className="text-[10px] text-slate-400">{thread.createdAt}</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 text-xs font-semibold border border-purple-800/50">
                  {thread.category}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white hover:text-purple-300 transition-colors cursor-pointer">
                {thread.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {thread.content}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleThreadUpvote(thread.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors ${
                      thread.isUpvoted
                        ? 'bg-purple-600/30 border-purple-500 text-purple-300 font-bold'
                        : 'bg-slate-900 border-slate-700 hover:border-purple-500 text-slate-300'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{thread.upvotes} Upvotes</span>
                  </button>
                  <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 text-slate-400">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{thread.repliesCount} Replies</span>
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-1.5">
                  {thread.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Section 2: Polls */}
      {activeSection === 'polls' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {polls.map((poll) => (
            <div
              key={poll.id}
              className="p-6 rounded-3xl bg-[#101022] border border-purple-900/40 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-[11px] font-bold">
                  {poll.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  {poll.deadline}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">{poll.title}</h3>
                <p className="text-xs text-slate-400 mt-1">Total {poll.totalVotes.toLocaleString()} votes registered</p>
              </div>

              <div className="space-y-2.5 pt-2">
                {poll.options.map((opt) => {
                  const votePercentage = poll.totalVotes > 0 ? Math.round((opt.votes / poll.totalVotes) * 100) : 0;
                  const isUserPick = poll.userVotedOptionId === opt.id;

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleVote(poll.id, opt.id)}
                      className={`relative w-full p-3.5 rounded-2xl border text-left overflow-hidden transition-all ${
                        isUserPick
                          ? 'border-purple-500 bg-purple-950/30'
                          : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
                      }`}
                    >
                      {/* Vote Progress Bar Fill */}
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600/30 to-cyan-500/20 transition-all duration-500"
                        style={{ width: `${votePercentage}%` }}
                      />

                      <div className="relative flex items-center justify-between z-10 text-xs sm:text-sm font-semibold text-slate-100">
                        <div className="flex items-center gap-2">
                          {opt.image && (
                            <img src={opt.image} alt={opt.label} className="w-7 h-7 rounded-lg object-cover" />
                          )}
                          <span>{opt.label}</span>
                          {isUserPick && <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />}
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-purple-300 font-bold">{votePercentage}%</span>
                          <span className="text-[10px] text-slate-400 block">{opt.votes.toLocaleString()} votes</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Section 3: News */}
      {activeSection === 'news' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS_ARTICLES.map((article) => (
            <div
              key={article.id}
              className="group flex flex-col rounded-3xl bg-[#101022] border border-slate-800/80 hover:border-purple-500/50 overflow-hidden shadow-xl transition-all"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-lg bg-black/80 text-cyan-300 text-xs font-bold backdrop-blur-md">
                  {article.category}
                </span>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-bold text-base text-white group-hover:text-purple-300 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-medium text-slate-300">By {article.author}</span>
                  <span className="text-purple-400 font-semibold">{article.commentsCount} comments</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Thread Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/80 animate-fade-in">
          <div className="fixed inset-0" onClick={() => setShowCreateModal(false)} />
          <div className="relative w-full max-w-lg bg-[#111122] border border-purple-900/60 rounded-3xl p-6 shadow-2xl z-10 animate-slide-up space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-400" />
                <span>Start a Community Discussion</span>
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateThread} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                <select
                  value={newThreadCategory}
                  onChange={(e) => setNewThreadCategory(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                >
                  <option value="General">General Discussion</option>
                  <option value="Episode Discussion">Episode Breakdown</option>
                  <option value="Theory">Fan Theories & Lore</option>
                  <option value="Recommendation">Recommendations</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Title</label>
                <input
                  type="text"
                  placeholder="e.g. What are your expectations for the Jeju Island raid?"
                  value={newThreadTitle}
                  onChange={(e) => setNewThreadTitle(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Post Content</label>
                <textarea
                  rows={4}
                  placeholder="Explain your thoughts in detail..."
                  value={newThreadContent}
                  onChange={(e) => setNewThreadContent(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
