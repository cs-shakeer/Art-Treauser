import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  PlusCircle, 
  Compass, 
  FolderHeart, 
  Video, 
  Sun, 
  Moon, 
  User, 
  LogOut,
  X
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  theme,
  toggleTheme,
  currentUser,
  isBackendOnline,
  onOpenUpload,
  onOpenAuth,
  onOpenProfile,
  onLogout
}) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 mx-2 sm:mx-4 mt-2 sm:mt-4 px-3 sm:px-6 py-3 sm:py-4 neu-flat flex flex-col gap-3">
      {/* Main Top Row */}
      <div className="flex items-center justify-between gap-2 sm:gap-4 w-full">
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group shrink-0"
          onClick={() => setActiveTab('explore')}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl neu-flat flex items-center justify-center text-indigo-500 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
          </div>
          <div>
            <span className="brand-font text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent block">
              ArtTreasure
            </span>
            <span className="hidden md:block text-[11px] text-gray-400 font-medium tracking-wider uppercase">
              Visual & Motion Sanctuary
            </span>
          </div>
        </div>

        {/* Desktop / Tablet Search Bar */}
        <div className="hidden sm:flex flex-1 max-w-md relative mx-2">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search arts, videos, cyber, 3d, concept..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="neu-input pl-10 pr-8 py-2 text-xs sm:text-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 p-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* Right Navigation & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Mobile Search Toggle Button */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="sm:hidden neu-button w-9 h-9 p-0 rounded-xl"
            title="Toggle search"
          >
            {mobileSearchOpen ? <X className="w-4 h-4 text-red-500" /> : <Search className="w-4 h-4 text-gray-500" />}
          </button>

          {/* Navigation Links for Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setActiveTab('explore')}
              className={`neu-button px-3.5 py-2 text-xs font-semibold ${activeTab === 'explore' ? 'active' : ''}`}
            >
              <Compass className="w-4 h-4 text-indigo-500" />
              <span>Explore</span>
            </button>

            <button
              onClick={() => setActiveTab('videos')}
              className={`neu-button px-3.5 py-2 text-xs font-semibold ${activeTab === 'videos' ? 'active' : ''}`}
            >
              <Video className="w-4 h-4 text-cyan-500" />
              <span>Videos</span>
            </button>

            <button
              onClick={() => setActiveTab('boards')}
              className={`neu-button px-3.5 py-2 text-xs font-semibold ${activeTab === 'boards' ? 'active' : ''}`}
            >
              <FolderHeart className="w-4 h-4 text-pink-500" />
              <span>Boards</span>
            </button>
          </div>

          {/* Create Pin Button */}
          <button
            onClick={onOpenUpload}
            className="neu-button neu-button-primary px-3 sm:px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden xs:inline sm:inline">Create</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="neu-button w-9 h-9 sm:w-10 sm:h-10 p-0 rounded-xl"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-indigo-600" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Status Indicator */}
          <div 
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold neu-pressed-sm"
            title={isBackendOnline ? 'Spring Boot API Online' : 'Mock/Offline Visual Mode'}
          >
            <span className={`w-2 h-2 rounded-full ${isBackendOnline ? 'bg-emerald-500 animate-ping' : 'bg-amber-400'}`} />
            <span className={isBackendOnline ? 'text-emerald-500' : 'text-amber-500'}>
              {isBackendOnline ? 'Live API' : 'Demo Mode'}
            </span>
          </div>

          {/* User Account / Profile */}
          {currentUser ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenProfile}
                className="neu-button p-1 sm:pl-2 sm:pr-3 sm:py-1.5 text-xs flex items-center gap-2 rounded-xl"
                title="View Profile"
              >
                <img
                  src={currentUser.profileImg || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                  alt={currentUser.userName}
                  className="w-7 h-7 rounded-full object-cover neu-pressed-sm border border-white/40"
                />
                <span className="font-semibold hidden md:inline max-w-[80px] truncate">
                  {currentUser.userName}
                </span>
              </button>
              <button
                onClick={onLogout}
                className="neu-button w-8 h-8 sm:w-9 sm:h-9 p-0 text-red-500 rounded-xl"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="neu-button px-3 py-1.5 text-xs text-indigo-600 font-bold rounded-xl"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Search Row (Expands when clicked on mobile) */}
      {mobileSearchOpen && (
        <div className="sm:hidden w-full relative pt-1 pb-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search arts, videos, 3d..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="neu-input pl-10 pr-8 py-2 text-xs w-full"
            autoFocus
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 p-1"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {/* Mobile Bottom Tabs Bar (visible on screens < lg) */}
      <div className="lg:hidden flex items-center justify-around gap-2 pt-2 border-t border-gray-200/50 dark:border-gray-800/50 w-full">
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex-1 neu-button py-1.5 text-xs font-semibold ${activeTab === 'explore' ? 'active text-indigo-500' : 'text-gray-500'}`}
        >
          <Compass className="w-3.5 h-3.5 text-indigo-500" />
          <span>Explore</span>
        </button>

        <button
          onClick={() => setActiveTab('videos')}
          className={`flex-1 neu-button py-1.5 text-xs font-semibold ${activeTab === 'videos' ? 'active text-cyan-500' : 'text-gray-500'}`}
        >
          <Video className="w-3.5 h-3.5 text-cyan-500" />
          <span>Videos</span>
        </button>

        <button
          onClick={() => setActiveTab('boards')}
          className={`flex-1 neu-button py-1.5 text-xs font-semibold ${activeTab === 'boards' ? 'active text-pink-500' : 'text-gray-500'}`}
        >
          <FolderHeart className="w-3.5 h-3.5 text-pink-500" />
          <span>Boards</span>
        </button>
      </div>
    </header>
  );
}
