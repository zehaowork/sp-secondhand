using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using SpSecondHandApi.Interfaces;
using SpSecondHandDb.Entities;
using SpSecondHandDb.Interfaces;
using SpSecondHandModels;

namespace SpSecondHandApi.Services
{
    public class StaticDataService : IStaticDataServices
    {
        private readonly IStaticDataRepository _staticDataRepo;
        private readonly IMapper _mapper;

        public StaticDataService(IStaticDataRepository staticDataRepo, IMapper mapper)
        {
            _staticDataRepo = staticDataRepo;
            _mapper = mapper;
        }

        public async Task<List<CategoryDto>> GetCategories()
        {
            var categoryList = await _staticDataRepo.GetCategories();

            return categoryList.Select(c => _mapper.Map<CategoryDto>(c)).ToList();
        }

        public async Task<List<CityDto>> GetCities()
        {
            var cityList = await _staticDataRepo.GetCities();

            return cityList.Select(c => _mapper.Map<CityDto>(c)).ToList();
        }

        public async Task<List<CityDto>> GetCitiesByCountryId(int countryId)
        {
            var cityList = await _staticDataRepo.GetCitiesByCountryId(countryId);

            return cityList.Select(c => _mapper.Map<CityDto>(c)).ToList();
        }

        public async Task<List<BannerDto>> GetBanners()
        {
            var bannerList = await _staticDataRepo.GetBanners();

            return bannerList.Select(c => _mapper.Map<BannerDto>(c)).ToList();
        }

        public async Task<BannerDto> UpdateBanner(BannerDto bannerToUpdate)
        {
            var banner = await _staticDataRepo.GetBannerById(bannerToUpdate.Id);
            if (banner == null)
            {
                throw new ArgumentException($"Banner Id {bannerToUpdate.Id} doesn't exist.");
            }

            banner.ImgUrl = bannerToUpdate.ImgUrl;
            banner.Link = bannerToUpdate.Link;
            banner.Order = bannerToUpdate.Order;

            return _mapper.Map<BannerDto>(await _staticDataRepo.UpdateBanner(banner));
        }

        #region Recommended Search

        public async Task<List<RecommendedSearchDto>> GetRecommendedSearches()
        {
            var recommendedSearchList = await _staticDataRepo.GetRecommendedSearches();

            return recommendedSearchList.Select(c => _mapper.Map<RecommendedSearchDto>(c)).ToList();
        }

        public async Task<RecommendedSearchDto> AddRecommendedSearch(RecommendedSearchDto rsDto)
        {
            var newRs = _mapper.Map<RecommendedSearch>(rsDto);

            return _mapper.Map<RecommendedSearchDto>(await _staticDataRepo.AddRecommendedSearch(newRs));
        }

        public async Task<RecommendedSearchDto> UpdateRecommendedSearch(RecommendedSearchDto rsToUpdate)
        {
            var search = await _staticDataRepo.GetRecommendedSearchById(rsToUpdate.Id);
            if (search == null)
            {
                throw new ArgumentException($"Recommended search Id {rsToUpdate.Id} doesn't exist.");
            }

            search.Keyword = rsToUpdate.Keyword;
            search.Order = rsToUpdate.Order;

            return _mapper.Map<RecommendedSearchDto>(await _staticDataRepo.UpdateRecommendedSearch(search));
        }

        public async Task DeleteRecommendedSearch(int rsId)
        {
            var search = await _staticDataRepo.GetRecommendedSearchById(rsId);
            if (search == null)
            {
                throw new ArgumentException($"Recommended search Id {rsId} doesn't exist.");
            }

            await _staticDataRepo.DeleteRecommendedSearch(search);
        }

        #endregion

    }
}
