using System.Collections.Generic;
using System.Threading.Tasks;
using SpSecondHandDb.Entities;

namespace SpSecondHandDb.Interfaces
{
    public interface IStaticDataRepository
    {
        Task<IEnumerable<City>> GetCities();

        Task<IEnumerable<City>> GetCitiesByCountryId(int id);

        Task<IEnumerable<Category>> GetCategories();

        Task<IEnumerable<Banner>> GetBanners();

        Task<Banner> GetBannerById(int id);

        Task<Banner> UpdateBanner(Banner bannerToUpdate);
    }
}
