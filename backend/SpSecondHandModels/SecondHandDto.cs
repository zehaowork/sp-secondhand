using System;
using SpSecondHandDb.Entities;

namespace SpSecondHandModels
{
    public class SecondHandDto
    {
        public SecondHandDto(SecondHand sh)
        {
            Id = sh.Id;
            Title = sh.Title;
            ImgUrl = sh.ImgUrl;
            ImgsUrl = sh.ImgsUrl;
            Description = sh.Description;
            WeChatId = sh.WeChatId;
            Telephone = sh.Telephone;
            Price = sh.Price;
            GoodType = sh.GoodType;
            Address = sh.Address;
            UserId = sh.UserId;
            ItemsId = sh.ItemsId;
            ProjectId = sh.ProjectId;
            CreateTime = sh.CreateTime;
            RegionId = sh.RegionId;
            IsSale = sh.IsSale;
            Popularity = sh.Popularity;
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string ImgUrl { get; set; }
        public string ImgsUrl { get; set; }
        public string Description { get; set; }
        public string WeChatId { get; set; }
        public string Telephone { get; set; }
        public decimal? Price { get; set; }
        public int? GoodType { get; set; }
        public string Address { get; set; }
        public int? UserId { get; set; }
        public int? ItemsId { get; set; }
        public int? ProjectId { get; set; }
        public DateTime? CreateTime { get; set; }
        public int? RegionId { get; set; }
        public bool? IsSale { get; set; }
        public long? Popularity { get; set; }
    }
}
