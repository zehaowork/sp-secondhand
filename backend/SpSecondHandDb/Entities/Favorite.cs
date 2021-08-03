namespace SpSecondHandDb.Entities
{
    public class Favorite
    {
        public long UserId { get; set; }

        public virtual User User { get; set; }

        public int SecondHandId { get; set; }

        public virtual SecondHand SecondHand { get; set; }
    }
}
