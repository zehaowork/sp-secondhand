using System.Collections.Generic;
using System.Threading.Tasks;
using SpSecondHandModels;

namespace SpSecondHandApi.Interfaces
{
    public interface IChatService
    {
        Task<List<ChatHistoryDto>> GetChatHistory(int fromUId, int toUId, int page);

        Task<List<ChatHistoryDto>> GetChatRoomList(long fromUId);

        Task<List<ChatHistoryDto>> SearchChatHistory(long fromUId, string keyword);
    }
}
