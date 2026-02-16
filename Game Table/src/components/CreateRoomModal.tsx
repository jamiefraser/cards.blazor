import { useState } from 'react';
import { X } from 'lucide-react';
import { GameType } from './GameLobby';

interface CreateRoomModalProps {
  gameType: GameType;
  onClose: () => void;
  onCreate: (gameTypeId: string, roomName: string) => void;
}

export function CreateRoomModal({ gameType, onClose, onCreate }: CreateRoomModalProps) {
  const [roomName, setRoomName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomName.trim()) {
      onCreate(gameType.id, roomName.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl max-w-md w-full border border-white/20">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{gameType.icon}</span>
            <div>
              <h2 className="text-xl font-semibold text-white">Create {gameType.name} Room</h2>
              <p className="text-sm text-gray-400">{gameType.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label htmlFor="roomName" className="block text-sm font-medium text-gray-300 mb-2">
              Room Name
            </label>
            <input
              id="roomName"
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="Enter a name for your room"
              autoFocus
              required
            />
          </div>

          <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
            <div className="text-sm text-gray-300">
              <div className="flex justify-between mb-2">
                <span>Players:</span>
                <span className="text-white font-medium">{gameType.minPlayers}-{gameType.maxPlayers}</span>
              </div>
              <div className="flex justify-between">
                <span>Your status:</span>
                <span className="text-amber-400 font-medium">Room Creator</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-lg font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
            >
              Create Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
