using System.Collections.Generic;
using System.Threading.Tasks;
using SpSecondHandDb.Entities;

namespace SpSecondHandDb.Interfaces
{
    public interface ICategoryRepository : IBaseRepository<Category>
    {
        Task<IEnumerable<Category>> GetAll();
    }
}
