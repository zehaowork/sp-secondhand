using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SpSecondHandDb.Entities;

namespace SpSecondHandDb.Interfaces
{
    public interface ISecondHandRepository : IBaseRepository<SecondHand>
    {
        Task<IEnumerable<SecondHand>> GetAll();

        Task<IEnumerable<SecondHand>> FindAll(Func<SecondHand, bool> predicate, int page, int size);

        Task<IEnumerable<SecondHand>> GetSecondHandByPage(int page, int size);

        Task<IEnumerable<SecondHand>> GetFavoriteSecondHands(long userId);

        Task AddFavorite(int secondHandId, int userId);

        Task RemoveFavorite(int secondHandId, int userId);

        Task<bool> IsFavorite(int secondHandId, int userId);
    }
}
