namespace Cards.Blazor.Models;

/// <summary>
/// Represents the dimensions and padding for card display.
/// </summary>
public class CardSize
{
    /// <summary>
    /// Width of a card in pixels.
    /// </summary>
    public int Width { get; set; } = 69;

    /// <summary>
    /// Height of a card in pixels.
    /// </summary>
    public int Height { get; set; } = 94;

    /// <summary>
    /// Padding between cards in a hand in pixels.
    /// </summary>
    public int Padding { get; set; } = 18;
}
