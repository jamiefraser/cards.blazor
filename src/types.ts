// Core card types based on existing cards.js library

export type Suit = 'h' | 's' | 'd' | 'c' | 'bj' | 'rj';

export type Card = {
  suit: Suit;
  rank: number;
  name: string;
  shortName: string;
  faceUp: boolean;
};

export type Meld = {
  id: string;
  cards: Card[];
  label?: string;
};

export type Player = {
  id: string;
  label: string;              // Player name or identifier
  avatarUrl: string;          // Image used to visually identify the player
  hand: Card[];               // Cards held by the player (faces visible only to this player)
  melds: Meld[];              // Played melds or individual cards (faces visible to all)
  isSelf: boolean;            // True when this player is the local user
};

export type DeckType = 'STANDARD' | 'EUCHRE' | 'PINOCHLE';

export type CardSize = {
  width: number;
  height: number;
  padding: number;
};

export type CardOptions = {
  cardSize?: CardSize;
  cardback?: 'red' | 'blue';
  acesHigh?: boolean;
  cardsUrl?: string;
  blackJoker?: boolean;
  redJoker?: boolean;
  type?: DeckType;
};

// Re-export for convenience
export type { Card as CardType };
