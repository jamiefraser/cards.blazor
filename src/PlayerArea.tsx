import React, { CSSProperties } from 'react';
import { Player, Card, CardSize } from './types';
import { CardView } from './CardView';
import { MeldView } from './MeldView';

export interface PlayerAreaProps {
  player: Player;
  cardSize: CardSize;
  cardsUrl: string;
  cardback?: 'red' | 'blue';
  opponentScale?: number;
  onSelectCard?: (card: Card) => void;
  style?: CSSProperties;
}

/**
 * PlayerArea component - Renders a player's area including:
 * - Avatar and label
 * - Hand (with visibility rules)
 * - Melds (always visible)
 * 
 * Implements scaling for opponents (default 0.66)
 */
export const PlayerArea: React.FC<PlayerAreaProps> = ({
  player,
  cardSize,
  cardsUrl,
  cardback = 'red',
  opponentScale = 0.66,
  onSelectCard,
  style = {}
}) => {
  // Determine the scale: full size for self, reduced for opponents
  const scale = player.isSelf ? 1 : opponentScale;
  const scaledCardSize = {
    width: cardSize.width * scale,
    height: cardSize.height * scale,
    padding: cardSize.padding * scale
  };

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    ...style
  };

  const handStyle: CSSProperties = {
    display: 'flex',
    gap: `${scaledCardSize.padding}px`
  };

  const meldsContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  return (
    <div className="player-area" style={containerStyle} data-player-id={player.id}>
      {/* Avatar and Label */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        padding: '8px 12px',
        backgroundColor: player.isSelf ? 'rgba(255, 215, 0, 0.3)' : 'rgba(0, 0, 0, 0.3)',
        borderRadius: '20px',
        border: player.isSelf ? '2px solid gold' : '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <img 
          src={player.avatarUrl} 
          alt={player.label}
          style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
        <span style={{ 
          color: 'white', 
          fontWeight: player.isSelf ? 'bold' : 'normal',
          fontSize: '14px'
        }}>
          {player.label}
        </span>
      </div>

      {/* Hand - visibility based on isSelf */}
      <div className="player-hand" style={handStyle}>
        {player.hand.map((card, index) => (
          <CardView
            key={`hand-${card.shortName}-${index}`}
            card={card}
            faceDown={!player.isSelf}
            cardSize={cardSize}
            cardsUrl={cardsUrl}
            cardback={cardback}
            scale={scale}
            onClick={player.isSelf && onSelectCard ? () => onSelectCard(card) : undefined}
          />
        ))}
      </div>

      {/* Melds - always visible to all players */}
      {player.melds.length > 0 && (
        <div className="player-melds" style={meldsContainerStyle}>
          {player.melds.map((meld, meldIndex) => (
            <MeldView
              key={`meld-${meldIndex}`}
              meld={meld}
              cardSize={cardSize}
              cardsUrl={cardsUrl}
              cardback={cardback}
              scale={scale}
            />
          ))}
        </div>
      )}
    </div>
  );
};
