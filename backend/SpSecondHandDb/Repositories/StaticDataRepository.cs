using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SpSecondHandDb.Entities;
using SpSecondHandDb.Interfaces;

namespace SpSecondHandDb.Repositories
{
    public class StaticDataRepository : IStaticDataRepository
    {
        public StaticDataRepository(SpShDbContext context)
        {
            Context = context;
        }

        public async Task<IEnumerable<City>> GetCities()
        {
            return await Context.Region.ToListAsync();
        }

        public async Task<IEnumerable<City>> GetCitiesByCountryId(int id)
        {
            return await Context.Region.Where(c => c.CountryId == id).ToListAsync();
        }

        public async Task<IEnumerable<Category>> GetCategories()
        {
            return await Context.Categories.ToListAsync();
        }

        public async Task<IEnumerable<Banner>> GetBanners()
        {
            return await Context.Banners.ToListAsync();
        }

        #region private

        protected readonly SpShDbContext Context;

        #endregion
    }
}
