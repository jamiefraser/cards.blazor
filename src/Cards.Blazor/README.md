# Cards.Blazor

A modern C#/.NET Blazor WebAssembly reimplementation of the cards.js JavaScript library for building card games.

## Overview

Cards.Blazor is a production-quality, idiomatic C#/.NET implementation of the popular cards.js library. It provides a complete card game framework that can be embedded as a Blazor WebAssembly web component in any web application, including non-Blazor pages.

## Features

- **Full Feature Parity**: All functionality from cards.js has been reimplemented
- **Idiomatic C#/.NET**: Clean, maintainable code using C# 10+ features and .NET best practices
- **Web Component Support**: Can be embedded as a custom element in any HTML page
- **Multiple Deck Types**: Support for Standard (52-card), Euchre, and Pinochle decks
- **Card Containers**: Deck, Hand, and Pile implementations for organizing cards
- **Animations**: Smooth CSS-based animations for card movements
- **Event System**: Full event handling for card interactions (clicks, mouse events)
- **Type Safety**: Strong typing throughout with clear models and services

## Architecture

### Project Structure

```
Cards.Blazor/
├── Models/               # Domain models
│   ├── Card.cs          # Playing card model
│   ├── CardContainer.cs # Base container class
│   ├── CardOptions.cs   # Configuration options
│   ├── CardSize.cs      # Card dimensions
│   ├── Deck.cs          # Stacked deck container
│   ├── DeckType.cs      # Deck type enum
│   ├── Hand.cs          # Spread hand container
│   └── Pile.cs          # Pile container
├── Services/
│   └── CardService.cs   # State management service
├── Components/
│   └── CardsComponent.razor # Main Blazor component
└── wwwroot/
    └── img/             # Card sprite images
```

### Key Classes

#### CardService
Manages the card game state, including:
- Card initialization and shuffling
- Deck type configuration (Standard, Euchre, Pinochle)
- Z-index management for card layering
- Factory methods for creating containers

#### Card
Represents a playing card with:
- Suit (hearts, spades, diamonds, clubs, jokers)
- Rank (1-13, or 0 for jokers)
- Position and animation properties
- Face up/down state

#### CardContainer (Abstract Base)
Base class for card collections with:
- Add/remove card operations
- Position calculation (abstract method)
- Event handling (click, mouse down/up)
- Container-specific rendering logic

#### Deck, Hand, Pile
Concrete implementations of CardContainer:
- **Deck**: Cards stacked with slight offset
- **Hand**: Cards spread horizontally with padding
- **Pile**: All cards in same position

## Usage

### As a Blazor Component

```razor
@page "/"
@using Cards.Blazor.Components
@using Cards.Blazor.Models
@using Cards.Blazor.Services
@inject CardService CardService

<CardsComponent 
    Options="@_options" 
    Containers="@_containers" 
    OnComponentInitialized="@OnInitialized" />

@code {
    private CardOptions _options = new()
    {
        TableWidth = 600,
        TableHeight = 400,
        DeckType = DeckType.Standard
    };

    private List<CardContainer> _containers = new();
    
    private void OnInitialized()
    {
        // Create deck
        var deck = CardService.CreateDeck();
        deck.AddCards(CardService.AllCards);
        deck.CalculatePositions(_options);
        
        _containers.Add(deck);
    }
}
```

### As a Web Component in Plain HTML

```html
<!DOCTYPE html>
<html>
<head>
    <base href="/" />
    <script src="_framework/blazor.webassembly.js"></script>
</head>
<body>
    <!-- The custom element is automatically registered -->
    <cards-component></cards-component>
</body>
</html>
```

### Configuration Options

```csharp
var options = new CardOptions
{
    TableWidth = 600,           // Table width in pixels
    TableHeight = 400,          // Table height in pixels
    AnimationSpeed = 500,       // Animation duration in ms
    CardBack = "red",           // Card back color: "red" or "blue"
    DeckType = DeckType.Standard, // Standard, Euchre, or Pinochle
    AcesHigh = false,          // Whether Aces are high (rank 14)
    BlackJoker = false,        // Include black joker
    RedJoker = false,          // Include red joker
    CardsUrl = "img/cards.png" // Path to card sprite image
};
```

### Event Handling

```csharp
// Handle card clicks on a container
deck.CardClicked += (sender, card) =>
{
    // Do something when a card in the deck is clicked
    if (card == deck.TopCard())
    {
        hand.AddCard(card);
        hand.CalculatePositions(options);
    }
};
```

### Dealing Cards

```csharp
var hands = new List<CardContainer> { hand1, hand2 };
await deck.DealAsync(5, hands, 50, () =>
{
    // Callback after dealing is complete
    Console.WriteLine("Dealing complete!");
});
```

## Examples

See the `Pages/Home.razor` file for a complete working example that demonstrates:
- Creating a deck
- Creating hands (face up and face down)
- Creating a discard pile
- Dealing cards
- Handling card clicks
- Moving cards between containers

## Building and Running

### Prerequisites
- .NET 10.0 SDK or later

### Build
```bash
cd src/Cards.Blazor
dotnet build
```

### Run
```bash
cd src/Cards.Blazor
dotnet run
```

Then navigate to `http://localhost:5134` in your browser.

## Differences from cards.js

While maintaining full functional parity, Cards.Blazor uses idiomatic C#/.NET patterns:

1. **Strong Typing**: All objects are strongly typed classes instead of loose JavaScript objects
2. **LINQ**: Uses LINQ for collection operations instead of manual loops
3. **Async/Await**: Uses C# async patterns for animations and dealing
4. **Events**: Uses .NET events and EventCallback instead of function callbacks
5. **Dependency Injection**: Uses DI for services instead of global singletons
6. **Properties**: Uses C# properties with getters/setters instead of fields
7. **Null Safety**: Nullable reference types for improved safety

## Migration from cards.js

### cards.js (JavaScript)
```javascript
cards.init({ table: '#card-table' });
var deck = new cards.Deck();
deck.addCards(cards.all);
deck.render({ immediate: true });
```

### Cards.Blazor (C#)
```csharp
CardService.Initialize(options);
var deck = CardService.CreateDeck();
deck.AddCards(CardService.AllCards);
deck.CalculatePositions(options);
```

## License

MIT License - See LICENSE file for details

## Credits

- Original cards.js library created by Einar Egilsson
- Card images by Nicu Buculei (public domain)
- Blazor reimplementation: Modern C#/.NET port
