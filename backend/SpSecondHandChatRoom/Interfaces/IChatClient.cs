using System.Threading.Tasks;

namespace SpSecondHandChatRoom.Interfaces
{
    public interface IChatClient
    {
        Task ShowMessage(int fromUId, int toUId, string message);
        Task Warn(string message);
        Task ShowItem(int fromUId, int toUId, string serializedItem);
        Task ReceiveMessage(string user, string msg);
    }
}
