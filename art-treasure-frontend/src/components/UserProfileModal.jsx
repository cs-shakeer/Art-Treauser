import React, { useState } from 'react';
import { X, UserCheck, Mail, Phone, Sparkles, FolderHeart } from 'lucide-react';
import PinCard from './PinCard';

export default function UserProfileModal({
  currentUser,
  userPins,
  userBoards,
  onClose,
  onSelectPin,
  onLikePin,
  likedPins,
  onSaveToBoard
}) {
  const [activeTab, setActiveTab] = useState('pins');

  if (!currentUser) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="neu-flat max-w-4xl w-full bg-[var(--surface-color)] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 relative my-auto max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="neu-button absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-9 sm:h-9 rounded-full text-gray-400 hover:text-red-500 p-0"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 pb-5 sm:pb-6 border-b border-gray-200 dark:border-gray-800">
          <div className="neu-flat p-1.5 sm:p-2 rounded-full shrink-0">
            <img
              src={currentUser.profileImg || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt={currentUser.userName}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover neu-pressed-sm border-2 border-indigo-400"
            />
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1.5 sm:space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl sm:text-2xl font-bold">{currentUser.fullName || currentUser.userName}</h2>
              {currentUser.isProfessional && (
                <span className="neu-pressed-sm px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold text-indigo-500 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" /> Professional
                </span>
              )}
            </div>

            <p className="text-xs text-gray-400">@{currentUser.userName}</p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
              {currentUser.bio || 'Digital curator, creating inspiring visual artworks and kinetic loops.'}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 pt-1 text-[11px] sm:text-xs text-gray-500">
              {currentUser.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-indigo-400" /> {currentUser.email}
                </span>
              )}
              {currentUser.mobile && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-indigo-400" /> {currentUser.mobile}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 my-5 sm:my-6 text-center">
          <div className="neu-pressed p-2.5 sm:p-3 rounded-xl sm:rounded-2xl">
            <span className="block text-lg sm:text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {userPins.length}
            </span>
            <span className="text-[10px] sm:text-xs text-gray-400 font-medium">Uploaded Pins</span>
          </div>

          <div className="neu-pressed p-2.5 sm:p-3 rounded-xl sm:rounded-2xl">
            <span className="block text-lg sm:text-xl font-extrabold text-pink-600 dark:text-pink-400">
              {userBoards.length}
            </span>
            <span className="text-[10px] sm:text-xs text-gray-400 font-medium">Boards</span>
          </div>

          <div className="neu-pressed p-2.5 sm:p-3 rounded-xl sm:rounded-2xl">
            <span className="block text-lg sm:text-xl font-extrabold text-cyan-600 dark:text-cyan-400">
              1.4k
            </span>
            <span className="text-[10px] sm:text-xs text-gray-400 font-medium">Followers</span>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <div className="neu-pressed-sm p-1 rounded-xl sm:rounded-2xl flex w-full max-w-xs gap-1.5">
            <button
              onClick={() => setActiveTab('pins')}
              className={`flex-1 neu-button py-1.5 sm:py-2 text-xs font-bold rounded-lg sm:rounded-xl flex items-center justify-center gap-1.5 ${
                activeTab === 'pins' ? 'neu-button-primary' : ''
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pins ({userPins.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('boards')}
              className={`flex-1 neu-button py-1.5 sm:py-2 text-xs font-bold rounded-lg sm:rounded-xl flex items-center justify-center gap-1.5 ${
                activeTab === 'boards' ? 'neu-button-primary' : ''
              }`}
            >
              <FolderHeart className="w-3.5 h-3.5" />
              <span>Boards ({userBoards.length})</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'pins' ? (
          userPins.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs sm:text-sm">No pins uploaded yet.</p>
            </div>
          ) : (
            <div className="pin-grid">
              {userPins.map((pin) => (
                <PinCard
                  key={pin.pinId}
                  pin={pin}
                  onSelect={onSelectPin}
                  onLike={onLikePin}
                  isLiked={Boolean(likedPins[pin.pinId])}
                  onSaveToBoard={onSaveToBoard}
                />
              ))}
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {userBoards.map((b) => (
              <div key={b.boardId} className="neu-flat p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                <h4 className="font-bold text-xs sm:text-sm">{b.name}</h4>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-1 line-clamp-2">{b.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
