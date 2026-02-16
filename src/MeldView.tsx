import React, { CSSProperties } from 'react';
import { Meld, CardSize } from './types';
import { CardView } from './CardView';

export interface MeldViewProps {
  meld: Meld;
  cardSize: CardSize;
  cardsUrl: string;
  cardback?: 'red' | 'blue';
  scale?: number;
  style?: CSSProperties;
}

/**
 * MeldView component - Renders a group of cards (meld)
 * Cards in melds are always visible to all players
 */
export const MeldView: React.FC<MeldViewProps> = ({
  meld,
  cardSize,
  cardsUrl,
  cardback = 'red',
  scale = 1,
  style = {}
}) => {
  const containerStyle: CSSProperties = {
    display: 'flex',
    gap: `${cardSize.padding * scale}px`,
    ...style
  };

  return (
    <div className="meld" style={containerStyle}>
      {meld.map((card, index) => (
        <CardView
          key={`${card.shortName}-${index}`}
          card={card}
          faceDown={false}
          cardSize={cardSize}
          cardsUrl={cardsUrl}
          cardback={cardback}
          scale={scale}
        />
      ))}
    </div>
  );
};
