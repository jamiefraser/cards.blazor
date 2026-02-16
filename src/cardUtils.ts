// Card utility functions based on existing cards.js library
import { Card, Suit, DeckType } from './types';

/**
 * Creates a new card with the given suit and rank
 */
export function createCard(suit: Suit, rank: number): Card {
  const shortName = suit + rank;
  const name = suit.toUpperCase() + rank;
  
  return {
    suit,
    rank,
    name,
    shortName,
    faceUp: false,
  };
}

/**
 * Creates a full deck of cards based on deck type
 */
export function createDeck(
  type: DeckType = 'STANDARD',
  options: {
    acesHigh?: boolean;
    blackJoker?: boolean;
    redJoker?: boolean;
    loop?: number;
  } = {}
): Card[] {
  const cards: Card[] = [];
  const loop = options.loop || 1;
  let start = 1;
  let end = 13;

  switch (type) {
    case 'STANDARD':
      start = options.acesHigh ? 2 : 1;
      end = start + 12;
      break;
    case 'EUCHRE':
      start = 9;
      end = start + 5;
      break;
    case 'PINOCHLE':
      start = 9;
      end = start + 5;
      break;
  }

  for (let l = 0; l < loop; l++) {
    for (let i = start; i <= end; i++) {
      cards.push(createCard('h', i));
      cards.push(createCard('s', i));
      cards.push(createCard('d', i));
      cards.push(createCard('c', i));
    }
  }

  if (options.blackJoker) {
    cards.push(createCard('bj', 0));
  }
  if (options.redJoker) {
    cards.push(createCard('rj', 0));
  }

  return cards;
}

/**
 * Shuffles an array of cards using Fisher-Yates algorithm
 */
export function shuffle<T>(deck: T[]): T[] {
  const shuffled = [...deck];
  let i = shuffled.length;
  if (i === 0) return shuffled;
  
  while (--i) {
    const j = Math.floor(Math.random() * (i + 1));
    const tempi = shuffled[i];
    const tempj = shuffled[j];
    shuffled[i] = tempj;
    shuffled[j] = tempi;
  }
  
  return shuffled;
}

/**
 * Gets the background position for a card sprite
 */
export function getCardBackgroundPosition(
  card: Card,
  cardSize: { width: number; height: number }
): { x: number; y: number } {
  const offsets: Record<string, number> = {
    'c': 0,
    'd': 1,
    'h': 2,
    's': 3,
    'rj': 2,
    'bj': 3,
  };

  let rank = card.rank;
  if (rank === 14) {
    rank = 1; // Aces high must work as well
  }

  const x = -rank * cardSize.width;
  const y = -offsets[card.suit] * cardSize.height;

  return { x, y };
}

/**
 * Gets the background position for card back
 */
export function getCardBackPosition(
  cardback: 'red' | 'blue',
  cardSize: { width: number; height: number }
): { x: number; y: number } {
  const y = cardback === 'red' ? 0 : -cardSize.height;
  return { x: 0, y };
}
