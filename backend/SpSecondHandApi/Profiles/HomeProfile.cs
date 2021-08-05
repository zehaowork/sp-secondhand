using AutoMapper;
using SpSecondHandDb.Entities;
using SpSecondHandModels;

namespace SpSecondHandApi.Profiles
{
    public class HomeProfile : Profile
    {
        public HomeProfile()
        {
            CreateMap<City, CityDto>()
                .ReverseMap();

            CreateMap<Banner, BannerDto>()
                .ReverseMap();

            CreateMap<Category, CategoryDto>()
                .ReverseMap();
        }
    }
}
