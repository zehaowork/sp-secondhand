using System.Collections.Generic;
using System.Threading.Tasks;
using SpSecondHandModels;

namespace SpSecondHandApi.Interfaces
{
    public interface IHomeServices
    {
        Task<List<ItemDto>> GetItems();

        Task<List<CityDto>> GetCities();

        Task<List<CityDto>> GetCitiesByCountryId(int countryId);
    }
}
