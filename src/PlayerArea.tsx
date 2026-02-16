import React from 'react';
import { Player, Card } from './types';
import { CardView } from './CardView';
import { MeldView } from './MeldView';

export type PlayerAreaProps = {
  player: Player;
  cardWidth: number;
  cardHeight: number;
  cardsUrl?: string;
  scale?: number;
  onCardClick?: (card: Card) => void;
};

/**
 * PlayerArea component renders a player's hand and melds
 * Applies visibility rules: hand cards face-up only for isSelf
 */
export const PlayerArea: React.FC<PlayerAreaProps> = ({
  player,
  cardWidth,
  cardHeight,
  cardsUrl = 'img/cards.png',
  scale = 1,
  onCardClick,
}) => {
  const padding = 18 * scale;
  const isSelf = player.isSelf;

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10 * scale,
  };

  const playerInfoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8 * scale,
    marginBottom: 8 * scale,
  };

  const avatarStyle: React.CSSProperties = {
    width: 40 * scale,
    height: 40 * scale,
    borderRadius: '50%',
    objectFit: 'cover',
    border: isSelf ? `2px solid #4CAF50` : `2px solid #888`,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 14 * scale,
    fontWeight: isSelf ? 'bold' : 'normal',
    color: isSelf ? '#4CAF50' : '#fff',
  };

  const handStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  };

  const meldsContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: 10 * scale,
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  return (
    <div
      data-player-id={player.id}
      data-is-self={isSelf}
      className="player-area"
      style={containerStyle}
    >
      {/* Player info */}
      <div style={playerInfoStyle}>
        <img src={player.avatarUrl} alt={player.label} style={avatarStyle} />
        <span style={labelStyle}>{player.label}</span>
      </div>

      {/* Melds (always face-up) */}
      {player.melds.length > 0 && (
        <div style={meldsContainerStyle}>
          {player.melds.map((meld) => (
            <MeldView
              key={meld.id}
              meld={meld}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              cardsUrl={cardsUrl}
              scale={scale}
              onCardClick={onCardClick}
            />
          ))}
        </div>
      )}

      {/* Hand (face-up only for isSelf) */}
      {player.hand.length > 0 && (
        <div style={handStyle}>
          {player.hand.map((card, index) => (
            <CardView
              key={`${player.id}-hand-${card.shortName}-${index}`}
              card={card}
              faceUp={isSelf}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              cardsUrl={cardsUrl}
              scale={scale}
              onClick={onCardClick}
              style={{
                marginRight: index < player.hand.length - 1 ? -cardWidth * scale + padding : 0,
                zIndex: index,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
