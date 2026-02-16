import { Player } from './CardTable';
import { Card } from './Card';
import { User } from 'lucide-react';

interface PlayerPositionProps {
  player: Player;
  isCurrentPlayer: boolean;
  position: number;
  totalPlayers: number;
  rotation: number;
}

export function PlayerPosition({ player, isCurrentPlayer, position, totalPlayers, rotation }: PlayerPositionProps) {
  const isBottom = (totalPlayers === 2 && position === 1) ||
                   (totalPlayers === 3 && position === 2) ||
                   (totalPlayers === 4 && position === 2) ||
                   (totalPlayers === 5 && (position === 3 || position === 4)) ||
                   (totalPlayers === 6 && (position === 3 || position === 4)) ||
                   (totalPlayers === 7 && position === 4) ||
                   (totalPlayers === 8 && (position === 4 || position === 5));

  const layoutClass = isBottom ? 'flex-col-reverse' : 'flex-col';

  return (
    <div 
      className={`flex ${layoutClass} items-center gap-3 ${isCurrentPlayer ? 'z-20' : 'z-10'}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Player Info */}
      <div className={`flex items-center gap-2 px-3 py-2 rounded-full ${
        isCurrentPlayer 
          ? 'bg-amber-500/90 border-2 border-amber-300 shadow-lg' 
          : 'bg-slate-800/80 border border-slate-600'
      } backdrop-blur-sm`}>
        <span className="text-xl">{player.avatar}</span>
        <span className={`font-medium text-sm ${isCurrentPlayer ? 'text-white' : 'text-gray-200'}`}>
          {player.name}
        </span>
        {isCurrentPlayer && (
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        )}
      </div>

      {/* Player Cards Area */}
      <div className={`flex ${layoutClass} gap-2`}>
        {/* Melds - Always visible to everyone */}
        {player.melds.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="text-xs text-white/70 text-center font-medium">Melds</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {player.melds.map((meld, meldIndex) => (
                <div key={meldIndex} className="flex gap-1 bg-black/20 p-2 rounded-lg border border-white/10">
                  {meld.map((card, cardIndex) => (
                    <Card
                      key={cardIndex}
                      suit={card.suit}
                      value={card.value}
                      size="sm"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hand */}
        <div className="flex flex-col gap-2">
          <div className="text-xs text-white/70 text-center font-medium">
            {isCurrentPlayer ? 'Your Hand' : 'Hand'}
          </div>
          <div className={`flex ${isBottom ? 'flex-row' : 'flex-row'} gap-1 justify-center`}>
            {player.hand.map((card, index) => (
              <div
                key={index}
                className={`${isCurrentPlayer ? 'hover:-translate-y-2 cursor-pointer' : ''} transition-transform duration-200`}
                style={{
                  transform: isBottom && isCurrentPlayer ? `translateY(${index % 2 === 0 ? -4 : 0}px)` : undefined
                }}
              >
                {isCurrentPlayer ? (
                  <Card suit={card.suit} value={card.value} size="sm" />
                ) : (
                  <Card faceDown size="sm" />
                )}
              </div>
            ))}
          </div>
          <div className="text-xs text-white/50 text-center">
            {player.hand.length} {player.hand.length === 1 ? 'card' : 'cards'}
          </div>
        </div>
      </div>
    </div>
  );
}