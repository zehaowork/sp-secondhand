using AutoMapper;
using SpSecondHandDb.Entities;
using SpSecondHandModels;

namespace SpSecondHandApi.Profiles
{
    public class StaticDateProfile : Profile
    {
        public StaticDateProfile()
        {
            CreateMap<City, CityDto>()
                .ReverseMap();

            CreateMap<Banner, BannerDto>()
                .ReverseMap();

            CreateMap<Category, CategoryDto>()
                .ReverseMap();

            CreateMap<RecommendedSearch, RecommendedSearchDto>()
                .ReverseMap();
        }
    }
}
