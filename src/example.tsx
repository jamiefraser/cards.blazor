import React, { useState } from 'react';
import {
  GameTable,
  Player,
  Card,
  createDeck,
  shuffle,
  GameTableProps,
} from './index';

/**
 * Example usage of the GameTable component
 */
export const GameTableExample: React.FC = () => {
  // Create a shuffled deck
  const deck = shuffle(createDeck('STANDARD'));
  
  // Initialize players
  const [players] = useState<Player[]>([
    {
      id: 'player-1',
      label: 'You',
      avatarUrl: 'https://via.placeholder.com/40/4CAF50/FFFFFF?text=P1',
      hand: deck.slice(0, 7),
      melds: [
        {
          id: 'meld-1',
          cards: deck.slice(52, 55),
          label: 'Three of a Kind',
        },
      ],
      isSelf: true,
    },
    {
      id: 'player-2',
      label: 'Opponent 1',
      avatarUrl: 'https://via.placeholder.com/40/FF5722/FFFFFF?text=P2',
      hand: deck.slice(7, 14),
      melds: [],
      isSelf: false,
    },
    {
      id: 'player-3',
      label: 'Opponent 2',
      avatarUrl: 'https://via.placeholder.com/40/2196F3/FFFFFF?text=P3',
      hand: deck.slice(14, 21),
      melds: [
        {
          id: 'meld-3',
          cards: deck.slice(55, 58),
          label: 'Straight',
        },
      ],
      isSelf: false,
    },
    {
      id: 'player-4',
      label: 'Opponent 3',
      avatarUrl: 'https://via.placeholder.com/40/FFC107/000000?text=P4',
      hand: deck.slice(21, 28),
      melds: [],
      isSelf: false,
    },
  ]);

  const handlePlayCard = (playerId: string, card: Card) => {
    console.log(`Player ${playerId} played card:`, card);
  };

  const handleSelectCard = (card: Card) => {
    console.log('Selected card:', card);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Card Game Table Example</h1>
      <GameTable
        players={players}
        currentPlayerId="player-1"
        cardWidth={69}
        cardHeight={94}
        opponentScale={0.66}
        cardsUrl="img/cards.png"
        onPlayCard={handlePlayCard}
        onSelectCard={handleSelectCard}
      />
    </div>
  );
};

// Example demonstrating custom scaling
export const CustomScaleExample: React.FC = () => {
  const deck = shuffle(createDeck('STANDARD'));
  
  const [players] = useState<Player[]>([
    {
      id: 'player-1',
      label: 'You',
      avatarUrl: 'https://via.placeholder.com/40/4CAF50/FFFFFF?text=P1',
      hand: deck.slice(0, 5),
      melds: [],
      isSelf: true,
    },
    {
      id: 'player-2',
      label: 'Opponent',
      avatarUrl: 'https://via.placeholder.com/40/FF5722/FFFFFF?text=P2',
      hand: deck.slice(5, 10),
      melds: [],
      isSelf: false,
    },
  ]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Custom Opponent Scale (50%)</h1>
      <GameTable
        players={players}
        currentPlayerId="player-1"
        cardWidth={69}
        cardHeight={94}
        opponentScale={0.5}
        cardsUrl="img/cards.png"
      />
    </div>
  );
};

export default GameTableExample;
