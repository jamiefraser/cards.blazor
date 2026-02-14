# Cards.Blazor

[![.NET](https://img.shields.io/badge/.NET-10.0-blue.svg)](https://dotnet.microsoft.com/)
[![Blazor WebAssembly](https://img.shields.io/badge/Blazor-WebAssembly-purple.svg)](https://blazor.net/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, production-quality C#/.NET Blazor WebAssembly reimplementation of the popular [cards.js](https://github.com/einaregilsson/cards.js) JavaScript library for building card games.

## 🎴 Overview

Cards.Blazor is a complete migration of cards.js to idiomatic C#/.NET, providing a powerful framework for creating interactive card games that can run as standalone Blazor applications or be embedded as web components in any HTML page.

## ✨ Features

- **🎯 Full Feature Parity**: All functionality from cards.js has been faithfully reimplemented
- **💎 Idiomatic C#/.NET**: Clean, maintainable code using C# 10+ features and modern .NET patterns
- **🧩 Web Component Support**: Embed as a custom element in any web application
- **🃏 Multiple Deck Types**: Support for Standard (52-card), Euchre, and Pinochle decks
- **📦 Container System**: Deck, Hand, and Pile implementations for organizing cards
- **✨ Smooth Animations**: CSS-based transitions for card movements and flips
- **🎮 Full Event System**: Complete event handling for card interactions
- **🔒 Type Safety**: Strong typing throughout with clear models and interfaces
- **📚 Comprehensive Documentation**: Extensive docs, examples, and migration guide

## 🚀 Quick Start

### Prerequisites

- [.NET 10.0 SDK](https://dotnet.microsoft.com/download) or later

### Build and Run

```bash
cd src/Cards.Blazor
dotnet build
dotnet run
```

Navigate to `http://localhost:5134` to see the demo application.

## 📖 Usage Examples

### Basic Setup in Blazor

```csharp
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
        // Create and configure your game
        var deck = CardService.CreateDeck();
        deck.AddCards(CardService.AllCards);
        _containers.Add(deck);
    }
}
```

### Dealing Cards

```csharp
private async Task DealCards()
{
    var hand1 = CardService.CreateHand(y: 100, faceUp: false);
    var hand2 = CardService.CreateHand(y: 300, faceUp: true);
    
    var hands = new List<CardContainer> { hand1, hand2 };
    await deck.DealAsync(5, hands, 50, () =>
    {
        Console.WriteLine("Dealing complete!");
    });
}
```

### Handling Card Events

```csharp
private void SetupEventHandlers()
{
    deck.CardClicked += (sender, card) =>
    {
        if (card == deck.TopCard())
        {
            hand.AddCard(card);
            hand.CalculatePositions(_options);
            StateHasChanged();
        }
    };
}
```

## 🏗️ Architecture

### Project Structure

```
Cards.Blazor/
├── Models/                    # Domain models
│   ├── Card.cs               # Playing card with suit, rank, position
│   ├── CardContainer.cs      # Abstract base for card collections
│   ├── Deck.cs               # Stacked deck implementation
│   ├── Hand.cs               # Spread hand implementation
│   ├── Pile.cs               # Pile implementation
│   ├── CardOptions.cs        # Configuration options
│   ├── CardSize.cs           # Card dimensions
│   └── DeckType.cs           # Deck type enumeration
├── Services/
│   └── CardService.cs        # State management and operations
├── Components/
│   └── CardsComponent.razor  # Main UI component
└── wwwroot/
    └── img/                  # Card sprite images
```

### Key Components

- **CardService**: Manages card initialization, shuffling, and state
- **Card**: Represents individual playing cards with full state
- **CardContainer**: Abstract base class for Deck, Hand, and Pile
- **CardsComponent**: Main Blazor component with rendering and events

## 🎨 Deck Types

### Standard Deck (52 cards)
```csharp
DeckType = DeckType.Standard  // Ace through King, 4 suits
```

### Euchre Deck (24 cards)
```csharp
DeckType = DeckType.Euchre    // 9 through Ace, 4 suits
```

### Pinochle Deck (48 cards)
```csharp
DeckType = DeckType.Pinochle  // 9 through Ace, 4 suits, 2 copies each
```

## 🌐 Web Component Usage

Cards.Blazor can be embedded in any HTML page as a custom element:

```html
<!DOCTYPE html>
<html>
<head>
    <base href="/" />
    <script src="_framework/blazor.webassembly.js"></script>
</head>
<body>
    <!-- The custom element is registered automatically -->
    <cards-component></cards-component>
</body>
</html>
```

See [standalone.html](src/Cards.Blazor/wwwroot/standalone.html) for a complete example.

## 📚 Documentation

- **[README.md](src/Cards.Blazor/README.md)**: Detailed API documentation
- **[MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)**: Complete guide for migrating from cards.js
- **[Example Implementation](src/Cards.Blazor/Pages/Home.razor)**: Working demo with dealing, events, and gameplay

## 🔄 Migration from cards.js

Migrating from cards.js is straightforward. Here's a quick comparison:

| cards.js | Cards.Blazor |
|----------|--------------|
| `cards.init(options)` | `CardService.Initialize(options)` |
| `new cards.Deck()` | `CardService.CreateDeck()` |
| `deck.addCards(cards.all)` | `deck.AddCards(CardService.AllCards)` |
| `deck.render()` | `deck.CalculatePositions(options)` |
| `deck.click(callback)` | `deck.CardClicked += handler` |

See the [Migration Guide](MIGRATION_GUIDE.md) for complete details.

## 🎯 Design Principles

This implementation follows modern C#/.NET best practices:

1. **Strong Typing**: All objects use strong types instead of loose JavaScript objects
2. **LINQ**: Collection operations use LINQ for clarity and performance
3. **Async/Await**: Asynchronous operations use C# async patterns
4. **Events**: .NET events and EventCallback for interactions
5. **Dependency Injection**: Services use DI instead of global singletons
6. **Null Safety**: Nullable reference types for improved safety
7. **Immutability**: Prefer immutable data where appropriate
8. **Separation of Concerns**: Clear separation between UI, logic, and data

## 🖼️ Screenshots

### Initial State
![Initial State](https://github.com/user-attachments/assets/08281f62-907f-4c38-a5da-97ffdd85af2b)

### After Dealing
![After Dealing](https://github.com/user-attachments/assets/8154dc07-5a23-401b-b791-67125bb6081d)

## 🧪 Testing

The implementation has been tested for:
- ✅ Card initialization and shuffling
- ✅ Deck, Hand, and Pile positioning
- ✅ Dealing mechanics
- ✅ Card movement and animations
- ✅ Event handling (clicks, mouse events)
- ✅ Face up/down toggling
- ✅ Multiple deck types
- ✅ Web component registration

## 🔒 Security

- All dependencies checked for vulnerabilities
- No known security issues
- Uses latest stable .NET 10 packages

## 🤝 Contributing

This is a migration project demonstrating best practices for converting JavaScript libraries to Blazor WebAssembly. Contributions are welcome!

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

## 🙏 Credits

- **Original cards.js**: Created by [Einar Egilsson](https://github.com/einaregilsson)
- **Card Images**: Created by [Nicu Buculei](http://nicubunu.ro) (public domain)
- **Blazor Migration**: Modern C#/.NET implementation maintaining full compatibility

## 🔗 Links

- [Original cards.js Repository](https://github.com/einaregilsson/cards.js)
- [Blazor Documentation](https://learn.microsoft.com/aspnet/core/blazor/)
- [.NET Download](https://dotnet.microsoft.com/download)

## ⚡ Performance

- **Initial Load**: ~2-3MB compressed (WebAssembly + .NET runtime)
- **Runtime**: Comparable or better than JavaScript after initialization
- **Memory**: Efficient with automatic garbage collection
- **Browser Support**: All modern browsers with WebAssembly support

## 🎓 Learning Resources

This project demonstrates:
- Blazor WebAssembly web components
- C# to JavaScript migration patterns
- Clean architecture in Blazor
- Event-driven UI programming
- CSS animations in Blazor
- Dependency injection patterns
- Async/await patterns in UI code

---

Made with ❤️ using [Blazor WebAssembly](https://blazor.net/) and [.NET 10](https://dotnet.microsoft.com/)
