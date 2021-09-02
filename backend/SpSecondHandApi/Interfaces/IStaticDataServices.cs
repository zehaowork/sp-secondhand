using System.Collections.Generic;
using System.Threading.Tasks;
using SpSecondHandModels;

namespace SpSecondHandApi.Interfaces
{
    public interface IStaticDataServices
    {
        Task<List<CategoryDto>> GetCategories();
        Task<List<CityDto>> GetCities();
        Task<List<CityDto>> GetCitiesByCountryId(int countryId);
        Task<List<BannerDto>> GetBanners();
        Task<BannerDto> UpdateBanner(BannerDto bannerToUpdate);
    }
}
