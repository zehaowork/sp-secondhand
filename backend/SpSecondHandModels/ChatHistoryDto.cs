using System;

namespace SpSecondHandModels
{
    public class ChatHistoryDto
    {
        public long MessageId { get; set; }
        public long FromUid { get; set; }
        public long ToUid { get; set; }
        public string Message { get; set; }
        public DateTime Time { get; set; }
        public bool IsRead { get; set; }
    }
}
