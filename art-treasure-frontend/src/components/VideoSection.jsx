import React, { useState } from 'react';
import { Film, Play, Volume2, VolumeX, Sparkles, Eye, Heart } from 'lucide-react';

export default function VideoSection({ videoPins, onSelectPin, onLikePin, likedPins }) {
  const [featuredPin, setFeaturedPin] = useState(videoPins[0] || null);
  const [isMuted, setIsMuted] = useState(true);

  if (!videoPins || videoPins.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center text-gray-400">
        <Film className="w-12 h-12 mx-auto mb-3 opacity-40" />
        <h3 className="text-lg font-bold">No Motion Videos Found</h3>
        <p className="text-xs text-gray-500 mt-1">Check back later or upload your own kinetic loop video.</p>
      </div>
    );
  }

  const currentFeatured = featuredPin || videoPins[0];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
      {/* Title */}
      <div className="flex items-center justify-between mb-6 sm:mb-8 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Film className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              Motion & Kinetic Video Vault
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            High-definition animated loops, procedural 3D simulations, and generative motion art
          </p>
        </div>
      </div>

      {/* Featured Video Cinema Box (Neumorphic) */}
      {currentFeatured && (
        <div className="neu-flat p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl mb-8 sm:mb-10 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Video Player Column */}
            <div className="lg:col-span-7 xl:col-span-8 neu-pressed rounded-xl sm:rounded-2xl overflow-hidden bg-black relative aspect-video flex items-center justify-center w-full">
              <video
                key={currentFeatured.pinId}
                src={currentFeatured.videoUrl}
                poster={currentFeatured.imageUrl}
                controls
                autoPlay
                muted={isMuted}
                loop
                playsInline
                className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
              />
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-3 right-3 neu-button w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 text-white border-none z-10 p-0"
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Featured Details Column */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between h-full space-y-4">
              <div>
                <span className="neu-pressed-sm px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold text-cyan-500 uppercase tracking-widest inline-flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> Spotlight Motion
                </span>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mt-2.5 leading-snug">
                  {currentFeatured.title}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 mt-2 leading-relaxed">
                  {currentFeatured.description}
                </p>

                {/* Artist Pill */}
                <div className="mt-4 flex items-center gap-2.5">
                  <img
                    src={currentFeatured.user?.profileImg || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'}
                    alt="creator"
                    className="w-9 h-9 rounded-full object-cover neu-pressed-sm border border-white/50"
                  />
                  <div>
                    <h5 className="font-bold text-xs">{currentFeatured.user?.fullName || 'Motion Artist'}</h5>
                    <span className="text-[11px] text-gray-400">@{currentFeatured.user?.userName || 'creator'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={() => onSelectPin(currentFeatured)}
                  className="neu-button neu-button-primary px-4 py-2 text-xs font-bold rounded-xl flex-1 flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" /> View Details
                </button>
                <button
                  onClick={() => onLikePin(currentFeatured)}
                  className={`neu-button px-3.5 py-2 text-xs font-bold rounded-xl ${
                    likedPins[currentFeatured.pinId] ? 'text-red-500 active' : ''
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${likedPins[currentFeatured.pinId] ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Motion Gallery Grid */}
      <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center gap-2">
        <span>More Kinetic Explorations</span>
        <span className="text-xs font-medium text-gray-400">({videoPins.length} clips)</span>
      </h3>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {videoPins.map((pin) => (
          <div
            key={pin.pinId}
            onClick={() => setFeaturedPin(pin)}
            className={`neu-flat p-2.5 sm:p-3 rounded-2xl cursor-pointer hover:-translate-y-1 transition-all ${
              currentFeatured?.pinId === pin.pinId ? 'ring-2 ring-cyan-500' : ''
            }`}
          >
            <div className="relative rounded-xl overflow-hidden aspect-video bg-black/10 neu-pressed-sm mb-2.5">
              <img
                src={pin.imageUrl}
                alt={pin.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-cyan-500/80 backdrop-blur-md text-white flex items-center justify-center shadow-md">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </div>
              </div>
            </div>

            <h4 className="font-bold text-xs truncate">{pin.title}</h4>
            <span className="text-[10px] sm:text-[11px] text-gray-400 block truncate">
              @{pin.user?.userName || 'creator'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
