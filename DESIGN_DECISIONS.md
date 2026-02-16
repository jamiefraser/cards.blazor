# Design Decisions for React + TypeScript Conversion

## Overview
This document outlines the key design decisions made during the conversion of cards.js from a jQuery-based library to a React + TypeScript component library with multiplayer support.

## 1. Component Architecture

### GameTable (Main Component)
- **Purpose**: Root component that orchestrates the entire game table
- **Layout**: Distributes players around the table (top, sides, bottom)
- **Responsibility**: Handles player positioning and global event coordination

### PlayerArea (Player Container)
- **Purpose**: Renders a single player's complete area (avatar, hand, melds)
- **Layout**: Vertical flex layout with avatar at top, melds in middle, hand at bottom
- **Responsibility**: Applies player-specific visibility and scaling rules

### MeldView (Card Group)
- **Purpose**: Renders a collection of cards in a meld
- **Layout**: Horizontal overlapping cards with configurable padding
- **Responsibility**: Always renders cards face-up (melds are visible to all)

### CardView (Individual Card)
- **Purpose**: Renders a single playing card
- **Layout**: Uses CSS background-position for sprite sheet
- **Responsibility**: Handles face-up/face-down rendering and click events

## 2. Type System Design

### Player Type
```typescript
export type Player = {
  id: string;              // Stable identifier for React keys
  label: string;           // Display name
  avatarUrl: string;       // Visual identification
  hand: Card[];            // Private cards
  melds: Meld[];           // Public cards
  isSelf: boolean;         // Determines visibility and scaling
};
```

**Rationale**: 
- Separates public (melds) from private (hand) cards
- `isSelf` provides clear semantic meaning for visibility rules
- Includes visual elements (avatar) for rich UI

### Card Type
```typescript
export type Card = {
  suit: Suit;
  rank: number;
  name: string;
  shortName: string;
  faceUp: boolean;
};
```

**Rationale**: 
- Preserved from original library for compatibility
- `faceUp` maintained but overridden by visibility rules in components

### Meld Type
```typescript
export type Meld = {
  id: string;              // Deterministic identifier
  cards: Card[];           // Cards in the meld
  label?: string;          // Optional display label
};
```

**Rationale**: 
- Represents groups of played cards
- `id` ensures deterministic rendering
- `label` allows game-specific descriptions (e.g., "Three of a Kind")

## 3. Visibility Rules Implementation

### Hand Cards
- **Self Player**: `faceUp={player.isSelf}`
- **Opponent**: `faceUp={player.isSelf}` (evaluates to false)

**Rationale**: Simple boolean prop derived directly from player state

### Meld Cards
- **All Players**: `faceUp={true}` (hardcoded)

**Rationale**: Melds are always public information in card games

## 4. Scaling Implementation

### Calculation
```typescript
const scale = player.isSelf ? 1 : opponentScale;
```

### Application
- Applied to card dimensions: `width: cardWidth * scale`
- Applied to background-size: `backgroundSize: ${cardWidth * 15 * scale}px`
- Applied to spacing: `padding: 18 * scale`

**Rationale**: 
- Uniform scaling maintains aspect ratio and sprite alignment
- Applied to all dimensions ensures consistent appearance
- Configurable via prop for different game layouts

## 5. Rendering Strategy

### CSS-in-JS
- **Choice**: Inline styles via React style prop
- **Rationale**: 
  - No external style dependencies
  - Dynamic scaling requires computed values
  - Component encapsulation
  - No CSS specificity conflicts

### Background Sprites
- **Choice**: CSS background-position for card faces
- **Rationale**: 
  - Preserves original sprite sheet approach
  - Single image load for all cards
  - Efficient rendering

### Deterministic Keys
```tsx
key={`${player.id}-hand-${card.shortName}-${index}`}
```

**Rationale**: 
- Stable keys prevent unnecessary re-renders
- Includes context (player, area, card) for uniqueness
- Index used as last resort for cards with duplicate suits/ranks

## 6. Event Handling

### Dual Callbacks
```typescript
onPlayCard?: (playerId: string, card: Card) => void;
onSelectCard?: (card: Card) => void;
```

