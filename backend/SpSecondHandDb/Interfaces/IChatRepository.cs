using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SpSecondHandDb.Entities;

namespace SpSecondHandDb.Interfaces
{
    public interface IChatRepository : IBaseRepository<ChatHistory>
    {
        Task<IEnumerable<ChatHistory>> FindAll(Func<ChatHistory, bool> condition);

        Task<IEnumerable<ChatHistory>> FindByPage(Func<ChatHistory, bool> condition, int page, int size);

        Task UpdateAll(IEnumerable<ChatHistory> messagesToUpdate);
    }
}
