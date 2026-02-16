import React, { CSSProperties } from 'react';
import { Player, Card } from './types';
import { PlayerArea } from './PlayerArea';

export interface GameTableProps {
  players: Player[];
  currentPlayerId: string;
  opponentScale?: number; // default 0.66
  cardWidth: number; // base size for self player's cards
  cardHeight: number; // base size for self player's cards
  cardPadding?: number; // spacing between cards, default 18
  cardsUrl?: string; // URL to card sprite sheet
  cardback?: 'red' | 'blue'; // card back color
  onPlayCard?: (playerId: string, card: Card) => void;
  onSelectCard?: (card: Card) => void;
}

/**
 * GameTable component - Main component for rendering a card game table
 * 
 * Features:
 * - Renders all players around the table
 * - Implements card visibility rules (face-up for self, face-down for opponents)
 * - Implements scaling rules for opponents (default 66%)
 * - Maintains deterministic DOM structure
 * - Layout inspired by the Game Table reference implementation
 */
export const GameTable: React.FC<GameTableProps> = ({
  players,
  currentPlayerId,
  opponentScale = 0.66,
  cardWidth,
  cardHeight,
  cardPadding = 18,
  cardsUrl = 'img/cards.png',
  cardback = 'red',
  onPlayCard,
  onSelectCard
}) => {
  const cardSize = {
    width: cardWidth,
    height: cardHeight,
    padding: cardPadding
  };

  const numPlayers = players.length;

  /**
   * Calculate player positions based on number of players
   * Layout logic inspired by Game Table reference implementation
   */
  const getPlayerPositions = (): Array<CSSProperties> => {
    const positions: Array<CSSProperties> = [];

    switch (numPlayers) {
      case 2:
        positions.push(
          { position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)' },
          { position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)' }
        );
        break;
      case 3:
        positions.push(
          { position: 'absolute', top: '5%', left: '25%', transform: 'translateX(-50%)' },
          { position: 'absolute', top: '5%', right: '25%', transform: 'translateX(50%)' },
          { position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)' }
        );
        break;
      case 4:
        positions.push(
          { position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)' },
          { position: 'absolute', top: '50%', right: '2%', transform: 'translateY(-50%)' },
          { position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)' },
          { position: 'absolute', top: '50%', left: '2%', transform: 'translateY(-50%)' }
        );
        break;
      case 5:
        positions.push(
          { position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)' },
          { position: 'absolute', top: '20%', right: '8%' },
          { position: 'absolute', bottom: '20%', right: '8%' },
          { position: 'absolute', bottom: '5%', right: '30%', transform: 'translateX(50%)' },
          { position: 'absolute', bottom: '5%', left: '30%', transform: 'translateX(-50%)' }
        );
        break;
      case 6:
        positions.push(
          { position: 'absolute', top: '5%', left: '35%', transform: 'translateX(-50%)' },
          { position: 'absolute', top: '5%', right: '35%', transform: 'translateX(50%)' },
          { position: 'absolute', top: '50%', right: '2%', transform: 'translateY(-50%)' },
          { position: 'absolute', bottom: '5%', right: '35%', transform: 'translateX(50%)' },
          { position: 'absolute', bottom: '5%', left: '35%', transform: 'translateX(-50%)' },
          { position: 'absolute', top: '50%', left: '2%', transform: 'translateY(-50%)' }
        );
        break;
      case 7:
        positions.push(
          { position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)' },
          { position: 'absolute', top: '15%', right: '12%' },
          { position: 'absolute', top: '45%', right: '2%', transform: 'translateY(-50%)' },
          { position: 'absolute', bottom: '15%', right: '12%' },
          { position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)' },
          { position: 'absolute', bottom: '15%', left: '12%' },
          { position: 'absolute', top: '45%', left: '2%', transform: 'translateY(-50%)' }
        );
        break;
      case 8:
        positions.push(
          { position: 'absolute', top: '5%', left: '38%', transform: 'translateX(-50%)' },
          { position: 'absolute', top: '5%', right: '38%', transform: 'translateX(50%)' },
          { position: 'absolute', top: '25%', right: '3%' },
          { position: 'absolute', bottom: '25%', right: '3%' },
          { position: 'absolute', bottom: '5%', right: '38%', transform: 'translateX(50%)' },
          { position: 'absolute', bottom: '5%', left: '38%', transform: 'translateX(-50%)' },
          { position: 'absolute', bottom: '25%', left: '3%' },
          { position: 'absolute', top: '25%', left: '3%' }
        );
        break;
      default:
        // Default to circular arrangement for any other number
        for (let i = 0; i < numPlayers; i++) {
          const angle = (i * 360) / numPlayers - 90;
          const radius = 40; // percentage
          const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
          const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
          positions.push({
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            transform: 'translate(-50%, -50%)'
          });
        }
        break;
    }

    return positions;
  };

  const positions = getPlayerPositions();

  const tableStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    backgroundColor: '#1a472a',
    overflow: 'hidden'
  };

  return (
    <div className="game-table" style={tableStyle}>
      {players.map((player, index) => (
        <PlayerArea
          key={player.id}
          player={player}
          cardSize={cardSize}
          cardsUrl={cardsUrl}
          cardback={cardback}
          opponentScale={opponentScale}
          onSelectCard={onSelectCard}
          style={positions[index] || {}}
        />
      ))}
    </div>
  );
};
