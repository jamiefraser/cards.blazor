# Cards.js React + TypeScript

A React + TypeScript rewrite of the cards.js library for building card games. This library preserves all existing card logic while adding new multiplayer features with player-specific visibility rules.

## Features

- 🎴 Complete card deck management (Standard, Euchre, Pinochle)
- ⚛️ React functional components with TypeScript
- 👥 Multiplayer support with player-specific visibility
- 🔍 Smart card visibility (face-up for self, face-down for opponents)
- 📏 Configurable opponent scaling (default 66%)
- 🎯 Deterministic rendering for agent-based testing
- 🔄 Preserves all original card logic and utilities

## Installation

```bash
npm install cards-react
```

## Quick Start

```tsx
import React from 'react';
import { GameTable, Player, createDeck, shuffle } from 'cards-react';

function MyCardGame() {
  const deck = shuffle(createDeck('STANDARD'));
  
  const players: Player[] = [
    {
      id: 'player-1',
      label: 'You',
      avatarUrl: '/avatar1.png',
      hand: deck.slice(0, 7),
      melds: [],
      isSelf: true,
    },
    {
      id: 'player-2',
      label: 'Opponent',
      avatarUrl: '/avatar2.png',
      hand: deck.slice(7, 14),
      melds: [],
      isSelf: false,
    },
  ];

  return (
    <GameTable
      players={players}
      currentPlayerId="player-1"
      cardWidth={69}
      cardHeight={94}
      cardsUrl="img/cards.png"
      onSelectCard={(card) => console.log('Selected:', card)}
    />
  );
}
```

## Core Types

### Player Type

The new `Player` type is the foundation of multiplayer support:

```typescript
export type Player = {
  id: string;              // Unique player identifier
  label: string;           // Player name or identifier
  avatarUrl: string;       // Image URL for player avatar
  hand: Card[];            // Cards held by the player
  melds: Meld[];           // Played melds (visible to all)
  isSelf: boolean;         // True for the local player
};
```

### Card Type

```typescript
export type Card = {
  suit: 'h' | 's' | 'd' | 'c' | 'bj' | 'rj';
  rank: number;
  name: string;
  shortName: string;
  faceUp: boolean;
};
```

### Meld Type

```typescript
export type Meld = {
  id: string;
  cards: Card[];
  label?: string;
};
```

## Components

### GameTable

Main component that renders all players around a game table.

```tsx
<GameTable
  players={players}
  currentPlayerId="player-1"
  opponentScale={0.66}     // Optional, default 0.66
  cardWidth={69}
  cardHeight={94}
  cardsUrl="img/cards.png"
  onPlayCard={(playerId, card) => {}}
  onSelectCard={(card) => {}}
/>
```

**Props:**
- `players: Player[]` - Array of all players
- `currentPlayerId: string` - ID of the current player (self)
- `opponentScale?: number` - Scale factor for opponent cards (default: 0.66)
- `cardWidth: number` - Base width for self player's cards
- `cardHeight: number` - Base height for self player's cards
- `cardsUrl?: string` - URL to card sprite sheet
- `onPlayCard?: (playerId: string, card: Card) => void` - Callback when a card is played
- `onSelectCard?: (card: Card) => void` - Callback when a card is selected

### PlayerArea

Renders a single player's hand and melds.

```tsx
<PlayerArea
  player={player}
  cardWidth={69}
  cardHeight={94}
  scale={1}
  onCardClick={(card) => {}}
/>
```

### CardView

Renders an individual playing card.

```tsx
<CardView
  card={card}
  faceUp={true}
  cardWidth={69}
  cardHeight={94}
  scale={1}
  onClick={(card) => {}}
/>
```

### MeldView

Renders a group of cards (meld).

```tsx
<MeldView
  meld={meld}
  cardWidth={69}
  cardHeight={94}
  scale={1}
  onCardClick={(card) => {}}
/>
```

## Utility Functions

### createDeck

Creates a deck of cards based on the specified type.

```typescript
const deck = createDeck('STANDARD', {
  acesHigh: false,
  blackJoker: true,
  redJoker: true,
  loop: 1,
});
```

**Deck Types:**
- `STANDARD` - 52-card deck (Ace through King)
- `EUCHRE` - 24-card deck (9 through Ace)
- `PINOCHLE` - 48-card deck (9 through Ace, doubled)

### shuffle

Shuffles an array of cards using Fisher-Yates algorithm.

```typescript
const shuffledDeck = shuffle(deck);
```

### createCard

Creates a single card.

```typescript
const card = createCard('h', 10); // 10 of hearts
```

## Visibility Rules

### Hand Cards
- **Self Player (`isSelf: true`)**: Cards rendered face-up
- **Opponents (`isSelf: false`)**: Cards rendered face-down

### Melds
- Always rendered face-up for all players

## Scaling Rules

### Self Player
- Cards rendered at 100% scale (base `cardWidth` and `cardHeight`)

### Opponents
- Cards rendered at configurable scale (default 66%)
- Applied to both hand cards and meld cards
- Configurable via `opponentScale` prop

## Advanced Usage

### Custom Scaling

```tsx
<GameTable
  players={players}
  currentPlayerId="player-1"
  opponentScale={0.5}  // 50% size for opponents
  cardWidth={69}
  cardHeight={94}
/>
```

### Event Handling

```tsx
const handlePlayCard = (playerId: string, card: Card) => {
  // Update game state
  console.log(`${playerId} played ${card.name}`);
};

const handleSelectCard = (card: Card) => {
  // Highlight selected card
  setSelectedCard(card);
};

<GameTable
  players={players}
  currentPlayerId="player-1"
  onPlayCard={handlePlayCard}
  onSelectCard={handleSelectCard}
  {...otherProps}
/>
```

## Deterministic Rendering

All components use deterministic keys and data attributes for testing:

```tsx
// Player areas have data attributes
<div data-player-id="player-1" data-is-self="true">

// Cards have data attributes
<div data-card="h10" data-suit="h" data-rank="10">

// Melds have data attributes
<div data-meld-id="meld-1">
```

## Migration from Original cards.js

### Before (jQuery)
```javascript
cards.init({table:'#card-table'});
const deck = new cards.Deck();
deck.addCards(cards.all);
deck.render({immediate:true});
```

### After (React)
```tsx
const deck = createDeck('STANDARD');
const players = [{
  id: 'player-1',
  hand: deck.slice(0, 7),
  // ...
}];
<GameTable players={players} {...props} />
```

## Design Decisions

1. **Functional Components**: Uses React functional components with hooks for modern React patterns
2. **Type Safety**: Fully typed with TypeScript for better developer experience
3. **Immutability**: Uses immutable patterns (e.g., `shuffle` returns new array)
4. **No External UI Frameworks**: Pure React without additional dependencies
5. **Preserved Logic**: All card positioning, shuffling, and dealing logic preserved from original
6. **Deterministic Keys**: All components use stable, deterministic keys for testing
7. **CSS-in-JS**: Inline styles for component encapsulation and dynamic scaling

## Browser Support

- Modern browsers with ES2020 support
- React 18+
- TypeScript 5+

## License

MIT License (same as original cards.js)

## Credits

- Original cards.js library by Einar Egilsson
- Card images by Nicu Buculei (public domain)
- React + TypeScript conversion
