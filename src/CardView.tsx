import React, { CSSProperties } from 'react';
import { Card, CardSize } from './types';

export interface CardViewProps {
  card?: Card;
  faceDown?: boolean;
  cardSize: CardSize;
  cardsUrl: string;
  cardback?: 'red' | 'blue';
  onClick?: () => void;
  scale?: number;
  style?: CSSProperties;
}

/**
 * CardView component - React conversion of the Card class from cards.js
 * Preserves the original rendering logic using CSS sprite positioning
 */
export const CardView: React.FC<CardViewProps> = ({
  card,
  faceDown = false,
  cardSize,
  cardsUrl,
  cardback = 'red',
  onClick,
  scale = 1,
  style = {}
}) => {
  const getBackgroundPosition = (): string => {
    if (faceDown || !card) {
      // Card back positioning - preserved from hideCard()
      const y = cardback === 'red' ? 0 : -1 * cardSize.height;
      return `0px ${y}px`;
    }

    // Card face positioning - preserved from showCard()
    const offsets: Record<string, number> = {
      'c': 0,
      'd': 1,
      'h': 2,
      's': 3,
      'rj': 2,
      'bj': 3
    };

    let rank = card.rank;
    if (rank === 14) {
      rank = 1; // Aces high must work as well
    }

    const xpos = -rank * cardSize.width;
    const ypos = -offsets[card.suit] * cardSize.height;
    return `${xpos}px ${ypos}px`;
  };

  const cardStyle: CSSProperties = {
    width: cardSize.width * scale,
    height: cardSize.height * scale,
    backgroundImage: `url(${cardsUrl})`,
    backgroundPosition: getBackgroundPosition(),
    backgroundSize: scale !== 1 ? `${100 / scale}%` : undefined,
    position: 'relative',
    cursor: onClick ? 'pointer' : 'default',
    display: 'inline-block',
    ...style
  };

  return (
    <div 
      className="card" 
      style={cardStyle}
      onClick={onClick}
      data-card={card ? card.name : 'back'}
    />
  );
};
