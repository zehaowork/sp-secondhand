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
        public string UserName { get; set; }
        public string City { get; set; }
        public int? Gender { get; set; }
        public string ProfileImgUrl { get; set; }
        public DateTime? JoinTime { get; set; }

        public virtual UserContact UserContact { get; set; }
        public virtual ICollection<ChatHistory> ChatHistoryFromU { get; set; }
        public virtual ICollection<ChatHistory> ChatHistoryToU { get; set; }
        public virtual ICollection<Favorite> Favorites { get; set; }
    }
}
