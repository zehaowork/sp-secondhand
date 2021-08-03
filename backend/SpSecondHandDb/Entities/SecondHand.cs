using System;
using System.Collections.Generic;

namespace SpSecondHandDb.Entities
{
    public class SecondHand
    {
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

        public virtual ICollection<Favorite> Favorites { get; set; }
    }
}
