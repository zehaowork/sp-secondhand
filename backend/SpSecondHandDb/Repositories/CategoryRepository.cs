using System.Collections.Generic;
using System.Threading.Tasks;
using SpSecondHandDb.Entities;
using SpSecondHandDb.Interfaces;

namespace SpSecondHandDb.Repositories
{
    public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(SpShDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Category>> GetAll()
        {
            return await Task.FromResult(Context.Items);
        }
    }
}
