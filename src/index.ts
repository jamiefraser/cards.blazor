/**
 * cards-react - React/TypeScript conversion of cards.js
 * 
 * This library preserves all existing types and functionality from the original
 * cards.js library while adding new React components and Player type support.
 */

// Export all types
export type { 
  Card, 
  Suit, 
  Rank, 
  Meld, 
  Player,
  CardSize,
  CardOptions,
  DeckTypeValue 
} from './types';

export { DeckType } from './types';

// Export components
export { CardView } from './CardView';
export type { CardViewProps } from './CardView';

export { MeldView } from './MeldView';
export type { MeldViewProps } from './MeldView';

export { PlayerArea } from './PlayerArea';
export type { PlayerAreaProps } from './PlayerArea';

export { GameTable } from './GameTable';
export type { GameTableProps } from './GameTable';

// Export utility functions
export { 
  createCard,
  createDeck,
  shuffle,
  deal,
  sortCards 
} from './utils';
