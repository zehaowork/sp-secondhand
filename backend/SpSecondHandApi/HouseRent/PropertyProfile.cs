using System;
using AutoMapper;
using SpSecondHandDb.Entities.HouseRent;
using SpSecondHandModels.HouseRent;
using SpSecondHandModels.HouseRent.Enums;

namespace SpSecondHandApi.HouseRent
{
    public class PropertyProfile : Profile
    {
        public PropertyProfile()
        {
            CreateMap<Property, PropertyDto>()
                .ForMember(d => d.UserId, opt => opt.MapFrom(s => s.User.Id))
                .ForMember(d => d.CityId, opt => opt.MapFrom(s => s.City.Id))
                .ForMember(d => d.CityName, opt => opt.MapFrom(s => s.City.Name))
                .ForMember(d => d.UserName, opt => opt.MapFrom(s => s.User.UserName))
                .ForMember(d => d.UserProfileImgUrl, opt => opt.MapFrom(s => s.User.ProfileImgUrl))
                .ForMember(d => d.RoomType, opt => opt.MapFrom(s => (RoomType) s.RoomType))
                .ForMember(d => d.BuildingType, opt => opt.MapFrom(s => (BuildingType) s.BuildingType))
                .ForMember(d => d.ImgUrls, opt => opt.MapFrom(s => s.ImgUrls.Split(',', StringSplitOptions.None)))
                .ForMember(d => d.Facilities, opt => opt.MapFrom(s => s.Facilities.Split(',', StringSplitOptions.None)));
            CreateMap<PropertyCreateDto, Property>()
                .ForMember(d => d.RoomType, opt => opt.MapFrom(s => (int)s.RoomType))
                .ForMember(d => d.BuildingType, opt => opt.MapFrom(s => (int)s.BuildingType))
                .ForMember(d => d.ImgUrls, opt => opt.MapFrom(s => string.Join(',', s.ImgUrls)))
                .ForMember(d => d.Facilities, opt => opt.MapFrom(s => string.Join(',', s.Facilities)));

        }
    }
}