**Rationale**: 
- `onPlayCard`: Game-level actions (requires player context)
- `onSelectCard`: UI-level actions (card highlighting, inspection)
- Separation of concerns allows flexible usage

### Event Propagation
- Card clicks handled at CardView level
- Propagated up through PlayerArea to GameTable
- GameTable determines appropriate callback

**Rationale**: 
- CardView remains reusable and context-agnostic
- GameTable has full game state for decision-making

## 7. Utility Functions

### createDeck
- Returns new array (immutable)
- Supports all original deck types
- Maintains original card numbering

**Rationale**: 
- Immutability aligns with React best practices
- Backwards compatible with original library

### shuffle
- Returns new shuffled array (immutable)
- Fisher-Yates algorithm (same as original)

**Rationale**: 
- Immutability prevents accidental mutations
- Proven algorithm from original library

## 8. Layout Strategy

### Player Distribution
```typescript
const topOpponents = otherPlayers.slice(0, Math.ceil(otherPlayers.length / 2));
const sideOpponents = otherPlayers.slice(Math.ceil(otherPlayers.length / 2));
```

**Rationale**: 
- Automatic distribution for 1-4 players
- Self always at bottom (ergonomic for interaction)
- Opponents distributed top and sides
- Scales gracefully with player count

### Flexbox Layout
- GameTable: `flexDirection: 'column'` for vertical distribution
- PlayerArea: `flexDirection: 'column'` for vertical stacking
- Hand/Melds: `flexDirection: 'row'` for horizontal cards

**Rationale**: 
- Modern, responsive layout
- No absolute positioning (easier to maintain)
- Gracefully handles different screen sizes

## 9. TypeScript Configuration

### Strict Mode
- All strict checks enabled
- No implicit any
- Strict null checks

**Rationale**: 
- Maximum type safety
- Better IDE support
- Catch errors at compile time

### Module System
- ESNext modules
- ES2020 target

**Rationale**: 
- Modern JavaScript features
- Tree-shakeable exports
- Better developer experience

## 10. Preservation of Original Logic

### Card Positioning
- Background-position calculations preserved exactly
- Sprite offsets unchanged

### Deck Creation
- Start/end rank logic preserved
- Suit iteration order preserved

### Shuffle Algorithm
- Fisher-Yates implementation preserved

**Rationale**: 
- Proven, tested logic
- Maintains visual consistency
- Reduces conversion risk

## 11. Testing Considerations

### Data Attributes
```tsx
data-player-id={player.id}
data-is-self={isSelf}
data-card={card.shortName}
data-meld-id={meld.id}
```

**Rationale**: 
- Enables agent-based testing
- Provides semantic hooks for tests
- Independent of styling changes

### Deterministic Rendering
- No random IDs generated
- No timestamp-based keys
- Stable component order

**Rationale**: 
- Predictable test outcomes
- Easier visual regression testing
- Reproducible bugs

## 12. Future Extensibility

### Configurable Props
- `opponentScale`: Adjustable scaling
- `cardsUrl`: Custom card images
- Callbacks: Flexible event handling

**Rationale**: 
- Different games have different needs
- Custom themes and styling
- Various game rules and interactions

### Component Composition
- Each component independently usable
- CardView can be used standalone
- MeldView can be used in other contexts

**Rationale**: 
- Reusability across different games
- Testing individual components
- Building custom layouts

## Summary

The conversion maintains the core strength of the original cards.js library (efficient card rendering and manipulation) while adding modern React patterns, TypeScript safety, and multiplayer features. The design prioritizes:

1. **Type Safety**: Full TypeScript coverage
2. **Immutability**: Pure functions, no mutations
3. **Determinism**: Stable keys and IDs for testing
4. **Flexibility**: Configurable scaling, events, and layout
5. **Preservation**: Original card logic and algorithms maintained
6. **Modern Patterns**: Functional components, hooks, CSS-in-JS

The result is a fully-featured card game library that can support multiplayer games with proper visibility rules while maintaining backwards compatibility with the original library's core concepts.
