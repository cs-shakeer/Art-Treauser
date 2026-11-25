import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Share2, 
  Trash2, 
  FolderHeart, 
  Calendar, 
  UserCheck, 
  Check, 
  Volume2, 
  VolumeX 
} from 'lucide-react';

export default function PinDetailModal({
  pin,
  onClose,
  currentUser,
  isLiked,
  onLike,
  onDeletePin,
  boards,
  onSaveToBoard
}) {
  const [copied, setCopied] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  if (!pin) return null;

  const isVideo = pin.pinType === 'VIDEO' || Boolean(pin.videoUrl);
  const isOwner = currentUser && pin.user && currentUser.userId === pin.user.userId;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToSelectedBoard = () => {
    if (onSaveToBoard) {
      onSaveToBoard(pin, selectedBoardId);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="neu-flat max-w-4xl w-full bg-[var(--surface-color)] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 relative my-auto max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="neu-button absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full z-20 text-gray-400 hover:text-red-500"
          title="Close"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start pt-2">
          {/* Media Player / Image */}
          <div className="neu-pressed rounded-xl sm:rounded-2xl overflow-hidden bg-black/10 relative flex items-center justify-center min-h-[220px] sm:min-h-[300px]">
            {isVideo ? (
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                <video
                  src={pin.videoUrl}
                  poster={pin.imageUrl}
                  controls
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  className="w-full h-auto max-h-[460px] object-contain rounded-xl sm:rounded-2xl mx-auto"
                />
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute bottom-3 right-3 neu-button w-8 h-8 rounded-full bg-black/60 text-white border-none z-10 p-0"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            ) : (
              <img
                src={pin.imageUrl}
                alt={pin.title}
                className="w-full h-auto max-h-[480px] object-contain rounded-xl sm:rounded-2xl mx-auto"
              />
            )}
          </div>

          {/* Details & Actions */}
          <div className="flex flex-col justify-between h-full space-y-4 sm:space-y-6">
            <div>
              {/* Type and Category Badge */}
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="neu-pressed-sm px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold text-indigo-500 uppercase tracking-wider">
                  {isVideo ? 'Motion Video' : 'Visual Art'}
                </span>
                {pin.category && (
                  <span className="neu-flat-sm px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium text-gray-500">
                    {pin.category}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight mb-2 sm:mb-3 leading-snug">
                {pin.title}
              </h1>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                {pin.description || 'No description provided for this artwork.'}
              </p>

              {/* Creator Card */}
              <div className="neu-flat p-3 sm:p-4 rounded-xl sm:rounded-2xl flex items-center justify-between mb-4 sm:mb-6 gap-2">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <img
                    src={pin.user?.profileImg || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt={pin.user?.userName}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover neu-pressed-sm border-2 border-indigo-400 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm flex items-center gap-1 truncate">
                      {pin.user?.fullName || pin.user?.userName || 'Anonymous Artist'}
                      {pin.user?.isProfessional && (
                        <UserCheck className="w-3.5 h-3.5 text-indigo-500 shrink-0" title="Verified Professional" />
                      )}
                    </h4>
                    <span className="text-[11px] text-gray-400 truncate block">@{pin.user?.userName || 'artist'}</span>
                  </div>
                </div>

                <div className="text-[11px] sm:text-xs text-gray-400 flex items-center gap-1 shrink-0">
                  <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>
                    {pin.createdAt ? new Date(pin.createdAt).toLocaleDateString() : 'Recent'}
                  </span>
                </div>
              </div>

              {/* Save to Board Section */}
              <div className="neu-pressed p-3 sm:p-4 rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
                <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
                  <FolderHeart className="w-3.5 h-3.5 text-pink-500" />
                  Save to Board
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <select
                    value={selectedBoardId}
                    onChange={(e) => setSelectedBoardId(e.target.value)}
                    className="neu-input py-2 text-xs flex-1 cursor-pointer"
                  >
                    <option value="">Select a board...</option>
                    {boards.map((b) => (
                      <option key={b.boardId} value={b.boardId}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleSaveToSelectedBoard}
                    disabled={!selectedBoardId}
                    className="neu-button neu-button-primary px-4 py-2 text-xs font-bold whitespace-nowrap disabled:opacity-50"
                  >
                    {savedSuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Saved!
                      </>
                    ) : (
                      'Save Pin'
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-800 gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                {/* Like Button */}
                <button
                  onClick={() => onLike(pin)}
                  className={`neu-button px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl ${
                    isLiked ? 'text-red-500 active' : ''
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{(pin.likes || 0) + (isLiked ? 1 : 0)} Likes</span>
                </button>

                {/* Share Link */}
                <button
                  onClick={handleCopyLink}
                  className="neu-button px-3 py-2 text-xs sm:text-sm rounded-xl"
                  title="Share link"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                  <span className="text-xs font-semibold">{copied ? 'Copied' : 'Share'}</span>
                </button>
              </div>

              {/* Owner Delete button */}
              {isOwner && (
                <button
                  onClick={() => onDeletePin(pin.pinId)}
                  className="neu-button px-3 py-2 text-xs sm:text-sm rounded-xl text-red-500 hover:bg-red-500 hover:text-white"
                  title="Delete Pin"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-xs font-semibold">Delete</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
