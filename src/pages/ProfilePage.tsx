import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  Heart, 
  Gamepad2, 
  Settings, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Camera,
  Edit3,
  Check,
  Upload,
  Sparkles
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { 
    currentUser, 
    updateProfilePics, 
    updateProfileBio, 
    watchlist,
    mangaProgress,
    linkedGames,
    navigateTo, 
    setIsPayPalOpen, 
    addToast 
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [usernameInput, setUsernameInput] = useState(currentUser.username);
  const [handleInput, setHandleInput] = useState(currentUser.handle);
  const [bioInput, setBioInput] = useState(currentUser.bio);
  const [avatarPreview, setAvatarPreview] = useState(currentUser.avatar);
  const [bannerPreview, setBannerPreview] = useState(currentUser.bannerUrl);

  const avatarFileInputRef = useRef<HTMLInputElement>(null);
  const bannerFileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setAvatarPreview(result);
          updateProfilePics(result, bannerPreview);
          addToast({ title: 'Avatar Updated! 📷', description: 'New profile photo set.', type: 'success' });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setBannerPreview(result);
          updateProfilePics(avatarPreview, result);
          addToast({ title: 'Cover Banner Updated! 🎨', description: 'New banner artwork set.', type: 'success' });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileBio(bioInput, usernameInput, handleInput);
    updateProfilePics(avatarPreview, bannerPreview);
    setIsEditing(false);
    addToast({ title: 'Profile Changes Saved! ✨', description: 'Your profile has been updated.', type: 'success' });
  };

  const animeCount = Object.keys(watchlist).length;
  const mangaCount = Object.keys(mangaProgress).length;
  const gamesCount = linkedGames.length;
  const totalEpisodes = Object.values(watchlist).reduce((acc, item) => acc + (item.progressEpisode || 0), 0);
  const watchTimeHours = Math.round((totalEpisodes * 24) / 60);

  return (
    <div className="animate-fade-in pb-32 max-w-md md:max-w-lg mx-auto space-y-5">
      
      {/* Hidden File Inputs for Direct Custom Image Uploading */}
      <input
        type="file"
        ref={avatarFileInputRef}
        onChange={handleAvatarFileChange}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={bannerFileInputRef}
        onChange={handleBannerFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* 1. Profile Banner & Avatar Card */}
      <div className="relative rounded-3xl overflow-hidden bg-[#0d0d18] border border-slate-800/80 shadow-2xl">
        
        {/* Customizable Background Cover Banner */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-900 group">
          <img
            src={currentUser.bannerUrl}
            alt="Profile Banner"
            className="w-full h-full object-cover brightness-75 transition-transform duration-300 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d18] via-transparent to-transparent" />

          {/* Quick Banner Upload Button on Top Right */}
          <button
            onClick={() => bannerFileInputRef.current?.click()}
            className="absolute top-3.5 right-3.5 px-3 py-1.5 rounded-xl bg-black/65 hover:bg-black/90 text-white text-[11px] font-semibold backdrop-blur-md flex items-center gap-1.5 border border-white/20 transition-all shadow-md active:scale-95"
            title="Upload Custom Banner Image"
          >
            <Camera className="w-3.5 h-3.5 text-[#ff2e56]" />
            <span>Edit Banner</span>
          </button>
        </div>

        {/* User Info Row */}
        <div className="relative px-5 pb-6 -mt-16 z-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            
            {/* Avatar with Pink Glowing Ring & Direct Camera Upload */}
            <div className="relative shrink-0 group/avatar">
              <img
                src={currentUser.avatar}
                alt={currentUser.username}
                className="w-20 h-20 sm:w-22 sm:h-22 rounded-full object-cover ring-2 ring-[#ff2e56] shadow-xl bg-black cursor-pointer"
                onClick={() => avatarFileInputRef.current?.click()}
              />
              <button
                onClick={() => avatarFileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#ff2e56] text-white shadow-lg border border-black hover:scale-110 transition-transform"
                title="Upload Custom Avatar Photo"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Name, Handle & Status */}
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold font-heading text-white">
                {currentUser.username}
              </h1>
              <p className="text-xs text-slate-400 font-mono">{currentUser.handle}</p>
              
              {currentUser.isVip ? (
                <div className="pt-0.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ff2e56]/20 border border-[#ff2e56]/40 text-[#ff2e56] text-[10px] font-bold">
                    <span>🌸</span> Premium VIP
                  </span>
                </div>
              ) : (
                <div className="pt-0.5">
                  <button
                    onClick={() => setIsPayPalOpen(true)}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800/80 hover:bg-[#ff2e56]/20 border border-slate-700 hover:border-[#ff2e56]/40 text-slate-300 hover:text-[#ff2e56] text-[10px] font-semibold transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-[#ff2e56]" />
                    <span>Free Member • Upgrade</span>
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Quick Edit Profile Button */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors self-end mb-1"
            title="Edit Profile Info"
          >
            <Edit3 className="w-4 h-4 text-[#ff2e56]" />
          </button>
        </div>

        {/* 4 Stats Blocks (0 initially, dynamic increments) */}
        <div className="grid grid-cols-4 gap-2 px-4 pb-5 text-center">
          <div className="p-2.5 rounded-2xl bg-[#131322] border border-slate-800/80">
            <h4 className="text-base font-extrabold text-white">{animeCount}</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Anime</p>
          </div>

          <div className="p-2.5 rounded-2xl bg-[#131322] border border-slate-800/80">
            <h4 className="text-base font-extrabold text-white">{mangaCount}</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Manga</p>
          </div>

          <div className="p-2.5 rounded-2xl bg-[#131322] border border-slate-800/80">
            <h4 className="text-base font-extrabold text-white">{gamesCount}</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Games</p>
          </div>

          <div className="p-2.5 rounded-2xl bg-[#131322] border border-slate-800/80">
            <h4 className="text-base font-extrabold text-white">{watchTimeHours}h</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Watch Time</p>
          </div>
        </div>

      </div>

      {/* Profile Edit Drawer Form */}
      {isEditing && (
        <form onSubmit={handleSaveProfile} className="p-5 rounded-3xl bg-[#0e0e1a] border border-slate-800 space-y-3.5 shadow-xl animate-slide-up text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-bold text-white text-sm">Edit Your Profile</span>
            <button type="button" onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Display Name</label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 px-3 py-2 rounded-xl text-white font-semibold focus:outline-none focus:border-[#ff2e56]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Handle</label>
              <input
                type="text"
                value={handleInput}
                onChange={(e) => setHandleInput(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 px-3 py-2 rounded-xl text-white font-mono focus:outline-none focus:border-[#ff2e56]"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Bio</label>
            <textarea
              rows={2}
              value={bioInput}
              onChange={(e) => setBioInput(e.target.value)}
              placeholder="Tell others about your favorite anime..."
              className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-white focus:outline-none focus:border-[#ff2e56]"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => avatarFileInputRef.current?.click()}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl flex items-center gap-1 text-[11px]"
              >
                <Upload className="w-3.5 h-3.5 text-[#ff2e56]" /> Avatar
              </button>
              <button
                type="button"
                onClick={() => bannerFileInputRef.current?.click()}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl flex items-center gap-1 text-[11px]"
              >
                <Upload className="w-3.5 h-3.5 text-[#ff2e56]" /> Banner
              </button>
            </div>

            <button
              type="submit"
              className="px-5 py-2 bg-[#ff2e56] hover:bg-[#ff4b72] text-white font-bold rounded-xl shadow-md"
            >
              Save Profile
            </button>
          </div>
        </form>
      )}

      {/* 2. Menu Navigation List matching Screenshot 1 Right */}
      <div className="rounded-3xl bg-[#0d0d18] border border-slate-800/80 divide-y divide-slate-800/60 overflow-hidden shadow-xl">
        
        <button
          onClick={() => navigateTo('library')}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors group"
        >
          <div className="flex items-center gap-3.5">
            <div className="text-[#ff2e56]"><BookOpen className="w-5 h-5" /></div>
            <span className="text-sm font-semibold text-white group-hover:text-[#ff2e56] transition-colors">My Library</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
        </button>

        <button
          onClick={() => navigateTo('library')}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors group"
        >
          <div className="flex items-center gap-3.5">
            <div className="text-[#ff2e56]"><Heart className="w-5 h-5" /></div>
            <span className="text-sm font-semibold text-white group-hover:text-[#ff2e56] transition-colors">Favorite Anime</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
        </button>

        <button
          onClick={() => navigateTo('games')}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors group"
        >
          <div className="flex items-center gap-3.5">
            <div className="text-[#ff2e56]"><Gamepad2 className="w-5 h-5" /></div>
            <span className="text-sm font-semibold text-white group-hover:text-[#ff2e56] transition-colors">Connected Games</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
        </button>

        <button
          onClick={() => navigateTo('settings')}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors group"
        >
          <div className="flex items-center gap-3.5">
            <div className="text-[#ff2e56]"><Settings className="w-5 h-5" /></div>
            <span className="text-sm font-semibold text-white group-hover:text-[#ff2e56] transition-colors">Settings</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
        </button>

        <button
          onClick={() => navigateTo('claire')}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors group"
        >
          <div className="flex items-center gap-3.5">
            <div className="text-[#ff2e56]"><HelpCircle className="w-5 h-5" /></div>
            <span className="text-sm font-semibold text-white group-hover:text-[#ff2e56] transition-colors">Help & Support</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
        </button>

        <button
          onClick={() => addToast({ title: 'Logged out', description: 'Session ended successfully.', type: 'info' })}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-rose-950/20 transition-colors group"
        >
          <div className="flex items-center gap-3.5">
            <div className="text-[#ff2e56]"><LogOut className="w-5 h-5" /></div>
            <span className="text-sm font-semibold text-rose-400 group-hover:text-rose-300 transition-colors">Logout</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-rose-400 transition-colors" />
        </button>

      </div>

    </div>
  );
};
