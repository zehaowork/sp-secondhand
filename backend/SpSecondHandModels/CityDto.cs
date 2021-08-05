using SpSecondHandDb.Entities;

namespace SpSecondHandModels
{
    public class CityDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FirstLetter { get; set; }
        public int? CountryId { get; set; }
    }
}
