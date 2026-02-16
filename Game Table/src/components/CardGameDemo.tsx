import { useState } from 'react';
import { CardTable, Player, CardData } from './CardTable';
import { Users } from 'lucide-react';

const SAMPLE_CARDS: CardData[] = [
  { suit: 'hearts', value: 'A' },
  { suit: 'diamonds', value: 'K' },
  { suit: 'clubs', value: 'Q' },
  { suit: 'spades', value: 'J' },
  { suit: 'hearts', value: '10' },
  { suit: 'diamonds', value: '9' },
  { suit: 'clubs', value: '8' },
  { suit: 'spades', value: '7' },
];

const AVATARS = ['🦊', '🐼', '🐯', '🦁', '🐸', '🐙', '🦉', '🐺'];
const NAMES = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];

function generatePlayers(count: number, currentPlayerId: string): Player[] {
  return Array.from({ length: count }, (_, i) => {
    const isCurrentPlayer = i === 0; // First player is always the current player
    const handSize = Math.floor(Math.random() * 5) + 5; // 5-9 cards
    
    // Generate hand
    const hand = Array.from({ length: handSize }, (_, j) => ({
      ...SAMPLE_CARDS[j % SAMPLE_CARDS.length],
    }));

    // Generate melds (some players have melds, some don't)
    const melds: CardData[][] = [];
    if (Math.random() > 0.5) {
      // Add 1-2 melds
      const meldCount = Math.floor(Math.random() * 2) + 1;
      for (let m = 0; m < meldCount; m++) {
        const meldSize = Math.floor(Math.random() * 2) + 3; // 3-4 cards per meld
        const meld = Array.from({ length: meldSize }, (_, k) => ({
          ...SAMPLE_CARDS[(m * 3 + k) % SAMPLE_CARDS.length],
        }));
        melds.push(meld);
      }
    }

    return {
      id: `player-${i}`,
      name: NAMES[i],
      avatar: AVATARS[i],
      hand,
      melds,
      isCurrentPlayer,
    };
  });
}

export function CardGameDemo() {
  const [playerCount, setPlayerCount] = useState(4);
  const [currentPlayerId] = useState('player-0');
  const [players, setPlayers] = useState<Player[]>(generatePlayers(playerCount, currentPlayerId));

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
    setPlayers(generatePlayers(count, currentPlayerId));
  };

  return (
    <div className="relative w-full h-screen">
      {/* Player Count Selector */}
      <div className="absolute top-20 right-4 z-30 bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <div className="flex items-center gap-2 mb-3">
          <Users size={18} className="text-white" />
          <span className="text-white font-medium text-sm">Players</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[2, 3, 4, 5, 6, 7, 8].map((count) => (
            <button
              key={count}
              onClick={() => handlePlayerCountChange(count)}
              className={`w-10 h-10 rounded-lg font-medium transition ${
                playerCount === count
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      <CardTable players={players} currentPlayerId={currentPlayerId} />
    </div>
  );
}
