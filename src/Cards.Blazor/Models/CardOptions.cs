namespace Cards.Blazor.Models;

/// <summary>
/// Configuration options for the card game system.
/// </summary>
public class CardOptions
{
    /// <summary>
    /// Size configuration for cards.
    /// </summary>
    public CardSize CardSize { get; set; } = new();

    /// <summary>
    /// Animation speed in milliseconds.
    /// </summary>
    public int AnimationSpeed { get; set; } = 500;

    /// <summary>
    /// Color of the card back ('red' or 'blue').
    /// </summary>
    public string CardBack { get; set; } = "red";

    /// <summary>
    /// Whether Aces are high (rank 14) or low (rank 1).
    /// </summary>
    public bool AcesHigh { get; set; } = false;

    /// <summary>
    /// URL to the card sprite image.
    /// </summary>
    public string CardsUrl { get; set; } = "img/cards.png";

    /// <summary>
    /// Whether to include the black joker.
    /// </summary>
    public bool BlackJoker { get; set; } = false;

    /// <summary>
    /// Whether to include the red joker.
    /// </summary>
    public bool RedJoker { get; set; } = false;

    /// <summary>
    /// Type of deck to use.
    /// </summary>
    public DeckType DeckType { get; set; } = DeckType.Standard;

    /// <summary>
    /// Number of times to loop through the deck (for Pinochle: 2).
    /// </summary>
    public int Loop { get; set; } = 1;

    /// <summary>
    /// Width of the table/playing area.
    /// </summary>
    public int TableWidth { get; set; } = 600;

    /// <summary>
    /// Height of the table/playing area.
    /// </summary>
    public int TableHeight { get; set; } = 400;
}
