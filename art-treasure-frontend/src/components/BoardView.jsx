import React, { useState } from 'react';
import { FolderHeart, Plus, Trash2, Layers } from 'lucide-react';

export default function BoardView({
  boards,
  pins,
  currentUser,
  onCreateBoard,
  onDeleteBoard,
  onSelectBoard
}) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [boardDesc, setBoardDesc] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!boardName.trim()) return;

    await onCreateBoard({
      name: boardName.trim(),
      description: boardDesc.trim(),
      user: { userId: currentUser?.userId || 1 }
    });

    setBoardName('');
    setBoardDesc('');
    setShowCreateModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FolderHeart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">Curated Boards</h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Organize art collections, themes, and aesthetic moodboards
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="neu-button neu-button-primary px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-xl sm:rounded-2xl flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Board</span>
        </button>
      </div>

      {/* Boards Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {boards.map((board) => {
          const matchingPins = pins.filter((p) => p.board?.boardId === board.boardId);
          const coverImg = matchingPins[0]?.imageUrl || board.coverImage || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80';
          const isOwner = currentUser && board.user && currentUser.userId === board.user.userId;

          return (
            <div
              key={board.boardId}
              onClick={() => onSelectBoard(board)}
              className="neu-flat group p-3 sm:p-4 rounded-2xl sm:rounded-3xl cursor-pointer hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Board Cover */}
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-black/5 neu-pressed-sm aspect-[4/3] mb-3">
                  <img
                    src={coverImg}
                    alt={board.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-black/60 backdrop-blur-md text-white flex items-center gap-1">
                    <Layers className="w-3 h-3 text-pink-400" />
                    <span>{matchingPins.length} pins</span>
                  </div>
                </div>

                {/* Board Details */}
                <h3 className="font-bold text-sm sm:text-base line-clamp-1 group-hover:text-pink-600 transition-colors">
                  {board.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                  {board.description || 'Custom collection of visual arts.'}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-3 pt-2.5 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-[11px] sm:text-xs text-gray-400">
                <span className="truncate max-w-[120px]">By @{board.user?.userName || 'creator'}</span>

                {isOwner && onDeleteBoard && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteBoard(board.boardId);
                    }}
                    className="p-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                    title="Delete Board"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Board Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="neu-flat max-w-md w-full bg-[var(--surface-color)] rounded-2xl sm:rounded-3xl p-5 sm:p-7 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 sm:gap-3 mb-5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl neu-flat flex items-center justify-center text-pink-500">
                <FolderHeart className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold">Create Collection Board</h3>
                <p className="text-[11px] sm:text-xs text-gray-500">Group pins by aesthetic or theme</p>
              </div>
            </div>

            <form onSubmit={handleCreate} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">
                  Board Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Neon Cyberpunk Architecture"
                  value={boardName}
                  onChange={(e) => setBoardName(e.target.value)}
                  className="neu-input"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="What inspirations live in this board?"
                  value={boardDesc}
                  onChange={(e) => setBoardDesc(e.target.value)}
                  className="neu-input resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="neu-button px-4 py-2 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="neu-button neu-button-primary px-5 py-2 text-xs font-bold rounded-xl"
                >
                  Create Board
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
