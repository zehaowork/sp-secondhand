using SpSecondHandDb.Entities;

namespace SpSecondHandModels
{
    public class UserContactDto
    {
        public UserContactDto(UserContact userContact)
        {
            Id = userContact.Id;
            Address1 = userContact.Address1;
            Address2 = userContact.Address2;
            Address3 = userContact.Address3;
            UserId = userContact.UserId;
            Telephone = userContact.Telephone;
            WeChatId = userContact.WeChatId;
        }

        public long Id { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public long? UserId { get; set; }
        public string Telephone { get; set; }
        public string WeChatId { get; set; }
    }
}
