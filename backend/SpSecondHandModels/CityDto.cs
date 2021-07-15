namespace SpSecondHandModels
{
    public class CityDto
    {
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
