/**
 * Example usage of the cards-react library
 * 
 * This demonstrates how to use the GameTable component with the new Player type
 */

import React from 'react';
import { GameTable, Player, createDeck, shuffle, deal, DeckType } from './index';

export function ExampleGame() {
  // Create and shuffle a deck
  const deck = createDeck({ type: DeckType.STANDARD });
  const shuffledDeck = shuffle(deck);
  
  // Deal 7 cards to 4 players
  const hands = deal(shuffledDeck, 7, 4);
  
  // Create players with the new Player type
  const players: Player[] = [
    {
      id: 'player1',
      label: 'Alice',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
      hand: hands[0],
      melds: [
        // Example meld - three of a kind
        hands[0].slice(0, 3)
      ],
      isSelf: true
    },
    {
      id: 'player2',
      label: 'Bob',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
      hand: hands[1],
      melds: [],
      isSelf: false
    },
    {
      id: 'player3',
      label: 'Charlie',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
      hand: hands[2],
      melds: [],
      isSelf: false
    },
    {
      id: 'player4',
      label: 'Diana',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
      hand: hands[3],
      melds: [
        // Example meld - two pairs
        hands[3].slice(0, 2),
        hands[3].slice(2, 4)
      ],
      isSelf: false
    }
  ];
  
  const handleSelectCard = (card: any) => {
    console.log('Card selected:', card.name);
  };
  
  const handlePlayCard = (playerId: string, card: any) => {
    console.log('Card played by', playerId, ':', card.name);
  };
  
  return (
    <GameTable
      players={players}
      currentPlayerId="player1"
      cardWidth={69}
      cardHeight={94}
      cardPadding={18}
      opponentScale={0.66}
      cardsUrl="img/cards.png"
      cardback="red"
      onSelectCard={handleSelectCard}
      onPlayCard={handlePlayCard}
    />
  );
}

/**
 * Design Decisions:
 * 
 * 1. Player Type Implementation:
 *    - The new Player type includes all required fields (id, label, avatarUrl, hand, melds, isSelf)
 *    - isSelf property controls card visibility: face-up for self, face-down for opponents
 *    - Melds are always visible to all players
 * 
 * 2. Visibility Rules:
 *    - Implemented in PlayerArea component
 *    - Hand cards check player.isSelf to determine face-up/face-down
 *    - Meld cards always render face-up
 * 
 * 3. Scaling Rules:
 *    - Opponent cards render at opponentScale (default 0.66 = 66%)
 *    - Scale is applied to card dimensions and spacing
 *    - Background sprite positioning adjusted for scaled rendering
 * 
 * 4. Layout Logic:
 *    - GameTable positions players based on count (2-8 players)
 *    - Layout inspired by Game Table reference implementation
 *    - Positions calculated in getPlayerPositions() function
 *    - Uses absolute positioning with CSS transforms
 * 
 * 5. Preserved Functionality:
 *    - All original card types (Card, Suit, Rank) preserved
 *    - Utility functions (createDeck, shuffle, deal) match original behavior
 *    - Card rendering uses same CSS sprite technique as original
 *    - DeckType constants preserved (STANDARD, EUCHRE, PINOCHLE)
 * 
 * 6. React Patterns:
 *    - Functional components throughout
 *    - Typed props interfaces for all components
 *    - No class components (modern React)
 *    - Deterministic rendering (no random keys or IDs)
 * 
 * 7. Component Hierarchy:
 *    - GameTable (root) → PlayerArea (per player) → CardView/MeldView (cards)
 *    - Clear separation of concerns
 *    - Each component has single responsibility
 */
