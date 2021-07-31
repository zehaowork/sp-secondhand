using System.Collections.Generic;
using System.Threading.Tasks;
using SpSecondHandDb.Entities;

namespace SpSecondHandDb.Interfaces
{
    public interface IItemRepository : IBaseRepository<Items>
    {
        Task<IEnumerable<Items>> GetAll();
    }
}
