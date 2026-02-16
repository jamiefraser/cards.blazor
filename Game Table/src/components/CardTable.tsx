import { useState } from 'react';
import { Card } from './Card';
import { PlayerPosition } from './PlayerPosition';
import { Settings } from 'lucide-react';

export interface CardData {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  value: string;
  faceDown?: boolean;
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  hand: CardData[];
  melds: CardData[][];
  isCurrentPlayer?: boolean;
}

interface CardTableProps {
  players: Player[];
  currentPlayerId: string;
}

export function CardTable({ players, currentPlayerId }: CardTableProps) {
  const [deckCount] = useState(42);
  const [discardPile] = useState<CardData[]>([
    { suit: 'hearts', value: '7' },
  ]);

  const numPlayers = players.length;

  // Calculate player positions based on number of players
  const getPlayerPositions = () => {
    const positions: Array<{ top?: string; bottom?: string; left?: string; right?: string; transform?: string; rotation: number }> = [];

    switch (numPlayers) {
      case 2:
        positions.push(
          { top: '3%', left: '50%', transform: 'translateX(-50%)', rotation: 0 },
          { bottom: '3%', left: '50%', transform: 'translateX(-50%)', rotation: 180 }
        );
        break;
      case 3:
        positions.push(
          { top: '5%', left: '25%', transform: 'translateX(-50%)', rotation: 340 },
          { top: '5%', right: '25%', transform: 'translateX(50%)', rotation: 20 },
          { bottom: '3%', left: '50%', transform: 'translateX(-50%)', rotation: 180 }
        );
        break;
      case 4:
        positions.push(
          { top: '3%', left: '50%', transform: 'translateX(-50%)', rotation: 0 },
          { top: '50%', right: '1%', transform: 'translateY(-50%)', rotation: 90 },
          { bottom: '3%', left: '50%', transform: 'translateX(-50%)', rotation: 180 },
          { top: '50%', left: '1%', transform: 'translateY(-50%)', rotation: 270 }
        );
        break;
      case 5:
        positions.push(
          { top: '3%', left: '50%', transform: 'translateX(-50%)', rotation: 0 },
          { top: '20%', right: '8%', rotation: 55 },
          { bottom: '20%', right: '8%', rotation: 125 },
          { bottom: '3%', right: '30%', transform: 'translateX(50%)', rotation: 180 },
          { bottom: '3%', left: '30%', transform: 'translateX(-50%)', rotation: 180 }
        );
        break;
      case 6:
        positions.push(
          { top: '3%', left: '35%', transform: 'translateX(-50%)', rotation: 340 },
          { top: '3%', right: '35%', transform: 'translateX(50%)', rotation: 20 },
          { top: '50%', right: '1%', transform: 'translateY(-50%)', rotation: 90 },
          { bottom: '3%', right: '35%', transform: 'translateX(50%)', rotation: 160 },
          { bottom: '3%', left: '35%', transform: 'translateX(-50%)', rotation: 200 },
          { top: '50%', left: '1%', transform: 'translateY(-50%)', rotation: 270 }
        );
        break;
      case 7:
        positions.push(
          { top: '3%', left: '50%', transform: 'translateX(-50%)', rotation: 0 },
          { top: '12%', right: '12%', rotation: 40 },
          { top: '45%', right: '2%', transform: 'translateY(-50%)', rotation: 90 },
          { bottom: '12%', right: '12%', rotation: 140 },
          { bottom: '3%', left: '50%', transform: 'translateX(-50%)', rotation: 180 },
          { bottom: '12%', left: '12%', rotation: 220 },
          { top: '45%', left: '2%', transform: 'translateY(-50%)', rotation: 280 }
        );
        break;
      case 8:
        positions.push(
          { top: '3%', left: '38%', transform: 'translateX(-50%)', rotation: 340 },
          { top: '3%', right: '38%', transform: 'translateX(50%)', rotation: 20 },
          { top: '25%', right: '3%', rotation: 60 },
          { bottom: '25%', right: '3%', rotation: 120 },
          { bottom: '3%', right: '38%', transform: 'translateX(50%)', rotation: 160 },
          { bottom: '3%', left: '38%', transform: 'translateX(-50%)', rotation: 200 },
          { bottom: '25%', left: '3%', rotation: 240 },
          { top: '25%', left: '3%', rotation: 300 }
        );
        break;
      default:
        break;
    }

    return positions;
  };

  const positions = getPlayerPositions();

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-black/20 backdrop-blur-sm border-b border-white/10 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">Card Game Table</h1>
          <button className="text-white/80 hover:text-white transition">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Game Table */}
      <div className="absolute inset-0 flex items-center justify-center pt-16 pb-4">
        <div className="relative w-full h-full max-w-[95%] max-h-[95%]">
          {/* Table Surface */}
          <div className="absolute inset-0 m-auto w-full h-full bg-gradient-to-br from-green-800 to-green-900 rounded-[50%] shadow-2xl border-8 border-amber-900">
            {/* Center Area - Deck and Discard */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-8">
              {/* Deck */}
              <div className="relative">
                <div className="text-center mb-2 text-white/70 text-sm font-medium">Deck</div>
                <div className="relative w-20 h-28">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="absolute"
                      style={{ top: `${i * 2}px`, left: `${i * 2}px` }}
                    >
                      <Card faceDown />
                    </div>
                  ))}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white/50 text-sm">
                    {deckCount}
                  </div>
                </div>
              </div>

              {/* Discard Pile */}
              <div className="relative">
                <div className="text-center mb-2 text-white/70 text-sm font-medium">Discard</div>
                <div className="relative w-20 h-28">
                  {discardPile.length > 0 ? (
                    discardPile.slice(-3).map((card, i) => (
                      <div
                        key={i}
                        className="absolute"
                        style={{ top: `${i * 2}px`, left: `${i * 2}px` }}
                      >
                        <Card suit={card.suit} value={card.value} />
                      </div>
                    ))
                  ) : (
                    <div className="w-20 h-28 border-2 border-dashed border-white/30 rounded-lg" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Players */}
          {players.map((player, index) => (
            <div
              key={player.id}
              className="absolute"
              style={positions[index]}
            >
              <PlayerPosition
                player={player}
                isCurrentPlayer={player.id === currentPlayerId}
                position={index}
                totalPlayers={numPlayers}
                rotation={positions[index]?.rotation || 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}