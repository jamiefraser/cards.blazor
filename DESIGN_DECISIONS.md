# Design Decisions - cards.js to React Conversion

## Overview

This document explains the design decisions made when converting the jQuery-based cards.js library to React/TypeScript while adding the new Player type and related functionality.

## Architecture

### Component Hierarchy

```
GameTable (Root Component)
  └── PlayerArea (One per player)
        ├── Avatar + Label Display
        ├── Hand (CardView components)
        └── Melds (MeldView components)
              └── CardView (Individual cards)
```

**Rationale**: This hierarchy provides clear separation of concerns and matches the domain model (game → players → cards).

### Functional Components

All components are implemented as functional React components using TypeScript.

**Rationale**:
- Modern React best practice
- Better TypeScript integration
- Simpler than class components
- Easier to test and reason about

## Type System

### Preserved Types

All original types from cards.js were preserved:

```typescript
- Card (suit, rank, name, shortName, faceUp)
- Suit ('h', 's', 'd', 'c', 'bj', 'rj')
- Rank (number)
- CardSize (width, height, padding)
- CardOptions (initialization options)
- DeckType (STANDARD, EUCHRE, PINOCHLE)
```

**Rationale**: Maintains backward compatibility and preserves domain logic.

### New Player Type

```typescript
interface Player {
  id: string;
  label: string;
  avatarUrl: string;
  hand: Card[];
  melds: Meld[];
  isSelf: boolean;
}
```

**Rationale**: 
- `id`: Unique identifier for React keys and game logic
- `label`: Human-readable player name
- `avatarUrl`: Visual identification
- `hand`: Private cards (visibility controlled by isSelf)
- `melds`: Public card groups (always visible)
- `isSelf`: Boolean flag controlling visibility (simpler than role-based system)

## Card Visibility Implementation

### Hand Cards

```typescript
<CardView
  card={card}
  faceDown={!player.isSelf}
  // ...
/>
```

**Rationale**: Simple boolean check in PlayerArea component. Face-down rendering handled by CardView using the same sprite technique as original library.

### Meld Cards

```typescript
<CardView
  card={card}
  faceDown={false}  // Always face-up
  // ...
/>
```

**Rationale**: Melds represent played cards visible to all players. Always rendered face-up regardless of player.isSelf.

## Scaling Implementation

### Scale Calculation

```typescript
const scale = player.isSelf ? 1 : opponentScale;
```

**Rationale**: 
- Simple conditional based on isSelf
- Default 0.66 (66%) provides good visual hierarchy
- Configurable via prop for different game layouts

### CSS Scaling

```typescript
backgroundSize: scale !== 1 ? `${100 / scale}%` : undefined
```

**Rationale**: 
- Adjusts sprite background to maintain correct card faces at different scales
- Only applied when scale !== 1 for performance
- CSS transform-based scaling is smooth and performant

## Card Rendering

### CSS Sprite Preservation

The original cards.js used CSS background positioning to render cards from a sprite sheet. This technique was preserved:

```typescript
const xpos = -rank * cardSize.width;
const ypos = -offsets[card.suit] * cardSize.height;
return `${xpos}px ${ypos}px`;
```

**Rationale**:
- Maintains compatibility with existing card sprite images
- Efficient rendering (single image file)
- Proven approach from original library
- No need to create individual card image files

### Face-Down Rendering

```typescript
const y = cardback === 'red' ? 0 : -1 * cardSize.height;
return `0px ${y}px`;
```

**Rationale**: Uses the same sprite sheet technique for card backs, supporting both red and blue backs.

## Layout System

### Position Calculation

The GameTable component calculates player positions based on the number of players (2-8):

```typescript
const getPlayerPositions = () => {
  switch (numPlayers) {
    case 2: // Top and bottom
    case 3: // Top-left, top-right, bottom
    case 4: // Top, right, bottom, left (compass)
    // ... etc
  }
}
```

**Rationale**:
- Inspired by Game Table reference implementation
- Deterministic positioning (no randomness)
- Supports common game configurations (2-8 players)
- Falls back to circular arrangement for other counts
- Uses CSS absolute positioning + transforms for precise control

## Deterministic Structure

### No Random IDs

```typescript
key={`hand-${card.shortName}-${index}`}
```

**Rationale**: Uses predictable keys based on card properties and position. Enables reliable testing and debugging.

### Stable Data Attributes

```typescript
data-player-id={player.id}
data-card={card ? card.name : 'back'}
```

**Rationale**: Provides hooks for automated testing and debugging tools.

### Consistent Class Names

```typescript
className="game-table"
className="player-area"
className="player-hand"
className="card"
```

**Rationale**: Simple, predictable class names for styling and testing.

## Utility Functions

### Preserved Functions

All utility functions from original cards.js were preserved:

```typescript
- createDeck(): Creates a deck based on options
- shuffle(): Fisher-Yates shuffle algorithm
- deal(): Distributes cards to hands
- sortCards(): Sorts by suit and rank (NEW)
```

