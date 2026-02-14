# Migration Guide: cards.js to Cards.Blazor

This guide helps developers migrate from the JavaScript cards.js library to the Blazor WebAssembly Cards.Blazor implementation.

## Overview

Cards.Blazor is a complete reimplementation of cards.js in C#/.NET, maintaining full functional parity while following idiomatic .NET patterns and best practices.

## Key Differences

### 1. Language and Runtime
- **cards.js**: JavaScript running in browser
- **Cards.Blazor**: C#/.NET compiled to WebAssembly

### 2. Type System
- **cards.js**: Dynamic typing with JavaScript objects
- **Cards.Blazor**: Strong typing with C# classes and interfaces

### 3. State Management
- **cards.js**: Global singleton with mutable state
- **Cards.Blazor**: Dependency injection with scoped services

### 4. Event Handling
- **cards.js**: Callback functions
- **Cards.Blazor**: .NET events and EventCallback<T>

## Side-by-Side Comparison

### Initialization

**cards.js**
```javascript
cards.init({
    table: '#card-table',
    type: STANDARD,
    cardback: 'red',
    animationSpeed: 500
});
```

**Cards.Blazor**
```csharp
var options = new CardOptions
{
    TableWidth = 600,
    TableHeight = 400,
    DeckType = DeckType.Standard,
    CardBack = "red",
    AnimationSpeed = 500
};

CardService.Initialize(options);
```

### Creating a Deck

**cards.js**
```javascript
var deck = new cards.Deck();
deck.addCards(cards.all);
deck.render({ immediate: true });
```

**Cards.Blazor**
```csharp
var deck = CardService.CreateDeck();
deck.AddCards(CardService.AllCards);
deck.CalculatePositions(options);
```

### Creating a Hand

**cards.js**
```javascript
var hand = new cards.Hand({
    faceUp: true,
    y: 340
});
```

**Cards.Blazor**
```csharp
var hand = CardService.CreateHand(
    x: null,  // defaults to center
    y: 340,
    faceUp: true
);
```

### Event Handling

**cards.js**
```javascript
deck.click(function(card) {
    if (card === deck.topCard()) {
        hand.addCard(card);
        hand.render();
    }
});
```

**Cards.Blazor**
```csharp
deck.CardClicked += (sender, card) =>
{
    if (card == deck.TopCard())
    {
        hand.AddCard(card);
        hand.CalculatePositions(options);
        StateHasChanged(); // Trigger re-render
    }
};
```

### Dealing Cards

**cards.js**
```javascript
deck.deal(5, [hand1, hand2], 50, function() {
    console.log('Dealing complete!');
});
```

**Cards.Blazor**
```csharp
var hands = new List<CardContainer> { hand1, hand2 };
await deck.DealAsync(5, hands, 50, () =>
{
    Console.WriteLine("Dealing complete!");
});
```

### Card Movement

**cards.js**
```javascript
card.moveTo(x, y, speed, callback);
```

**Cards.Blazor**
```csharp
// Position is managed through containers
card.TargetLeft = x;
card.TargetTop = y;
// CSS transitions handle animation automatically
```

### Shuffling

**cards.js**
```javascript
cards.shuffle(deck);
```

**Cards.Blazor**
```csharp
CardService.Shuffle(deck.Cards.ToList());
```

## API Mapping

| cards.js | Cards.Blazor | Notes |
|----------|--------------|-------|
| `cards.init(options)` | `CardService.Initialize(options)` | Configuration |
| `cards.all` | `CardService.AllCards` | All created cards |
| `cards.Deck` | `Deck` | Deck container |
| `cards.Hand` | `Hand` | Hand container |
| `cards.Pile` | `Pile` | Pile container |
| `cards.Card` | `Card` | Individual card |
| `cards.shuffle(deck)` | `CardService.Shuffle(list)` | Fisher-Yates shuffle |
| `deck.addCard(card)` | `deck.AddCard(card)` | Add single card |
| `deck.addCards(cards)` | `deck.AddCards(cards)` | Add multiple cards |
| `deck.removeCard(card)` | `deck.RemoveCard(card)` | Remove card |
| `deck.topCard()` | `deck.TopCard()` | Get top card |
| `deck.render(options)` | `deck.CalculatePositions(options)` | Update positions |
| `deck.click(callback)` | `deck.CardClicked += handler` | Click event |
| `deck.mousedown(callback)` | `deck.CardMouseDown += handler` | Mouse down event |
| `deck.mouseup(callback)` | `deck.CardMouseUp += handler` | Mouse up event |
| `card.moveTo(x, y)` | `card.TargetLeft/TargetTop = x/y` | Position setting |
| `card.rotate(angle)` | `card.Rotation = angle` | Rotation |
| `card.showCard()` | `card.FaceUp = true` | Show face |
| `card.hideCard()` | `card.FaceUp = false` | Show back |
| `card.moveToFront()` | `CardService.MoveCardToFront(card)` | Z-index management |

## Property Mapping

| cards.js Property | Cards.Blazor Property | Type |
|-------------------|----------------------|------|
| `card.suit` | `Card.Suit` | string |
| `card.rank` | `Card.Rank` | int |
| `card.name` | `Card.Name` | string |
| `card.shortName` | `Card.ShortName` | string |
| `card.faceUp` | `Card.FaceUp` | bool |
| `card.container` | `Card.Container` | CardContainer? |
| `container.x` | `Container.X` | int |
| `container.y` | `Container.Y` | int |
| `container.faceUp` | `Container.FaceUp` | bool |

