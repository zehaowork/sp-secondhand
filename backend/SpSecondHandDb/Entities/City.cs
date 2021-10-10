namespace SpSecondHandDb.Entities
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string EnglishName { get; set; }
        public string FirstLetter { get; set; }
        public int? CountryId { get; set; }
        public bool IsPopular { get; set; }
    }
}
