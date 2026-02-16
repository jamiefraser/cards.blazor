import React from 'react';
import { Card } from './types';
import { getCardBackgroundPosition, getCardBackPosition } from './cardUtils';

export type CardViewProps = {
  card: Card;
  faceUp: boolean;
  cardWidth: number;
  cardHeight: number;
  cardsUrl?: string;
  cardback?: 'red' | 'blue';
  scale?: number;
  onClick?: (card: Card) => void;
  style?: React.CSSProperties;
};

/**
 * CardView component renders an individual playing card
 */
export const CardView: React.FC<CardViewProps> = ({
  card,
  faceUp,
  cardWidth,
  cardHeight,
  cardsUrl = 'img/cards.png',
  cardback = 'red',
  scale = 1,
  onClick,
  style = {},
}) => {
  const cardSize = { width: cardWidth, height: cardHeight };
  
  // Calculate background position
  const bgPos = faceUp
    ? getCardBackgroundPosition(card, cardSize)
    : getCardBackPosition(cardback, cardSize);

  const handleClick = () => {
    if (onClick) {
      onClick(card);
    }
  };

  const cardStyle: React.CSSProperties = {
    width: cardWidth * scale,
    height: cardHeight * scale,
    backgroundImage: `url(${cardsUrl})`,
    backgroundPosition: `${bgPos.x * scale}px ${bgPos.y * scale}px`,
    backgroundSize: `${cardWidth * 15 * scale}px ${cardHeight * 5 * scale}px`,
    position: 'relative',
    cursor: onClick ? 'pointer' : 'default',
    display: 'inline-block',
    ...style,
  };

  return (
    <div
      data-card={card.shortName}
      data-suit={card.suit}
      data-rank={card.rank}
      className="card"
      style={cardStyle}
      onClick={handleClick}
    />
  );
};
