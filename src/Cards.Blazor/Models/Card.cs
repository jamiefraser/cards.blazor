namespace Cards.Blazor.Models;

/// <summary>
/// Represents a playing card with suit, rank, and display properties.
/// </summary>
public class Card
{
    /// <summary>
    /// Unique identifier for the card.
    /// </summary>
    public string Id { get; }

    /// <summary>
    /// Suit of the card (h=hearts, s=spades, d=diamonds, c=clubs, rj=red joker, bj=black joker).
    /// </summary>
    public string Suit { get; }

    /// <summary>
    /// Rank of the card (1=Ace, 2-10=number cards, 11=Jack, 12=Queen, 13=King, 14=Ace high, 0=Joker).
    /// </summary>
    public int Rank { get; }

    /// <summary>
    /// Short name combining suit and rank (e.g., "h1", "s13").
    /// </summary>
    public string ShortName { get; }

    /// <summary>
    /// Full display name (e.g., "H1", "S13").
    /// </summary>
    public string Name { get; }

    /// <summary>
    /// Whether the card is face up (true) or face down (false).
    /// </summary>
    public bool FaceUp { get; set; }

    /// <summary>
    /// Target top position for animation.
    /// </summary>
    public int TargetTop { get; set; }

    /// <summary>
    /// Target left position for animation.
    /// </summary>
    public int TargetLeft { get; set; }

    /// <summary>
    /// Current top position.
    /// </summary>
    public int Top { get; set; }

    /// <summary>
    /// Current left position.
    /// </summary>
    public int Left { get; set; }

    /// <summary>
    /// Z-index for layering cards.
    /// </summary>
    public int ZIndex { get; set; }

    /// <summary>
    /// Rotation angle in degrees.
    /// </summary>
    public double Rotation { get; set; }

    /// <summary>
    /// The container this card belongs to.
    /// </summary>
    public CardContainer? Container { get; set; }

    /// <summary>
    /// Creates a new card with the specified suit and rank.
    /// </summary>
    public Card(string suit, int rank)
    {
        Suit = suit;
        Rank = rank;
        ShortName = $"{suit}{rank}";
        Name = $"{suit.ToUpperInvariant()}{rank}";
        Id = Guid.NewGuid().ToString();
        FaceUp = false;
        Rotation = 0;
    }

    /// <summary>
    /// Gets the background position for the card sprite.
    /// </summary>
    public (int X, int Y) GetBackgroundPosition(CardOptions options)
    {
        var offsets = new Dictionary<string, int>
        {
            ["c"] = 0,
            ["d"] = 1,
            ["h"] = 2,
            ["s"] = 3,
            ["rj"] = 2,
            ["bj"] = 3
        };

        var rank = Rank;
        if (rank == 14)
        {
            rank = 1; // Aces high must work as well
        }

        var xpos = -rank * options.CardSize.Width;
        var ypos = -offsets[Suit] * options.CardSize.Height;

        return (xpos, ypos);
    }

    /// <summary>
    /// Gets the background position for the card back.
    /// </summary>
    public (int X, int Y) GetCardBackPosition(CardOptions options)
    {
        var y = options.CardBack == "red" ? 0 : -1 * options.CardSize.Height;
        return (0, y);
    }

    public override string ToString() => Name;
}
