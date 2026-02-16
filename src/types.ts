/**
 * Card suit types - preserved from original cards.js
 */
export type Suit = 'h' | 's' | 'd' | 'c' | 'bj' | 'rj';

/**
 * Card rank - numeric value (1-14 for Ace-King, 0 for Jokers)
 */
export type Rank = number;

/**
 * Individual card - preserved from original cards.js Card class
 */
export interface Card {
  suit: Suit;
  rank: Rank;
  name: string;
  shortName: string;
  faceUp: boolean;
}

/**
 * A meld is a group of cards that have been played together
 */
export type Meld = Card[];

/**
 * Player type - NEW requirement
 */
export interface Player {
  id: string;
  label: string; // Player name or identifier
  avatarUrl: string; // Image used to visually identify the player
  hand: Card[]; // Cards held by the player (faces visible only to this player)
  melds: Meld[]; // Played melds or individual cards (faces visible to all)
  isSelf: boolean; // True when this player is the local user
}

/**
 * Deck type constants - preserved from deckType.js
 */
export const DeckType = {
  STANDARD: 0,
  EUCHRE: 1,
  PINOCHLE: 2
} as const;

export type DeckTypeValue = typeof DeckType[keyof typeof DeckType];

/**
 * Card size configuration - preserved from original options
 */
export interface CardSize {
  width: number;
  height: number;
  padding: number;
}

/**
 * Options for initializing the card system - preserved from original
 */
export interface CardOptions {
  cardSize?: CardSize;
  animationSpeed?: number;
  cardback?: 'red' | 'blue';
  acesHigh?: boolean;
  cardsUrl?: string;
  blackJoker?: boolean;
  redJoker?: boolean;
  type?: DeckTypeValue;
  loop?: number;
}
