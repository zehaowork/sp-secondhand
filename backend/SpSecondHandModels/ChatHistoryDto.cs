using System;
using SpSecondHandModels.Enums;

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
        public string UserName { get; set; }
        public string ProfileImgUrl { get; set; }
        public int UnreadMsgNum { get; set; }
        public string ItemImgUrl { get; set; }
        public Status ItemStatus { get; set; }
    }
}
