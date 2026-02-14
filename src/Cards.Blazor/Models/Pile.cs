namespace Cards.Blazor.Models;

/// <summary>
/// Represents a pile of cards (typically a discard pile).
/// </summary>
public class Pile : CardContainer
{
    public Pile(int? x = null, int? y = null, bool faceUp = false)
        : base(x, y, faceUp)
    {
    }

    /// <summary>
    /// Calculates positions for cards in a pile (all in the same position).
    /// </summary>
    public override void CalculatePositions(CardOptions options)
    {
        var left = X - options.CardSize.Width / 2;
        var top = Y - options.CardSize.Height / 2;

        foreach (var card in Cards)
        {
            card.TargetTop = top;
            card.TargetLeft = left;
        }
    }
}
