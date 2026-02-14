using Cards.Blazor.Models;

namespace Cards.Blazor.Services;

/// <summary>
/// Service for managing card game state and operations.
/// </summary>
public class CardService
{
    private readonly List<Card> _allCards = new();
    private int _zIndexCounter = 1;

    /// <summary>
    /// Configuration options for the card system.
    /// </summary>
    public CardOptions Options { get; private set; } = new();

    /// <summary>
    /// All cards that have been created.
    /// </summary>
    public IReadOnlyList<Card> AllCards => _allCards.AsReadOnly();

    /// <summary>
    /// Event fired when cards need to be re-rendered.
    /// </summary>
    public event EventHandler? CardsChanged;

    /// <summary>
    /// Initializes the card system with the specified options.
    /// </summary>
    public void Initialize(CardOptions? options = null)
    {
        if (options != null)
        {
            Options = options;
        }

        _allCards.Clear();
        _zIndexCounter = 1;

        int start, end;

        switch (Options.DeckType)
        {
            case DeckType.Standard:
                Options.AcesHigh = false;
                start = Options.AcesHigh ? 2 : 1;
                end = start + 12;
                break;
            case DeckType.Euchre:
                start = 9;
                end = start + 5;
                break;
            case DeckType.Pinochle:
                start = 9;
                end = start + 5;
                Options.Loop = 2;
                break;
            default:
                start = 1;
                end = 13;
                break;
        }

        // Create cards for each loop
        for (var l = 0; l < Options.Loop; l++)
        {
            for (var i = start; i <= end; i++)
            {
                _allCards.Add(new Card("h", i));
                _allCards.Add(new Card("s", i));
                _allCards.Add(new Card("d", i));
                _allCards.Add(new Card("c", i));
            }
        }

        // Add jokers if requested
        if (Options.BlackJoker)
        {
            _allCards.Add(new Card("bj", 0));
        }

        if (Options.RedJoker)
        {
            _allCards.Add(new Card("rj", 0));
        }

        // Shuffle the deck
        Shuffle(_allCards);

        NotifyCardsChanged();
    }

    /// <summary>
    /// Shuffles a list of cards using Fisher-Yates algorithm.
    /// </summary>
    public void Shuffle(List<Card> cards)
    {
        var random = new Random();
        var n = cards.Count;

        for (var i = n - 1; i > 0; i--)
        {
            var j = random.Next(i + 1);
            (cards[i], cards[j]) = (cards[j], cards[i]);
        }
    }

    /// <summary>
    /// Gets the next z-index value for layering cards.
    /// </summary>
    public int GetNextZIndex()
    {
        return _zIndexCounter++;
    }

    /// <summary>
    /// Moves a card to the front (highest z-index).
    /// </summary>
    public void MoveCardToFront(Card card)
    {
        card.ZIndex = GetNextZIndex();
    }

    /// <summary>
    /// Notifies that the card state has changed and UI should update.
    /// </summary>
    public void NotifyCardsChanged()
    {
        CardsChanged?.Invoke(this, EventArgs.Empty);
    }

    /// <summary>
    /// Creates a new deck at the specified position.
    /// </summary>
    public Deck CreateDeck(int? x = null, int? y = null, bool faceUp = false)
    {
        x ??= Options.TableWidth / 2;
        y ??= Options.TableHeight / 2;
        return new Deck(x, y, faceUp);
    }

    /// <summary>
    /// Creates a new hand at the specified position.
    /// </summary>
    public Hand CreateHand(int? x = null, int? y = null, bool faceUp = false)
    {
        x ??= Options.TableWidth / 2;
        y ??= Options.TableHeight / 2;
        return new Hand(x, y, faceUp);
    }

    /// <summary>
    /// Creates a new pile at the specified position.
    /// </summary>
    public Pile CreatePile(int? x = null, int? y = null, bool faceUp = false)
    {
        x ??= Options.TableWidth / 2;
        y ??= Options.TableHeight / 2;
        return new Pile(x, y, faceUp);
    }
}
