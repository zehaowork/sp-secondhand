using System;
using SpSecondHandModels.HouseRent.Enums;

namespace SpSecondHandModels.HouseRent
{
    public class PropertyCreateDto
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string[] ImgUrls { get; set; }
        public string Description { get; set; }
        public string WeChatId { get; set; }
        public string Telephone { get; set; }
        public decimal PricePerWeek { get; set; }
        public DateTime? PublishTime { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public long UserId { get; set; }
        public int CityId { get; set; }
        public string Address { get; set; }
        public RoomType RoomType { get; set; }
        public BuildingType BuildingType { get; set; }
        public string[] Facilities { get; set; }
        public long? Popularity { get; set; }
    }
}
