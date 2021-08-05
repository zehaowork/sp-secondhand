using AutoMapper;
using SpSecondHandDb.Entities;
using SpSecondHandModels;

namespace SpSecondHandApi.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDto>()
                .ReverseMap();

            CreateMap<UserContact, UserContactDto>()
                .ReverseMap();
        }
    }
}
