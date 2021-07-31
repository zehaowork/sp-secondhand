using SpSecondHandDb.Entities;

namespace SpSecondHandModels
{
    public class CityDto
    {
        public CityDto(Region city)
        {
            Id = city.Id;
            ParentId = city.ParentId;
            Grade = city.Grade;
            Name = city.Name;
            IsUsed = city.IsUsed;
            IsDel = city.IsDel;
            FirstLetter = city.FirstLetter;
            CountryId = city.CountryId;
        }

        public int Id { get; set; }
        public int? ParentId { get; set; }
        public byte? Grade { get; set; }
        public string Name { get; set; }
        public bool? IsUsed { get; set; }
        public bool? IsDel { get; set; }
        public string FirstLetter { get; set; }
        public int? CountryId { get; set; }
    }
}
