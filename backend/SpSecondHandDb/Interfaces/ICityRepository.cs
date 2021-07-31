using System.Collections.Generic;
using System.Threading.Tasks;
using SpSecondHandDb.Entities;

namespace SpSecondHandDb.Interfaces
{
    public interface ICityRepository : IBaseRepository<Region>
    {
        Task<IEnumerable<Region>> GetAll();

        Task<IEnumerable<Region>> GetCitiesByCountryId(int id);
    }
}
