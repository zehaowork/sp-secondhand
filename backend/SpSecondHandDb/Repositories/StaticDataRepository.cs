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
            return await Context.Cities.ToListAsync();
        }

        public async Task<IEnumerable<City>> GetCitiesByCountryId(int id)
        {
            return await Context.Cities.Where(c => c.CountryId == id).ToListAsync();
        }

        public async Task<IEnumerable<Category>> GetCategories()
        {
            return await Context.Categories.ToListAsync();
        }

        public async Task<IEnumerable<Banner>> GetBanners()
        {
            return await Context.Banners.ToListAsync();
        }

        public async Task<Banner> GetBannerById(int id)
        {
            return await Context.Banners.FindAsync(id);
        }

        public async Task<Banner> UpdateBanner(Banner bannerToUpdate)
        {
            Context.Update(bannerToUpdate);
            await Context.SaveChangesAsync();

            return bannerToUpdate;
        }

        #region private

        protected readonly SpShDbContext Context;

        #endregion
    }
}
