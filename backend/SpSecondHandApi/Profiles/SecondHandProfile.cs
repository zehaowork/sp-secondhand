using AutoMapper;
using SpSecondHandDb.Entities;
using SpSecondHandModels;

namespace SpSecondHandApi.Profiles
{
    public class SecondHandProfile : Profile
    {
        public SecondHandProfile()
        {
            CreateMap<SecondHand, SecondHandDto>()
                .ReverseMap();
        }
    }
}