**Rationale**: 
- Maintains API compatibility
- Preserves battle-tested algorithms
- sortCards added as common utility for card games

### Immutable Operations

```typescript
export function shuffle<T>(array: T[]): T[] {
  const deck = [...array];  // Create copy
  // ... shuffle logic
  return deck;
}
```

**Rationale**: 
- Follows React best practices (immutability)
- Prevents unintended side effects
- Makes functions pure and testable

## Styling Approach

### Inline Styles

Components use inline styles rather than CSS classes:

```typescript
const cardStyle: CSSProperties = {
  width: cardSize.width * scale,
  height: cardSize.height * scale,
  // ...
};
```

**Rationale**:
- No external dependencies
- Dynamic values (scale, positions) easier to manage
- Styles co-located with component logic
- Portable across different build systems
- TypeScript type checking for style objects

## Props Design

### GameTable Props

```typescript
interface GameTableProps {
  players: Player[];
  currentPlayerId: string;
  opponentScale?: number;
  cardWidth: number;
  cardHeight: number;
  cardPadding?: number;
  cardsUrl?: string;
  cardback?: 'red' | 'blue';
  onPlayCard?: (playerId: string, card: Card) => void;
  onSelectCard?: (card: Card) => void;
}
```

**Rationale**:
- Required props: players, currentPlayerId, cardWidth, cardHeight (essential)
- Optional props: have sensible defaults
- Event handlers optional (not all games need them)
- Follows React conventions (onEventName pattern)

## Event Handling

### Card Selection

```typescript
onSelectCard={player.isSelf && onSelectCard ? () => onSelectCard(card) : undefined}
```

**Rationale**:
- Only self player can select cards (common game pattern)
- Event propagation handled at leaf level (CardView)
- Parent components control behavior via props

## Type Safety

### No Any Types

Every prop, state, and function parameter is fully typed:

```typescript
export const CardView: React.FC<CardViewProps> = ({ ... }) => { ... }
```

**Rationale**:
- Catches errors at compile time
- Provides IDE autocomplete
- Self-documenting code
- Enforces API contracts

### Strict TypeScript

tsconfig.json uses strict mode:

```json
{
  "strict": true
}
```

**Rationale**: Maximum type safety and error catching.

## Build System

### TypeScript Compilation

```json
{
  "target": "ES2020",
  "module": "ESNext",
  "jsx": "react-jsx"
}
```

**Rationale**:
- ES2020: Modern JavaScript features
- ESNext modules: Tree-shaking support
- react-jsx: New JSX transform (no React import needed)

### Output Structure

```
dist/
  ├── *.js          (Compiled JavaScript)
  ├── *.d.ts        (Type definitions)
  └── *.map         (Source maps)
```

**Rationale**: 
- JavaScript for runtime
- Type definitions for TypeScript consumers
- Source maps for debugging

## Testing Considerations

### Deterministic Rendering

- No Math.random() in render logic
- Stable keys based on data
- Predictable DOM structure

**Rationale**: Enables reliable automated testing.

### Data Attributes

```typescript
data-player-id={player.id}
data-card={card.name}
```

**Rationale**: Provides test hooks without polluting component API.

## Performance

### Minimal Re-renders

Components use primitive props where possible:

```typescript
scale={scale}  // number
faceDown={!player.isSelf}  // boolean
```

**Rationale**: React can optimize re-renders with primitive prop comparison.

### CSS Sprites

Using background positioning instead of individual image tags:

**Rationale**:
- Single HTTP request for all cards
- Faster initial load
- Less memory usage

## Extensibility

### Component Props

All components accept style props for customization:

```typescript
style?: CSSProperties;
```

**Rationale**: Allows consumers to override styles without forking.

### Scale Prop

Scale is configurable at multiple levels:

```typescript
opponentScale?: number;  // GameTable
scale?: number;          // CardView, MeldView, PlayerArea
```

**Rationale**: Flexibility for different game layouts and screen sizes.

## Compatibility

### Preserved Constants

```typescript
export const DeckType = {
  STANDARD: 0,
  EUCHRE: 1,
  PINOCHLE: 2
} as const;
```

**Rationale**: Maintains compatibility with code expecting these values.

### Preserved Card Structure

```typescript
interface Card {
  suit: Suit;
  rank: Rank;
  name: string;        // e.g., "H7"
  shortName: string;   // e.g., "h7"
  faceUp: boolean;
}
```

**Rationale**: Existing code working with Card objects will continue to work.

## Summary

The conversion preserves all existing functionality while adding React-specific patterns and the new Player type. Key principles:

1. **Preserve existing types and logic**
2. **Use modern React patterns** (functional components, hooks)
3. **Maintain deterministic structure** (for testing)
4. **Full TypeScript type safety**
5. **Configurable but with sensible defaults**
6. **No external dependencies** (except React)
7. **Performance-conscious** (CSS sprites, minimal re-renders)
8. **Extensible** (style props, configurable behavior)
