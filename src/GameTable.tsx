import React from 'react';
import { Player, Card } from './types';
import { PlayerArea } from './PlayerArea';

export type GameTableProps = {
  players: Player[];
  currentPlayerId: string;
  opponentScale?: number; // default 0.66
  cardWidth: number;      // base size for self player's cards
  cardHeight: number;
  cardsUrl?: string;
  onPlayCard?: (playerId: string, card: Card) => void;
  onSelectCard?: (card: Card) => void;
};

/**
 * GameTable component renders all players around a game table
 * Applies scaling rules for opponents (66% by default)
 */
export const GameTable: React.FC<GameTableProps> = ({
  players,
  currentPlayerId,
  opponentScale = 0.66,
  cardWidth,
  cardHeight,
  cardsUrl = 'img/cards.png',
  onPlayCard,
  onSelectCard,
}) => {
  // Sort players: self player at bottom, others distributed around
  const selfPlayer = players.find(p => p.id === currentPlayerId);
  const otherPlayers = players.filter(p => p.id !== currentPlayerId);

  const tableStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    minHeight: 600,
    backgroundColor: '#0a5f0a',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 8,
    border: '6px solid #654321',
    boxSizing: 'border-box',
  };

  const topRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: 40,
  };

  const middleRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  };

  const bottomRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
  };

  const handleCardClick = (card: Card) => {
    if (onSelectCard) {
      onSelectCard(card);
    }
    if (onPlayCard && selfPlayer) {
      onPlayCard(selfPlayer.id, card);
    }
  };

  // Layout: distribute opponents around the table
  // Top: first opponent(s)
  // Middle: side opponents
  // Bottom: self player
  const topOpponents = otherPlayers.slice(0, Math.ceil(otherPlayers.length / 2));
  const sideOpponents = otherPlayers.slice(Math.ceil(otherPlayers.length / 2));

  return (
    <div data-testid="game-table" className="game-table" style={tableStyle}>
      {/* Top row: opponents */}
      {topOpponents.length > 0 && (
        <div style={topRowStyle}>
          {topOpponents.map((player) => (
            <PlayerArea
              key={player.id}
              player={player}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              cardsUrl={cardsUrl}
              scale={opponentScale}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      )}

      {/* Middle row: side opponents */}
      {sideOpponents.length > 0 && (
        <div style={middleRowStyle}>
          {sideOpponents.map((player) => (
            <PlayerArea
              key={player.id}
              player={player}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              cardsUrl={cardsUrl}
              scale={opponentScale}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      )}

      {/* Bottom row: self player */}
      {selfPlayer && (
        <div style={bottomRowStyle}>
          <PlayerArea
            player={selfPlayer}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            cardsUrl={cardsUrl}
            scale={1}
            onCardClick={handleCardClick}
          />
        </div>
      )}
    </div>
  );
};
