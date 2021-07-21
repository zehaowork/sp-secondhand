using System;
using System.Linq;
using System.Threading.Tasks;
using SpSecondHandDb.Entities;
using SpSecondHandDb.Interfaces;

namespace SpSecondHandDb.Repositories
{
    public class UserContactRepository : BaseRepository<UserContact>, IUserContactRepository
    {
        public UserContactRepository(SpShDbContext context) : base(context)
        {
        }

        public async Task<UserContact> FindFirst(Func<UserContact, bool> predicate)
        {
            var userContact = Context.UserContact.FirstOrDefault(predicate);

            return await Task.FromResult(userContact);
        }
    }
}
