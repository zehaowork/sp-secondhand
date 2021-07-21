using System;
using System.Threading.Tasks;
using SpSecondHandDb.Entities;

namespace SpSecondHandDb.Interfaces
{
    public interface IUserContactRepository : IBaseRepository<UserContact>
    {
        Task<UserContact> FindFirst(Func<UserContact, bool> predicate);
    }
}
