# cards-react

React/TypeScript conversion of the cards.js library with enhanced Player support.

## Overview

This library is a complete rewrite of cards.js as React components while preserving all existing types and behaviors. It adds a new `Player` type with card visibility and scaling rules suitable for multiplayer card games.

## Installation

```bash
npm install
npm run build
```

## New Features

### Player Type

```typescript
export interface Player {
  id: string;           // Unique player identifier
  label: string;        // Player name or display label
  avatarUrl: string;    // Image URL for player avatar
  hand: Card[];         // Cards held by player (private)
  melds: Meld[];        // Played card groups (public)
  isSelf: boolean;      // True when this is the local player
}
```

### Card Visibility Rules

- **Hand cards**: Face-up only when `player.isSelf === true`, face-down for opponents
- **Meld cards**: Always face-up and visible to all players

### Opponent Scaling

Opponent cards render at 66% size by default (configurable via `opponentScale` prop).

## Components

### GameTable

Main component for rendering the game table with all players.

```tsx
import { GameTable, Player } from 'cards-react';

const players: Player[] = [
  {
    id: 'player1',
    label: 'Alice',
    avatarUrl: '/avatars/alice.png',
    hand: [...],
    melds: [],
    isSelf: true
  },
  // ... more players
];

<GameTable
  players={players}
  currentPlayerId="player1"
  cardWidth={69}
  cardHeight={94}
  opponentScale={0.66}
  onSelectCard={(card) => console.log('Selected:', card)}
/>
```

### PlayerArea

Renders an individual player's area with avatar, hand, and melds.

```tsx
import { PlayerArea, Player } from 'cards-react';

<PlayerArea
  player={player}
  cardSize={{ width: 69, height: 94, padding: 18 }}
  cardsUrl="img/cards.png"
  opponentScale={0.66}
  onSelectCard={(card) => handleCardSelect(card)}
/>
```

### CardView

Renders a single card with face-up or face-down display.

```tsx
import { CardView, Card } from 'cards-react';

<CardView
  card={card}
  faceDown={false}
  cardSize={{ width: 69, height: 94, padding: 18 }}
  cardsUrl="img/cards.png"
  scale={1}
/>
```

### MeldView

Renders a group of cards (meld).

```tsx
import { MeldView, Meld } from 'cards-react';

<MeldView
  meld={meld}
  cardSize={{ width: 69, height: 94, padding: 18 }}
  cardsUrl="img/cards.png"
  scale={1}
/>
```

## Utility Functions

Preserved from original cards.js:

```typescript
import { createDeck, shuffle, deal, sortCards } from 'cards-react';

// Create a standard 52-card deck
const deck = createDeck({ type: DeckType.STANDARD });

// Shuffle the deck
const shuffledDeck = shuffle(deck);

// Deal 7 cards to 4 players
const hands = deal(shuffledDeck, 7, 4);

// Sort cards by suit and rank
const sortedHand = sortCards(hands[0]);
```

## Preserved Types

All original types from cards.js are preserved:

- `Card` - Individual card with suit, rank, name
- `Suit` - Card suit ('h', 's', 'd', 'c', 'bj', 'rj')
- `Rank` - Card rank (numeric value)
- `CardSize` - Card dimensions configuration
- `CardOptions` - Deck creation options
- `DeckType` - Deck type constants (STANDARD, EUCHRE, PINOCHLE)

## Layout

The GameTable component automatically positions players around the table based on the number of players (2-8 supported). The layout logic is inspired by the Game Table reference implementation.

## Design Decisions

1. **Functional Components + Hooks**: All components use modern React patterns with functional components and hooks.

2. **Deterministic DOM Structure**: 
   - No random IDs or unstable keys
   - Consistent element ordering
   - Predictable class names for testing

3. **Type Safety**: 
   - Full TypeScript coverage
   - All props, state, and utilities are fully typed
   - No `any` types used

4. **CSS Sprite Preservation**: 
   - Original card rendering logic using CSS sprites preserved
   - Background positioning matches original cards.js exactly

5. **Scaling Implementation**: 
   - Uses CSS transforms for smooth scaling
   - Background-size adjusted for proper sprite rendering at different scales

6. **No External UI Framework**: 
   - Pure React without additional dependencies
   - Inline styles for simplicity and portability

## Building

```bash
npm run build
```

This generates TypeScript declarations and JavaScript modules in the `dist/` directory.

## Testing

The components maintain deterministic structure suitable for agent-based testing:
- Stable data attributes (`data-player-id`, `data-card`)
- Predictable CSS classes
- No randomization in rendering
