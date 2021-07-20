using System;
using SpSecondHandDb.Entities;

namespace SpSecondHandModels
{
    public class UserDto
    {
        public UserDto(User user)
        {
            Id = user.Id;
            OpenId = user.OpenId;
            NickName = user.NickName;
            City = user.City;
            Province = user.Province;
            Country = user.Country;
            Sex = user.Sex;
            HeadImgUrl = user.HeadImgUrl;
            CreateTime = user.CreateTime;
            Status = user.Status;
            ProjectId = user.ProjectId;
        }

        public long Id { get; set; }
        public string OpenId { get; set; }
        public string NickName { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string Country { get; set; }
        public int? Sex { get; set; }
        public string HeadImgUrl { get; set; }
        public DateTime? CreateTime { get; set; }
        public int? Status { get; set; }
        public int? ProjectId { get; set; }
    }
}
