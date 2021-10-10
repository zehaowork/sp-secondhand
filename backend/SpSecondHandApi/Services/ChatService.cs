using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using SpSecondHandApi.Interfaces;
using SpSecondHandDb.Entities;
using SpSecondHandDb.Interfaces;
using SpSecondHandModels;
using SpSecondHandModels.Enums;

namespace SpSecondHandApi.Services
{
    public class ChatService : IChatService
    {
        private readonly IChatRepository _chatRepository;
        private readonly ISecondHandRepository _shRepository;

        public ChatService(IChatRepository chatRepository, ISecondHandRepository shRepository)
        {
            _chatRepository = chatRepository;
            _shRepository = shRepository;
        }

        public async Task<List<ChatHistoryDto>> GetChatHistory(int fromUId, int toUId, int page)
        {
            var unreadMsg = await _chatRepository.FindAll(c => c.FromUid == fromUId && c.ToUid == toUId && c.IsRead == false);
            var messagesToUpdate = unreadMsg.ToList();
            messagesToUpdate.ForEach(m => m.IsRead = true);
            await _chatRepository.UpdateAll(messagesToUpdate);

            var chatHistories = await _chatRepository.FindByPage(c =>
            {
                var fromToCond = c.FromUid == fromUId && c.ToUid == toUId;
                var toFromCond = c.FromUid == toUId && c.ToUid == fromUId;
                return IsNotDeleted(c, fromUId) && (fromToCond || toFromCond);
            }, page, 15);

            return chatHistories.Select(c => new ChatHistoryDto()
            {
                MessageId = c.MessageId,
                FromUid = c.FromUid,
                ToUid = c.ToUid,
                Message = c.Message,
                Time = c.Time,
            }).ToList();
        }

        public async Task<List<ChatHistoryDto>> GetChatRoomList(long fromUId)
        {
            var chatHistoryList = await _chatRepository.FindAll(c => IsNotDeleted(c, fromUId) &&
                                                                     (c.FromUid == fromUId || c.ToUid == fromUId));
            var chatRooms = chatHistoryList.GroupBy(ch => new
                {
                    MinId = ch.FromUid <= ch.ToUid ? ch.FromUid : ch.ToUid,
                    MaxId = ch.FromUid > ch.ToUid ? ch.FromUid : ch.ToUid
                })
                .Select(g => g.OrderByDescending(c => c.Time).Select(c => new ChatHistoryDto()
                {
                    MessageId = c.MessageId,
                    FromUid = c.FromUid,
                    ToUid = c.ToUid,
                    Message = c.Message,
                    Time = c.Time,
                    UserName = c.ToUid == fromUId ? c.FromU.UserName : c.ToU.UserName,
                    ProfileImgUrl = c.ToUid == fromUId ? c.FromU.ProfileImgUrl : c.ToU.ProfileImgUrl,
                }).First()).ToList();

            // Get unread message number
            foreach (var room in chatRooms)
            {
                var senderId = room.ToUid == fromUId ? room.FromUid : room.ToUid;
                var chatList = await _chatRepository.FindAll(c =>
                    c.FromUid == senderId && c.ToUid == fromUId && c.IsRead == false);
                room.UnreadMsgNum = chatList.Count();
                var lastShareItem = (await _chatRepository.FindAll(c => IsNotDeleted(c, fromUId) && c.Message.StartsWith("{\"id\":"))).FirstOrDefault();
                if (lastShareItem != null)
                {
                    var item = JObject.Parse(lastShareItem.Message);
                    room.ItemImgUrl = item["itemURL"].ToString();
                    var shItem = await _shRepository.Get(item["id"].ToObject<int>());
                    room.ItemStatus = (Status) shItem.Status;
                }
            }

            return chatRooms;
        }

        public async Task<List<ChatHistoryDto>> SearchChatHistory(long fromUId, string keyword)
        {
            var chatHistories = await _chatRepository.FindAll(c => (IsNotDeleted(c, fromUId) &&c.FromUid == fromUId || c.ToUid == fromUId) && c.Message.Contains(keyword));

            return chatHistories.Select(c => new ChatHistoryDto()
            {
                MessageId = c.MessageId,
                FromUid = c.FromUid,
                ToUid = c.ToUid,
                Message = c.Message,
                Time = c.Time,
            }).ToList();
        }

        public async Task DeleteChatHistory(long fromUId, long toUId)
        {
            var chatHistoriesFrom = (await _chatRepository.FindAll(c => c.FromUid == fromUId && c.ToUid == toUId)).ToList();
            var chatHistoriesTo = (await _chatRepository.FindAll(c => c.FromUid == toUId && c.ToUid == fromUId)).ToList();
            chatHistoriesFrom.ForEach(c => c.FromDeleted = true);
            chatHistoriesTo.ForEach(c => c.ToDeleted = true);

            await _chatRepository.UpdateAll(chatHistoriesFrom);
            await _chatRepository.UpdateAll(chatHistoriesTo);
        }

        private bool IsNotDeleted(ChatHistory chat, long fromUId)
        {
            var matchFrom = chat.FromUid == fromUId && chat.FromDeleted == false;
            var matchTo = chat.ToUid == fromUId && chat.ToDeleted == false;
            return matchFrom || matchTo;
        }
    }
}
