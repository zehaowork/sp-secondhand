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
            return await Task.FromResult(Context.SecondHands);
        }

        public async Task<IEnumerable<SecondHand>> FindAll(Func<SecondHand, bool> predicate, int page, int size)
        {
            var secondHands = Context.SecondHands
                .Include(s => s.User)
                .Include(s => s.Category)
                .Include(s => s.City)
                .Where(predicate)
                .OrderByDescending(s => s.PublishTime)
                .Skip(page * size)
                .Take(size)
                .ToList();

            return await Task.FromResult(secondHands);
        }

        public async Task<IEnumerable<SecondHand>> FindAllWithSorting(Func<SecondHand, bool> predicate, Func<SecondHand, dynamic> orderBy, bool isDesc, int page, int size)
        {
            var secondHands = isDesc
                ? Context.SecondHands.Include(s => s.User).Include(s => s.Category)
                    .Include(s => s.City).Where(predicate).OrderByDescending(orderBy).Skip(page * size).Take(size).ToList()
                : Context.SecondHands.Include(s => s.User).Include(s => s.Category)
                    .Include(s => s.City).Where(predicate).Where(predicate).OrderBy(orderBy).Skip(page * size).Take(size).ToList();

            return await Task.FromResult(secondHands);
        }

        public async Task<IEnumerable<SecondHand>> GetSecondHandByPage(int page, int size)
        {
            var secondHands = Context.SecondHands
                .OrderByDescending(o => o.PublishTime)
                .Skip(page * size)
                .Take(size)
                .ToList();

            return await Task.FromResult(secondHands);
        }

        #region Favorites

        public async Task<IEnumerable<SecondHand>> GetFavoriteSecondHands(long userId)
        {
            var fav = Context.Favorites.Where(f => f.UserId == userId);

            return await fav?.Select(f => f.SecondHand)
                .ToListAsync();
        }

        public async Task AddFavorite(long secondHandId, long userId)
        {
            var secondHand = await Context.SecondHands.FindAsync(secondHandId);
            if (secondHand == null)
            {
                throw new ArgumentException($"Second hand item {secondHandId} doesn't exist.");
            }
            var user = await Context.Users.FindAsync(userId);
            if (user == null)
            {
                throw new ArgumentException($"User {userId} doesn't exist.");
            }

            if (await IsFavorite(secondHandId, userId))
            {
                throw new ArgumentException($"User {userId} already added second hand item {secondHandId} as favorite.");
            }

            var fav = new Favorite()
            {
                SecondHand = secondHand,
                User = user
            };

            secondHand.Favorites.Add(fav);
            user.Favorites.Add(fav);

            await Context.SaveChangesAsync();
        }

        public async Task RemoveFavorite(long secondHandId, long userId)
        {
            var user = await Context.Users.FindAsync(userId);
            if (user == null)
            {
                throw new ArgumentException($"User {userId} doesn't exist.");
            }
            var fav = user.Favorites.FirstOrDefault(f => f.SecondHandId == secondHandId);

            user.Favorites.Remove(fav);

            await Context.SaveChangesAsync();
        }

        public async Task<bool> IsFavorite(long secondHandId, long userId)
        {
            return await Context.Favorites.AnyAsync(f => f.UserId == userId && f.SecondHandId == secondHandId);
        }

        #endregion
    }
}
