import React from 'react';
import { useApp, PageRoute } from '../../context/AppContext';
import { 
  Home, 
  Zap, 
  Sparkles, 
  PlusSquare, 
  BookOpen, 
  User 
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentPage, navigateTo } = useApp();

  const navTabs: { page: PageRoute; label: string; icon: React.ReactNode }[] = [
    { page: 'home', label: 'Home', icon: <Home className="w-5 h-5 pointer-events-none" /> },
    { page: 'pulse', label: 'Pulse', icon: <Zap className="w-5 h-5 pointer-events-none" /> },
    { page: 'claire', label: 'Claire', icon: <Sparkles className="w-5 h-5 pointer-events-none" /> },
    { page: 'studio', label: 'Studio', icon: <PlusSquare className="w-5 h-5 pointer-events-none" /> },
    { page: 'library', label: 'Library', icon: <BookOpen className="w-5 h-5 pointer-events-none" /> },
    { page: 'profile', label: 'Profile', icon: <User className="w-5 h-5 pointer-events-none" /> },
  ];

  const handleTabClick = (page: PageRoute) => {
    navigateTo(page);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#090912]/95 backdrop-blur-2xl border-t border-slate-800/80 transition-all pointer-events-auto">
      <div className="max-w-md md:max-w-xl mx-auto px-3 sm:px-4 py-2 flex items-center justify-between">
        {navTabs.map((tab) => {
          const isActive = currentPage === tab.page;
          return (
            <button
              key={tab.page}
              type="button"
              onClick={() => handleTabClick(tab.page)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer select-none active:scale-90 ${
                isActive
                  ? 'text-[#ff2e56] font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`transition-transform duration-200 pointer-events-none ${isActive ? 'scale-110' : ''}`}>
                {tab.icon}
              </div>
              <span className="text-[10px] font-medium mt-1 tracking-tight pointer-events-none">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
