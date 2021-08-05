using System;

namespace SpSecondHandModels
{
    public class UserDto
    {
        public long Id { get; set; }
        public string OpenId { get; set; }
        public string UserName { get; set; }
        public string City { get; set; }
        public int? Gender { get; set; }
        public string ProfileImgUrl { get; set; }
        public DateTime? JoinTime { get; set; }
    }
}
