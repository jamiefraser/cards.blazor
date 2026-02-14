namespace Cards.Blazor.Models;

/// <summary>
/// Represents the type of deck to use for card games.
/// </summary>
public enum DeckType
{
    /// <summary>
    /// Standard 52-card deck (Ace through King in all four suits).
    /// </summary>
    Standard = 0,

    /// <summary>
    /// Euchre deck (9 through Ace in all four suits).
    /// </summary>
    Euchre = 1,

    /// <summary>
    /// Pinochle deck (9 through Ace in all four suits, two copies of each card).
    /// </summary>
    Pinochle = 2
}
