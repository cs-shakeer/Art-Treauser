import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import PinCard from './components/PinCard';
import { SkeletonGrid } from './components/PinSkeleton';
import PinDetailModal from './components/PinDetailModal';
import UploadPinModal from './components/UploadPinModal';
import BoardView from './components/BoardView';
import VideoSection from './components/VideoSection';
import AuthModal from './components/AuthModal';
import UserProfileModal from './components/UserProfileModal';
import { api, checkBackendHealth } from './services/api';
import { Sparkles, Heart, Compass, Video, FolderHeart, ShieldCheck } from 'lucide-react';

export default function App() {
  // Theme state: dark / light
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('art_treasure_theme') || 'light';
  });

  // Navigation tab: 'explore' | 'videos' | 'boards'
  const [activeTab, setActiveTab] = useState('explore');

  // Core Data States
  const [pins, setPins] = useState([]);
  const [boards, setBoards] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => api.auth.getCurrentUser());
  const [isBackendOnline, setIsBackendOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBoardFilter, setSelectedBoardFilter] = useState(null);

  // Modals & Selected Pin
  const [selectedPin, setSelectedPin] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Likes tracking
  const [likedPins, setLikedPins] = useState(() => {
    try {
      const stored = localStorage.getItem('art_treasure_likes');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Apply Theme to Document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('art_treasure_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Initial Load from Backend / Mock Data
  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);

      // Check backend health
      const isOnline = await checkBackendHealth();
      setIsBackendOnline(isOnline);

      // Fetch pins and boards
      const [pinsRes, boardsRes] = await Promise.all([
        api.pins.getAll(),
        api.boards.getAll()
      ]);

      setPins(pinsRes.data || []);
      setBoards(boardsRes.data || []);

      // Brief timer to showcase the silky neumorphic skeleton animation
      setTimeout(() => {
        setIsLoading(false);
      }, 1100);
    };

    initData();
  }, []);

  // Save Likes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('art_treasure_likes', JSON.stringify(likedPins));
    } catch (e) {
      console.error(e);
    }
  }, [likedPins]);

  // Actions
  const handleLike = (pin) => {
    setLikedPins((prev) => {
      const isLiked = Boolean(prev[pin.pinId]);
      if (isLiked) {
        const copy = { ...prev };
        delete copy[pin.pinId];
        return copy;
      } else {
        return { ...prev, [pin.pinId]: true };
      }
    });
  };

  const handleCreatePin = async (pinData) => {
    const res = await api.pins.create(pinData);
    if (res.pin) {
      setPins((prev) => [res.pin, ...prev]);
    } else {
      // Re-fetch pins
      const updated = await api.pins.getAll();
      setPins(updated.data);
    }
    return res;
  };

  const handleDeletePin = async (pinId) => {
    await api.pins.delete(pinId);
    setPins((prev) => prev.filter((p) => p.pinId !== pinId));
    if (selectedPin?.pinId === pinId) {
      setSelectedPin(null);
    }
  };

  const handleCreateBoard = async (boardData) => {
    const res = await api.boards.create(boardData);
    if (res.board) {
      setBoards((prev) => [res.board, ...prev]);
    } else {
      const updated = await api.boards.getAll();
      setBoards(updated.data);
    }
    return res;
  };

  const handleDeleteBoard = async (boardId) => {
    await api.boards.delete(boardId);
    setBoards((prev) => prev.filter((b) => b.boardId !== boardId));
    if (selectedBoardFilter?.boardId === boardId) {
      setSelectedBoardFilter(null);
    }
  };

  const handleSaveToBoard = (pin, targetBoardId) => {
    const bId = targetBoardId || boards[0]?.boardId;
    if (!bId) return;
    setPins((prev) =>
      prev.map((p) =>
        p.pinId === pin.pinId
          ? { ...p, board: boards.find((b) => b.boardId === Number(bId)) || p.board }
          : p
      )
    );
  };

  const handleLoginSuccess = async (credentials) => {
    const res = await api.auth.login(credentials);
    if (res.success && res.user) {
      setCurrentUser(res.user);
    }
    return res;
  };

  const handleRegisterSuccess = async (userData) => {
    const res = await api.auth.register(userData);
    if (res.success && res.user) {
      setCurrentUser(res.user);
    }
    return res;
  };

  const handleLogout = () => {
    api.auth.logout();
    setCurrentUser(null);
  };

  // Toggle skeleton preview for testing
  const handleToggleSkeletonDemo = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1400);
  };

  // Filter Pins based on category, search, board
  const filteredPins = useMemo(() => {
    return pins.filter((pin) => {
      // Board filter
      if (selectedBoardFilter && pin.board?.boardId !== selectedBoardFilter.boardId) {
        return false;
      }

      // Category filter
      if (selectedCategory === 'VIDEO') {
        if (pin.pinType !== 'VIDEO' && !pin.videoUrl) return false;
      } else if (selectedCategory !== 'ALL') {
        if (pin.category !== selectedCategory) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = pin.title?.toLowerCase().includes(q);
        const matchesDesc = pin.description?.toLowerCase().includes(q);
        const matchesUser = pin.user?.userName?.toLowerCase().includes(q);
        const matchesCategory = pin.category?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesUser && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [pins, selectedCategory, searchQuery, selectedBoardFilter]);

  // Video-only pins
  const videoPins = useMemo(() => {
    return pins.filter((p) => p.pinType === 'VIDEO' || Boolean(p.videoUrl));
  }, [pins]);

  // Current user's pins and boards
  const userPins = useMemo(() => {
    if (!currentUser) return [];
    return pins.filter((p) => p.user?.userId === currentUser.userId);
  }, [pins, currentUser]);

  const userBoards = useMemo(() => {
    if (!currentUser) return [];
    return boards.filter((b) => b.user?.userId === currentUser.userId);
  }, [boards, currentUser]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-color)]">
      {/* Top Neumorphic Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedBoardFilter(null);
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        theme={theme}
        toggleTheme={toggleTheme}
        currentUser={currentUser}
        isBackendOnline={isBackendOnline}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'explore' && (
          <>
            {/* Hero & Category Bar */}
            <HeroBanner
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setSelectedBoardFilter(null);
              }}
              totalCount={pins.length}
              isLoading={isLoading}
              onToggleSkeletonDemo={handleToggleSkeletonDemo}
            />

            {/* Board Filter Notification Pill (if filtering by board) */}
            {selectedBoardFilter && (
              <div className="max-w-7xl mx-auto px-2 sm:px-4 mt-3 sm:mt-4">
                <div className="neu-pressed-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl inline-flex items-center gap-2 text-xs">
                  <span className="font-semibold text-pink-500">Board Filter:</span>
                  <span className="font-bold truncate max-w-[150px] sm:max-w-none">{selectedBoardFilter.name}</span>
                  <button
                    onClick={() => setSelectedBoardFilter(null)}
                    className="ml-1 sm:ml-2 text-gray-400 hover:text-red-500 font-bold p-1"
                  >
                    ✕ Clear
                  </button>
                </div>
              </div>
            )}

            {/* Masonry Pin Gallery */}
            <div className="max-w-7xl mx-auto px-2 sm:px-4 mt-4 sm:mt-6">
              {isLoading ? (
                // SKELETON LOADING VIEW (Neomorphism)
                <SkeletonGrid count={10} />
              ) : filteredPins.length === 0 ? (
                // Empty state
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-3xl neu-flat mx-auto flex items-center justify-center text-gray-400 mb-4">
                    <Sparkles className="w-8 h-8 opacity-40" />
                  </div>
                  <h3 className="text-lg font-bold">No Art Treasures Found</h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                    No results match your filter or search query. Try choosing another category or clear the search.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('ALL');
                      setSearchQuery('');
                      setSelectedBoardFilter(null);
                    }}
                    className="neu-button neu-button-primary px-4 py-2 text-xs font-semibold mt-4"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                // Rendered Pins Grid
                <div className="pin-grid">
                  {filteredPins.map((pin) => (
                    <PinCard
                      key={pin.pinId}
                      pin={pin}
                      onSelect={(p) => setSelectedPin(p)}
                      onLike={handleLike}
                      isLiked={Boolean(likedPins[pin.pinId])}
                      onSaveToBoard={handleSaveToBoard}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Videos View */}
        {activeTab === 'videos' && (
          <VideoSection
            videoPins={videoPins}
            onSelectPin={(p) => setSelectedPin(p)}
            onLikePin={handleLike}
            likedPins={likedPins}
          />
        )}

        {/* Boards View */}
        {activeTab === 'boards' && (
          <BoardView
            boards={boards}
            pins={pins}
            currentUser={currentUser}
            onCreateBoard={handleCreateBoard}
            onDeleteBoard={handleDeleteBoard}
            onSelectBoard={(board) => {
              setSelectedBoardFilter(board);
              setActiveTab('explore');
            }}
          />
        )}
      </main>

      {/* Neumorphic Footer */}
      <footer className="mt-16 border-t border-gray-200/50 dark:border-gray-800/50 py-8 px-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="brand-font font-bold text-sm bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
              ArtTreasure
            </span>
            <span>• Soft Neomorphism 2.0 & High-Res Visual Canvas</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isBackendOnline ? 'bg-emerald-500' : 'bg-amber-400'}`} />
              {isBackendOnline ? 'Connected to Spring Boot API' : 'Standalone Visual Mode'}
            </span>
            <span>React 19 + Vite</span>
          </div>
        </div>
      </footer>

      {/* Detail Modal */}
      {selectedPin && (
        <PinDetailModal
          pin={selectedPin}
          onClose={() => setSelectedPin(null)}
          currentUser={currentUser}
          isLiked={Boolean(likedPins[selectedPin.pinId])}
          onLike={handleLike}
          onDeletePin={handleDeletePin}
          boards={boards}
          onSaveToBoard={handleSaveToBoard}
        />
      )}

      {/* Upload Pin Modal */}
      {isUploadOpen && (
        <UploadPinModal
          onClose={() => setIsUploadOpen(false)}
          currentUser={currentUser}
          boards={boards}
          onCreatePin={handleCreatePin}
          onCreateBoard={handleCreateBoard}
        />
      )}

      {/* Auth Modal */}
      {isAuthOpen && (
        <AuthModal
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}

      {/* User Profile Modal */}
      {isProfileOpen && (
        <UserProfileModal
          currentUser={currentUser}
          userPins={userPins}
          userBoards={userBoards}
          onClose={() => setIsProfileOpen(false)}
          onSelectPin={(p) => {
            setIsProfileOpen(false);
            setSelectedPin(p);
          }}
          onLikePin={handleLike}
          likedPins={likedPins}
          onSaveToBoard={handleSaveToBoard}
        />
      )}
    </div>
  );
}
