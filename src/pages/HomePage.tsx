import React from 'react';
import { useApp } from '../context/AppContext';
import { BleachHeroBanner } from '../components/home/BleachHeroBanner';
import { TrendingNowSection } from '../components/home/TrendingNowSection';
import { ContinueWatchingSection } from '../components/home/ContinueWatchingSection';
import { ClaireRecommendsSection } from '../components/home/ClaireRecommendsSection';
import { RecentlyUpdatedSection } from '../components/home/RecentlyUpdatedSection';
import { HomeWatchParties } from '../components/home/HomeWatchParties';

export const HomePage: React.FC = () => {
  const { animes } = useApp();

  return (
    <div className="animate-fade-in pb-32 space-y-4 font-sans">
      
      {/* 1. Hero Banner (BLEACH: THOUSAND-YEAR BLOOD WAR) matching Screenshot 1:1 */}
      <BleachHeroBanner />

      {/* 2. Section 1: | Trending Now matching Screenshot 1:1 */}
      <TrendingNowSection animes={animes} />

      {/* 3. Section 2: | Continue Watching matching Screenshot 1:1 */}
      <ContinueWatchingSection />

      {/* 4. Section 3: Claire Recommends For You matching Screenshot 1:1 */}
      <ClaireRecommendsSection animes={animes} />

      {/* 5. Section 4: | Recently Updated matching Screenshot 1:1 */}
      <RecentlyUpdatedSection animes={animes} />

      {/* 6. Section 5: Watch Party (at the bottom as requested) */}
      <HomeWatchParties />
      
    </div>
  );
};
