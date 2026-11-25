import React from 'react';

export default function PinSkeleton({ height = 260 }) {
  return (
    <div className="pin-item">
      <div className="neu-flat p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl flex flex-col gap-2.5 sm:gap-3 w-full">
        {/* Neumorphic Media Placeholder */}
        <div 
          className="neu-skeleton w-full relative overflow-hidden rounded-xl sm:rounded-2xl"
          style={{ height: `${height}px` }}
        >
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-12 sm:w-16 h-5 sm:h-6 rounded-full bg-white/20" />
        </div>

        {/* Content Placeholder */}
        <div className="flex flex-col gap-2 pt-1 px-1">
          {/* Title bar shimmer */}
          <div className="neu-skeleton h-4 sm:h-5 w-4/5 rounded-md" />
          <div className="neu-skeleton h-3 sm:h-3.5 w-3/5 rounded-md" />

          {/* User Row Shimmer */}
          <div className="flex items-center justify-between pt-1.5">
            <div className="flex items-center gap-2">
              <div className="neu-skeleton w-6 h-6 sm:w-7 sm:h-7 rounded-full shrink-0" />
              <div className="neu-skeleton h-2.5 sm:h-3 w-16 sm:w-20 rounded" />
            </div>
            <div className="neu-skeleton w-10 sm:w-12 h-5 sm:h-6 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }) {
  const heights = [220, 310, 200, 340, 260, 280, 230, 320, 240, 290];

  return (
    <div className="pin-grid">
      {Array.from({ length: count }).map((_, i) => (
        <PinSkeleton key={i} height={heights[i % heights.length]} />
      ))}
    </div>
  );
}
