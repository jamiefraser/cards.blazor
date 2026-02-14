namespace Cards.Blazor.Models;

/// <summary>
/// Base class for containers that hold and manage cards.
/// </summary>
public abstract class CardContainer
{
    private readonly List<Card> _cards = new();

    /// <summary>
    /// X position of the container center.
    /// </summary>
    public int X { get; set; }

    /// <summary>
    /// Y position of the container center.
    /// </summary>
    public int Y { get; set; }

    /// <summary>
    /// Whether cards in this container should be face up.
    /// </summary>
    public bool FaceUp { get; set; }

    /// <summary>
    /// Event handler for card clicks.
    /// </summary>
    public event EventHandler<Card>? CardClicked;

    /// <summary>
    /// Event handler for mouse down on cards.
    /// </summary>
    public event EventHandler<Card>? CardMouseDown;

    /// <summary>
    /// Event handler for mouse up on cards.
    /// </summary>
    public event EventHandler<Card>? CardMouseUp;

    /// <summary>
    /// Gets the read-only list of cards in this container.
    /// </summary>
    public IReadOnlyList<Card> Cards => _cards.AsReadOnly();

    /// <summary>
    /// Gets the number of cards in this container.
    /// </summary>
    public int Count => _cards.Count;

    /// <summary>
    /// Initializes the container with optional position and face-up settings.
    /// </summary>
    protected CardContainer(int? x = null, int? y = null, bool faceUp = false)
    {
        X = x ?? 0;
        Y = y ?? 0;
        FaceUp = faceUp;
    }

    /// <summary>
    /// Adds a single card to the container.
    /// </summary>
    public virtual void AddCard(Card card)
    {
        if (card.Container != null && card.Container != this)
        {
            card.Container.RemoveCard(card);
        }

        _cards.Add(card);
        card.Container = this;
    }

    /// <summary>
    /// Adds multiple cards to the container.
    /// </summary>
    public virtual void AddCards(IEnumerable<Card> cards)
    {
        foreach (var card in cards)
        {
            AddCard(card);
        }
    }

    /// <summary>
    /// Removes a card from the container.
    /// </summary>
    public virtual bool RemoveCard(Card card)
    {
        var removed = _cards.Remove(card);
        if (removed)
        {
            card.Container = null;
        }
        return removed;
    }

    /// <summary>
    /// Gets the top card (last card in the list).
    /// </summary>
    public Card? TopCard() => _cards.Count > 0 ? _cards[^1] : null;

    /// <summary>
    /// Clears all cards from the container.
    /// </summary>
    public void Clear()
    {
        foreach (var card in _cards)
        {
            card.Container = null;
        }
        _cards.Clear();
    }

    /// <summary>
    /// Calculates the target positions for all cards in the container.
    /// </summary>
    public abstract void CalculatePositions(CardOptions options);

    /// <summary>
    /// Handles a card click event.
    /// </summary>
    public void OnCardClick(Card card)
    {
        CardClicked?.Invoke(this, card);
    }

    /// <summary>
    /// Handles a card mouse down event.
    /// </summary>
    public void OnCardMouseDown(Card card)
    {
        CardMouseDown?.Invoke(this, card);
    }

    /// <summary>
    /// Handles a card mouse up event.
    /// </summary>
    public void OnCardMouseUp(Card card)
    {
        CardMouseUp?.Invoke(this, card);
    }

    public override string ToString() => GetType().Name;
}
