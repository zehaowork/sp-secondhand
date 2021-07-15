namespace SpSecondHandDb.Entities
{
    public class Items
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImgUrl { get; set; }
        public int? Sort { get; set; }
        public int? ProjectId { get; set; }
    }
}
