namespace SpSecondHandDb.Entities
{
    public class UserContact
    {
        public long Id { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public long? UserId { get; set; }
        public string Telephone { get; set; }
        public string WeChatId { get; set; }

        public virtual User User { get; set; }
    }
}
