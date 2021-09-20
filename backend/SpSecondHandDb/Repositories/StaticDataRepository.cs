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

        public async Task<City> GetCityById(int id)
        {
            return await Context.Cities.FindAsync(id);
        }

        public async Task<IEnumerable<City>> GetCitiesByCountryId(int id)
        {
            return await Context.Cities.Where(c => c.CountryId == id).ToListAsync();
        }

        public async Task<City> UpdateCity(City city)
        {
            Context.Update(city);
            await Context.SaveChangesAsync();

            return city;
        }

        public async Task<IEnumerable<Category>> GetCategories()
        {
            return await Context.Categories.ToListAsync();
        }

        public async Task<Category> GetCategoryById(int id)
        {
            return await Context.Categories.FindAsync(id);
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

        #region Recommended Search

        public async Task<IEnumerable<RecommendedSearch>> GetRecommendedSearches()
        {
            return await Context.RecommendedSearches.ToListAsync();
        }

        public async Task<RecommendedSearch> GetRecommendedSearchById(int id)
        {
            return await Context.RecommendedSearches.FindAsync(id);
        }

        public async Task<RecommendedSearch> AddRecommendedSearch(RecommendedSearch entityToAdd)
        {
            await Context.AddAsync(entityToAdd);
            await Context.SaveChangesAsync();

            return entityToAdd;
        }

        public async Task<RecommendedSearch> UpdateRecommendedSearch(RecommendedSearch entityToUpdate)
        {
            Context.Update(entityToUpdate);
            await Context.SaveChangesAsync();

            return entityToUpdate;
        }

        public async Task DeleteRecommendedSearch(RecommendedSearch entityToDelete)
        {
            Context.Remove(entityToDelete);
            await Context.SaveChangesAsync();
        }

        #endregion

        #region private

        protected readonly SpShDbContext Context;

        #endregion
    }
}
