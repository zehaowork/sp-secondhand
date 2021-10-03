using System;
using SpSecondHandModels.Enums;

namespace SpSecondHandModels
{
    public class SecondHandCreateDto
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string[] ImgUrls { get; set; }
        public string Description { get; set; }
        public string WeChatId { get; set; }
        public string Telephone { get; set; }
        public decimal? Price { get; set; }
        public Condition Condition { get; set; }
        public string Address { get; set; }
        public long UserId { get; set; }
        public int CategoryId { get; set; }
        public DateTime? PublishTime { get; set; }
        public int CityId { get; set; }
        public Status Status { get; set; }
        public long? Popularity { get; set; }
    }
}
