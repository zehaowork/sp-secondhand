using AutoMapper;
using SpSecondHandDb.Entities;
using SpSecondHandModels;
using SpSecondHandModels.Enums;

namespace SpSecondHandApi.Profiles
{
    public class SecondHandProfile : Profile
    {
        public SecondHandProfile()
        {
            CreateMap<SecondHand, SecondHandDto>()
                .ForMember(d => d.UserId, opt => opt.MapFrom(s => s.User.Id))
                .ForMember(d => d.CategoryId, opt => opt.MapFrom(s => s.Category.Id))
                .ForMember(d => d.CityId, opt => opt.MapFrom(s => s.City.Id))
                .ForMember(d => d.CityName, opt => opt.MapFrom(s => s.City.Name))
                .ForMember(d => d.CategoryName, opt => opt.MapFrom(s => s.Category.Name))
                .ForMember(d => d.UserName, opt => opt.MapFrom(s => s.User.UserName))
                .ForMember(d => d.UserProfileImgUrl, opt => opt.MapFrom(s => s.User.ProfileImgUrl))
                .ForMember(d => d.Status, opt => opt.MapFrom(s => (Status)s.Status));
            CreateMap<SecondHandCreateDto, SecondHand>()
                .ForMember(d => d.Status, opt => opt.MapFrom(s => (int)s.Status));
        }
    }
}
