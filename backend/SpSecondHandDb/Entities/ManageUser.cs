using System;

namespace SpSecondHandDb.Entities
{
    public class ManageUser
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public string UserPwd { get; set; }
        public string SecretKey { get; set; }
        public DateTime? CreateTime { get; set; }
        public int? RoleId { get; set; }
        public bool? IsDelete { get; set; }
        public bool? IsLock { get; set; }
    }
}
