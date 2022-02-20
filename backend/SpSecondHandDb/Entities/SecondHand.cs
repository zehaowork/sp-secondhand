using System;
using System.Collections.Generic;

namespace SpSecondHandDb.Entities
{
    public class SecondHand
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string ImgUrls { get; set; }
        public string Description { get; set; }
        public string WeChatId { get; set; }
        public string Telephone { get; set; }
        public decimal? Price { get; set; }
        public int Condition { get; set; }
        public string Address { get; set; }
        public DateTime? PublishTime { get; set; }
        public int Status { get; set; }
        public long View { get; set; }
        public int Popularity { get; set; }

        public virtual User User { get; set; }
        public virtual Category Category { get; set; }
        public virtual City City { get; set; }
        public virtual ICollection<Favorite> Favorites { get; set; }
    }
}
