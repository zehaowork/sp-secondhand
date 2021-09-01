using System;
using System.Threading.Tasks;

namespace SpSecondHandApi.Interfaces
{
    public interface IWeChatService
    {
        Task<bool> ImgSecCheck(byte[] btData);

        Task<string> GetWxOpenId(string code);
    }
}