## Configuration Options

| cards.js Option | Cards.Blazor Option | Default |
|-----------------|---------------------|---------|
| `table` | N/A (managed by component) | - |
| `cardSize.width` | `CardOptions.CardSize.Width` | 69 |
| `cardSize.height` | `CardOptions.CardSize.Height` | 94 |
| `cardSize.padding` | `CardOptions.CardSize.Padding` | 18 |
| `animationSpeed` | `CardOptions.AnimationSpeed` | 500 |
| `cardback` | `CardOptions.CardBack` | "red" |
| `acesHigh` | `CardOptions.AcesHigh` | false |
| `cardsUrl` | `CardOptions.CardsUrl` | "img/cards.png" |
| `blackJoker` | `CardOptions.BlackJoker` | false |
| `redJoker` | `CardOptions.RedJoker` | false |
| `type` | `CardOptions.DeckType` | Standard |
| `loop` | `CardOptions.Loop` | 1 |

## Using as a Web Component

Cards.Blazor can be embedded in any HTML page as a custom element.

### Step 1: Include Blazor Scripts

```html
<!DOCTYPE html>
<html>
<head>
    <base href="/" />
</head>
<body>
    <script src="_framework/blazor.webassembly.js"></script>
</body>
</html>
```

### Step 2: Use the Custom Element

The component is registered as `cards-component` and can be used directly in HTML once Blazor initializes.

```html
<cards-component></cards-component>
```

### Step 3: Interact via JavaScript (Optional)

You can interact with the Blazor component from JavaScript using JS Interop if needed.

## Migration Steps

1. **Install .NET SDK**: Ensure .NET 10.0 or later is installed
2. **Create Project**: Use the Blazor WebAssembly template
3. **Add Cards.Blazor**: Copy the Cards.Blazor project files
4. **Update HTML**: Replace cards.js script tags with Blazor scripts
5. **Rewrite Logic**: Convert JavaScript game logic to C#
6. **Test**: Verify all functionality works as expected

## Example: Complete Migration

### Original cards.js Code

```javascript
cards.init({ table: '#card-table', type: STANDARD });

var deck = new cards.Deck();
deck.addCards(cards.all);
deck.render({ immediate: true });

var hand = new cards.Hand({ faceUp: true, y: 340 });

$('#deal').click(function() {
    deck.deal(5, [hand], 50, function() {
        console.log('Deal complete!');
    });
});

deck.click(function(card) {
    if (card === deck.topCard()) {
        hand.addCard(card);
        hand.render();
    }
});
```

### Equivalent Cards.Blazor Code

```csharp
@page "/"
@using Cards.Blazor.Components
@using Cards.Blazor.Models
@using Cards.Blazor.Services
@inject CardService CardService

<button @onclick="HandleDeal">DEAL</button>
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
    private Deck? _deck;
    private Hand? _hand;

    private void OnInitialized()
    {
        _deck = CardService.CreateDeck();
        _deck.AddCards(CardService.AllCards);
        _deck.CalculatePositions(_options);
        
        _hand = CardService.CreateHand(y: 340, faceUp: true);
        
        _deck.CardClicked += OnDeckCardClicked;
        
        _containers.Add(_deck);
        _containers.Add(_hand);
    }

    private async Task HandleDeal()
    {
        if (_deck == null || _hand == null) return;
        
        await _deck.DealAsync(5, new List<CardContainer> { _hand }, 50, () =>
        {
            Console.WriteLine("Deal complete!");
            StateHasChanged();
        });
    }

    private void OnDeckCardClicked(object? sender, Card card)
    {
        if (_deck == null || _hand == null) return;
        
        if (card == _deck.TopCard())
        {
            _hand.AddCard(card);
            _hand.CalculatePositions(_options);
            StateHasChanged();
        }
    }
}
```

## Best Practices

1. **Use Dependency Injection**: Inject CardService rather than using global state
2. **Call StateHasChanged()**: After modifying card state to trigger UI updates
3. **Use Async/Await**: For operations like dealing that involve delays
4. **Strong Typing**: Leverage C#'s type system for safety
5. **LINQ**: Use LINQ for collection operations
6. **Null Safety**: Enable nullable reference types and handle nulls properly
7. **Events**: Use .NET events for card interactions
8. **Scoped Services**: Register CardService as scoped, not singleton

## Common Pitfalls

1. **Forgetting StateHasChanged()**: Changes won't reflect in UI
2. **Not Calculating Positions**: Cards won't move after adding to containers
3. **Missing Z-Index Management**: Cards may not layer correctly
4. **Incorrect Container Management**: Cards must be properly added/removed
5. **Animation Timing**: Ensure async operations complete before next action

## Performance Considerations

- **WebAssembly Size**: Initial download is larger than pure JavaScript
- **Startup Time**: Blazor WASM has initialization overhead
- **Runtime Performance**: Once loaded, performance is comparable or better
- **Memory**: Managed runtime has some overhead but with automatic GC

## Browser Compatibility

Cards.Blazor requires modern browsers with WebAssembly support:
- Chrome/Edge 89+
- Firefox 89+
- Safari 15+

## Resources

- [Blazor Documentation](https://learn.microsoft.com/aspnet/core/blazor/)
- [WebAssembly](https://webassembly.org/)
- [Original cards.js](https://github.com/einaregilsson/cards.js)

## Support

For issues or questions about Cards.Blazor:
- Check the README.md for API documentation
- Review the example implementation in Pages/Home.razor
- Consult the original cards.js documentation for gameplay concepts
