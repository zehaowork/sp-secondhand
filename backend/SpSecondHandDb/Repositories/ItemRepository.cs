using System.Collections.Generic;
using System.Threading.Tasks;
using SpSecondHandDb.Entities;
using SpSecondHandDb.Interfaces;

namespace SpSecondHandDb.Repositories
{
    public class ItemRepository : BaseRepository<Items>, IItemRepository
    {
        public ItemRepository(SpShDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Items>> GetAll()
        {
            return await Task.FromResult(Context.Items);
        }
    }
}
