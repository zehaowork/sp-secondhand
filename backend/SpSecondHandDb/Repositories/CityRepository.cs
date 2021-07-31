using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SpSecondHandDb.Entities;
using SpSecondHandDb.Interfaces;

namespace SpSecondHandDb.Repositories
{
    public class CityRepository : BaseRepository<Region>, ICityRepository
    {
        public CityRepository(SpShDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Region>> GetAll()
        {
            return await Task.FromResult(Context.Region);
        }

        public async Task<IEnumerable<Region>> GetCitiesByCountryId(int id)
        {
            return await Context.Region.Where(c => c.CountryId == id).ToListAsync();
        }
    }
}
