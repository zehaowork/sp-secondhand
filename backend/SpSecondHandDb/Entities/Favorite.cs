namespace SpSecondHandDb.Entities
{
    public class Favorite
    {
        public long UserId { get; set; }

        public virtual User User { get; set; }

        public long SecondHandId { get; set; }

        public virtual SecondHand SecondHand { get; set; }
    }
}
