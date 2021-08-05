using System.Collections.Generic;
using System.Threading.Tasks;
using SpSecondHandDb.Entities;

namespace SpSecondHandDb.Interfaces
{
    public interface ICityRepository : IBaseRepository<City>
    {
        Task<IEnumerable<City>> GetAll();

        Task<IEnumerable<City>> GetCitiesByCountryId(int id);
    }
}
