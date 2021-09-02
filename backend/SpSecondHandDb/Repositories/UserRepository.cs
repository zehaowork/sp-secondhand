using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SpSecondHandDb.Entities;
using SpSecondHandDb.Interfaces;

namespace SpSecondHandDb.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(SpShDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await Context.Users.ToListAsync();
        }

        public async Task<IEnumerable<User>> FindAll(Func<User, bool> predicate)
        {
            var users = Context.Users
                .Where(predicate)
                .ToList();

            return await Task.FromResult(users);
        }

        public async Task<User> FindFirst(Func<User, bool> predicate)
        {
            var users = Context.Users.FirstOrDefault(predicate);

            return await Task.FromResult(users);
        }
    }
}
