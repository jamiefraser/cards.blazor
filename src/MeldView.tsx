import React from 'react';
import { Meld, Card } from './types';
import { CardView } from './CardView';

export type MeldViewProps = {
  meld: Meld;
  cardWidth: number;
  cardHeight: number;
  cardsUrl?: string;
  scale?: number;
  onCardClick?: (card: Card) => void;
};

/**
 * MeldView component renders a group of cards (meld)
 * Cards in melds are always face-up and visible to all players
 */
export const MeldView: React.FC<MeldViewProps> = ({
  meld,
  cardWidth,
  cardHeight,
  cardsUrl = 'img/cards.png',
  scale = 1,
  onCardClick,
}) => {
  const padding = 18 * scale;

  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    flexDirection: 'row',
    position: 'relative',
  };

  return (
    <div
      data-meld-id={meld.id}
      className="meld"
      style={containerStyle}
    >
      {meld.label && (
        <div style={{ 
          position: 'absolute', 
          top: -20, 
          left: 0,
          fontSize: 12 * scale,
          color: '#fff',
        }}>
          {meld.label}
        </div>
      )}
      {meld.cards.map((card, index) => (
        <CardView
          key={`${meld.id}-${card.shortName}-${index}`}
          card={card}
          faceUp={true}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          cardsUrl={cardsUrl}
          scale={scale}
          onClick={onCardClick}
          style={{
            marginRight: index < meld.cards.length - 1 ? -cardWidth * scale + padding : 0,
            zIndex: index,
          }}
        />
      ))}
    </div>
  );
};
