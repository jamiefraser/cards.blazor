namespace Cards.Blazor.Models;

/// <summary>
/// Represents a deck of cards stacked on top of each other.
/// </summary>
public class Deck : CardContainer
{
    public Deck(int? x = null, int? y = null, bool faceUp = false)
        : base(x, y, faceUp)
    {
    }

    /// <summary>
    /// Calculates positions for cards in a deck (stacked with slight offset).
    /// </summary>
    public override void CalculatePositions(CardOptions options)
    {
        var left = X - options.CardSize.Width / 2;
        var top = Y - options.CardSize.Height / 2;
        var condenseCount = 6;

        for (var i = 0; i < Cards.Count; i++)
        {
            if (i > 0 && i % condenseCount == 0)
            {
                top -= 1;
                left -= 1;
            }
            Cards[i].TargetTop = top;
            Cards[i].TargetLeft = left;
        }
    }

    /// <summary>
    /// Deals cards from this deck to the specified hands.
    /// </summary>
    /// <param name="count">Number of cards to deal to each hand.</param>
    /// <param name="hands">The hands to deal to.</param>
    /// <returns>A task that completes when dealing is done.</returns>
    public async Task DealAsync(int count, List<CardContainer> hands, int speed, Action? callback = null)
    {
        var totalCount = count * hands.Count;
        var i = 0;

        while (Cards.Count > 0 && i < totalCount)
        {
            var topCard = TopCard();
            if (topCard == null) break;

            var targetHand = hands[i % hands.Count];
            targetHand.AddCard(topCard);

            await Task.Delay(speed);
            i++;
        }

        callback?.Invoke();
    }
}
