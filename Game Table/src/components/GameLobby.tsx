import { useState } from 'react';
import { User } from '../App';
import { RoomCard } from './RoomCard';
import { CreateRoomModal } from './CreateRoomModal';
import { Plus } from 'lucide-react';

export interface Player {
  name: string;
  avatar: string;
  isCreator?: boolean;
}

export interface GameRoom {
  id: string;
  name: string;
  gameType: string;
  players: Player[];
  maxPlayers: number;
}

export interface GameType {
  id: string;
  name: string;
  description: string;
  icon: string;
  minPlayers: number;
  maxPlayers: number;
}

const GAME_TYPES: GameType[] = [
  { id: 'poker', name: 'Poker', description: 'Texas Hold\'em', icon: '🃏', minPlayers: 2, maxPlayers: 8 },
  { id: 'chess', name: 'Chess', description: 'Classic strategy', icon: '♟️', minPlayers: 2, maxPlayers: 2 },
  { id: 'uno', name: 'UNO', description: 'Fast-paced card game', icon: '🎴', minPlayers: 2, maxPlayers: 10 },
  { id: 'monopoly', name: 'Monopoly', description: 'Property trading', icon: '🎩', minPlayers: 2, maxPlayers: 6 },
  { id: 'checkers', name: 'Checkers', description: 'Strategic board game', icon: '⚫', minPlayers: 2, maxPlayers: 2 },
];

const INITIAL_ROOMS: GameRoom[] = [
  {
    id: '1',
    name: 'Friday Night Poker',
    gameType: 'poker',
    players: [
      { name: 'Sarah', avatar: '🦊', isCreator: true },
      { name: 'Mike', avatar: '🐼' },
      { name: 'Jake', avatar: '🐯' },
    ],
    maxPlayers: 8,
  },
  {
    id: '2',
    name: 'High Stakes Table',
    gameType: 'poker',
    players: [
      { name: 'Alex', avatar: '🦁', isCreator: true },
      { name: 'Emma', avatar: '🐸' },
    ],
    maxPlayers: 8,
  },
  {
    id: '3',
    name: 'Quick Chess Match',
    gameType: 'chess',
    players: [
      { name: 'Bobby', avatar: '🦉', isCreator: true },
    ],
    maxPlayers: 2,
  },
  {
    id: '4',
    name: 'UNO Champions',
    gameType: 'uno',
    players: [
      { name: 'Lisa', avatar: '🦄', isCreator: true },
      { name: 'Tom', avatar: '🐲' },
      { name: 'Anna', avatar: '🦇' },
      { name: 'Chris', avatar: '🐺' },
    ],
    maxPlayers: 10,
  },
  {
    id: '5',
    name: 'Board Game Night',
    gameType: 'monopoly',
    players: [
      { name: 'David', avatar: '🦈', isCreator: true },
      { name: 'Rachel', avatar: '🐧' },
    ],
    maxPlayers: 6,
  },
];

interface GameLobbyProps {
  user: User;
}

export function GameLobby({ user }: GameLobbyProps) {
  const [rooms, setRooms] = useState<GameRoom[]>(INITIAL_ROOMS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedGameType, setSelectedGameType] = useState<GameType | null>(null);

  const handleCreateRoom = (gameTypeId: string, roomName: string) => {
    const gameType = GAME_TYPES.find(gt => gt.id === gameTypeId);
    if (!gameType) return;

    const newRoom: GameRoom = {
      id: Date.now().toString(),
      name: roomName,
      gameType: gameTypeId,
      players: [{ name: user.name, avatar: user.avatar, isCreator: true }],
      maxPlayers: gameType.maxPlayers,
    };

    setRooms([...rooms, newRoom]);
    setIsCreateModalOpen(false);
    setSelectedGameType(null);
  };

  const openCreateModal = (gameType: GameType) => {
    setSelectedGameType(gameType);
    setIsCreateModalOpen(true);
  };

  const groupedRooms = rooms.reduce((acc, room) => {
    if (!acc[room.gameType]) {
      acc[room.gameType] = [];
    }
    acc[room.gameType].push(room);
    return acc;
  }, {} as Record<string, GameRoom[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Game Lobby</h1>
          <div className="flex items-center gap-3 bg-white/10 rounded-full px-4 py-2">
            <span className="text-3xl">{user.avatar}</span>
            <span className="text-white font-medium">{user.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr,350px] gap-8">
          {/* Main Content - Game Rooms */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Active Rooms</h2>
              
              {GAME_TYPES.map(gameType => {
                const gameRooms = groupedRooms[gameType.id] || [];
                
                return (
                  <div key={gameType.id} className="mb-8">
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-white/20">
                      <span className="text-3xl">{gameType.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{gameType.name}</h3>
                        <p className="text-sm text-gray-400">{gameType.description}</p>
                      </div>
                      <div className="ml-auto bg-white/10 rounded-full px-3 py-1">
                        <span className="text-sm text-white">{gameRooms.length} active</span>
                      </div>
                    </div>

                    {gameRooms.length === 0 ? (
                      <div className="bg-white/5 rounded-lg p-6 text-center border border-white/10">
                        <p className="text-gray-400">No active rooms. Be the first to create one!</p>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-4">
                        {gameRooms.map(room => (
                          <RoomCard key={room.id} room={room} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar - Create Game */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4">Create New Game</h2>
              <p className="text-sm text-gray-300 mb-6">Choose a game type to start a new room</p>
              
              <div className="space-y-3">
                {GAME_TYPES.map(gameType => (
                  <button
                    key={gameType.id}
                    onClick={() => openCreateModal(gameType)}
                    className="w-full bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl p-4 transition group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{gameType.icon}</span>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-white">{gameType.name}</div>
                        <div className="text-sm text-gray-400">
                          {gameType.minPlayers}-{gameType.maxPlayers} players
                        </div>
                      </div>
                      <Plus className="text-white/60 group-hover:text-white transition" size={20} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCreateModalOpen && selectedGameType && (
        <CreateRoomModal
          gameType={selectedGameType}
          onClose={() => {
            setIsCreateModalOpen(false);
            setSelectedGameType(null);
          }}
          onCreate={handleCreateRoom}
        />
      )}
    </div>
  );
}
