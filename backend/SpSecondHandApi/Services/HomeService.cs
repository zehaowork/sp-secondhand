using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using SpSecondHandApi.Interfaces;
using SpSecondHandDb.Interfaces;
using SpSecondHandModels;

namespace SpSecondHandApi.Services
{
    public class HomeService : IHomeServices
    {
        private readonly ICategoryRepository _itemRepo;
        private readonly ICityRepository _cityRepo;
        private readonly IMapper _mapper;

        public HomeService(ICategoryRepository itemRepo, ICityRepository cityRepo, IMapper mapper)
        {
            _itemRepo = itemRepo;
            _cityRepo = cityRepo;
            _mapper = mapper;
        }

        public async Task<List<CategoryDto>> GetCategories()
        {
            var categoryList = await _itemRepo.GetAll();

            return categoryList.Select(c => _mapper.Map<CategoryDto>(c)).ToList();
        }

        public async Task<List<CityDto>> GetCities()
        {
            var cityList = await _cityRepo.GetAll();

            return cityList.Select(c => _mapper.Map<CityDto>(c)).ToList();
        }

        public async Task<List<CityDto>> GetCitiesByCountryId(int countryId)
        {
            var cityList = await _cityRepo.GetCitiesByCountryId(countryId);

            return cityList.Select(c => _mapper.Map<CityDto>(c)).ToList();
        }
    }
}
