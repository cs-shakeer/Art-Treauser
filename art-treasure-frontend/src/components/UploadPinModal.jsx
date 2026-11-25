import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

const SAMPLE_PRESETS = [
  {
    label: 'Cyberpunk',
    type: 'IMAGE',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80',
    videoUrl: '',
    title: 'Neon Cybernetics: Sector 7',
    description: 'High-contrast futuristic city render bathed in ultraviolet neon.'
  },
  {
    label: 'Fluid Video',
    type: 'VIDEO',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    title: 'Iridescent Kinetic Fluid Bloom',
    description: 'Generative liquid physics simulation reacting to harmonic frequencies.'
  },
  {
    label: '3D Art',
    type: 'IMAGE',
    imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=80',
    videoUrl: '',
    title: 'Floating Crystalline Portal',
    description: 'Minimalist octane render of refraction geometry in deep space.'
  }
];

export default function UploadPinModal({
  onClose,
  currentUser,
  boards,
  onCreatePin,
  onCreateBoard
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pinType, setPinType] = useState('IMAGE');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [boardId, setBoardId] = useState(boards[0]?.boardId || '');
  const [newBoardName, setNewBoardName] = useState('');
  const [showNewBoardInput, setShowNewBoardInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const applyPreset = (preset) => {
    setTitle(preset.title);
    setDescription(preset.description);
    setPinType(preset.type);
    setImageUrl(preset.imageUrl);
    setVideoUrl(preset.videoUrl || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Please provide an art title.');
      return;
    }
    if (pinType === 'IMAGE' && !imageUrl.trim()) {
      setError('Please enter a valid image URL.');
      return;
    }
    if (pinType === 'VIDEO' && !videoUrl.trim()) {
      setError('Please enter a valid video stream/MP4 URL.');
      return;
    }

    setIsSubmitting(true);

    try {
      let finalBoardId = boardId;

      if (showNewBoardInput && newBoardName.trim()) {
        const boardRes = await onCreateBoard({
          name: newBoardName.trim(),
          description: 'Custom art board',
          user: { userId: currentUser?.userId || 1 }
        });
        if (boardRes?.board?.boardId) {
          finalBoardId = boardRes.board.boardId;
        }
      }

      await onCreatePin({
        title: title.trim(),
        description: description.trim(),
        pinType,
        imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
        videoUrl: pinType === 'VIDEO' ? videoUrl.trim() : null,
        board: { boardId: Number(finalBoardId) || 1 },
        user: { userId: currentUser?.userId || 1 },
        category: pinType === 'VIDEO' ? 'Motion Video' : 'Digital Art'
      });

      onClose();
    } catch (err) {
      console.error(err);
      setError('Failed to create pin. Please check connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="neu-flat max-w-3xl w-full bg-[var(--surface-color)] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 relative my-auto max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl neu-flat flex items-center justify-center text-indigo-500">
              <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold">Publish New Treasure</h2>
              <p className="text-[11px] sm:text-xs text-gray-500">Upload your visual art or kinetic loop video</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="neu-button w-8 h-8 sm:w-9 sm:h-9 rounded-full text-gray-400 hover:text-red-500 p-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Sample Presets */}
        <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl neu-pressed-sm flex items-center gap-2 flex-wrap">
          <span className="text-[11px] sm:text-xs font-semibold text-gray-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Samples:
          </span>
          {SAMPLE_PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(p)}
              className="neu-button px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] font-medium text-indigo-600 dark:text-indigo-400"
            >
              {p.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="mt-3 p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 sm:mt-6 space-y-4 sm:space-y-5">
          {/* Media Type Toggle */}
          <div>
            <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
              Art Format
            </label>
            <div className="neu-pressed-sm p-1 rounded-xl sm:rounded-2xl flex max-w-xs gap-1.5">
              <button
                type="button"
                onClick={() => setPinType('IMAGE')}
                className={`flex-1 neu-button py-1.5 sm:py-2 text-xs font-bold rounded-lg sm:rounded-xl flex items-center justify-center gap-1.5 ${
                  pinType === 'IMAGE' ? 'neu-button-primary' : ''
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Image Pin</span>
              </button>
              <button
                type="button"
                onClick={() => setPinType('VIDEO')}
                className={`flex-1 neu-button py-1.5 sm:py-2 text-xs font-bold rounded-lg sm:rounded-xl flex items-center justify-center gap-1.5 ${
                  pinType === 'VIDEO' ? 'neu-button-primary' : ''
                }`}
              >
                <VideoIcon className="w-3.5 h-3.5" />
                <span>Video Pin</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Form Inputs */}
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Neon Horizon 2099"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="neu-input"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">
                  Image Thumbnail URL *
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="neu-input"
                  required
                />
              </div>

              {pinType === 'VIDEO' && (
                <div>
                  <label className="block text-xs font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                    Video Stream / MP4 URL *
                  </label>
                  <input
                    type="url"
                    placeholder="https://.../video.mp4"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="neu-input"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell the story behind this visual creation..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="neu-input resize-none"
                />
              </div>

              {/* Board Selector */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-500" />
                    Target Board
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowNewBoardInput(!showNewBoardInput)}
                    className="text-[11px] text-indigo-500 font-semibold hover:underline"
                  >
                    {showNewBoardInput ? 'Select Existing' : '+ New Board'}
                  </button>
                </div>

                {showNewBoardInput ? (
                  <input
                    type="text"
                    placeholder="Enter new board name..."
                    value={newBoardName}
                    onChange={(e) => setNewBoardName(e.target.value)}
                    className="neu-input"
                  />
                ) : (
                  <select
                    value={boardId}
                    onChange={(e) => setBoardId(e.target.value)}
                    className="neu-input cursor-pointer"
                  >
                    {boards.map((b) => (
                      <option key={b.boardId} value={b.boardId}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* Live Preview Card */}
            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                Live Neumorphic Preview
              </label>
              <div className="neu-flat p-3 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col gap-2.5 min-h-[220px]">
                <div className="neu-pressed-sm rounded-lg sm:rounded-xl overflow-hidden bg-black/10 min-h-[160px] flex items-center justify-center relative">
                  {pinType === 'VIDEO' && videoUrl ? (
                    <video
                      src={videoUrl}
                      poster={imageUrl}
                      controls
                      className="w-full h-auto max-h-[200px] object-cover rounded-lg sm:rounded-xl"
                    />
                  ) : imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-auto max-h-[200px] object-cover rounded-lg sm:rounded-xl"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="text-center p-4 text-gray-400">
                      <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1.5 opacity-50" />
                      <p className="text-[11px] sm:text-xs">Paste URL to see live preview</p>
                    </div>
                  )}

                  {pinType === 'VIDEO' && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500 text-white">
                      VIDEO
                    </div>
                  )}
                </div>

                <div className="px-1">
                  <h4 className="font-bold text-xs sm:text-sm truncate">
                    {title || 'Untitled Artwork'}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-500 line-clamp-2 mt-0.5">
                    {description || 'Art preview description will display here.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="neu-button px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="neu-button neu-button-primary px-5 py-2 text-xs sm:text-sm font-bold flex items-center gap-1.5 rounded-xl"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Publish Pin</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
