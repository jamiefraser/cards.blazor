namespace Cards.Blazor.Models;

/// <summary>
/// Represents a hand of cards spread horizontally.
/// </summary>
public class Hand : CardContainer
{
    public Hand(int? x = null, int? y = null, bool faceUp = false)
        : base(x, y, faceUp)
    {
    }

    /// <summary>
    /// Calculates positions for cards in a hand (spread horizontally with padding).
    /// </summary>
    public override void CalculatePositions(CardOptions options)
    {
        if (Cards.Count == 0) return;

        var width = options.CardSize.Width + (Cards.Count - 1) * options.CardSize.Padding;
        var left = X - width / 2;
        var top = Y - options.CardSize.Height / 2;

        for (var i = 0; i < Cards.Count; i++)
        {
            Cards[i].TargetTop = top;
            Cards[i].TargetLeft = left + i * options.CardSize.Padding;
        }
    }
}
