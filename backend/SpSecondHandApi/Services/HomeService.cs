using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SpSecondHandApi.Interfaces;
using SpSecondHandDb.Interfaces;
using SpSecondHandModels;

namespace SpSecondHandApi.Services
{
    public class HomeService : IHomeServices
    {
        private readonly IItemRepository _itemRepo;
        private readonly ICityRepository _cityRepo;

        public HomeService(IItemRepository itemRepo, ICityRepository cityRepo)
        {
            _itemRepo = itemRepo;
            _cityRepo = cityRepo;
        }

        public async Task<List<ItemDto>> GetItems()
        {
            var itemList = await _itemRepo.GetAll();

            return itemList.Select(i => new ItemDto(i)).ToList();
        }

        public async Task<List<CityDto>> GetCities()
        {
            var cityList = await _cityRepo.GetAll();

            return cityList.Select(c => new CityDto(c)).ToList();
        }

        public async Task<List<CityDto>> GetCitiesByCountryId(int countryId)
        {
            var cityList = await _cityRepo.GetCitiesByCountryId(countryId);

            return cityList.Select(c => new CityDto(c)).ToList();
        }
    }
}
