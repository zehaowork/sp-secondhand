using System;

namespace SpSecondHandDb.Entities
{
    public class ChatHistory
    {
        public long MessageId { get; set; }
        public long FromUid { get; set; }
        public long ToUid { get; set; }
        public string Message { get; set; }
        public DateTime Time { get; set; }
        public bool IsRead { get; set; }

        public virtual User FromU { get; set; }
        public virtual User ToU { get; set; }
    }
}
