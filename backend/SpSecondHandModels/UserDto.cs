using System;

namespace SpSecondHandModels
{
    public class UserDto
    {
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
