using System.Collections.Generic;
using System.Threading.Tasks;
using SpSecondHandDb.Entities;

namespace SpSecondHandDb.Interfaces
{
    public interface IStaticDataRepository
    {
        Task<IEnumerable<City>> GetCities();

        Task<City> GetCityById(int id);

        Task<IEnumerable<City>> GetCitiesByCountryId(int id);

        Task<IEnumerable<Category>> GetCategories();

        Task<Category> GetCategoryById(int id);

        Task<IEnumerable<Banner>> GetBanners();

        Task<Banner> GetBannerById(int id);

        Task<Banner> UpdateBanner(Banner bannerToUpdate);

        Task<IEnumerable<RecommendedSearch>> GetRecommendedSearches();

        Task<RecommendedSearch> GetRecommendedSearchById(int id);

        Task<RecommendedSearch> AddRecommendedSearch(RecommendedSearch entityToAdd);

        Task<RecommendedSearch> UpdateRecommendedSearch(RecommendedSearch entityToUpdate);

        Task DeleteRecommendedSearch(RecommendedSearch entityToDelete);
    }
}
