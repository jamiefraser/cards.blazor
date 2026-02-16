import { useState } from 'react';
import { ChevronDown, ChevronUp, Users } from 'lucide-react';
import { GameRoom } from './GameLobby';

interface RoomCardProps {
  room: GameRoom;
}

export function RoomCard({ room }: RoomCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const creator = room.players.find(p => p.isCreator);
  const otherPlayers = room.players.filter(p => !p.isCreator);

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden hover:border-white/30 transition">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h4 className="font-semibold text-white text-lg">{room.name}</h4>
          <div className="flex items-center gap-1 text-sm text-gray-300">
            <Users size={16} />
            <span>{room.players.length}/{room.maxPlayers}</span>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-sm text-gray-300 hover:text-white transition bg-white/5 rounded-lg px-3 py-2"
        >
          <span>View Players</span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {isExpanded && (
        <div className="border-t border-white/10 bg-black/20 p-4">
          <div className="space-y-3">
            {/* Creator */}
            {creator && (
              <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                <span className="text-4xl">{creator.avatar}</span>
                <div className="flex-1">
                  <div className="font-semibold text-white text-lg">{creator.name}</div>
                  <div className="text-xs text-amber-400 font-medium">Room Creator</div>
                </div>
              </div>
            )}

            {/* Other Players */}
            {otherPlayers.map((player, index) => (
              <div key={index} className="flex items-center gap-3 bg-white/5 rounded-lg p-2">
                <span className="text-3xl">{player.avatar}</span>
                <div className="text-white">{player.name}</div>
              </div>
            ))}

            {/* Empty Slots */}
            {room.players.length < room.maxPlayers && (
              <div className="text-sm text-gray-500 italic text-center pt-2">
                {room.maxPlayers - room.players.length} slot(s) available
              </div>
            )}
          </div>

          <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition">
            Join Room
          </button>
        </div>
      )}
    </div>
  );
}
