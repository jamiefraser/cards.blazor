import { Card, Suit, Rank, DeckType, DeckTypeValue, CardOptions } from './types';

/**
 * Utility functions - preserve original cards.js functionality
 */

/**
 * Create a card object
 */
export function createCard(suit: Suit, rank: Rank): Card {
  const shortName = suit + rank;
  const name = suit.toUpperCase() + rank;
  
  return {
    suit,
    rank,
    name,
    shortName,
    faceUp: false
  };
}

/**
 * Create a complete deck of cards based on options
 * Preserved from original init() function
 */
export function createDeck(options: CardOptions = {}): Card[] {
  const {
    type = DeckType.STANDARD,
    acesHigh = false,
    blackJoker = false,
    redJoker = false,
    loop = 1
  } = options;

  let start = 1;
  let end = 13;

  switch (type) {
    case DeckType.STANDARD:
      start = acesHigh ? 2 : 1;
      end = start + 12;
      break;
    case DeckType.EUCHRE:
      start = 9;
      end = start + 5;
      break;
    case DeckType.PINOCHLE:
      start = 9;
      end = start + 5;
      break;
  }

  const deck: Card[] = [];

  // Create cards for each loop iteration (Pinochle has loop=2)
  for (let l = 0; l < loop; l++) {
    for (let i = start; i <= end; i++) {
      deck.push(createCard('h', i));
      deck.push(createCard('s', i));
      deck.push(createCard('d', i));
      deck.push(createCard('c', i));
    }
  }

  // Add jokers if specified
  if (blackJoker) {
    deck.push(createCard('bj', 0));
  }
  if (redJoker) {
    deck.push(createCard('rj', 0));
  }

  return deck;
}

/**
 * Shuffle an array of cards using Fisher-Yates algorithm
 * Preserved from original shuffle() function
 */
export function shuffle<T>(array: T[]): T[] {
  const deck = [...array];
  let i = deck.length;
  if (i === 0) return deck;
  
  while (--i) {
    const j = Math.floor(Math.random() * (i + 1));
    const tempi = deck[i];
    const tempj = deck[j];
    deck[i] = tempj;
    deck[j] = tempi;
  }
  
  return deck;
}

/**
 * Deal cards from a deck to multiple hands
 * Preserved from original Deck.deal() function
 */
export function deal(deck: Card[], count: number, numHands: number): Card[][] {
  const hands: Card[][] = Array.from({ length: numHands }, () => []);
  const deckCopy = [...deck];
  
  let cardIndex = 0;
  const totalCards = count * numHands;
  
  for (let i = 0; i < totalCards && deckCopy.length > 0; i++) {
    const card = deckCopy.pop()!;
    hands[i % numHands].push(card);
    cardIndex++;
  }
  
  return hands;
}

/**
 * Sort cards by suit and rank
 */
export function sortCards(cards: Card[]): Card[] {
  const suitOrder: Record<Suit, number> = {
    'c': 0,
    'd': 1,
    'h': 2,
    's': 3,
    'bj': 4,
    'rj': 5
  };
  
  return [...cards].sort((a, b) => {
    if (suitOrder[a.suit] !== suitOrder[b.suit]) {
      return suitOrder[a.suit] - suitOrder[b.suit];
    }
    return a.rank - b.rank;
  });
}
