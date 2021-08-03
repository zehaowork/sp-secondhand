using System;
using System.Collections.Generic;

namespace SpSecondHandDb.Entities
{
    public class User
    {
        public User()
        {
            ChatHistoryFromU = new HashSet<ChatHistory>();
            ChatHistoryToU = new HashSet<ChatHistory>();
        }

        public long Id { get; set; }
        public string OpenId { get; set; }
        public string NickName { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string Country { get; set; }
        public int? Sex { get; set; }
        public string HeadImgUrl { get; set; }
        public DateTime? CreateTime { get; set; }
        public int? Status { get; set; }
        public int? ProjectId { get; set; }

        public virtual UserContact UserContact { get; set; }
        public virtual ICollection<ChatHistory> ChatHistoryFromU { get; set; }
        public virtual ICollection<ChatHistory> ChatHistoryToU { get; set; }
        public virtual ICollection<Favorite> Favorites { get; set; }
    }
}
