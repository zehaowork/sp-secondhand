using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public async Task<IEnumerable<SecondHand>> FindAll(Func<SecondHand, bool> predicate)
        {
            return await Task.FromResult(Context.SecondHand.Where(predicate).ToList());

        }

        public async Task<IEnumerable<SecondHand>> GetSecondHandByPage(Func<SecondHand, bool> predicate, int page, int size)
        {
            var secondHands = Context.SecondHand
                .Where(predicate)
                .OrderByDescending(o => o.CreateTime)
                .Skip(page * size)
                .Take(size)
                .ToList();

            return await Task.FromResult(secondHands);
        }
    }
}
