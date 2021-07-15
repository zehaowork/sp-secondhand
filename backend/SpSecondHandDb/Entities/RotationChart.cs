namespace SpSecondHandDb.Entities
{
    public partial class RotationChart
    {
        public int Id { get; set; }
        public string ImgUrl { get; set; }
        public int? Sort { get; set; }
        public int? ProjectId { get; set; }
    }
}
