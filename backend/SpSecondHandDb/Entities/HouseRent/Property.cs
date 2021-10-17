using System;

namespace SpSecondHandDb.Entities.HouseRent
{
    public class Property
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string ImgUrls { get; set; }
        public string Description { get; set; }
        public string WeChatId { get; set; }
        public string Telephone { get; set; }
        public decimal PricePerWeek { get; set; }
        public DateTime? PublishTime { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Address { get; set; }
        public int RoomType { get; set; }
        public int BuildingType { get; set; }
        public string Facilities { get; set; }
        public long? Popularity { get; set; }

        public virtual User User { get; set; }
        public virtual City City { get; set; }
    }
}
