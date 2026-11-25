import React, { useState, useRef } from 'react';
import { Heart, Play, Image as ImageIcon, Bookmark, Check, ExternalLink } from 'lucide-react';

export default function PinCard({ pin, onSelect, onLike, isLiked, onSaveToBoard }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const videoRef = useRef(null);

  const isVideo = pin.pinType === 'VIDEO' || Boolean(pin.videoUrl);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (isVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleQuickSave = (e) => {
    e.stopPropagation();
    setSavedSuccess(true);
    if (onSaveToBoard) onSaveToBoard(pin);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="pin-item">
      <div
        className="neu-flat group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-300 hover:-translate-y-1 p-2.5 sm:p-3.5"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(pin)}
      >
        {/* Media Container */}
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-black/10 neu-pressed-sm w-full">
          {/* Skeleton placeholder while loading image */}
          {!imageLoaded && (
            <div className="w-full h-48 sm:h-64 neu-skeleton" />
          )}

          {isVideo ? (
            <div className="relative w-full">
              <video
                ref={videoRef}
                src={pin.videoUrl}
                poster={pin.imageUrl}
                muted
                loop
                playsInline
                className="w-full h-auto object-cover block rounded-xl sm:rounded-2xl"
                onLoadedData={() => setImageLoaded(true)}
              />
              {/* Video Badge */}
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold text-white bg-black/70 backdrop-blur-md shadow-md z-10">
                <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white" />
                <span>VIDEO</span>
              </div>
            </div>
          ) : (
            <div className="relative w-full">
              <img
                src={pin.imageUrl}
                alt={pin.title}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-auto object-cover block rounded-xl sm:rounded-2xl transition-all duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0 h-48'
                } group-hover:scale-105`}
              />
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold text-white bg-black/50 backdrop-blur-md z-10">
                <ImageIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>ART</span>
              </div>
            </div>
          )}

          {/* Category Tag on bottom right */}
          {pin.category && (
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-semibold text-white/95 bg-indigo-950/70 backdrop-blur-md border border-white/20 z-10">
              {pin.category}
            </div>
          )}

          {/* Hover Overlay for Desktop */}
          <div
            className={`hidden md:flex absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/35 p-3 sm:p-4 flex-col justify-between transition-opacity duration-300 z-20 ${
              isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Top row: Quick Save button */}
            <div className="flex justify-end">
              <button
                onClick={handleQuickSave}
                className="neu-button neu-button-primary px-3 py-1.5 text-xs font-bold rounded-full flex items-center gap-1 shadow-lg"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </>
                )}
              </button>
            </div>

            {/* Bottom row */}
            <div className="flex items-center justify-between text-white">
              <span className="text-[11px] font-medium bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1">
                <ExternalLink className="w-3 h-3" /> View
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLike(pin);
                }}
                className={`p-2 rounded-full transition-transform active:scale-125 ${
                  isLiked ? 'bg-red-500 text-white' : 'bg-black/50 text-white hover:bg-black/70'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Card Metadata (Always visible on all screens) */}
        <div className="mt-2.5 px-0.5">
          <h3 className="font-bold text-xs sm:text-sm leading-snug line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {pin.title}
          </h3>

          <div className="mt-2 flex items-center justify-between gap-1">
            {/* Creator info */}
            <div className="flex items-center gap-1.5 min-w-0">
              <img
                src={pin.user?.profileImg || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                alt={pin.user?.userName || 'artist'}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border border-white/50 shrink-0"
              />
              <span className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium truncate">
                {pin.user?.userName || 'creator'}
              </span>
            </div>

            {/* Like button for mobile/touch */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike(pin);
              }}
              className="flex items-center gap-1 text-[11px] sm:text-xs text-gray-400 hover:text-red-500 font-medium p-1 shrink-0"
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'text-red-500 fill-red-500' : ''}`} />
              <span>{(pin.likes || 0) + (isLiked ? 1 : 0)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
