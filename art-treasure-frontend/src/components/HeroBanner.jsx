import React from 'react';
import { Sparkles, Video, Flame, Palette, Box, Trees, RefreshCw } from 'lucide-react';

const CATEGORIES = [
  { id: 'ALL', label: 'All Treasures', icon: Sparkles },
  { id: 'VIDEO', label: 'Motion Videos', icon: Video },
  { id: 'Digital Art', label: 'Digital Art', icon: Palette },
  { id: 'Cyberpunk', label: 'Cyberpunk', icon: Flame },
  { id: '3D Render', label: '3D Renders', icon: Box },
  { id: 'Nature Art', label: 'Nature & Organic', icon: Trees },
];

export default function HeroBanner({
  selectedCategory,
  onSelectCategory,
  totalCount,
  isLoading,
  onToggleSkeletonDemo
}) {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 pt-4 sm:pt-6 pb-2">
      {/* Neumorphic Hero Box */}
      <div className="neu-flat p-4 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute -right-16 -top-16 w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-gradient-to-br from-indigo-500/15 to-pink-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-gradient-to-tr from-cyan-500/15 to-purple-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold neu-pressed-sm text-indigo-500 mb-2 sm:mb-3">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin" />
              <span>Neomorphism 2.0 & High-Res Visual Canvas</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Curate, Discover & Stream{' '}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent block sm:inline">
                Art Treasures
              </span>
            </h1>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-300 leading-relaxed max-w-xl">
              Immerse yourself in sensory visual masterpieces, raytraced cyber-realms, and kinetic loop videos designed with soft tactile Neomorphism.
            </p>
          </div>

          {/* Skeleton Demo Button */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-gray-200/50 dark:border-gray-800/50">
            <button
              onClick={onToggleSkeletonDemo}
              className="neu-button px-3.5 py-2 text-xs font-bold rounded-xl sm:rounded-2xl flex items-center gap-1.5 shadow-sm text-gray-600 dark:text-gray-300 hover:text-indigo-500"
              title="Test skeleton loading animation"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-indigo-500' : ''}`} />
              <span>{isLoading ? 'Simulating Skeleton...' : 'Test Skeleton Loading'}</span>
            </button>
            <span className="text-[10px] sm:text-[11px] text-gray-400 font-medium">
              {totalCount} artworks available
            </span>
          </div>
        </div>

        {/* Category Pills Bar (Horizontal Scroll on Mobile) */}
        <div className="mt-6 pt-4 sm:pt-6 border-t border-gray-200/60 dark:border-gray-800/60 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`neu-pill whitespace-nowrap text-xs font-semibold shrink-0 ${
                  isSelected
                    ? 'neu-button-primary'
                    : 'neu-button text-gray-600 dark:text-gray-300 hover:text-indigo-500'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-indigo-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
