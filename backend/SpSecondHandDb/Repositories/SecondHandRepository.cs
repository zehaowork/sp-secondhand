using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SpSecondHandDb.Entities;
using SpSecondHandDb.Interfaces;

namespace SpSecondHandDb.Repositories
{
    public class SecondHandRepository : BaseRepository<SecondHand>, ISecondHandRepository
    {
        public SecondHandRepository(SpShDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<SecondHand>> GetAll()
        {
            return await Task.FromResult(Context.SecondHand);
        }

        public async Task<IEnumerable<SecondHand>> FindAll(Func<SecondHand, bool> predicate, int page, int size)
        {
            var secondHands = Context.SecondHand
                .Where(predicate)
                .OrderByDescending(o => o.CreateTime)
                .Skip(page * size)
                .Take(size)
                .ToList();

            return await Task.FromResult(secondHands);
        }

        public async Task<IEnumerable<SecondHand>> GetSecondHandByPage(int page, int size)
        {
            var secondHands = Context.SecondHand
                .OrderByDescending(o => o.CreateTime)
                .Skip(page * size)
                .Take(size)
                .ToList();

            return await Task.FromResult(secondHands);
        }

        public async Task<IEnumerable<SecondHand>> GetFavoriteSecondHands(long userId)
        {
            var fav = Context.Favorites.Where(f => f.UserId == userId);

            return await fav?.Select(f => f.SecondHand).ToListAsync();
        }

        public async Task AddFavorite(int secondHandId, int userId)
        {
            var secondHand = await Context.SecondHand.FindAsync(secondHandId);
            var user = await Context.User.FindAsync(userId);
            var fav = new Favorite()
            {
                SecondHand = secondHand,
                User = user
            };

            secondHand.Favorites.Add(fav);
            user.Favorites.Add(fav);

            await Context.SaveChangesAsync();
        }

        public async Task RemoveFavorite(int secondHandId, int userId)
        {
            var user = await Context.User.FindAsync(userId);
            var fav = user.Favorites.FirstOrDefault(f => f.SecondHandId == secondHandId);

            user.Favorites.Remove(fav);

            await Context.SaveChangesAsync();
        }

        public async Task<bool> IsFavorite(int secondHandId, int userId)
        {
            return await Context.Favorites.AnyAsync(f => f.UserId == userId && f.SecondHandId == secondHandId);
        }
    }
}
